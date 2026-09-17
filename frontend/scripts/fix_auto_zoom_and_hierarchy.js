const fs = require('fs');
const path = require('path');

// 1. Fix public/hierarchy_page.html to define selectWardSpot
const htmlPath = path.join(__dirname, '..', 'public', 'hierarchy_page.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

const selectWardSpotFunction = `
    function selectWardSpot(sIdx, dIdx, dtIdx, cIdx, vIdx, wIdx) {
      try {
        const st = MASTER_DATA.states[sIdx];
        const div = st.divisions[dIdx];
        const dist = div.districts[dtIdx];
        const cir = dist.circles[cIdx];
        const vil = cir.villages[vIdx];
        const w = vil.wards[wIdx];

        if (window.parent && typeof window.parent.locateWardOnMap === 'function') {
          window.parent.locateWardOnMap(w.lat, w.lon, w.name, vil.name, dist.name, st.name);
        } else {
          window.location.href = '/?lat=' + w.lat + '&lon=' + w.lon + '&ward=' + encodeURIComponent(w.name) + '&village=' + encodeURIComponent(vil.name) + '&dist=' + encodeURIComponent(dist.name) + '&state=' + encodeURIComponent(st.name);
        }
      } catch (err) {
        console.error("selectWardSpot error:", err);
      }
    }
`;

if (!htmlContent.includes('function selectWardSpot')) {
  htmlContent = htmlContent.replace('window.onload = renderUI;', selectWardSpotFunction.trim() + '\n\n    window.onload = renderUI;');
  fs.writeFileSync(htmlPath, htmlContent);
  console.log("Added selectWardSpot to public/hierarchy_page.html");
}

// 2. Clean up duplicated locateWardOnMap in server.js
const serverPath = path.join(__dirname, '..', 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');

const cleanLocateCode = `    window.onload = function() { initMaps(); checkQuerySpot(); };

    var wardSpotMarker = null;
    window.locateWardOnMap = function(lat, lon, wardName, villageName, distName, stateName) {
      lat = parseFloat(lat);
      lon = parseFloat(lon);
      switchView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });

      setTimeout(function() {
        if (mapDash) {
          mapDash.invalidateSize();
          mapDash.setView([lat, lon], 16, { animate: true });

          if (wardSpotMarker) mapDash.removeLayer(wardSpotMarker);

          var pulseIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='background-color:#ef4444; width:26px; height:26px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 25px #ef4444; animation: pulse 1.2s infinite;'></div>",
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });

          wardSpotMarker = L.marker([lat, lon], { icon: pulseIcon }).addTo(mapDash);

          var popupContent = '<div style="font-family:system-ui; padding:6px; min-width:240px;"><div style="font-size:0.7rem; font-weight:900; color:#ef4444; text-transform:uppercase; letter-spacing:0.5px;">📍 TACTICAL WARD SPOT</div><h3 style="font-size:1.15rem; font-weight:900; color:#0f172a; margin:4px 0;">' + wardName + '</h3><div style="font-size:0.8rem; color:#475569; font-weight:600;">' + (villageName || '') + ' ' + (distName ? '• ' + distName : '') + ' ' + (stateName ? '• ' + stateName : '') + '</div><div style="margin-top:8px; padding-top:6px; border-top:1px solid #e2e8f0; font-size:0.75rem; color:#059669; font-weight:700;">GPS: ' + lat.toFixed(4) + ', ' + lon.toFixed(4) + '</div></div>';

          wardSpotMarker.bindPopup(popupContent, { autoPan: true }).openPopup();
        }
      }, 350);
    };

    function checkQuerySpot() {
      var urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('lat') && urlParams.has('lon')) {
        var lat = parseFloat(urlParams.get('lat'));
        var lon = parseFloat(urlParams.get('lon'));
        var ward = urlParams.get('ward') || 'Target Sector Spot';
        var village = urlParams.get('village') || '';
        var dist = urlParams.get('dist') || '';
        var state = urlParams.get('state') || '';
        setTimeout(function() { window.locateWardOnMap(lat, lon, ward, village, dist, state); }, 500);
      }
    }`;

const scriptEndRegex = /window\.onload = function\(\) \{ initMaps\(\); checkQuerySpot\(\); \};[\s\S]*?(?=<\/script>)/;
if (scriptEndRegex.test(serverContent)) {
  serverContent = serverContent.replace(scriptEndRegex, cleanLocateCode);
  fs.writeFileSync(serverPath, serverContent);
  console.log("Deduplicated locateWardOnMap in server.js!");
} else {
  console.log("Regex did not match serverContent");
}
