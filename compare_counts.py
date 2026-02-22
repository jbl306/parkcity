"""Compare trail counts between resort website and our data."""
from playwright.sync_api import sync_playwright
import json

URL = "https://www.parkcitymountain.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx"

JS_COUNT = """() => {
    const panels = document.querySelectorAll('.trailStatus__statusPanel');
    return [...panels].map(panel => {
        const h2 = panel.querySelector('.trailStatus__statusPanel__info_container h2');
        const areaName = h2 ? h2.childNodes[0].textContent.trim() : 'Unknown';
        const rows = panel.querySelectorAll('.trailStatus__trails__row');
        const trailNames = [...rows].map(r => {
            const n = r.querySelector('.trailStatus__trails__row--name');
            return n ? n.textContent.trim() : '';
        }).filter(n => n);
        return { area: areaName, count: trailNames.length, trails: trailNames };
    });
}"""

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        args=["--disable-blink-features=AutomationControlled", "--no-sandbox"],
    )
    context = browser.new_context(
        user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        viewport={"width": 1280, "height": 720},
    )
    page = context.new_page()
    page.goto(URL, wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(3000)
    try:
        btn = page.query_selector("#onetrust-accept-btn-handler")
        if btn and btn.is_visible():
            btn.click()
    except Exception:
        pass
    page.wait_for_timeout(15000)

    website = page.evaluate(JS_COUNT)
    browser.close()

# Load our conditions.json
with open("docs/conditions.json") as f:
    cond = json.load(f)

our_areas = cond.get("terrain", {}).get("GroomingAreas", [])

# Load data.js trail counts
with open("docs/data.js", encoding="utf-8") as f:
    datajs = f.read()

import re
lift_blocks = re.findall(r'lift:\s*"([^"]+)".*?trails:\s*\[(.*?)\]', datajs, re.DOTALL)
datejs_counts = {}
for lift_name, trails_block in lift_blocks:
    trail_names = re.findall(r'name:\s*"([^"]+)"', trails_block)
    datejs_counts[lift_name] = len(trail_names)

print("=" * 80)
print(f"{'AREA':<45} {'WEBSITE':>8} {'SCRAPED':>8} {'DATA.JS':>8}")
print("=" * 80)

total_web = 0
total_scraped = 0
total_datajs = 0

for w in website:
    area_name = w["area"]
    web_count = w["count"]
    total_web += web_count

    # Find matching scraped area
    scraped_count = 0
    for a in our_areas:
        if a["Name"] == area_name:
            scraped_count = len(a.get("Trails", []))
            break
    total_scraped += scraped_count

    # Find matching data.js lifts
    dj_count = 0
    segments = [s.strip() for s in area_name.replace("/", ",").split(",")]
    matched_lifts = []
    for lift_name, count in datejs_counts.items():
        for seg in segments:
            if seg.lower() in lift_name.lower() or lift_name.lower() in seg.lower():
                dj_count += count
                matched_lifts.append(f"{lift_name}({count})")
                break
    total_datajs += dj_count

    match = "✓" if web_count == scraped_count else "✗"
    print(f"{area_name:<45} {web_count:>8} {scraped_count:>8} {dj_count:>8}  {match}")

print("=" * 80)
print(f"{'TOTAL':<45} {total_web:>8} {total_scraped:>8} {total_datajs:>8}")
print()

# Show details for mismatches
for w in website:
    area_name = w["area"]
    scraped_trails = set()
    for a in our_areas:
        if a["Name"] == area_name:
            scraped_trails = {t["Name"] for t in a.get("Trails", [])}
            break
    web_trails = set(w["trails"])
    
    missing_from_scrape = web_trails - scraped_trails
    extra_in_scrape = scraped_trails - web_trails
    
    if missing_from_scrape or extra_in_scrape:
        print(f"\n{area_name}:")
        if missing_from_scrape:
            print(f"  Missing from scrape: {sorted(missing_from_scrape)}")
        if extra_in_scrape:
            print(f"  Extra in scrape: {sorted(extra_in_scrape)}")
