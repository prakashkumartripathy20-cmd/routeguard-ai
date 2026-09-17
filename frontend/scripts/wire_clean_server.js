const fs = require('fs');
const path = require('path');

let serverContent = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

// Replace HIERARCHY_HTML_CONTENT in server.js to load from public/hierarchy_page.html
const hierarchyRegex = /const HIERARCHY_HTML_CONTENT = `[\s\S]*?`;/;
if (hierarchyRegex.test(serverContent)) {
  serverContent = serverContent.replace(hierarchyRegex, `const HIERARCHY_HTML_CONTENT = fs.readFileSync(path.join(__dirname, 'public', 'hierarchy_page.html'), 'utf8');`);
}

// Add locateWardOnMap script to HTML_CONTENT if not already present
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

if (!serverContent.includes('window.locateWardOnMap')) {
  serverContent = serverContent.replace('window.onload = initMaps;', `window.onload = function() { initMaps(); checkQuerySpot(); };\n${locateScriptHelper}`);
}

fs.writeFileSync(path.join(__dirname, '..', 'server.js'), serverContent);
console.log("Successfully wired server.js to use public/hierarchy_page.html!");
