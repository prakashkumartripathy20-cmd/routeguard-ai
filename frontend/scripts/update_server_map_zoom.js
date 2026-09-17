const fs = require('fs');
const path = require('path');

let serverContent = fs.readFileSync(path.join(__dirname, '..', 'server.js'), 'utf8');

// Relax maxBounds on createLeafletMap so setView can zoom to any coordinate without constraint
serverContent = serverContent.replace(
  "const map = L.map(elemId, { center: NER_CENTER, zoom: 8, maxBounds: NER_BOUNDS, maxBoundsViscosity: 0.8 });",
  "const map = L.map(elemId, { center: NER_CENTER, zoom: 8 });"
);

// Update locateWardOnMap & checkQuerySpot block
const locateScriptCode = `
    window.onload = function() { initMaps(); checkQuerySpot(); };

    var wardSpotMarker = null;
    window.locateWardOnMap = function(lat, lon, wardName, villageName, distName, stateName) {
      lat = parseFloat(lat);
      lon = parseFloat(lon);
      if (typeof switchView === 'function') {
        switchView('dashboard');
      }

      setTimeout(function() {
        if (mapDash) {
          mapDash.invalidateSize();
          mapDash.setView([lat, lon], 15, { animate: true });

          if (wardSpotMarker) mapDash.removeLayer(wardSpotMarker);

          var pulseIcon = L.divIcon({
            className: 'custom-div-icon',
            html: "<div style='background-color:#ef4444; width:26px; height:26px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 25px #ef4444;'></div>",
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });

          wardSpotMarker = L.marker([lat, lon], { icon: pulseIcon }).addTo(mapDash);

          var popupContent = '<div style="font-family:system-ui; padding:6px; min-width:230px;"><div style="font-size:0.7rem; font-weight:900; color:#ef4444; text-transform:uppercase;">📍 Tactical Micro-Ward Spot</div><h3 style="font-size:1.15rem; font-weight:900; color:#0f172a; margin:4px 0;">' + wardName + '</h3><div style="font-size:0.8rem; color:#475569; font-weight:600;">' + (villageName || '') + ' ' + (distName ? '• ' + distName : '') + ' ' + (stateName ? '• ' + stateName : '') + '</div><div style="margin-top:8px; padding-top:6px; border-top:1px solid #e2e8f0; font-size:0.75rem; color:#059669; font-weight:700;">GPS: ' + lat.toFixed(4) + ', ' + lon.toFixed(4) + '</div></div>';

          wardSpotMarker.bindPopup(popupContent).openPopup();
        }
      }, 300);
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
    }
`;

const replaceRegex = /window\.onload = function\(\)[\s\S]*?checkQuerySpot\(\);\s*}/;
if (replaceRegex.test(serverContent)) {
  serverContent = serverContent.replace(replaceRegex, locateScriptCode.trim());
} else {
  serverContent = serverContent.replace('window.onload = initMaps;', locateScriptCode.trim());
}

fs.writeFileSync(path.join(__dirname, '..', 'server.js'), serverContent);
console.log("Successfully updated server.js with auto-zoom setView logic!");
