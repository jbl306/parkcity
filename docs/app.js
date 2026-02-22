// Park City Ski Guide — App Logic
// Tab switching, accordion, search, difficulty filter, content rendering

(function() {
  'use strict';

  // ============================================================
  // HELPERS
  // ============================================================

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function difficultyLabel(d) {
    const map = { green: '🟩', blue: '🟦', black: '⬛', 'double-black': '⬛⬛', varies: '~', info: 'ℹ' };
    return map[d] || d;
  }

  function difficultyClass(d) {
    return d || 'varies';
  }

  function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  // ============================================================
  // RENDER: Trails Tab
  // ============================================================

  function renderTrails() {
    renderTrailSide('trails-mv', DATA.trails.mountainVillage);
    renderTrailSide('trails-canyons', DATA.trails.canyons);
  }

  function renderTrailSide(containerId, lifts) {
    const container = document.getElementById(containerId);
    let html = '';

    lifts.forEach((lift, i) => {
      const trailsHtml = lift.trails.map(t => {
        const dc = difficultyClass(t.difficulty);
        return `
          <div class="trail-item" data-trail="${escHtml(t.name)}" data-difficulty="${dc}" data-searchable="${escHtml((t.name + ' ' + t.desc + ' ' + (t.warning || '')).toLowerCase())}">
            <span class="trail-badge ${dc}">${difficultyLabel(t.difficulty)}</span>
            <div class="trail-info">
              <div class="trail-name">${escHtml(t.name)}</div>
              <div class="trail-desc">${escHtml(t.desc)}</div>
              ${t.warning ? `<div class="warning-callout">${escHtml(t.warning)}</div>` : ''}
            </div>
          </div>`;
      }).join('');

      const liftWarning = lift.warning ? `<div class="lift-warning">${escHtml(lift.warning)}</div>` : '';

      html += `
        <div class="accordion" data-lift="${escHtml(lift.lift)}" data-searchable="${escHtml((lift.lift + ' ' + lift.liftInfo + ' ' + lift.trails.map(t => t.name + ' ' + t.desc).join(' ')).toLowerCase())}">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <div class="accordion-title">
              🚡 ${escHtml(lift.lift)}
              <span class="accordion-subtitle">${escHtml(lift.liftInfo)}</span>
            </div>
            <span class="accordion-badge" style="background:var(--accent-light);color:var(--accent)">${lift.trails.length}</span>
            <span class="material-symbols-outlined accordion-chevron">expand_more</span>
          </div>
          <div class="accordion-body">
            <div class="accordion-inner">
              ${liftWarning}
              ${trailsHtml}
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: Routes Tab
  // ============================================================

  function renderRoutes() {
    renderRouteSide('routes-mv', DATA.routes.mountainVillage);
    renderRouteSide('routes-canyons', DATA.routes.canyons);
  }

  function renderRouteSide(containerId, routes) {
    const container = document.getElementById(containerId);
    let html = '';

    routes.forEach(route => {
      const stepsHtml = route.steps.map((s, i) => {
        let iconClass = '';
        if (s.warning) iconClass = 'warning-step';
        else if (s.success) iconClass = 'success-step';
        else if (s.icon === '❌') iconClass = 'danger-step';

        return `
          <li class="route-step">
            <span class="step-icon ${iconClass}">${s.icon}</span>
            <div class="step-body">
              <div class="step-instruction">${escHtml(s.instruction)}</div>
              ${s.detail ? `<div class="step-detail">${escHtml(s.detail)}</div>` : ''}
            </div>
          </li>`;
      }).join('');

      const searchText = route.name + ' ' + route.subtitle + ' ' + route.steps.map(s => s.instruction + ' ' + s.detail).join(' ');

      html += `
        <div class="accordion" data-searchable="${escHtml(searchText.toLowerCase())}">
          <div class="accordion-header" onclick="toggleAccordion(this)">
            <div class="accordion-title">
              ${escHtml(route.name)}
              <span class="accordion-subtitle">${escHtml(route.subtitle)}</span>
            </div>
            <span class="accordion-badge" style="background:var(--accent-light);color:var(--accent)">${route.steps.length}</span>
            <span class="material-symbols-outlined accordion-chevron">expand_more</span>
          </div>
          <div class="accordion-body">
            <div class="accordion-inner">
              <ol class="route-steps">${stepsHtml}</ol>
            </div>
          </div>
        </div>`;
    });

    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: Strategy Tab
  // ============================================================

  function renderStrategy() {
    renderStrategySide('strategy-mv', DATA.strategy.mountainVillage);
    renderStrategySide('strategy-canyons', DATA.strategy.canyons);
  }

  function renderStrategySide(containerId, data) {
    const container = document.getElementById(containerId);
    let html = '';

    // Morning Start
    html += `<div class="strategy-section">
      <div class="strategy-label">☀️ Morning Start Strategy</div>`;
    data.morningStart.forEach(item => {
      html += `<div class="strategy-item tip">${escHtml(item.text)}</div>`;
    });
    html += '</div>';

    // Recommended Flow
    html += `<div class="strategy-section">
      <div class="strategy-label">🗺️ Recommended Flow</div>`;
    data.recommendedFlow.forEach((item, i) => {
      html += `<div class="strategy-item step"><strong>Step ${i + 1}:</strong> ${escHtml(item.text)}</div>`;
    });
    html += '</div>';

    // Warnings
    if (data.warnings && data.warnings.length) {
      html += `<div class="strategy-section">
        <div class="strategy-label">⚠️ Expert Terrain Warnings</div>`;
      data.warnings.forEach(w => {
        html += `<div class="warning-block">${escHtml(w.text)}</div>`;
      });
      html += '</div>';
    }

    // Routing Tips
    html += `<div class="strategy-section">
      <div class="strategy-label">💡 Key Routing Tips</div>`;
    data.routingTips.forEach(item => {
      let tipHtml = `<div class="strategy-item tip">${escHtml(item.text)}`;
      if (item.warning) tipHtml += `<div class="warning-callout">${escHtml(item.warning)}</div>`;
      tipHtml += '</div>';
      html += tipHtml;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  // ============================================================
  // RENDER: Trees Tab
  // ============================================================

  function renderTrees() {
    const container = document.getElementById('trees-content');
    let html = '';

    // Best — MV
    html += '<div class="tree-section-title">Best Tree Runs — Mountain Village</div>';
    DATA.trees.best.mountainVillage.forEach(run => {
      html += renderTreeCard(run, false);
    });

    // Best — Canyons
    html += '<div class="tree-section-title">Best Tree Runs — Canyons</div>';
    DATA.trees.best.canyons.forEach(run => {
      html += renderTreeCard(run, false);
    });

    // Avoid
    html += '<div class="section-divider"></div>';
    html += '<div class="tree-section-title">🚫 Trees to Avoid</div>';
    DATA.trees.avoid.forEach(run => {
      html += renderTreeCard(run, true);
    });

    container.innerHTML = html;
  }

  function renderTreeCard(run, isAvoid) {
    const dc = difficultyClass(run.difficulty);
    const notes = isAvoid ? run.why : run.notes;
    const searchable = (run.name + ' ' + run.lift + ' ' + run.location + ' ' + (notes || '')).toLowerCase();

    return `
      <div class="tree-card ${isAvoid ? 'avoid-card' : ''}" data-lift="${escHtml(run.lift)}" data-difficulty="${dc}" data-searchable="${escHtml(searchable)}">
        <div class="tree-card-header">
          ${!isAvoid ? `<span class="trail-badge ${dc}">${difficultyLabel(run.difficulty)}</span>` : ''}
          <span class="tree-card-name">${escHtml(run.name)}</span>
          <span class="tree-card-lift">${escHtml(run.lift)}</span>
        </div>
        <div class="tree-card-notes">${escHtml(notes || '')}</div>
        ${run.warning ? `<div class="warning-callout">${escHtml(typeof run.warning === 'string' ? run.warning : 'Expert caution required')}</div>` : ''}
      </div>`;
  }

  // ============================================================
  // RENDER: Maps Tab (CSS node trees)
  // ============================================================

  function renderMaps() {
    const container = document.getElementById('maps-content');
    let html = '';

    // Legend
    html += `
      <div class="map-legend">
        <span class="legend-item"><span class="legend-dot" style="background:var(--node-recommended)"></span> Recommended</span>
        <span class="legend-item"><span class="legend-dot" style="background:var(--node-avoid)"></span> Avoid</span>
        <span class="legend-item"><span class="legend-dot" style="background:var(--node-expert)"></span> Expert</span>
        <span class="legend-item"><span class="legend-dot" style="background:var(--node-standard)"></span> Standard</span>
        <span class="legend-item"><span class="legend-dot" style="background:var(--node-cross)"></span> Cross-Mountain</span>
      </div>`;

    // Mountain Village
    html += renderMapSection(DATA.maps.mountainVillage);
    html += '<div class="section-divider"></div>';

    // Canyons
    html += renderMapSection(DATA.maps.canyons);
    html += '<div class="section-divider"></div>';

    // Cross-mountain
    html += `<div class="map-section">
      <div class="map-title">${escHtml(DATA.maps.crossMountain.title)}</div>`;
    DATA.maps.crossMountain.routes.forEach(r => {
      html += `
        <div class="cross-route ${r.type}">
          <div class="cross-route-name">${escHtml(r.name)}</div>
          <div class="cross-route-steps">${escHtml(r.steps)}</div>
        </div>`;
    });
    html += '</div>';

    container.innerHTML = html;

    // Add click handlers for flow nodes
    $$('.flow-node').forEach(node => {
      node.addEventListener('click', () => node.classList.toggle('expanded'));
    });
  }

  function renderMapSection(mapData) {
    const zones = {};
    const zoneLabels = {
      base: '🏠 Base Area',
      lower: 'Lower Mountain',
      mid: 'Mid Mountain',
      upper: 'Upper Mountain',
      expert: '⚠️ Expert Zone',
      central: 'Central Hub',
      south: 'Southern Terrain',
      'far-south': 'Far South',
      cross: '↔️ Cross-Mountain'
    };

    mapData.nodes.forEach(node => {
      if (!zones[node.zone]) zones[node.zone] = [];
      zones[node.zone].push(node);
    });

    // Build connection lookup for tips
    const connLookup = {};
    mapData.connections.forEach(c => {
      if (!connLookup[c.from]) connLookup[c.from] = [];
      connLookup[c.from].push(c);
    });

    let html = `<div class="map-section"><div class="map-title">${escHtml(mapData.title)}</div>`;

    const zoneOrder = Object.keys(zones);
    zoneOrder.forEach((zone, zi) => {
      html += `<div class="flow-zone">
        <div class="flow-zone-label">${zoneLabels[zone] || zone}</div>
        <div class="flow-nodes">`;

      zones[zone].forEach(node => {
        const conns = connLookup[node.id] || [];
        const tipText = conns.map(c => `→ ${c.label}`).join(' · ');

        html += `
          <div class="flow-node ${node.type}" data-id="${node.id}" data-lift="${escHtml(node.name)}">
            <div class="flow-node-name"><span class="node-indicator"></span>${escHtml(node.name)}</div>
            <div class="flow-node-info">${escHtml(node.info)}</div>
            ${tipText ? `<div class="flow-node-tip">${escHtml(tipText)}</div>` : ''}
          </div>`;
      });

      html += '</div></div>';

      // Add connector arrow between zones
      if (zi < zoneOrder.length - 1) {
        html += '<div class="flow-connector"><span class="material-symbols-outlined">arrow_downward</span></div>';
      }
    });

    html += '</div>';
    return html;
  }

  // ============================================================
  // TAB SWITCHING
  // ============================================================

  const tabBtns = $$('.tab-btn');
  const tabContents = $$('.tab-content');
  const filterRow = document.getElementById('filterRow');
  const mainContent = document.getElementById('mainContent');

  // Tabs that show difficulty filters
  const filterableTabs = new Set(['trails', 'trees']);

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach(tc => tc.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');

      // Show/hide filter row
      if (filterableTabs.has(tab)) {
        filterRow.classList.remove('hidden');
        mainContent.classList.add('has-filters');
      } else {
        filterRow.classList.add('hidden');
        mainContent.classList.remove('has-filters');
      }

      // Lazy-load conditions data
      if (tab === 'conditions') loadConditions();

      // Re-apply search when switching tabs
      applyFilters();
    });
  });

  // ============================================================
  // SIDE TOGGLE (MV / Canyons)
  // ============================================================

  document.addEventListener('click', (e) => {
    const sideBtn = e.target.closest('.side-btn');
    if (!sideBtn) return;

    const toggle = sideBtn.closest('.side-toggle');
    const tabContent = toggle.closest('.tab-content');

    $$('.side-btn', toggle).forEach(b => b.classList.remove('active'));
    sideBtn.classList.add('active');

    const side = sideBtn.dataset.side;
    $$('.side-content', tabContent).forEach(sc => {
      sc.classList.toggle('active', sc.id.endsWith('-' + side));
    });
  });

  // ============================================================
  // ACCORDION
  // ============================================================

  window.toggleAccordion = function(header) {
    const accordion = header.closest('.accordion');
    accordion.classList.toggle('open');
  };

  // ============================================================
  // SEARCH
  // ============================================================

  const searchInput = document.getElementById('searchInput');
  const searchClear = document.getElementById('searchClear');

  searchInput.addEventListener('input', () => {
    applyFilters();
    searchClear.style.display = searchInput.value ? 'flex' : 'none';
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    applyFilters();
  });

  // ============================================================
  // DIFFICULTY FILTER
  // ============================================================

  let activeFilter = 'all';

  $$('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      $$('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });

  // ============================================================
  // COMBINED FILTER LOGIC
  // ============================================================

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();
    const activeTab = $('.tab-btn.active').dataset.tab;

    if (activeTab === 'trails') {
      filterTrails(query);
    } else if (activeTab === 'trees') {
      filterTrees(query);
    } else if (activeTab === 'routes') {
      filterRoutes(query);
    }
  }

  function filterTrails(query) {
    const activeSide = getActiveSide('tab-trails');
    const sideId = activeSide === 'mv' ? 'trails-mv' : 'trails-canyons';
    const container = document.getElementById(sideId);
    const accordions = $$('.accordion', container);
    let visibleCount = 0;

    accordions.forEach(acc => {
      const items = $$('.trail-item', acc);
      let anyVisible = false;

      items.forEach(item => {
        const matchesDifficulty = activeFilter === 'all' || item.dataset.difficulty === activeFilter;
        const matchesSearch = !query || item.dataset.searchable.includes(query);
        const show = matchesDifficulty && matchesSearch;
        item.classList.toggle('hidden', !show);
        if (show) anyVisible = true;
      });

      // Also check if accordion-level search matches
      if (query && !anyVisible && acc.dataset.searchable.includes(query)) {
        // Show all items in this accordion if the lift name matches
        items.forEach(item => {
          const matchesDifficulty = activeFilter === 'all' || item.dataset.difficulty === activeFilter;
          if (matchesDifficulty) {
            item.classList.remove('hidden');
            anyVisible = true;
          }
        });
      }

      acc.classList.toggle('hidden', !anyVisible);
      if (anyVisible) visibleCount++;
    });

    const emptyState = document.getElementById('trails-empty');
    emptyState.classList.toggle('visible', visibleCount === 0 && (query || activeFilter !== 'all'));
  }

  function filterTrees(query) {
    const cards = $$('.tree-card', document.getElementById('trees-content'));
    let visibleCount = 0;

    cards.forEach(card => {
      const matchesDifficulty = activeFilter === 'all' || card.dataset.difficulty === activeFilter;
      const matchesSearch = !query || card.dataset.searchable.includes(query);
      const show = matchesDifficulty && matchesSearch;
      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    const emptyState = document.getElementById('trees-empty');
    emptyState.classList.toggle('visible', visibleCount === 0 && (query || activeFilter !== 'all'));
  }

  function filterRoutes(query) {
    if (!query) {
      $$('.accordion', document.getElementById('tab-routes')).forEach(a => a.classList.remove('hidden'));
      document.getElementById('routes-empty').classList.remove('visible');
      return;
    }

    const activeSide = getActiveSide('tab-routes');
    const sideId = activeSide === 'mv' ? 'routes-mv' : 'routes-canyons';
    const container = document.getElementById(sideId);
    const accordions = $$('.accordion', container);
    let visibleCount = 0;

    accordions.forEach(acc => {
      const matches = acc.dataset.searchable.includes(query);
      acc.classList.toggle('hidden', !matches);
      if (matches) visibleCount++;
    });

    document.getElementById('routes-empty').classList.toggle('visible', visibleCount === 0);
  }

  function getActiveSide(tabId) {
    const tabEl = document.getElementById(tabId);
    const activeBtn = $('.side-btn.active', tabEl);
    return activeBtn ? activeBtn.dataset.side : 'mv';
  }

  // ============================================================
  // LIVE STATUS — Overlay lift/trail status on all tabs
  // ============================================================

  let liveConditions = null;

  function fetchLiveConditions() {
    fetch('conditions.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        liveConditions = data;
        applyLiveStatus();
      })
      .catch(() => {});
  }

  function normalizeLiftName(name) {
    return name.toLowerCase()
      .replace(/\(.*?\)/g, '')
      .replace(/[\u2018\u2019'']/g, '')
      .replace(/\bmtn\.?\b/g, 'mountain')
      .replace(/\s*(express|gondola|lift|6-pack|triple|double|quad|bubble)\s*/gi, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  function normalizeTrailName(name) {
    return name.toLowerCase()
      .replace(/[\u2018\u2019'']/g, '')
      .replace(/[^a-z0-9]/g, '')
      .trim();
  }

  function buildTrailStatusMap(groomingAreas) {
    const map = {};
    groomingAreas.forEach(area => {
      const trails = area.Trails || area.trails || [];
      trails.forEach(trail => {
        const name = trail.Name || trail.name;
        const status = trail.Status || trail.status || '';
        if (name) {
          map[normalizeTrailName(name)] = {
            status: status,
            isOpen: /open/i.test(status),
            isGroomed: !!(trail.IsGroomed || trail.isGroomed)
          };
        }
      });
    });
    return map;
  }

  function getTrailStatus(trailName, statusMap) {
    const norm = normalizeTrailName(trailName);
    if (statusMap[norm]) return statusMap[norm];
    // Handle multi-trail entries like "Fools Gold / Glory Hole"
    const parts = trailName.split(/\s*[\/,]\s*/);
    for (const part of parts) {
      const pn = normalizeTrailName(part.trim());
      if (pn && statusMap[pn]) return statusMap[pn];
    }
    // Partial match
    for (const [key, val] of Object.entries(statusMap)) {
      if (key.includes(norm) || norm.includes(key)) return val;
    }
    return null;
  }

  function buildLiftStatusMap(lifts) {
    const map = {};
    lifts.forEach(lift => {
      map[normalizeLiftName(lift.Name)] = {
        status: lift.Status,
        isOpen: /open/i.test(lift.Status)
      };
    });
    return map;
  }

  function getLiftStatus(liftName, statusMap) {
    const norm = normalizeLiftName(liftName);
    if (statusMap[norm]) return statusMap[norm];
    // Partial match — either direction
    for (const [key, val] of Object.entries(statusMap)) {
      if (key.includes(norm) || norm.includes(key)) return val;
    }
    return null;
  }

  function applyLiveStatus() {
    if (!liveConditions) return;
    const data = liveConditions;
    const w = data.weather;

    // --- Conditions banner on Trails, Trees, Maps tabs ---
    if (w) {
      const bannerHtml = buildConditionsBanner(w, data.scraped_at);
      ['tab-trails', 'tab-trees', 'tab-maps'].forEach(tabId => {
        const tab = document.getElementById(tabId);
        let banner = tab.querySelector('.live-banner');
        if (!banner) {
          banner = document.createElement('div');
          banner.className = 'live-banner';
          tab.insertBefore(banner, tab.firstChild);
        }
        banner.innerHTML = bannerHtml;
      });
    }

    // --- Lift status dots from terrain API ---
    const terrain = data.terrain;
    if (terrain?.Lifts?.length) {
      const statusMap = buildLiftStatusMap(terrain.Lifts);

      document.querySelectorAll('[data-lift]').forEach(el => {
        const liftName = el.dataset.lift;
        const status = getLiftStatus(liftName, statusMap);
        if (!status) return;

        // Remove existing dot if re-applying
        el.querySelectorAll('.live-dot').forEach(d => d.remove());

        // Find the right insertion target
        const target = el.querySelector('.accordion-title') ||
                       el.querySelector('.tree-card-header') ||
                       el.querySelector('.flow-node-name') || el;

        const dot = document.createElement('span');
        dot.className = `live-dot ${status.isOpen ? 'open' : 'closed'}`;
        dot.title = status.status;
        target.prepend(dot);
      });
    }

    // --- Trail status dots from terrain API GroomingAreas ---
    if (terrain?.GroomingAreas?.length) {
      const trailMap = buildTrailStatusMap(terrain.GroomingAreas);

      document.querySelectorAll('[data-trail]').forEach(el => {
        const trailName = el.dataset.trail;
        const status = getTrailStatus(trailName, trailMap);
        if (!status) return;

        // Remove existing dot if re-applying
        el.querySelectorAll('.trail-status').forEach(d => d.remove());

        const badge = document.createElement('span');
        badge.className = `trail-status ${status.isOpen ? 'open' : 'closed'}`;
        badge.textContent = status.isOpen ? 'Open' : 'Closed';
        badge.title = status.status + (status.isGroomed ? ' (Groomed)' : '');

        const info = el.querySelector('.trail-info');
        if (info) {
          const nameEl = info.querySelector('.trail-name');
          if (nameEl) nameEl.appendChild(badge);
        }
      });
    }
  }

  function buildConditionsBanner(w, scrapedAt) {
    let parts = [];
    if (w.Lifts?.Open) parts.push(`<span class="banner-stat"><strong>${w.Lifts.Open}</strong>/${w.Lifts.Total} lifts</span>`);
    if (w.Runs?.Open) parts.push(`<span class="banner-stat"><strong>${w.Runs.Open}</strong>/${w.Runs.Total} runs</span>`);
    if (w.SnowConditions) parts.push(`<span class="banner-stat">${escHtml(w.SnowConditions)}</span>`);

    let timeStr = '';
    if (scrapedAt) timeStr = formatTimeAgo(new Date(scrapedAt));

    return `
      <span class="material-symbols-outlined banner-icon">sensors</span>
      ${parts.join('<span class="banner-sep">·</span>')}
      ${timeStr ? `<span class="banner-time">${timeStr}</span>` : ''}`;
  }

  // ============================================================
  // RENDER: Conditions Tab (Live data from scraper)
  // ============================================================

  let conditionsLoaded = false;

  function loadConditions() {
    if (conditionsLoaded) return;
    conditionsLoaded = true;

    // Use cached data if already fetched by live status system
    if (liveConditions) {
      renderConditions(liveConditions);
      return;
    }

    fetch('conditions.json')
      .then(r => {
        if (!r.ok) throw new Error('No conditions data yet');
        return r.json();
      })
      .then(data => {
        liveConditions = data;
        renderConditions(data);
      })
      .catch(() => {
        document.getElementById('conditions-content').innerHTML = `
          <div class="conditions-empty">
            <span class="material-symbols-outlined">cloud_off</span>
            <p>Live conditions not available yet.</p>
            <p class="conditions-sub">Data updates every 10 minutes during resort hours.</p>
          </div>`;
      });
  }

  function renderConditions(data) {
    const container = document.getElementById('conditions-content');
    let html = '';

    const scraped = data.scraped_at ? new Date(data.scraped_at) : null;
    const timeAgo = scraped ? formatTimeAgo(scraped) : 'unknown';

    // --- Updated timestamp ---
    html += `<div class="conditions-updated">
      <span class="material-symbols-outlined" style="font-size:0.85rem">schedule</span>
      Updated ${escHtml(timeAgo)}
    </div>`;

    // --- Weather summary from weather API ---
    const w = data.weather;
    if (w) {
      html += '<div class="conditions-section">';
      html += '<div class="conditions-label">Snow Report</div>';
      html += '<div class="conditions-grid">';

      if (w.SnowConditions) {
        html += condCard('ac_unit', 'Conditions', w.SnowConditions);
      }
      if (w.BaseSnowReadings?.MidMountain?.Inches && w.BaseSnowReadings.MidMountain.Inches !== '0') {
        html += condCard('height', 'Base Depth', w.BaseSnowReadings.MidMountain.Inches + '"');
      }
      if (w.NewSnowReadings?.FortyEightHours?.Inches && w.NewSnowReadings.FortyEightHours.Inches !== '0') {
        html += condCard('weather_snowy', '48hr Snow', w.NewSnowReadings.FortyEightHours.Inches + '"');
      }
      if (w.NewSnowReadings?.SevenDays?.Inches && w.NewSnowReadings.SevenDays.Inches !== '0') {
        html += condCard('calendar_month', '7-Day Snow', w.NewSnowReadings.SevenDays.Inches + '"');
      }
      if (w.SeasonSnowfall?.Inches) {
        html += condCard('landscape', 'Season Total', w.SeasonSnowfall.Inches + '"');
      }

      html += '</div></div>';
    }

    // --- Lift & Trail status from weather API ---
    if (w) {
      html += '<div class="conditions-section">';
      html += '<div class="conditions-label">Lift & Terrain Status</div>';
      html += '<div class="conditions-grid">';

      if (w.Lifts?.Open) {
        html += condCard('airline_seat_recline_extra', 'Lifts Open',
          `${w.Lifts.Open} / ${w.Lifts.Total}`);
      }
      if (w.Runs?.Open) {
        html += condCard('downhill_skiing', 'Runs Open',
          `${w.Runs.Open} / ${w.Runs.Total}`);
      }
      if (w.TerrainPercentage?.Open) {
        html += condCard('percent', 'Terrain Open', w.TerrainPercentage.Open + '%');
      }

      html += '</div></div>';
    }

    // --- OpenSnow forecast ---
    const os = data.opensnow;
    if (os) {
      // Current temp
      if (os.CurrentTempStandard != null) {
        html += '<div class="conditions-section">';
        html += '<div class="conditions-label">Current Weather</div>';
        html += '<div class="conditions-grid">';
        html += condCard('thermostat', 'Temperature', Math.round(os.CurrentTempStandard) + '°F');

        // Hourly wind from first hourly entry
        const h0 = os.HourlyForecastData?.[0];
        if (h0) {
          html += condCard('air', 'Wind', `${Math.round(h0.WindSpeed)} mph ${h0.Wind}`);
          if (h0.WindGustSpeed) {
            html += condCard('storm', 'Gusts', Math.round(h0.WindGustSpeed) + ' mph');
          }
        }
        html += '</div></div>';
      }

      // Daily forecast
      if (os.ForecastData?.length) {
        html += '<div class="conditions-section">';
        html += '<div class="conditions-label">Forecast</div>';
        html += '<div class="forecast-list">';
        os.ForecastData.forEach(day => {
          const d = new Date(day.Date);
          const dayName = d.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'America/Denver' });
          const icon = weatherIcon(day.WeatherIconStatus);
          html += `
            <div class="forecast-day">
              <div class="forecast-day-name">${dayName}</div>
              <span class="material-symbols-outlined forecast-icon">${icon}</span>
              <div class="forecast-desc">${escHtml(day.WeatherShortDescription || '')}</div>
              <div class="forecast-temps">
                <span class="temp-hi">${Math.round(day.HighTempStandard)}°</span>
                <span class="temp-lo">${Math.round(day.LowTempStandard)}°</span>
              </div>
              ${day.SnowFallDayStandard ? `<div class="forecast-snow">❄ ${day.SnowFallDayStandard}"</div>` : ''}
            </div>`;
        });
        html += '</div></div>';
      }
    }

    // --- Hourly forecast ---
    if (os?.HourlyForecastData?.length) {
      html += '<div class="conditions-section">';
      html += '<div class="conditions-label">Hourly</div>';
      html += '<div class="hourly-scroll"><div class="hourly-list">';
      os.HourlyForecastData.forEach(h => {
        const d = new Date(h.Date);
        const hr = d.toLocaleTimeString('en-US', { hour: 'numeric', timeZone: 'America/Denver' });
        const icon = weatherIcon(h.WeatherIconStatus);
        html += `
          <div class="hourly-item">
            <div class="hourly-time">${hr}</div>
            <span class="material-symbols-outlined hourly-icon">${icon}</span>
            <div class="hourly-temp">${Math.round(h.TempStandard)}°</div>
            <div class="hourly-wind">${Math.round(h.WindSpeed)}<small>mph</small></div>
          </div>`;
      });
      html += '</div></div></div>';
    }

    // --- Lift-by-lift status from terrain API ---
    const terrain = data.terrain;
    if (terrain?.Lifts?.length) {
      html += '<div class="conditions-section">';
      html += '<div class="conditions-label">Individual Lift Status</div>';
      terrain.Lifts.forEach(lift => {
        const isOpen = /open/i.test(lift.Status);
        html += `
          <div class="lift-status-row">
            <span class="lift-dot ${isOpen ? 'open' : 'closed'}"></span>
            <span class="lift-status-name">${escHtml(lift.Name)}</span>
            <span class="lift-status-badge ${isOpen ? 'open' : 'closed'}">${escHtml(lift.Status)}</span>
          </div>`;
      });
      html += '</div>';
    }

    // --- Links to official pages ---
    html += '<div class="conditions-section">';
    html += '<div class="conditions-label">Official Reports</div>';
    html += `<a href="https://www.parkcitymountain.com/the-mountain/mountain-conditions/terrain-and-lift-status.aspx" target="_blank" class="conditions-link">
      <span class="material-symbols-outlined">open_in_new</span> Terrain & Lift Status
    </a>`;
    html += `<a href="https://www.parkcitymountain.com/the-mountain/mountain-conditions/weather-report.aspx" target="_blank" class="conditions-link">
      <span class="material-symbols-outlined">open_in_new</span> Weather Report
    </a>`;
    html += '</div>';

    container.innerHTML = html;
  }

  function condCard(icon, label, value) {
    return `
      <div class="cond-card">
        <span class="material-symbols-outlined cond-icon">${icon}</span>
        <div class="cond-value">${value}</div>
        <div class="cond-label">${label}</div>
      </div>`;
  }

  function weatherIcon(code) {
    // OpenSnow weather icon status codes -> Material Symbols
    const map = {
      '1': 'sunny',           // Clear
      '2': 'sunny',
      '3': 'partly_cloudy_day',
      '4': 'partly_cloudy_day',
      '5': 'cloud',
      '6': 'cloud',
      '7': 'foggy',
      '8': 'rainy',
      '9': 'rainy',
      '10': 'thunderstorm',
      '11': 'sunny',          // Mostly Clear/Sunny
      '12': 'partly_cloudy_day', // Partly Cloudy
      '13': 'cloud',          // Mostly Cloudy
      '14': 'sunny',          // Sunny
      '15': 'weather_snowy',  // Snow
      '16': 'weather_snowy',
      '17': 'weather_snowy',
      '18': 'ac_unit',        // Heavy Snow
      '19': 'rainy',
      '20': 'nights_stay',    // Clear Night
      '21': 'nights_stay',
      '22': 'partly_cloudy_night',
      '23': 'cloud',
      '24': 'weather_snowy',
      '25': 'rainy',
    };
    return map[code] || 'cloud';
  }

  function formatTimeAgo(date) {
    const diff = (Date.now() - date.getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
    if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
    return Math.floor(diff / 86400) + 'd ago';
  }

  // ============================================================
  // INIT
  // ============================================================

  renderTrails();
  renderRoutes();
  renderStrategy();
  renderTrees();
  renderMaps();
  fetchLiveConditions();

})();
