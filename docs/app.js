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
          <div class="trail-item" data-difficulty="${dc}" data-searchable="${escHtml((t.name + ' ' + t.desc + ' ' + (t.warning || '')).toLowerCase())}">
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
        <div class="accordion" data-searchable="${escHtml((lift.lift + ' ' + lift.liftInfo + ' ' + lift.trails.map(t => t.name + ' ' + t.desc).join(' ')).toLowerCase())}">
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
      <div class="tree-card ${isAvoid ? 'avoid-card' : ''}" data-difficulty="${dc}" data-searchable="${escHtml(searchable)}">
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
          <div class="flow-node ${node.type}" data-id="${node.id}">
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
  // INIT
  // ============================================================

  renderTrails();
  renderRoutes();
  renderStrategy();
  renderTrees();
  renderMaps();

})();
