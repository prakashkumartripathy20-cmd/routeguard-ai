const fs = require('fs');
const path = require('path');

const masterNerData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'master_ner_hierarchy.json'), 'utf8'));

// Build pure HTML file for hierarchy with index-based Ward Spot selection
const hierarchyHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NER Master Regional Hierarchy Explorer</title>
  <style>
    :root { --bg-dark: #020617; --bg-card: #0f172a; --primary: #06b6d4; --accent: #3b82f6; --text: #f8fafc; --text-muted: #94a3b8; --border: rgba(51, 65, 85, 0.6); }
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: system-ui, -apple-system, sans-serif; }
    body { background: var(--bg-dark); color: var(--text); padding: 24px; min-height: 100vh; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 20px; flex-wrap: wrap; gap: 16px; }
    .title-box h1 { font-size: 1.8rem; font-weight: 900; color: white; display: flex; align-items: center; gap: 10px; }
    .title-box p { font-size: 0.85rem; color: var(--text-muted); margin-top: 4px; }
    .btn-home { background: linear-gradient(135deg, #2563eb, #06b6d4); color: white; padding: 10px 18px; border-radius: 12px; font-weight: 800; font-size: 0.85rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 14px rgba(37,99,235,0.4); }
    .search-box { position: relative; width: 320px; }
    .search-input { width: 100%; padding: 10px 16px; background: #0f172a; border: 1px solid #334155; border-radius: 10px; color: white; font-size: 0.85rem; outline: none; }
    .search-results { position: absolute; top: 46px; left: 0; right: 0; background: #0f172a; border: 1px solid #334155; border-radius: 10px; max-height: 280px; overflow-y: auto; z-index: 100; box-shadow: 0 10px 25px rgba(0,0,0,0.8); }
    .search-item { padding: 10px 14px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.8rem; cursor: pointer; }
    .search-item:hover { background: #1e293b; }
    .breadcrumb-bar { background: rgba(15,23,42,0.6); border: 1px solid var(--border); padding: 12px 18px; border-radius: 14px; margin-bottom: 24px; display: flex; gap: 8px; align-items: center; overflow-x: auto; font-size: 0.85rem; }
    .crumb-btn { background: transparent; border: none; color: var(--primary); font-weight: 700; cursor: pointer; text-decoration: underline; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
    .card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 22px; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; justify-content: space-between; }
    .card:hover { border-color: var(--primary); transform: translateY(-2px); box-shadow: 0 10px 25px rgba(6,182,212,0.15); }
    .badge { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: var(--primary); margin-bottom: 8px; display: inline-block; }
    .card-title { font-size: 1.2rem; font-weight: 800; color: white; margin-bottom: 6px; }
    .card-meta { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 12px; }
    .card-footer { border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; margin-top: 16px; font-size: 0.8rem; font-weight: 700; color: var(--primary); display: flex; justify-content: space-between; align-items: center; }
  </style>
</head>
<body>

  <div class="header">
    <div class="title-box">
      <h1>🏰 NER Regional Workspace Hierarchy Explorer</h1>
      <p>Official 8 North Eastern States • Divisions • Districts • Circles • Villages • Micro Wards</p>
    </div>
    <div style="display:flex; gap:12px; align-items:center;">
      <a href="/" class="btn-home">🏠 Return to Main GIS Map</a>
      <div class="search-box">
        <input type="text" id="searchInput" class="search-input" placeholder="Search State, District, Circle or Village..." oninput="handleSearch()">
        <div id="searchResults" class="search-results" style="display:none;"></div>
      </div>
    </div>
  </div>

  <div id="breadcrumbBar" class="breadcrumb-bar"></div>

  <div id="viewContainer"></div>

  <script>
    const MASTER_DATA = ${JSON.stringify(masterNerData)};

    let selSt = null;
    let selDiv = null;
    let selDist = null;
    let selCir = null;
    let selVil = null;

    function renderBreadcrumb() {
      const bc = document.getElementById('breadcrumbBar');
      let html = '<a href="/" style="color:#60a5fa; font-weight:800; text-decoration:none;">🏠 Main GIS Map</a> <span style="color:#475569;">/</span> ';
      html += '<button class="crumb-btn" onclick="resetToStates()">NER Region (' + MASTER_DATA.totalStates + ' States)</button>';
      
      if (selSt) {
        html += ' <span style="color:#475569;">/</span> <button class="crumb-btn" onclick="selDiv=null; selDist=null; selCir=null; selVil=null; renderUI();">' + selSt.name + '</button>';
      }
      if (selDiv) {
        html += ' <span style="color:#475569;">/</span> <button class="crumb-btn" onclick="selDist=null; selCir=null; selVil=null; renderUI();">' + selDiv.name + '</button>';
      }
      if (selDist) {
        html += ' <span style="color:#475569;">/</span> <button class="crumb-btn" onclick="selCir=null; selVil=null; renderUI();">' + selDist.name + ' District</button>';
      }
      if (selCir) {
        html += ' <span style="color:#475569;">/</span> <button class="crumb-btn" onclick="selVil=null; renderUI();">' + selCir.name + ' Circle</button>';
      }
      if (selVil) {
        html += ' <span style="color:#475569;">/</span> <span style="color:#fbbf24; font-weight:700;">' + selVil.name + ' (Wards)</span>';
      }
      bc.innerHTML = html;
    }

    function resetToStates() {
      selSt = null; selDiv = null; selDist = null; selCir = null; selVil = null;
      renderUI();
    }

    function selectEntity(sIdx, dIdx, dtIdx, cIdx, vIdx) {
      selSt = sIdx !== null ? MASTER_DATA.states[sIdx] : null;
      selDiv = (selSt && dIdx !== null) ? selSt.divisions[dIdx] : null;
      selDist = (selDiv && dtIdx !== null) ? selDiv.districts[dtIdx] : null;
      selCir = (selDist && cIdx !== null) ? selDist.circles[cIdx] : null;
      selVil = (selCir && vIdx !== null) ? selCir.villages[vIdx] : null;
      document.getElementById('searchResults').style.display = 'none';
      document.getElementById('searchInput').value = '';
      renderUI();
    }

    function selectWardSpot(sIdx, dIdx, dtIdx, cIdx, vIdx, wIdx) {
      const st = MASTER_DATA.states[sIdx];
      const div = st.divisions[dIdx];
      const dist = div.districts[dtIdx];
      const cir = dist.circles[cIdx];
      const vil = cir.villages[vIdx];
      const ward = vil.wards[wIdx];

      locateWard(ward.lat, ward.lon, ward.name, vil.name, dist.name, st.name);
    }

    function locateWard(lat, lon, wardName, vilName, distName, stateName) {
      if (window.parent && typeof window.parent.locateWardOnMap === 'function') {
        window.parent.locateWardOnMap(lat, lon, wardName, vilName, distName, stateName);
      } else {
        window.location.href = '/?lat=' + lat + '&lon=' + lon + '&ward=' + encodeURIComponent(wardName) + '&village=' + encodeURIComponent(vilName) + '&dist=' + encodeURIComponent(distName) + '&state=' + encodeURIComponent(stateName);
      }
    }

    function renderUI() {
      renderBreadcrumb();
      const container = document.getElementById('viewContainer');
      let html = '';

      if (!selSt) {
        html = '<div class="grid">';
        MASTER_DATA.states.forEach((st, idx) => {
          html += '<div class="card" onclick="selectEntity(' + idx + ', null, null, null, null)"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><span class="badge">' + st.code + '</span><span style="font-size:0.75rem; color:#94a3b8">Capital: ' + st.capital + '</span></div><div class="card-title">' + st.name + '</div><div class="card-meta">' + st.totalDivisions + ' Divisions • ' + st.totalDistricts + ' Districts</div><div style="font-size:0.75rem; color:#fbbf24; font-weight:700; margin-bottom:12px;">' + st.riskProfile + '</div><div class="card-footer"><span>Explore Divisions & Districts</span><span>➔</span></div></div>';
        });
        html += '</div>';
      } else if (selSt && !selDiv) {
        html = '<div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;"><div><h2 style="font-size:1.4rem; font-weight:800;">' + selSt.name + ': Divisions</h2><p style="font-size:0.8rem; color:#94a3b8">Capital: ' + selSt.capital + ' • ' + selSt.riskProfile + '</p></div><button onclick="resetToStates()" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to All States</button></div><div class="grid">';
        const sIdx = MASTER_DATA.states.indexOf(selSt);
        selSt.divisions.forEach((div, dIdx) => {
          html += '<div class="card" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', null, null, null)"><div class="badge">Administrative Division</div><div class="card-title">' + div.name + '</div><div class="card-meta">' + div.districts.length + ' Integrated Districts</div><div class="card-footer"><span>Explore Districts & Circles</span><span>➔</span></div></div>';
        });
        html += '</div>';
      } else if (selDiv && !selDist) {
        html = '<div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;"><h2>' + selDiv.name + ': Districts</h2><button onclick="selDiv=null; renderUI();" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to Divisions</button></div><div class="grid">';
        const sIdx = MASTER_DATA.states.indexOf(selSt);
        const dIdx = selSt.divisions.indexOf(selDiv);
        selDiv.districts.forEach((dist, dtIdx) => {
          html += '<div class="card" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', null, null)"><div class="badge" style="color:#10b981;">District</div><div class="card-title">' + dist.name + '</div><div class="card-meta">' + dist.circles.length + ' Administrative Circles</div><div class="card-footer" style="color:#10b981;"><span>View Circles & Towns</span><span>➔</span></div></div>';
        });
        html += '</div>';
      } else if (selDist && !selCir) {
        html = '<div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;"><h2>' + selDist.name + ' District: Circles</h2><button onclick="selDist=null; renderUI();" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to Districts</button></div><div class="grid">';
        const sIdx = MASTER_DATA.states.indexOf(selSt);
        const dIdx = selSt.divisions.indexOf(selDiv);
        const dtIdx = selDiv.districts.indexOf(selDist);
        selDist.circles.forEach((cir, cIdx) => {
          html += '<div class="card" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', null)"><div class="badge">Administrative Circle</div><div class="card-title">' + cir.name + '</div><div class="card-meta">' + cir.villages.length + ' Registered Villages / Basti</div><div class="card-footer"><span>View Villages & Wards</span><span>➔</span></div></div>';
        });
        html += '</div>';
      } else if (selCir && !selVil) {
        html = '<div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center;"><h2>' + selCir.name + ' Circle: Villages & Townships</h2><button onclick="selCir=null; renderUI();" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to Circles</button></div><div class="grid">';
        const sIdx = MASTER_DATA.states.indexOf(selSt);
        const dIdx = selSt.divisions.indexOf(selDiv);
        const dtIdx = selDiv.districts.indexOf(selDist);
        const cIdx = selDist.circles.indexOf(selCir);
        selCir.villages.forEach((vil, vIdx) => {
          html += '<div class="card" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', ' + vIdx + ')"><div class="badge" style="color:#fbbf24;">Revenue Village / Basti</div><div class="card-title">' + vil.name + '</div><div class="card-meta">' + vil.wards.length + ' Gram Wards Constituted</div><div class="card-footer" style="color:#fbbf24;"><span>Inspect Wards Breakdown</span><span>➔</span></div></div>';
        });
        html += '</div>';
      } else if (selVil) {
        const sIdx = MASTER_DATA.states.indexOf(selSt);
        const dIdx = selSt.divisions.indexOf(selDiv);
        const dtIdx = selDiv.districts.indexOf(selDist);
        const cIdx = selDist.circles.indexOf(selCir);
        const vIdx = selCir.villages.indexOf(selVil);

        html = '<div style="background:#0f172a; border:1px solid #334155; border-radius:16px; padding:24px;"><div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:16px; margin-bottom:20px;"><div><div style="font-size:0.75rem; color:#fbbf24; font-weight:800;">MICRO-LEVEL GRAM WARDS</div><h2 style="font-size:1.6rem; font-weight:900;">' + selVil.name + '</h2><div style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Circle: ' + selCir.name + ' • District: ' + selDist.name + ' • Division: ' + selDiv.name + ' • State: ' + selSt.name + '</div></div><button onclick="selVil=null; renderUI();" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to Villages</button></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">';
        selVil.wards.forEach((w, wIdx) => {
          const color = w.hazard_color || '#06b6d4';
          html += '<div style="background:#020617; padding:18px; border-radius:14px; border:1px solid #334155; display:flex; flex-direction:column; justify-content:space-between; gap:12px; cursor:pointer;" onclick="selectWardSpot(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', ' + vIdx + ', ' + wIdx + ')">' +
            '<div>' +
              '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">' +
                '<span style="background:rgba(30,41,59,0.8); color:' + color + '; font-size:0.75rem; font-weight:800; padding:4px 10px; border-radius:6px; border:1px solid ' + color + ';">Ward ' + w.ward_no + ' • ' + (w.type_name || 'Sector') + '</span>' +
                '<span style="font-size:0.72rem; color:#10b981; font-family:monospace; font-weight:700;">GPS: ' + w.lat + ', ' + w.lon + '</span>' +
              '</div>' +
              '<h3 style="font-size:1.05rem; font-weight:900; color:#f8fafc; margin-bottom:8px;">' + w.name + '</h3>' +
              '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; background:rgba(15,23,42,0.8); padding:10px; border-radius:8px; font-size:0.78rem; margin-bottom:8px;">' +
                '<div><span style="color:#94a3b8;">👥 Population:</span> <strong style="color:white;">' + (w.population || 450) + '</strong></div>' +
                '<div><span style="color:#94a3b8;">🏠 Households:</span> <strong style="color:white;">' + (w.households || 90) + '</strong></div>' +
                '<div><span style="color:#94a3b8;">⛰️ Elevation:</span> <strong style="color:#38bdf8;">' + (w.elevation_m || 1000) + 'm</strong></div>' +
                '<div><span style="color:#94a3b8;">📐 Extent Area:</span> <strong style="color:#a7f3d0;">' + (w.area_sqkm || 1.8) + ' sq km</strong></div>' +
              '</div>' +
              '<div style="font-size:0.75rem; color:#cbd5e1; margin-bottom:6px;"><strong>🛡️ Hazard Index:</strong> ' + (w.hazard_rating || 'Low') + '</div>' +
              '<div style="font-size:0.75rem; color:#94a3b8; margin-bottom:6px;"><strong>🏗️ Key Assets:</strong> ' + (w.infrastructure || 'Local Infrastructure') + '</div>' +
              '<div style="font-size:0.75rem; color:#a7f3d0;"><strong>👤 Ward Representative:</strong> ' + (w.ward_member || 'Local Rep') + '</div>' +
            '</div>' +
            '<div style="display:flex; justify-content:flex-end; margin-top:8px;">' +
              '<button style="background:linear-gradient(135deg, ' + color + ', #2563eb); border:none; color:white; padding:8px 16px; border-radius:8px; font-size:0.78rem; font-weight:800; cursor:pointer; box-shadow:0 4px 12px rgba(6,182,212,0.3);" onclick="event.stopPropagation(); selectWardSpot(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', ' + vIdx + ', ' + wIdx + ')">📍 Locate Spot on Map</button>' +
            '</div>' +
          '</div>';
        });
        html += '</div></div>';
      }

      container.innerHTML = html;
    }

    function handleSearch() {
      const q = document.getElementById('searchInput').value.trim().toLowerCase();
      const resBox = document.getElementById('searchResults');
      if (q.length < 2) { resBox.style.display = 'none'; return; }
      
      let html = '';
      let count = 0;
      MASTER_DATA.states.forEach((st, sIdx) => {
        st.divisions.forEach((div, dIdx) => {
          div.districts.forEach((dist, dtIdx) => {
            dist.circles.forEach((cir, cIdx) => {
              if (cir.name.toLowerCase().includes(q) && count < 10) {
                count++;
                html += '<div class="search-item" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', null)"><strong style="color:#06b6d4">' + cir.name + '</strong> (Circle) <div style="color:#94a3b8; font-size:0.72rem">' + st.name + ' > ' + dist.name + '</div></div>';
              }
              cir.villages.forEach((v, vIdx) => {
                if (v.name.toLowerCase().includes(q) && count < 10) {
                  count++;
                  html += '<div class="search-item" onclick="selectEntity(' + sIdx + ', ' + dIdx + ', ' + dtIdx + ', ' + cIdx + ', ' + vIdx + ')"><strong style="color:#fbbf24">' + v.name + '</strong> (Village) <div style="color:#94a3b8; font-size:0.72rem">' + dist.name + ' > ' + cir.name + '</div></div>';
                }
              });
            });
          });
        });
      });

      if (count > 0) {
        resBox.innerHTML = html;
        resBox.style.display = 'block';
      } else {
        resBox.style.display = 'none';
      }
    }

    function selectWardSpot(sIdx, dIdx, dtIdx, cIdx, vIdx, wIdx) {
      try {
        const st = MASTER_DATA.states[sIdx];
        const div = st.divisions[dIdx];
        const dist = div.districts[dtIdx];
        const cir = dist.circles[cIdx];
        const vil = cir.villages[vIdx];
        const w = vil.wards[wIdx];

        if (window.parent && typeof window.parent.locateWardOnMap === 'function') {
          window.parent.locateWardOnMap(
            w.lat, w.lon, w.name, vil.name, dist.name, st.name,
            w.population, w.households, w.elevation_m, w.area_sqkm,
            w.hazard_rating, w.infrastructure, w.ward_member, w.type_name, w.hazard_color
          );
        } else {
          window.location.href = '/?lat=' + w.lat + '&lon=' + w.lon +
            '&ward=' + encodeURIComponent(w.name) +
            '&village=' + encodeURIComponent(vil.name) +
            '&dist=' + encodeURIComponent(dist.name) +
            '&state=' + encodeURIComponent(st.name) +
            '&pop=' + (w.population || '') +
            '&hh=' + (w.households || '') +
            '&elev=' + (w.elevation_m || '') +
            '&area=' + (w.area_sqkm || '') +
            '&hazard=' + encodeURIComponent(w.hazard_rating || '') +
            '&infra=' + encodeURIComponent(w.infrastructure || '') +
            '&member=' + encodeURIComponent(w.ward_member || '') +
            '&type=' + encodeURIComponent(w.type_name || '') +
            '&color=' + encodeURIComponent(w.hazard_color || '');
        }
      } catch (err) {
        console.error("selectWardSpot error:", err);
      }
    }

    window.onload = renderUI;
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '..', 'public', 'hierarchy_page.html'), hierarchyHtmlContent);
console.log("Written public/hierarchy_page.html!");
