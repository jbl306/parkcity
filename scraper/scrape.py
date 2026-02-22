"""
Park City Mountain — Live Conditions Scraper

Uses Playwright (headless Chromium) to load the Park City terrain page.

Primary: Intercepts cache.snow.com XHR responses for weather / forecast data.
Fallback: Scrapes lift & trail status directly from the rendered DOM, since
          the TerrainApi frequently returns empty data ({IsSuccessful: false}).

Outputs docs/conditions.json for the frontend to consume.
Designed to run on GitHub Actions every 10 min during operating hours.
"""

import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from playwright.sync_api import sync_playwright

TERRAIN_URL = "https://www.parkcitymountain.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx"

# API endpoints the page itself calls (we intercept them)
API_TERRAIN = "cache.snow.com/api/TerrainApi/GetTerrainStatus"
API_WEATHER = "cache.snow.com/api/WeatherApi/GetWeather/parkcity"
API_WEATHER_HEADER = "parkcitymountain.com/api/PageApi/GetWeatherDataForHeader"
API_OPENSNOW = "cache.snow.com/api/weatherapi/GetOpenSnowWeatherForecast"

OUTPUT_PATH = Path(__file__).resolve().parent.parent / "docs" / "conditions.json"

# Whether to run headless (True for CI, False for local debugging)
HEADLESS = "--headed" not in sys.argv


# ── DOM extraction scripts ─────────────────────────────────────

JS_EXTRACT_LIFTS = """() => {
    const rows = document.querySelectorAll('.liftStatus__lifts__row');
    return [...rows].map(row => {
        const nameEl = row.querySelector('.liftStatus__lifts__row__title');
        const timeEl = row.querySelector('.liftStatus__lifts__row__time');
        const iconEl = row.querySelector('[class*="icon-status-"]');
        const classes = iconEl ? [...iconEl.classList].join(' ') : '';
        const isOpen = classes.includes('icon-status-open');
        return {
            Name: nameEl ? nameEl.textContent.trim() : '',
            Status: isOpen ? 'Open' : 'Closed',
            Hours: timeEl ? timeEl.textContent.trim() : ''
        };
    }).filter(l => l.Name);
}"""

JS_EXTRACT_TRAILS = """() => {
    const panels = document.querySelectorAll('.trailStatus__statusPanel');
    return [...panels].map(panel => {
        // Area name from heading
        const h2 = panel.querySelector('.trailStatus__statusPanel__info_container h2');
        const areaName = h2 ? h2.childNodes[0].textContent.trim() : 'Unknown Area';

        const rows = panel.querySelectorAll('.trailStatus__trails__row');
        const trails = [...rows].map(row => {
            const nameEl = row.querySelector('.trailStatus__trails__row--name');
            const statusIcon = row.querySelector('.trailStatus__trails__row--icon[class*="icon-status-"]');
            const groomIcon = row.querySelector('.trailStatus__trails__row--iconRight');

            const statusClasses = statusIcon ? [...statusIcon.classList].join(' ') : '';
            const groomClasses = groomIcon ? [...groomIcon.classList].join(' ') : '';
            const isOpen = statusClasses.includes('icon-status-open');
            const isGroomed = groomClasses.includes('icon-status-snowcat');

            return {
                Name: nameEl ? nameEl.textContent.trim() : '',
                Status: isOpen ? 'Open' : 'Closed',
                IsGroomed: isGroomed
            };
        }).filter(t => t.Name);

        return { Name: areaName, Trails: trails };
    }).filter(a => a.Trails.length > 0);
}"""


def main():
    print(f"[scrape] Starting at {datetime.now(timezone.utc).isoformat()}")
    print(f"[scrape] Headless: {HEADLESS}")

    captured = {}

    def on_response(response):
        url = response.url
        for key, pattern in [
            ("terrain", API_TERRAIN),
            ("weather", API_WEATHER),
            ("weather_header", API_WEATHER_HEADER),
            ("opensnow", API_OPENSNOW),
        ]:
            if pattern in url:
                try:
                    body = response.text()
                    captured[key] = body
                    print(f"  [captured] {key}: {len(body)} chars")
                except Exception as e:
                    print(f"  [error] {key}: {e}")

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=HEADLESS,
            args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
        )
        context = browser.new_context(
            user_agent=(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            viewport={"width": 1280, "height": 720},
        )
        page = context.new_page()
        page.on("response", on_response)

        print("[scrape] Loading terrain page...")
        page.goto(TERRAIN_URL, wait_until="domcontentloaded", timeout=60000)

        # Dismiss common popups (cookie consent, marketing overlays)
        popup_selectors = [
            "#onetrust-accept-btn-handler",          # OneTrust cookie consent
            "button[id*='accept']",                   # Generic accept buttons
            ".onetrust-close-btn-handler",            # OneTrust close
            "[aria-label='Close']",                   # Generic close buttons
            ".modal-close",                           # Modal close
            "button.close",                           # Bootstrap close
        ]
        page.wait_for_timeout(3000)  # Let popups render
        for sel in popup_selectors:
            try:
                btn = page.query_selector(sel)
                if btn and btn.is_visible():
                    btn.click()
                    print(f"  [popup] Dismissed: {sel}")
                    page.wait_for_timeout(1000)
            except Exception:
                pass

        # Wait for JS bundles (liftStatus/trailStatus) to render
        page.wait_for_timeout(15000)

        # ── Expand all collapsed lift & trail accordions ──
        expanded = page.evaluate("""() => {
            let count = 0;
            // Expand lift status panels
            document.querySelectorAll('.liftStatus__statusPanel').forEach(panel => {
                if (!panel.classList.contains('panelOpen')) {
                    const heading = panel.querySelector('.liftStatus__statusPanel__heading');
                    if (heading) { heading.click(); count++; }
                }
            });
            // Expand trail status panels
            document.querySelectorAll('.trailStatus__statusPanel').forEach(panel => {
                if (!panel.classList.contains('panelOpen')) {
                    const heading = panel.querySelector('.trailStatus__statusPanel__heading');
                    if (heading) { heading.click(); count++; }
                }
            });
            return count;
        }""")
        print(f"  [dom] Expanded {expanded} collapsed accordion panels")
        if expanded > 0:
            page.wait_for_timeout(2000)  # Let expanded content render

        # ── Extract lift & trail status from DOM ──
        dom_lifts = []
        dom_trails = []
        try:
            dom_lifts = page.evaluate(JS_EXTRACT_LIFTS) or []
            print(f"  [dom] Extracted {len(dom_lifts)} lifts from DOM")
        except Exception as e:
            print(f"  [dom] Lift extraction failed: {e}")

        try:
            dom_trails = page.evaluate(JS_EXTRACT_TRAILS) or []
            trail_count = sum(len(a["Trails"]) for a in dom_trails)
            print(f"  [dom] Extracted {trail_count} trails across {len(dom_trails)} areas from DOM")
        except Exception as e:
            print(f"  [dom] Trail extraction failed: {e}")

        browser.close()

    if not captured and not dom_lifts and not dom_trails:
        print("[scrape] ERROR: No API responses captured and DOM extraction empty.")
        sys.exit(1)

    # Parse the captured JSON
    result = {"scraped_at": datetime.now(timezone.utc).isoformat()}

    # ── Terrain (lifts + trails) ──
    terrain_api_ok = False
    if "terrain" in captured:
        try:
            terrain_raw = json.loads(captured["terrain"])
            # Check if the API actually returned useful data
            has_lifts = bool(terrain_raw.get("Lifts"))
            has_areas = bool(terrain_raw.get("GroomingAreas"))
            if has_lifts or has_areas:
                result["terrain"] = terrain_raw
                terrain_api_ok = True
                print(f"[scrape] Terrain API OK ({len(terrain_raw.get('Lifts', []))} lifts, "
                      f"{len(terrain_raw.get('GroomingAreas', []))} areas)")
        except Exception as e:
            print(f"[scrape] Failed to parse terrain JSON: {e}")

    # Fallback: use DOM-scraped lift/trail data
    if not terrain_api_ok and (dom_lifts or dom_trails):
        print("[scrape] Terrain API empty/failed — using DOM-scraped data")
        result["terrain"] = {
            "IsSuccessful": True,
            "Lifts": dom_lifts,
            "GroomingAreas": dom_trails,
            "source": "dom"
        }

    # ── Weather ──
    if "weather" in captured:
        try:
            result["weather"] = json.loads(captured["weather"])
            print("[scrape] Weather data captured")
        except Exception as e:
            print(f"[scrape] Failed to parse weather: {e}")

    # ── Weather header ──
    if "weather_header" in captured:
        try:
            result["weather_header"] = json.loads(captured["weather_header"])
            print("[scrape] Weather header captured")
        except Exception:
            pass

    # ── OpenSnow ──
    if "opensnow" in captured:
        try:
            result["opensnow"] = json.loads(captured["opensnow"])
            print("[scrape] OpenSnow forecast captured")
        except Exception:
            pass

    # Write output
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(f"[scrape] Wrote {OUTPUT_PATH} ({OUTPUT_PATH.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
