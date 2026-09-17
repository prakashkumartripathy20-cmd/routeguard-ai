import { useEffect, useRef } from 'react';

// Dedicated Waypoints for Predictive AI Early-Warning Disruption & Hyper-Local Bypasses
const UNIT_REROUTE_DATA = {
  "NER-MED-01": {
    unitName: "Unit 1 (Emergency Medicine)",
    regNumber: "AS-01-GB-4012",
    primaryCorridor: "NH-13 via Bhalukpong & Sela Pass",
    riskMsg: "AI Predictive Risk Warning: High Landslide Probability (Next 2-4 Hours)",
    hazardZoneName: "Bhalukpong-Tipi Gorge Corridor (Km 42-56)",
    rainfallRate: "114 mm/hr",
    soilSaturation: "89%",
    slopeStability: "0.84 Hazard Index (Red Alert)",
    alertBanner: "🛡️ AI Preemptive Route Optimization: Impending Landslide Predicted at Km 42 in next 90 mins. Recommending early local diversion to avoid stranding critical medical cargo.",
    segA_waypoints: [[26.1445, 91.7362], [26.4350, 92.0300], [27.0010, 92.6350]],
    segB_waypoints: [[27.0010, 92.6350], [27.0134, 92.6416], [27.0580, 92.6450]],
    segC_waypoints: [[27.0010, 92.6350], [27.0180, 92.6280], [27.0450, 92.6320], [27.0580, 92.6450]],
    segD_waypoints: [[27.0580, 92.6450], [27.2645, 92.4230], [27.5861, 91.8594]],
    alternateName: "Upper Bhalukpong Army Ridge Link ➔ Tipi Foothill Byroad",
    distanceDelta: "+11.8 km",
    totalDist: "191.8 km",
    delayImpact: "+18 mins",
    revisedEta: "18:48 IST",
    safetyScore: "95%",
    riskMitigation: "Landslide exposure reduced by 92% (Preemptive Bypass Active)"
  },
  "NER-RATION-02": {
    unitName: "Unit 2 (Food Ration)",
    regNumber: "ML-05-B-7890",
    primaryCorridor: "NH-6 via Jowai & Sonapur Tunnel",
    riskMsg: "AI Predictive Risk Warning: Flash Flood & Mudslide Risk (Next 1-3 Hours)",
    hazardZoneName: "Sonapur Tunnel Approaches (Km 138-148)",
    rainfallRate: "128 mm/hr",
    soilSaturation: "94%",
    slopeStability: "0.89 Liquefaction Hazard",
    alertBanner: "🛡️ AI Preemptive Route Optimization: Flash Flood predicted at Sonapur Tunnel approaches in next 60 mins. Rerouting via Umkiang Upper Service Link.",
    segA_waypoints: [[25.5788, 91.8933], [25.4500, 92.2000], [25.1200, 92.3550]],
    segB_waypoints: [[25.1200, 92.3550], [25.1012, 92.3685], [25.0850, 92.3950]],
    segC_waypoints: [[25.1200, 92.3550], [25.1050, 92.3800], [25.0850, 92.3950]],
    segD_waypoints: [[25.0850, 92.3950], [24.9020, 92.6050], [24.8333, 92.7789]],
    alternateName: "Umkiang Upper Service Link Bypass",
    distanceDelta: "+8.4 km",
    totalDist: "220.4 km",
    delayImpact: "+14 mins",
    revisedEta: "17:29 IST",
    safetyScore: "93%",
    riskMitigation: "Flash flood vulnerability dropped from 94% ➔ 7%"
  },
  "NER-DISASTER-03": {
    unitName: "Unit 3 (Landslide Rapid Action)",
    regNumber: "AR-01-C-2045",
    primaryCorridor: "NH-13 Foothill Ascent",
    riskMsg: "AI Predictive Risk Warning: Rockfall & Debris Washout (Next 2 Hours)",
    hazardZoneName: "Nechiphu Pass Curves (Km 78-92)",
    rainfallRate: "102 mm/hr",
    soilSaturation: "86%",
    slopeStability: "0.81 Rockfall Risk Index",
    alertBanner: "🛡️ AI Preemptive Route Optimization: Rockfall alert active at Nechiphu Pass curves. Directing heavy equipment convoy to Nechiphu East Bypass Link.",
    segA_waypoints: [[26.6528, 92.7926], [26.8200, 92.7800], [27.1100, 92.5100]],
    segB_waypoints: [[27.1100, 92.5100], [27.1350, 92.4950], [27.1600, 92.4800]],
    segC_waypoints: [[27.1100, 92.5100], [27.1380, 92.5250], [27.1600, 92.4800]],
    segD_waypoints: [[27.1600, 92.4800], [27.2100, 92.4300], [27.2645, 92.4230]],
    alternateName: "Nechiphu Tunnel East Service Link",
    distanceDelta: "+9.6 km",
    totalDist: "167.6 km",
    delayImpact: "+15 mins",
    revisedEta: "14:15 IST",
    safetyScore: "97%",
    riskMitigation: "Debris collision risk dropped from 91% ➔ 3%"
  },
  "NER-TELECOM-04": {
    unitName: "Unit 4 (Telecom Restorer)",
    regNumber: "NL-01-H-3391",
    primaryCorridor: "NH-2 Mountain Highway",
    riskMsg: "AI Predictive Risk Warning: Road Erosion & Collapse Hazard (Next 3 Hours)",
    hazardZoneName: "Mao Gate Landslide Curves (Km 54-68)",
    rainfallRate: "110 mm/hr",
    soilSaturation: "91%",
    slopeStability: "0.87 Subsidence Risk",
    alertBanner: "🛡️ AI Preemptive Route Optimization: Road erosion risk detected at Mao Gate. Diverting telematics convoy to Mao East Ridge Byroad.",
    segA_waypoints: [[25.6751, 94.1086], [25.6020, 94.1150]],
    segB_waypoints: [[25.6020, 94.1150], [25.5110, 94.1350], [25.4120, 94.1080]],
    segC_waypoints: [[25.6020, 94.1150], [25.5500, 94.1800], [25.4120, 94.1080]],
    segD_waypoints: [[25.4120, 94.1080], [24.8170, 93.9368]],
    alternateName: "Mao East Ridge Byroad Bypass",
    distanceDelta: "+12.3 km",
    totalDist: "156.3 km",
    delayImpact: "+19 mins",
    revisedEta: "17:19 IST",
    safetyScore: "92%",
    riskMitigation: "Subsidence risk dropped from 89% ➔ 8%"
  }
};

// Helper: Fetch real road geometry from OSRM Driving API with fallback smoothing
async function fetchRealRoadGeometry(waypoints) {
  try {
    const formattedStr = waypoints.map(pt => `${pt[1]},${pt[0]}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${formattedStr}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code === 'Ok' && data.routes && data.routes[0]) {
      const coords = data.routes[0].geometry.coordinates;
      return coords.map(c => [c[1], c[0]]);
    }
  } catch (e) {
    console.warn('OSRM road snapping offline/fallback:', e);
  }
  return generateSmoothFallbackPath(waypoints);
}

function generateSmoothFallbackPath(pts) {
  const dense = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const steps = 12;
    for (let s = 0; s <= steps; s++) {
      const t = s / steps;
      const curveLat = (1 - t) * p1[0] + t * p2[0] + Math.sin(t * Math.PI) * 0.012 * (i % 2 === 0 ? 1 : -1);
      const curveLon = (1 - t) * p1[1] + t * p2[1] + Math.sin(t * Math.PI) * 0.012 * (i % 2 !== 0 ? 1 : -1);
      dense.push([curveLat, curveLon]);
    }
  }
  return dense;
}

export default function GISMap({ workers = [], hazards = [], route = null, selectedLayers = { workers: true, hazards: true, infra: true } }) {
  const mapRef = useRef(null);
  const leafletInstance = useRef(null);
  const layersGroup = useRef(null);
  const rerouteGroup = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const L = require('leaflet');

    if (!leafletInstance.current) {
      // Initialize map centered at Guwahati / North Eastern Region (NER), India [26.1445, 91.7362]
      const nerCenter = [26.1445, 91.7362];
      const nerBounds = L.latLngBounds([21.5, 89.5], [29.5, 97.5]);

      const map = L.map(mapRef.current, {
        center: nerCenter,
        zoom: 8,
        maxBounds: nerBounds,
        maxBoundsViscosity: 0.8
      });

      // 4 Core Basemap Layers (100% Free & Keyless)
      const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19
      });

      const satelliteMap = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        maxNativeZoom: 19,
        maxZoom: 21
      });

      const terrainMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; OpenStreetMap, SRTM | Style: &copy; OpenTopoMap',
        maxZoom: 17
      });

      const nightMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
        maxNativeZoom: 16,
        maxZoom: 19
      });

      // Default Active Basemap
      let activeBasemap = streetMap;
      streetMap.addTo(map);

      const layers = {
        'street': { name: '🗺️ Street Map', layer: streetMap },
        'satellite': { name: '🛰️ Satellite', layer: satelliteMap },
        'terrain': { name: '⛰️ Terrain', layer: terrainMap },
        'night': { name: '🌙 Night Mode', layer: nightMap }
      };

    let is3DActive = false;

    window.toggle3DView = () => {
      is3DActive = !is3DActive;
      const mapElem = mapRef.current;
      const btn = document.getElementById('btn3DToggle');

      if (is3DActive) {
        if (mapElem) {
          mapElem.style.transform = 'perspective(900px) rotateX(45deg)';
          mapElem.style.transition = 'transform 0.8s ease';
          mapElem.style.transformOrigin = 'center center';
        }
        if (btn) {
          btn.style.background = 'rgba(99, 102, 241, 0.9)';
          btn.style.borderColor = '#818cf8';
          btn.innerHTML = '🏔️ 2D View';
        }
        window.showElevationDrawer();
      } else {
        if (mapElem) {
          mapElem.style.transform = 'none';
        }
        if (btn) {
          btn.style.background = 'rgba(15, 23, 42, 0.90)';
          btn.style.borderColor = 'rgba(99, 102, 241, 0.4)';
          btn.innerHTML = '🏔️ 3D View';
        }
        window.hideElevationDrawer();
      }
    };

    window.goToMainPage = () => {
      if (is3DActive) {
        window.toggle3DView();
      }
      if (typeof window.clearReroute === 'function') {
        window.clearReroute();
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([26.1445, 91.7362], 8);
      }
      if (typeof window.switchView === 'function') {
        window.switchView('dashboard');
      } else {
        window.location.href = '/';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.showElevationDrawer = () => {
      let drawer = document.getElementById('elevationDrawer');
      if (!drawer) {
        drawer = document.createElement('div');
        drawer.id = 'elevationDrawer';
        document.body.appendChild(drawer);
      }
      drawer.style.cssText = 'position:fixed; bottom:20px; left:50%; transform:translateX(-50%); width:90%; max-width:820px; background:rgba(15, 23, 42, 0.96); border:1.5px solid #6366f1; border-radius:16px; padding:16px 20px; color:#f8fafc; z-index:9998; backdrop-filter:blur(16px); box-shadow:0 20px 40px rgba(0,0,0,0.75); font-family:system-ui, -apple-system, sans-serif;';
      drawer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
          <div>
            <div style="font-weight:800; font-size:13px; color:#818cf8; letter-spacing:0.5px;">🏔️ CORRIDOR ELEVATION & GRADIENT PROFILE</div>
            <div style="font-size:11px; color:#94a3b8; font-weight:600;">NH-13 Guwahati ➔ Tawang Mountain Highway (Max Elev: 4,170m)</div>
          </div>
          <button onclick="window.toggle3DView()" style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; padding:4px 10px; border-radius:8px; font-weight:700; font-size:11px; cursor:pointer;">
            ✖ Exit 3D View
          </button>
        </div>

        <div style="background:rgba(30,41,59,0.7); border:1px solid rgba(99,102,241,0.3); border-radius:12px; padding:12px; margin-bottom:12px; position:relative;">
          <svg viewBox="0 0 700 120" style="width:100%; height:110px; overflow:visible;">
            <defs>
              <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6366f1" stop-opacity="0.6"/>
                <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0"/>
              </linearGradient>
            </defs>
            <polygon points="20,110  20,105  130,100  260,80  400,50  530,12  680,45  680,110" fill="url(#elevGrad)"/>
            <polyline points="20,105  130,100  260,80  400,50  530,12  680,45" fill="none" stroke="#818cf8" stroke-width="3" stroke-linecap="round"/>
            
            <circle cx="20" cy="105" r="4" fill="#38bdf8"/>
            <text x="20" y="120" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Guwahati (55m)</text>
            
            <circle cx="130" cy="100" r="4" fill="#38bdf8"/>
            <text x="130" y="120" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Orang (90m)</text>
            
            <circle cx="260" cy="80" r="4" fill="#38bdf8"/>
            <text x="260" y="120" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Kalaktang (1,120m)</text>
            
            <circle cx="400" cy="50" r="4" fill="#fbbf24"/>
            <text x="400" y="120" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Bomdila (2,217m)</text>

            <circle cx="530" cy="12" r="6" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
            <text x="530" y="5" fill="#fca5a5" font-size="11" font-weight="800" text-anchor="middle">⚠️ Sela Pass (4,170m)</text>

            <circle cx="680" cy="45" r="4" fill="#34d399"/>
            <text x="680" y="120" fill="#cbd5e1" font-size="10" font-weight="600" text-anchor="middle">Tawang (3,048m)</text>
          </svg>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:11px;">
          <div style="background:rgba(239,68,68,0.15); border:1px solid #ef4444; padding:8px 12px; border-radius:8px; color:#fca5a5;">
            <strong style="color:#f87171;">⚠️ STEEP GRADIENT ALERT (14% Slope):</strong><br/>
            Extreme incline along Sela Pass Ascent (Km 124-142). High risk of brake fade & black ice above 3,500m.
          </div>
          <div style="background:rgba(245,158,11,0.15); border:1px solid #f59e0b; padding:8px 12px; border-radius:8px; color:#fef3c7;">
            <strong style="color:#fbbf24;">🌧️ SLOPE LIQUEFACTION RISK:</strong><br/>
            Monsoon saturation (>100mm/hr) elevates landslide risk index to 0.84 on steep cut slopes.
          </div>
        </div>
      `;
    };

    window.hideElevationDrawer = () => {
      const drawer = document.getElementById('elevationDrawer');
      if (drawer) drawer.remove();
    };

    window.openStreetViewModal = (locationName = "Bhalukpong-Tipi Gorge (Km 42)", lat = 27.0134, lon = 92.6416) => {
      let modal = document.getElementById('streetViewModal');
      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'streetViewModal';
        document.body.appendChild(modal);
      }
      modal.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(15,23,42,0.85); backdrop-filter:blur(10px); z-index:10000; display:flex; align-items:center; justify-content:center; font-family:system-ui, -apple-system, sans-serif;';
      
      modal.innerHTML = `
        <div style="width:92%; max-width:880px; background:#0f172a; border:2px solid #06b6d4; border-radius:18px; padding:20px; color:#f8fafc; box-shadow:0 25px 50px rgba(0,0,0,0.85); position:relative;">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
            <div>
              <div style="font-weight:800; font-size:15px; color:#06b6d4; display:flex; align-items:center; gap:8px;">
                📸 GROUND-LEVEL ROAD INSPECTION VIEW (360° RECON)
              </div>
              <div style="font-size:11px; color:#94a3b8; font-weight:600; margin-top:2px;">
                📍 Corridor: ${locationName} • Lat: ${typeof lat === 'number' ? lat.toFixed(4) : lat}, Lon: ${typeof lon === 'number' ? lon.toFixed(4) : lon}
              </div>
            </div>
            <button onclick="document.getElementById('streetViewModal').remove()" style="background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; width:32px; height:32px; border-radius:50%; font-weight:800; font-size:14px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              ✖
            </button>
          </div>

          <div style="position:relative; width:100%; height:320px; background:#1e293b; border-radius:12px; overflow:hidden; border:1px solid rgba(6,182,212,0.4); margin-bottom:14px;">
            <div id="panoCanvasContainer" style="width:100%; height:100%; position:relative; background: radial-gradient(circle at center, #1e293b 0%, #0f172a 100%); display:flex; align-items:center; justify-content:center; overflow:hidden;">
              
              <svg viewBox="0 0 1000 400" style="width:120%; height:120%; position:absolute; left:-10%; top:-10%; filter:brightness(0.95);">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#334155"/>
                    <stop offset="60%" stop-color="#1e293b"/>
                    <stop offset="100%" stop-color="#0f172a"/>
                  </linearGradient>
                  <linearGradient id="mtnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#475569"/>
                    <stop offset="100%" stop-color="#1e293b"/>
                  </linearGradient>
                </defs>
                <rect width="1000" height="400" fill="url(#skyGrad)"/>
                <polygon points="-50,400 150,120 350,280 500,80 720,310 900,140 1050,400" fill="url(#mtnGrad)"/>
                <polygon points="100,400 300,180 480,340 650,150 820,360 1050,220 1150,400" fill="#0f172a" opacity="0.8"/>

                <path d="M 500 400 Q 480 320 520 280 T 490 220 T 500 150" fill="none" stroke="#475569" stroke-width="40" stroke-linecap="round"/>
                <path d="M 500 400 Q 480 320 520 280 T 490 220 T 500 150" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="10 10"/>

                <circle cx="510" cy="265" r="18" fill="#ef4444" opacity="0.3"/>
                <circle cx="510" cy="265" r="8" fill="#ef4444"/>
                <text x="510" y="240" fill="#fca5a5" font-size="14" font-weight="800" text-anchor="middle">⚠️ Active Mudslide Debris</text>
              </svg>

              <div style="position:absolute; top:12px; left:12px; background:rgba(15,23,42,0.85); border:1px solid #334155; border-radius:8px; padding:6px 10px; font-size:11px; font-weight:700; color:#38bdf8; display:flex; align-items:center; gap:6px;">
                <span>🧭 Field Recon Camera:</span>
                <span style="color:#f1f5f9;">Heading 042° (NE)</span>
              </div>

              <div style="position:absolute; bottom:12px; right:12px; display:flex; gap:6px;">
                <button onclick="alert('Pan Left (West)')" style="background:rgba(15,23,42,0.85); border:1px solid #06b6d4; color:#38bdf8; padding:6px 10px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">
                  ◀ Pan Left
                </button>
                <button onclick="alert('Pan Right (East)')" style="background:rgba(15,23,42,0.85); border:1px solid #06b6d4; color:#38bdf8; padding:6px 10px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">
                  Pan Right ▶
                </button>
                <button onclick="alert('Reset Orientation')" style="background:rgba(15,23,42,0.85); border:1px solid #6366f1; color:#a5b4fc; padding:6px 10px; border-radius:6px; font-weight:700; font-size:11px; cursor:pointer;">
                  🔄 360° Reset
                </button>
              </div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; background:rgba(30,41,59,0.7); border:1px solid rgba(255,255,255,0.1); padding:12px; border-radius:12px; margin-bottom:14px; font-size:11px;">
            <div>
              <span style="color:#94a3b8; display:block;">🛣️ Road Surface State</span>
              <strong style="color:#ef4444; font-size:12px;">⚠️ Mud Saturated / Debris</strong>
            </div>
            <div>
              <span style="color:#94a3b8; display:block;">📐 Road Width Clearance</span>
              <strong style="color:#fbbf24; font-size:12px;">6.5m (Single Lane Bottleneck)</strong>
            </div>
            <div>
              <span style="color:#94a3b8; display:block;">🌫️ Atmospheric Visibility</span>
              <strong style="color:#38bdf8; font-size:12px;">40m (Dense Mountain Fog)</strong>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:11px; color:#94a3b8;">
              📡 Telemetry Provider: <b>MDoNER Ground Sensor Node #401-B</b>
            </div>
            <button onclick="window.flagObstruction('${locationName}')" style="background:linear-gradient(135deg, #ef4444, #dc2626); color:white; border:none; padding:10px 18px; border-radius:10px; font-weight:800; font-size:12px; cursor:pointer; box-shadow:0 4px 12px rgba(239,68,68,0.4); display:flex; align-items:center; gap:6px;">
              🚩 Flag Road Obstruction / Report to MDoNER Control
            </button>
          </div>

        </div>
      `;
    };

    window.flagObstruction = (loc) => {
      const modal = document.getElementById('streetViewModal');
      if (modal) modal.remove();
      
      let banner = document.getElementById('aiAlertBanner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'aiAlertBanner';
        document.body.appendChild(banner);
      }
      banner.style.cssText = 'position:fixed; top:14px; left:50%; transform:translateX(-50%); width:90%; max-width:820px; background:rgba(15, 23, 42, 0.95); border:1.5px solid #ef4444; border-radius:12px; padding:10px 16px; color:#f8fafc; z-index:10000; backdrop-filter:blur(12px); box-shadow:0 10px 30px rgba(0,0,0,0.6); display:flex; align-items:center; gap:12px; font-family:system-ui, -apple-system, sans-serif;';
      banner.innerHTML = `
        <div style="font-size:22px;">🚨</div>
        <div style="flex:1;">
          <div style="font-weight:800; font-size:12px; color:#fca5a5; letter-spacing:0.5px; text-transform:uppercase;">
            ROAD OBSTRUCTION FLAGGED TO MDoNER CONTROL
          </div>
          <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">
            Field Recon Snapshot for <b>${loc}</b> logged to MDoNER Emergency Dispatch & Relief Queue.
          </div>
        </div>
        <button onclick="document.getElementById('aiAlertBanner').remove()" style="background:transparent; border:none; color:#94a3b8; font-size:16px; cursor:pointer;">✖</button>
      `;
      setTimeout(() => { if (banner) banner.remove(); }, 6000);
    };

    // Floating Compact Control Bar Switcher (Top Right)
    const pillControl = L.control({ position: 'topright' });
    pillControl.onAdd = function() {
      const div = L.DomUtil.create('div', 'leaflet-pill-control');
      div.style.cssText = `
        display: flex;
        gap: 8px;
        align-items: center;
        position: relative;
        z-index: 1000;
        user-select: none;
      `;

      div.innerHTML = `
        <div class="pill-basemap-box" style="
          background: rgba(15, 23, 42, 0.90);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 20px;
          padding: 3px 8px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          color: #f1f5f9;
          cursor: pointer;
          position: relative;
        ">
          <div class="pill-btn" style="display: flex; align-items: center; gap: 6px; padding: 4px 8px;">
            <span class="pill-label">🗺️ Street Map</span>
            <span style="font-size: 0.65rem; color: #94a3b8; margin-left: 2px;">▼</span>
          </div>
          <div class="pill-dropdown" style="
            display: none;
            position: absolute;
            top: 115%;
            right: 0;
            background: rgba(15, 23, 42, 0.96);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(99, 102, 241, 0.4);
            border-radius: 12px;
            padding: 6px;
            box-shadow: 0 12px 28px rgba(0, 0, 0, 0.6);
            min-width: 165px;
            flex-direction: column;
            gap: 4px;
            z-index: 1001;
          ">
            <div data-mode="street" class="pill-opt" style="padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;">🗺️ Street Map</div>
            <div data-mode="satellite" class="pill-opt" style="padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;">🛰️ Satellite</div>
            <div data-mode="terrain" class="pill-opt" style="padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;">⛰️ Terrain</div>
            <div data-mode="night" class="pill-opt" style="padding: 8px 12px; border-radius: 8px; cursor: pointer; transition: background 0.15s ease;">🌙 Night Mode</div>
          </div>
        </div>

        <button id="btn3DToggle" onclick="window.toggle3DView()" style="
          background: rgba(15, 23, 42, 0.90);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.4);
          border-radius: 20px;
          padding: 6px 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #f1f5f9;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          🏔️ 3D View
        </button>

        <button id="btnStreetView" onclick="window.openStreetViewModal('Bhalukpong-Tipi Corridor', 27.0134, 92.6416)" style="
          background: rgba(15, 23, 42, 0.90);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(6, 182, 212, 0.4);
          border-radius: 20px;
          padding: 6px 12px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 700;
          color: #38bdf8;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          📸 Street View
        </button>

        <button id="btnMainPage" onclick="window.goToMainPage()" style="
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border: 1px solid #3b82f6;
          border-radius: 20px;
          padding: 6px 14px;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.5);
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 0.82rem;
          font-weight: 800;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        ">
          🏠 Main Page
        </button>
      `;

      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);

      const btn = div.querySelector('.pill-btn');
      const dropdown = div.querySelector('.pill-dropdown');
      const label = div.querySelector('.pill-label');

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
      });

      document.addEventListener('click', () => {
        dropdown.style.display = 'none';
      });

      const options = div.querySelectorAll('.pill-opt');
      options.forEach(opt => {
        opt.addEventListener('mouseenter', () => {
          opt.style.background = 'rgba(99, 102, 241, 0.3)';
        });
        opt.addEventListener('mouseleave', () => {
          opt.style.background = 'transparent';
        });
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const mode = opt.getAttribute('data-mode');
          if (layers[mode]) {
            map.removeLayer(activeBasemap);
            layers[mode].layer.addTo(map);
            activeBasemap = layers[mode].layer;
            label.textContent = layers[mode].name;
          }
          dropdown.style.display = 'none';
        });
      });

      return div;
    };

    pillControl.addTo(map);

    leafletInstance.current = map;
    layersGroup.current = L.layerGroup().addTo(map);
    rerouteGroup.current = L.layerGroup().addTo(map);

    }

    const map = leafletInstance.current;
    const group = layersGroup.current;
    const rerouteGrp = rerouteGroup.current;

    // Helper for Google Maps dual-layer solid road polyline rendering
    function renderSolidRoadSegment(coords, coreColor, casingColor = '#0f172a', weight = 6, opacity = 1.0) {
      // Dark outer casing for Google Maps contrast
      L.polyline(coords, {
        color: casingColor,
        weight: weight + 4,
        opacity: 0.75,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(rerouteGrp);

      // Vibrant solid inner core line
      return L.polyline(coords, {
        color: coreColor,
        weight: weight,
        opacity: opacity,
        lineCap: 'round',
        lineJoin: 'round'
      }).addTo(rerouteGrp);
    }

    // Attach OSRM Road-Snapped Predictive AI Local Detour Reroute & Handlers
    window.triggerReroute = async (workerId) => {
      rerouteGrp.clearLayers();

      const unitData = UNIT_REROUTE_DATA[workerId] || UNIT_REROUTE_DATA["NER-MED-01"];

      // 1. Inject Top-of-Map Floating AI Predictive Alert Banner
      let banner = document.getElementById('aiAlertBanner');
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'aiAlertBanner';
        const mapContainer = map.getContainer();
        mapContainer.appendChild(banner);
      }
      banner.style.cssText = 'position:absolute; top:14px; left:50%; transform:translateX(-50%); width:90%; max-width:820px; background:rgba(15, 23, 42, 0.95); border:1.5px solid #f59e0b; border-radius:12px; padding:10px 16px; color:#f8fafc; z-index:1000; backdrop-filter:blur(12px); box-shadow:0 10px 30px rgba(0,0,0,0.6); display:flex; align-items:center; gap:12px; font-family:system-ui, -apple-system, sans-serif;';
      banner.innerHTML = `
        <div style="font-size:22px;">🛡️</div>
        <div style="flex:1;">
          <div style="font-weight:800; font-size:11px; color:#f59e0b; letter-spacing:0.5px; text-transform:uppercase;">
            ${unitData.riskMsg}
          </div>
          <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">
            ${unitData.alertBanner}
          </div>
        </div>
        <button onclick="document.getElementById('aiAlertBanner').remove()" style="background:transparent; border:none; color:#94a3b8; font-size:16px; cursor:pointer;">✖</button>
      `;

      // 2. Fetch Real OSRM Road Geometry for all 4 segments in parallel
      const [segACoords, segBCoords, segCCoords, segDCoords] = await Promise.all([
        fetchRealRoadGeometry(unitData.segA_waypoints),
        fetchRealRoadGeometry(unitData.segB_waypoints),
        fetchRealRoadGeometry(unitData.segC_waypoints),
        fetchRealRoadGeometry(unitData.segD_waypoints)
      ]);

      // 3. Segment A: Pre-Warning Highway (Origin -> Detour Fork) [SOLID ROYAL BLUE #2563EB]
      const polyA = renderSolidRoadSegment(segACoords, '#2563EB', '#0f172a', 6, 1.0);
      polyA.bindTooltip(`<b>📍 Pre-Warning Highway</b><br/>Origin ➔ Detour Fork`, { direction: 'top' });

      // 4. Segment B: Predictive Risk Zone Stretch (Detour Fork -> Detour Rejoin) [SOLID AMBER/RED #F97316]
      const polyB = renderSolidRoadSegment(segBCoords, '#F97316', '#451a03', 6, 0.85);
      polyB.bindTooltip(`<b>⚠️ Impending Risk: ${unitData.hazardZoneName}</b>`, { permanent: true, direction: 'top' });

      // Glowing Predictive Risk Zone Circle Marker with Environmental Telemetry
      const midBIdx = Math.floor(segBCoords.length / 2);
      const midBPoint = segBCoords[midBIdx] || segBCoords[0];
      
      L.circle(midBPoint, {
        radius: 4000,
        color: '#f59e0b',
        fillColor: '#ef4444',
        fillOpacity: 0.25,
        weight: 2,
        dashArray: '6, 6'
      }).addTo(rerouteGrp);

      const riskIcon = L.divIcon({
        className: 'custom-risk-marker',
        html: `<div style="background:#f59e0b; color:#0f172a; font-size:11px; font-weight:800; padding:4px 8px; border-radius:12px; border:2px solid white; box-shadow:0 0 14px #f59e0b; white-space:nowrap; display:flex; align-items:center; gap:4px;">⚠️ <span>HIGH RISK ZONE</span></div>`,
        iconSize: [120, 26],
        iconAnchor: [60, 13]
      });
      L.marker(midBPoint, { icon: riskIcon }).addTo(rerouteGrp)
       .bindPopup(`
         <div style="font-family:system-ui; color:#0f172a; padding:2px;">
           <strong style="color:#c2410c;">⚠️ PREDICTIVE HAZARD TELEMETRY</strong><br/>
           <div style="font-size:11px; margin-top:4px;">
             <b>Zone:</b> ${unitData.hazardZoneName}<br/>
             <b>🌧️ Rainfall:</b> ${unitData.rainfallRate} (Crit: >85mm)<br/>
             <b>💧 Soil Moisture:</b> ${unitData.soilSaturation}<br/>
             <b>📈 Stability Index:</b> ${unitData.slopeStability}
           </div>
         </div>
       `);

      // 5. Segment C: AI Preemptive Detour (Detour Fork -> Detour Rejoin) [SOLID CRISP TEAL #0D9488 / #06B6D4]
      const polyC = renderSolidRoadSegment(segCCoords, '#06B6D4', '#042f2e', 7, 1.0);
      polyC.bindTooltip(`<b>✅ AI Local Bypass (${unitData.distanceDelta})</b><br/>${unitData.alternateName}`, { permanent: true, direction: 'bottom' });

      // Add Detour Fork and Rejoin Markers
      const forkPt = unitData.segC_waypoints[0];
      const rejoinPt = unitData.segC_waypoints[unitData.segC_waypoints.length - 1];

      L.circleMarker(forkPt, {
        radius: 8,
        color: '#06b6d4',
        fillColor: '#6366f1',
        fillOpacity: 1,
        weight: 3
      }).addTo(rerouteGrp).bindPopup(`<b>🔀 Detour Fork (Km ${unitData.distanceDelta})</b><br/>Leave Primary Highway<br/>Enter ${unitData.alternateName}`);

      L.circleMarker(rejoinPt, {
        radius: 8,
        color: '#10b981',
        fillColor: '#059669',
        fillOpacity: 1,
        weight: 3
      }).addTo(rerouteGrp).bindPopup(`<b>🔁 Detour Rejoin</b><br/>Re-enter Primary Highway Corridor to Destination`);

      // 6. Segment D: Post-Detour Highway (Detour Rejoin -> Destination) [SOLID ROYAL BLUE #2563EB]
      const polyD = renderSolidRoadSegment(segDCoords, '#2563EB', '#0f172a', 6, 1.0);
      polyD.bindTooltip(`<b>🏁 Final Leg to Destination</b><br/>Detour Rejoin ➔ Destination`, { direction: 'top' });

      // 7. Auto Zoom & Focus onto the Detour Corridor
      const detourGroup = L.featureGroup([polyB, polyC]);
      map.fitBounds(detourGroup.getBounds(), { padding: [60, 60] });

      // 8. Render Unit-Specific Floating Route Comparison Drawer
      let drawer = document.getElementById('rerouteDrawer');
      if (!drawer) {
        drawer = document.createElement('div');
        drawer.id = 'rerouteDrawer';
        document.body.appendChild(drawer);
      }

      drawer.innerHTML = `
        <div style="position:fixed; bottom:20px; right:20px; width:420px; max-width:90vw; background:rgba(15,23,42,0.95); border:2px solid #06b6d4; border-radius:16px; padding:18px; color:#f8fafc; z-index:9999; backdrop-filter:blur(12px); box-shadow:0 20px 40px rgba(0,0,0,0.7); font-family:system-ui, -apple-system, sans-serif;">
          
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:8px;">
            <div>
              <div style="font-weight:800; font-size:13px; color:#06b6d4;">🛡️ AI Predictive Early-Warning Reroute</div>
              <div style="font-size:11px; color:#94a3b8; font-weight:700;">${unitData.unitName}</div>
            </div>
            <span style="background:#0f172a; border:1px solid #334155; color:#a7f3d0; font-family:monospace; font-weight:800; font-size:11px; padding:3px 8px; border-radius:4px;">
              🚘 ${unitData.regNumber}
            </span>
          </div>

          <div style="background:rgba(245,158,11,0.15); border:1px solid #f59e0b; padding:8px 10px; border-radius:8px; font-size:11px; margin-bottom:10px; color:#fef3c7;">
            <div style="font-weight:800; color:#fbbf24; margin-bottom:3px;">📡 ENVIRONMENTAL SENSOR TELEMETRY:</div>
            🌧️ <b>Rainfall:</b> ${unitData.rainfallRate} • 💧 <b>Soil Sat:</b> ${unitData.soilSaturation}<br/>
            📈 <b>Stability:</b> ${unitData.slopeStability}
          </div>

          <div style="font-size:11px; margin-bottom:10px;">
            <div style="margin-bottom:4px;"><strong style="color:#f97316;">⚠️ Risk Pocket:</strong> ${unitData.hazardZoneName}</div>
            <div><strong style="color:#10b981;">✅ Hyper-Local Bypass:</strong> ${unitData.alternateName}</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; background:rgba(30,41,59,0.8); padding:10px; border-radius:10px; margin-bottom:12px; font-size:11px;">
            <div>
              <span style="color:#94a3b8; display:block;">Hyper-Local Delta</span>
              <strong style="font-size:13px; color:#10b981;">${unitData.distanceDelta} <span style="font-size:10px; color:#94a3b8;">(${unitData.totalDist})</span></strong>
            </div>
            <div>
              <span style="color:#94a3b8; display:block;">ETA Impact</span>
              <strong style="font-size:13px; color:#f59e0b;">${unitData.delayImpact} <span style="font-size:10px; color:#94a3b8;">(${unitData.revisedEta})</span></strong>
            </div>
          </div>

          <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:8px 10px; border-radius:8px; font-size:11px; margin-bottom:14px; color:#a7f3d0;">
            🛡️ <strong>Risk Mitigation:</strong> ${unitData.riskMitigation}
          </div>

          <div id="toastMessage" style="display:none; padding:8px; background:#10b981; color:white; border-radius:6px; font-size:11px; font-weight:700; margin-bottom:10px; text-align:center;"></div>

          <div style="display:flex; gap:8px;">
            <button onclick="window.dispatchRerouteDriver('${unitData.regNumber}')" style="flex:2; background:linear-gradient(135deg, #6366f1, #06b6d4); color:white; border:none; padding:10px; border-radius:8px; font-weight:700; font-size:11px; cursor:pointer;">
              📲 Dispatch Reroute to Driver
            </button>
            <button onclick="window.clearReroute()" style="flex:1; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; padding:10px; border-radius:8px; font-weight:700; font-size:11px; cursor:pointer;">
              ✖ Clear
            </button>
          </div>

        </div>
      `;
    };

    window.dispatchRerouteDriver = (regNum) => {
      const toast = document.getElementById('toastMessage');
      if (toast) {
        toast.style.display = 'block';
        toast.textContent = `✅ Reroute telemetry successfully pushed to telematics unit ${regNum}!`;
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      }
    };

    window.clearReroute = () => {
      rerouteGrp.clearLayers();
      const drawer = document.getElementById('rerouteDrawer');
      if (drawer) drawer.remove();
      const banner = document.getElementById('aiAlertBanner');
      if (banner) banner.remove();
      const nerBounds = L.latLngBounds([21.5, 89.5], [29.5, 97.5]);
      map.fitBounds(nerBounds);
    };

    window.pingVehicle = (workerId) => {
      const unitData = UNIT_REROUTE_DATA[workerId] || UNIT_REROUTE_DATA["NER-MED-01"];
      let toast = document.getElementById('toastMessage');
      if (!toast) {
        window.triggerReroute(workerId);
        toast = document.getElementById('toastMessage');
      }
      if (toast) {
        toast.style.display = 'block';
        toast.textContent = `📡 Satellite Telemetry Ping dispatched to Unit ${unitData.regNumber}!`;
        setTimeout(() => { toast.style.display = 'none'; }, 4000);
      }
    };

    group.clearLayers();

    // 1. Draw Active Field Workers / Relief Vehicles (NER)
    if (selectedLayers.workers && workers.length > 0) {
      workers.forEach(w => {
        const icon = L.divIcon({
          className: 'custom-worker-marker',
          html: `<div style="background:#6366f1; width:34px; height:34px; border-radius:50%; border:3px solid white; display:flex; justify-content:center; align-items:center; color:white; font-size:16px; box-shadow:0 0 14px #6366f1; cursor:pointer;">🚚</div>`,
          iconSize: [34, 34]
        });

        const marker = L.marker([w.location.lat, w.location.lon], { icon }).addTo(group);

        const regNum = w.reg_number || "AS-01-GB-4012";
        const priority = w.priority_tag || "CRITICAL (Priority-1)";
        const cargo = w.cargo_type || "Emergency Relief Supplies";
        const weight = w.cargo_weight || "2.5 MT";
        const origin = w.origin || "Guwahati Central Depot";
        const destination = w.destination || "Tawang Relief Center";
        const speed = w.speed_kmh || 38;
        const routeStatus = w.route_status || "On Schedule / Moving";
        const eta = w.eta || "Today, 18:30 IST";
        const driver = w.driver_name || "Rajesh Borah";
        const contact = w.contact_number || "+91 94350-12890";
        const isCritical = priority.includes("CRITICAL");

        const popupHtml = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 290px; color: #0f172a; padding: 4px;">
            
            <!-- REGISTRATION & PRIORITY HEADER -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
              <span style="background:#0f172a; color:#f8fafc; font-family:monospace; font-weight:800; font-size:13px; padding:3px 8px; border-radius:4px; letter-spacing:0.5px; border:1px solid #334155;">
                🚘 ${regNum}
              </span>
              <span style="background:${isCritical ? '#fee2e2' : '#fef3c7'}; color:${isCritical ? '#991b1b' : '#92400e'}; font-size:10px; font-weight:800; padding:3px 8px; border-radius:12px; border:1px solid ${isCritical ? '#fca5a5' : '#fde68a'};">
                ${priority}
              </span>
            </div>

            <!-- UNIT NAME & ROLE -->
            <div style="font-weight:800; font-size:14px; color:#1e293b; margin-bottom:2px;">
              ${w.name}
            </div>
            <div style="font-size:11px; color:#64748b; margin-bottom:10px; font-weight:600;">
              📍 ${w.role}
            </div>

            <!-- CARGO DETAILS BOX -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px; margin-bottom:10px; font-size:11px;">
              <div style="color:#475569; font-weight:700; margin-bottom:2px;">📦 CARGO MANIFEST & LOAD:</div>
              <div style="color:#0f172a; font-weight:600;">${cargo}</div>
              <div style="color:#6366f1; font-weight:700; margin-top:2px;">Weight: ${weight}</div>
            </div>

            <!-- TRIP & TELEMETRY GRID -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px; font-size:11px; margin-bottom:10px;">
              <div style="background:#eff6ff; padding:6px; border-radius:6px; border:1px solid #bfdbfe;">
                <span style="color:#1e40af; font-weight:700; display:block;">🏁 TRIP ROUTE</span>
                <span style="color:#1e293b; font-weight:600;">${origin} ➔ ${destination}</span>
              </div>
              <div style="background:#f0fdf4; padding:6px; border-radius:6px; border:1px solid #bbf7d0;">
                <span style="color:#166534; font-weight:700; display:block;">⚡ SPEED & STATUS</span>
                <span style="color:#15803d; font-weight:700;">${speed} km/h • ${routeStatus}</span>
              </div>
            </div>

            <!-- LIVE ETA -->
            <div style="font-size:11px; background:#fff7ed; border:1px solid #ffedd5; padding:6px 8px; border-radius:6px; margin-bottom:10px;">
              <strong style="color:#c2410c;">⏱️ LIVE ETA:</strong> <span style="color:#9a3412; font-weight:600;">${eta}</span>
            </div>

            <!-- DRIVER & EMERGENCY CONTACT -->
            <div style="font-size:11px; color:#475569; border-top:1px solid #e2e8f0; padding-top:6px; margin-bottom:10px; display:flex; justify-content:space-between;">
              <span>👤 <b>Driver:</b> ${driver}</span>
              <span>📞 <b>Contact:</b> <a href="tel:${contact}" style="color:#6366f1; text-decoration:none; font-weight:700;">${contact}</a></span>
            </div>

            <!-- ACTION BUTTONS -->
            <div style="display:flex; gap:4px; margin-top:6px;">
              <button onclick="window.triggerReroute('${w.worker_id}')" style="flex:1; background:#6366f1; color:white; border:none; padding:7px 2px; border-radius:6px; font-size:9.5px; font-weight:700; cursor:pointer; box-shadow:0 2px 4px rgba(99,102,241,0.3);">
                🔀 Alternate
              </button>
              <button onclick="window.openStreetViewModal('${w.name}', ${w.location.lat}, ${w.location.lon})" style="flex:1; background:#06b6d4; color:white; border:none; padding:7px 2px; border-radius:6px; font-size:9.5px; font-weight:700; cursor:pointer; box-shadow:0 2px 4px rgba(6,182,212,0.3);">
                📸 360° Recon
              </button>
              <button onclick="window.pingVehicle('${w.worker_id}')" style="flex:1; background:#059669; color:white; border:none; padding:7px 2px; border-radius:6px; font-size:9.5px; font-weight:700; cursor:pointer; box-shadow:0 2px 4px rgba(5,150,105,0.3);">
                📡 Alert
              </button>
            </div>

          </div>
        `;

        marker.bindPopup(popupHtml, { maxWidth: 320 });
      });
    }

    // 2. Draw Active Hazard Zones (Circles)
    if (selectedLayers.hazards && hazards.length > 0) {
      hazards.forEach(h => {
        const circle = L.circle([h.lat, h.lon], {
          color: '#ef4444',
          fillColor: '#ef4444',
          fillOpacity: 0.3,
          radius: (h.radius || 6.0) * 1000
        }).addTo(group);

        circle.bindPopup(`
          <div style="color:#000; font-family:sans-serif;">
            <strong style="color:#ef4444;">⚠️ HAZARD: ${h.type}</strong><br/>
            <span>Risk Severity: <b>${h.risk}</b></span>
          </div>
        `);
      });
    }

    // 3. Draw AI Optimized Route Polyline if present
    if (route && route.waypoints && route.waypoints.length > 0) {
      const latlngs = route.waypoints.map(p => [p.lat, p.lon]);
      const polyline = L.polyline(latlngs, {
        color: '#06b6d4',
        weight: 6,
        opacity: 0.9,
        dashArray: '10, 8'
      }).addTo(group);

      map.fitBounds(polyline.getBounds(), { padding: [40, 40] });
    }

  }, [workers, hazards, route, selectedLayers]);

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '12px' }} />;
}
