# Plan: Mobile-First Park City Ski Guide Web App

**TL;DR**: Build a single-page static site (`site/` folder) with vanilla HTML/CSS/JS — no framework, no build step. Content from the 5 recommendation markdown files gets restructured into JS data objects rendered as accordion cards. Bottom tab bar, system-aware dark/light mode, search, and difficulty filters. Deploy to GitHub Pages from `site/` directory. Lift navigation graphs rendered as styled CSS node trees (no Mermaid dependency).

**Steps**

1. **Create `site/` directory** with 4 files:
   - `index.html` — App shell: meta viewport, CDN link (Material Symbols icons), tab bar markup, search/filter bar, content containers
   - `style.css` — Full design system using CSS custom properties for light/dark theming via `prefers-color-scheme`. Mobile-first layout, bottom tab bar (fixed), accordion animations, card styles, difficulty badge colors, warning callout styling, CSS lift flow node styles
   - `app.js` — Tab switching, accordion expand/collapse, search (filters across all visible accordion items by text match), difficulty filter buttons, lift flow diagram rendering
   - `data.js` — All 5 documents' content restructured as JS objects (arrays of sections → arrays of items with properties like `name`, `difficulty`, `lift`, `description`, `warning`, etc.) including lift graph adjacency data

2. **Design system** (CSS custom properties):
   - Light mode: white cards on light gray background, dark text
   - Dark mode: dark gray cards on near-black background, light text
   - Switches automatically via `@media (prefers-color-scheme: dark)`
   - Difficulty badges: 🟩 green, 🟦 blue, ⬛ black, ⬛⬛ red/dark for double black
   - Warning callouts: amber/orange left border with ⚠️ icon
   - Tab bar: frosted glass effect (`backdrop-filter: blur`)
   - Accordion: smooth `max-height` transition with chevron rotation

3. **Bottom tab bar** (5 tabs):
   | Tab | Icon | Content Source |
   |-----|------|----------------|
   | Trails | `downhill_skiing` | `park_city_trail_guide.md` |
   | Routes | `directions` | `turn_by_turn_directions.md` |
   | Strategy | `route` | `lift_paths.md` |
   | Trees | `forest` | `tree_skiing.md` |
   | Maps | `map` | `lift_navigation_graphs.md` |

4. **Content restructuring** (markdown → JS data):
   - **Trails tab**: Accordion per lift (e.g., "Eagle", "Payday"). Each item inside: trail name, difficulty badge, one-line description, optional ⚠️ warning. Top-level toggle: "Mountain Village" / "Canyons"
   - **Routes tab**: Accordion per route (11 routes). Each step rendered as a numbered list with icon, instruction, detail. Warnings inline
   - **Strategy tab**: Two collapsible sections (MV / Canyons), each with sub-accordions for Morning Start, Recommended Flow, Routing Tips. Warning callout blocks
   - **Trees tab**: Two sections (Best / Avoid). Each run as a card with name, difficulty badge, lift tag, location, notes. Warning callouts
   - **Maps tab**: Three lift flow diagrams rendered as **CSS node trees** — vertical flow of styled lift nodes connected by lines/arrows, with color-coded badges (🟢 recommended, 🔴 avoid, 🟡 expert, 🔵 standard, 🟣 cross-mountain). Each node is tappable to expand inline tips. Renders natively without any library — pure HTML/CSS, fully responsive, no horizontal scroll needed. Three sections: Mountain Village Flow, Canyons Flow, Cross-Mountain Connections

5. **Search bar**: Fixed below header, above content. Filters visible accordion items by matching text content (case-insensitive). Shows/hides items dynamically. Clears with an X button.

6. **Difficulty filter**: Pill buttons below search: All | 🟩 | 🟦 | ⬛ | ⬛⬛. Filters trails/trees tabs by difficulty. Disabled/hidden on tabs where it doesn't apply (Routes, Strategy, Maps).

7. **GitHub Pages deployment setup**:
   - Enable GitHub Pages on repo `jbl306/parkcity` → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/site`
   - No build command needed — serves static files directly
   - Auto-deploys on push to `main`
   - Site URL: `https://jbl306.github.io/parkcity/`

8. **Update `README.md`** with a "Live Site" link placeholder and deployment instructions

## Verification

- Open `site/index.html` locally in browser — all tabs render, accordions expand/collapse, search filters, difficulty filters work
- Test dark mode by toggling system preference
- Test on mobile viewport (Chrome DevTools device toolbar)
- Lift flow diagrams render correctly in Maps tab on mobile viewport
- Deploy to GitHub Pages and verify live URL works

## Decisions

- No framework/build step: keeps it simple, zero dependencies, instant deploy
- Content in JS objects rather than fetching/parsing markdown at runtime: faster load, better mobile performance, enables structured search/filtering
- **No Mermaid.js**: lift flow diagrams rebuilt as CSS node trees — eliminates ~200KB dependency, renders instantly, fully responsive on mobile without horizontal scrolling. Each lift is a styled card node connected by CSS border/pseudo-element lines in a vertical flow layout
- Material Symbols for tab icons: lightweight, Google-hosted CDN
- GitHub Pages over Netlify/Vercel: zero additional service signup, already have the GitHub repo, serves static files directly from `/site` folder
