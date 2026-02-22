"""
Park City Mountain — Live Conditions Scraper

Uses Playwright (headless Chromium) to load the Park City terrain page.
The page itself calls cache.snow.com APIs via XHR — we intercept those
responses to get structured JSON data for:
  - Lift status & trail status (TerrainApi)
  - Weather conditions (WeatherApi)
  - Snow forecast (OpenSnow)

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
        # Wait for the async API calls to complete
        page.wait_for_timeout(15000)

        browser.close()

    if not captured:
        print("[scrape] ERROR: No API responses captured. WAF may have blocked.")
        sys.exit(1)

    # Parse the captured JSON
    result = {"scraped_at": datetime.now(timezone.utc).isoformat()}

    # --- Terrain (lifts + trails) ---
    if "terrain" in captured:
        try:
            terrain_raw = json.loads(captured["terrain"])
            result["terrain"] = terrain_raw
            # Count items for logging
            lift_count = count_items(terrain_raw, "lift")
            trail_count = count_items(terrain_raw, "trail")
            print(f"[scrape] Terrain data captured ({lift_count} lift-like, {trail_count} trail-like items)")
        except Exception as e:
            print(f"[scrape] Failed to parse terrain JSON: {e}")
            result["terrain_raw"] = captured["terrain"][:20000]

    # --- Weather ---
    if "weather" in captured:
        try:
            result["weather"] = json.loads(captured["weather"])
            print("[scrape] Weather data captured")
        except Exception as e:
            print(f"[scrape] Failed to parse weather: {e}")

    # --- Weather header ---
    if "weather_header" in captured:
        try:
            result["weather_header"] = json.loads(captured["weather_header"])
            print("[scrape] Weather header captured")
        except Exception:
            pass

    # --- OpenSnow ---
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

    # Save raw for debugging
    debug_path = Path(__file__).resolve().parent / "debug_raw.json"
    debug_data = {}
    for k, v in captured.items():
        try:
            debug_data[k] = json.loads(v)
        except Exception:
            debug_data[k] = v[:5000]
    debug_path.write_text(json.dumps(debug_data, indent=2), encoding="utf-8")
    print(f"[scrape] Debug data saved to {debug_path}")


def count_items(obj, keyword):
    """Recursively count dict items whose keys contain the keyword."""
    count = 0
    if isinstance(obj, dict):
        for k, v in obj.items():
            if keyword.lower() in k.lower():
                if isinstance(v, list):
                    count += len(v)
                else:
                    count += 1
            count += count_items(v, keyword)
    elif isinstance(obj, list):
        for item in obj:
            count += count_items(item, keyword)
    return count


if __name__ == "__main__":
    main()
