# Park City Mountain — Insider's Guide

> **[Live Site →](https://jbl306.github.io/parkcity/)** — Mobile-first web app for on-mountain reference

Notes and recommendations compiled from the 4-part [Insider's Guide to Park City](https://www.youtube.com/watch?v=ggtElWFhwi4) YouTube series.

## Web App

A lightweight, mobile-first web UI for quick on-mountain reference. No framework, no build step — pure HTML/CSS/JS.

- **Dark/Light mode** — auto-switches based on system preference
- **Search** — find any trail, lift, or route across all tabs
- **Difficulty filter** — filter by green/blue/black/double-black
- **6 tabs**: Trails, Routes, Strategy, Trees, Maps, Live Conditions

Deploy: Enable GitHub Pages → Settings → Pages → Source: branch `main`, folder `/docs`

## Live Status

Real-time lift and trail status is scraped from the official [Park City terrain page](https://www.parkcitymountain.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx) and overlaid across the app.

### How It Works

1. **Scraper** (`scraper/scrape.py`) — Uses Playwright (headless Chromium) to load the Park City terrain page and extract data from two sources:
   - **XHR interception**: Captures weather, forecast, and snow condition data from `cache.snow.com` APIs as the page loads
   - **DOM extraction** (primary for lifts/trails): Scrapes lift and trail status directly from the rendered page DOM, since the TerrainApi frequently returns empty data. All accordion panels are expanded before extraction to ensure complete coverage.

2. **Output** (`docs/conditions.json`) — Contains:
   - `terrain.Lifts[]` — Name, Status (Open/Closed), Hours for all 43 lifts
   - `terrain.GroomingAreas[]` — 10 area groups, each with `Trails[]` containing Name, Status, IsGroomed
   - `weather` — Lift/run counts, snow conditions, snowfall totals
   - `opensnow` — Current temp, daily + hourly forecast
   - `weather_header` — Header weather widget data

3. **Frontend** (`docs/app.js`) — On page load, fetches `conditions.json` and applies status overlays:
   - **Live banner** on Trails, Trees, Maps tabs showing lifts/runs open + snow conditions
   - **Lift status dots** (green/red) on accordion headers, tree cards, and map nodes
   - **Trail status badges** (Open/Closed pills) on individual trail items
   - Names are fuzzy-matched between static guide data and scraped data using normalization (strip spaces, special chars, lift suffixes)

4. **Automation** (`.github/workflows/scrape.yml`) — GitHub Actions runs the scraper every 10 minutes during resort operating hours (Nov–Apr, 7am–7pm MT). Updated `conditions.json` is auto-committed back to the repo.

### Running the Scraper Locally

```bash
cd scraper
pip install -r requirements.txt
playwright install chromium
python scrape.py            # headless
python scrape.py --headed   # visible browser (for debugging)
```

## Recommendations

- [Trail Quick Reference by Lift](recommendations/park_city_trail_guide.md) — One-line summaries of every trail organized by lift, including difficulty, grooming, moguls, and insider tips
- [Turn-by-Turn Directions](recommendations/turn_by_turn_directions.md) — Google Maps-style step-by-step route instructions for recommended flows
- [Recommended Lift Paths](recommendations/lift_paths.md) — Optimal routes up the mountain for both Mountain Village and Canyons sides, crowd avoidance strategies, and morning start tips
- [Tree Skiing Guide](recommendations/tree_skiing.md) — Best tree runs and ones to avoid, organized by lift with difficulty ratings
- [Lift Navigation Graphs](recommendations/lift_navigation_graphs.md) — Visual flowcharts showing how lifts connect, recommended paths, and cross-mountain routes

## Methodology

All recommendations are sourced from the 4-part [Insider's Guide to Park City](https://www.youtube.com/watch?v=ggtElWFhwi4) YouTube series. Transcripts were auto-downloaded using `yt-dlp`, cleaned of subtitle duplicates, and analyzed to extract trail descriptions, crowd patterns, lift strategies, and terrain warnings. No first-hand skiing experience or external sources were used — everything reflects the opinions and routing advice from the video creator.