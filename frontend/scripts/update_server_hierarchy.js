const fs = require('fs');
const path = require('path');

const masterNerData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'master_ner_hierarchy.json'), 'utf8'));

let serverContent = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

const hierarchyHtml = `<!DOCTYPE html>
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

    function locateWard(lat, lon, wardName, vilName, distName, stateName) {
      if (window.parent && window.parent.locateWardOnMap) {
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
        html = '<div style="background:#0f172a; border:1px solid #334155; border-radius:16px; padding:24px;"><div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:16px; margin-bottom:20px;"><div><div style="font-size:0.75rem; color:#fbbf24; font-weight:800;">MICRO-LEVEL GRAM WARDS</div><h2 style="font-size:1.6rem; font-weight:900;">' + selVil.name + '</h2><div style="font-size:0.8rem; color:#94a3b8; margin-top:4px;">Circle: ' + selCir.name + ' • District: ' + selDist.name + ' • Division: ' + selDiv.name + ' • State: ' + selSt.name + '</div></div><button onclick="selVil=null; renderUI();" style="padding:6px 12px; background:#1e293b; color:white; border:none; border-radius:6px; cursor:pointer;">⬅ Back to Villages</button></div><div style="display:grid; grid-template-columns:1fr 1fr; gap:14px;">';
        selVil.wards.forEach(w => {
          const wardNameEsc = w.name.replace(/'/g, "\\'");
          const vilNameEsc = selVil.name.replace(/'/g, "\\'");
          const distNameEsc = selDist.name.replace(/'/g, "\\'");
          const stNameEsc = selSt.name.replace(/'/g, "\\'");
          html += '<div style="background:#020617; padding:16px; border-radius:12px; border:1px solid #334155; display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="locateWard(' + w.lat + ', ' + w.lon + ', \'' + wardNameEsc + '\', \'' + vilNameEsc + '\', \'' + distNameEsc + '\', \'' + stNameEsc + '\')"><div><span style="background:#1e293b; color:#06b6d4; font-size:0.75rem; font-weight:800; padding:3px 8px; border-radius:6px; margin-right:8px;">Ward ' + w.ward_no + '</span><span style="font-size:0.88rem; font-weight:600;">' + w.name + '</span><div style="font-size:0.7rem; color:#64748b; font-family:monospace; margin-top:4px;">GPS: ' + w.lat + ', ' + w.lon + '</div></div><button style="background:linear-gradient(135deg, #06b6d4, #2563eb); border:none; color:white; padding:6px 12px; border-radius:8px; font-size:0.75rem; font-weight:800; cursor:pointer; box-shadow:0 4px 10px rgba(6,182,212,0.3);" onclick="event.stopPropagation(); locateWard(' + w.lat + ', ' + w.lon + ', \'' + wardNameEsc + '\', \'' + vilNameEsc + '\', \'' + distNameEsc + '\', \'' + stNameEsc + '\')">📍 Locate Spot on Map</button></div>';
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

    window.onload = renderUI;
  </script>
</body>
</html>`;

// Re-read clean template or reset serverContent from server_backup or file
let originalServer = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

// Replace HIERARCHY_HTML_CONTENT in server.js
const hierarchyRegex = /const HIERARCHY_HTML_CONTENT = `[\s\S]*?`;/;
if (hierarchyRegex.test(originalServer)) {
  originalServer = originalServer.replace(hierarchyRegex, `const HIERARCHY_HTML_CONTENT = \`${hierarchyHtml.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`;`);
}

// Prepare locateScriptHelper without any unescaped backticks
const locateScriptHelper = [
  "    var wardSpotMarker = null;",
  "    window.locateWardOnMap = function(lat, lon, wardName, villageName, distName, stateName) {",
  "      if (typeof switchView === 'function') switchView('dashboard');",
  "      if (mapDash) {",
  "        mapDash.setView([lat, lon], 15);",
  "        if (wardSpotMarker) mapDash.removeLayer(wardSpotMarker);",
  "        var pulseIcon = L.divIcon({",
  "          className: 'custom-div-icon',",
  "          html: \"<div style='background-color:#ef4444; width:22px; height:22px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 20px #ef4444;'></div>\",",
  "          iconSize: [22, 22],",
  "          iconAnchor: [11, 11]",
  "        });",
  "        wardSpotMarker = L.marker([lat, lon], { icon: pulseIcon }).addTo(mapDash);",
  "        var popupContent = '<div style=\"font-family:system-ui; padding:6px; min-width:220px;\"><div style=\"font-size:0.7rem; font-weight:900; color:#ef4444; text-transform:uppercase;\">📍 Tactical Micro-Ward Spot</div><h3 style=\"font-size:1.15rem; font-weight:900; color:#0f172a; margin:4px 0;\">' + wardName + '</h3><div style=\"font-size:0.8rem; color:#475569; font-weight:600;\">' + (villageName || '') + ' ' + (distName ? '• ' + distName : '') + ' ' + (stateName ? '• ' + stateName : '') + '</div><div style=\"margin-top:8px; padding-top:6px; border-top:1px solid #e2e8f0; font-size:0.75rem; color:#059669; font-weight:700;\">GPS: ' + lat.toFixed(4) + ', ' + lon.toFixed(4) + '</div></div>';",
  "        wardSpotMarker.bindPopup(popupContent).openPopup();",
  "      }",
  "    };",
  "    function checkQuerySpot() {",
  "      var urlParams = new URLSearchParams(window.location.search);",
  "      if (urlParams.has('lat') && urlParams.has('lon')) {",
  "        var lat = parseFloat(urlParams.get('lat'));",
  "        var lon = parseFloat(urlParams.get('lon'));",
  "        var ward = urlParams.get('ward') || 'Target Sector Spot';",
  "        var village = urlParams.get('village') || '';",
  "        var dist = urlParams.get('dist') || '';",
  "        var state = urlParams.get('state') || '';",
  "        setTimeout(function() { window.locateWardOnMap(lat, lon, ward, village, dist, state); }, 600);",
  "      }",
  "    }"
].join("\n");

if (!originalServer.includes('window.locateWardOnMap')) {
  originalServer = originalServer.replace('window.onload = initMaps;', `window.onload = function() { initMaps(); checkQuerySpot(); };\n${locateScriptHelper}`);
}

fs.writeFileSync(path.join(__dirname, '..', 'server.js'), originalServer);
console.log("Successfully updated server.js safely!");
