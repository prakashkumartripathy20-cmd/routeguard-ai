const http = require('http');
const PORT = 8000;

const MOCK_WORKERS = [
    {
        worker_id: "NER-MED-01",
        name: "Unit 1 (Emergency Medicine)",
        role: "Guwahati to Tawang Corridor Relief",
        status: "Active Patrol",
        location: { lat: 26.1445, lon: 91.7362 },
        battery_level: 94,
        reg_number: "AS-01-GB-4012",
        cargo_type: "Life-Saving Vaccines & Medicines (Cold Chain)",
        cargo_weight: "2.5 Metric Tonnes",
        priority_tag: "CRITICAL (Priority-1)",
        origin: "Guwahati Central Depot",
        destination: "Tawang Military Hospital",
        speed_kmh: 38,
        route_status: "Rerouted via Foothills",
        eta: "Today, 18:30 IST (Delayed +45 mins: Bhalukpong alert)",
        driver_name: "Rajesh Borah",
        contact_number: "+91 94350-12890"
    },
    {
        worker_id: "NER-RATION-02",
        name: "Unit 2 (Food Ration)",
        role: "Shillong to Silchar Highway Convoy",
        status: "En Route",
        location: { lat: 25.5788, lon: 91.8933 },
        battery_level: 88,
        reg_number: "ML-05-B-7890",
        cargo_type: "Emergency Dry Food & Clean Water Rations",
        cargo_weight: "6.0 Metric Tonnes",
        priority_tag: "HIGH",
        origin: "Shillong Relief Warehouse",
        destination: "Silchar Relief Camp 4",
        speed_kmh: 42,
        route_status: "On Schedule / Moving",
        eta: "Today, 16:15 IST",
        driver_name: "Ksanbor Lyngdoh",
        contact_number: "+91 98620-54321"
    },
    {
        worker_id: "NER-DISASTER-03",
        name: "Unit 3 (Landslide Rapid Action)",
        role: "Bomdila Sector Response",
        status: "On Scene",
        location: { lat: 27.2500, lon: 92.4000 },
        battery_level: 82,
        reg_number: "AR-01-C-2045",
        cargo_type: "Heavy Earthmoving Hydraulic Equipment",
        cargo_weight: "12.0 Metric Tonnes",
        priority_tag: "CRITICAL (Priority-1)",
        origin: "Tezpur Heavy Yard",
        destination: "Bomdila Landslide Sector",
        speed_kmh: 25,
        route_status: "Clearing Debris",
        eta: "Today, 14:00 IST",
        driver_name: "Tsering Dorjee",
        contact_number: "+91 94360-88123"
    },
    {
        worker_id: "NER-TELECOM-04",
        name: "Unit 4 (Telecom Restorer)",
        role: "Kohima / Imphal Highway Survey",
        status: "Active Patrol",
        location: { lat: 25.6751, lon: 94.1086 },
        battery_level: 96,
        reg_number: "NL-01-H-3391",
        cargo_type: "VSAT Mobile Towers & Fiber Cable Spools",
        cargo_weight: "3.8 Metric Tonnes",
        priority_tag: "HIGH",
        origin: "Dimapur Telecom Hub",
        destination: "Kohima Highway Relay Base",
        speed_kmh: 48,
        route_status: "On Schedule / Moving",
        eta: "Today, 17:00 IST",
        driver_name: "Vikato Sumi",
        contact_number: "+91 94362-77410"
    }
];

const MOCK_HAZARDS = [
    { id: "HAZ-101", lat: 27.0134, lon: 92.6416, radius: 8.0, risk: "Critical", type: "Landslide Blockage (Bhalukpong-Bomdila Route)" },
    { id: "HAZ-102", lat: 24.8100, lon: 92.8000, radius: 6.0, risk: "High", type: "Highway Waterlogging (Silchar Route)" },
    { id: "HAZ-103", lat: 26.6500, lon: 92.8000, radius: 5.0, risk: "Medium", type: "Substation Washout (Tezpur Sector)" }
];

const REPORTS_DATABASE = [
    {
        report_id: "NER-REP-101",
        category: "Hazard",
        severity: "Critical",
        description: "Major landslide blocking highway near Bhalukpong / Bomdila sector. Emergency cleared detour required.",
        location: { lat: 27.0134, lon: 92.6416 },
        reporter_id: "NER-DISASTER-03",
        photo_url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?w=500&q=80",
        timestamp: "2026-09-13T09:30:00Z",
        status: "Triaged"
    },
    {
        report_id: "NER-REP-102",
        category: "Infrastructure",
        severity: "High",
        description: "Heavy monsoon waterlogging & inundation along Silchar Highway section.",
        location: { lat: 24.8100, lon: 92.8000 },
        reporter_id: "NER-RATION-02",
        photo_url: null,
        timestamp: "2026-09-13T09:55:00Z",
        status: "Under Review"
    }
];

function calculateHaversine(p1, p2) {
    const R = 6371.0;
    const dlat = (p2.lat - p1.lat) * Math.PI / 180;
    const dlon = (p2.lon - p1.lon) * Math.PI / 180;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(p1.lat * Math.PI / 180) * Math.cos(p2.lat * Math.PI / 180) * Math.sin(dlon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function computeAIRoute(req) {
    const stepsCount = 8;
    const waypoints = [];
    const instructions = [];
    let totalDistance = 0.0;
    let riskScore = 0.0;

    for (let i = 0; i <= stepsCount; i++) {
        const t = i / stepsCount;
        let lat = req.origin.lat + t * (req.destination.lat - req.origin.lat);
        let lon = req.origin.lon + t * (req.destination.lon - req.origin.lon);

        if (req.avoid_hazards) {
            const weight = req.hazard_penalty_weight || 3.0;
            lat += 0.04 * weight * (i % 2 === 0 ? 1 : -1);
            lon += 0.04 * weight * (i % 2 !== 0 ? 1 : -1);
            riskScore += 0.5;
        }

        waypoints.push({ lat, lon });

        if (i > 0) {
            const prev = waypoints[i - 1];
            const dist = calculateHaversine(prev, { lat, lon });
            totalDistance += dist;
            instructions.push({
                instruction: `Proceed along NER Corridor segment ${i} towards (${lat.toFixed(4)}, ${lon.toFixed(4)})`,
                distance_km: parseFloat(dist.toFixed(2)),
                duration_min: parseFloat(((dist / 40) * 60).toFixed(1)),
                hazard_warning: i === 4 ? "Avoid active mountain landslide zone detour" : null
            });
        }
    }

    return {
        route_id: `NER-ROUTE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        total_distance_km: parseFloat(totalDistance.toFixed(2)),
        estimated_time_min: parseFloat(((totalDistance / 40) * 60).toFixed(1)),
        hazard_risk_score: parseFloat(Math.min(10.0, riskScore).toFixed(1)),
        waypoints: waypoints,
        geojson_geometry: {
            type: "LineString",
            coordinates: waypoints.map(p => [p.lon, p.lat])
        },
        turn_instructions: instructions
    };
}

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let bodyStr = '';
    req.on('data', chunk => bodyStr += chunk);
    req.on('end', () => {
        try {
            let body = {};
            if (bodyStr) body = JSON.parse(bodyStr);

            if (req.url === '/' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ status: "GeoRoute AI NER FastAPI Backend Active", version: "1.0.0" }));
            } else if (req.url === '/api/v1/gis/workers' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(MOCK_WORKERS));
            } else if (req.url === '/api/v1/routing/hazards' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ hazards: MOCK_HAZARDS }));
            } else if (req.url === '/api/v1/reports/list' && req.method === 'GET') {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(REPORTS_DATABASE));
            } else if (req.url === '/api/v1/reports/submit' && req.method === 'POST') {
                const newReport = {
                    report_id: `NER-REP-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                    category: body.category || "Hazard",
                    severity: body.severity || "Medium",
                    description: body.description || "",
                    location: body.location || { lat: 26.1445, lon: 91.7362 },
                    reporter_id: body.reporter_id || "NER-FIELD-PWA",
                    photo_url: body.photo_url || null,
                    timestamp: new Date().toISOString(),
                    status: "Pending Triage"
                };
                REPORTS_DATABASE.unshift(newReport);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newReport));
            } else if (req.url === '/api/v1/routing/optimize' && req.method === 'POST') {
                const result = computeAIRoute(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
            } else {
                res.writeHead(404);
                res.end('Not Found');
            }
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
});

server.listen(PORT, () => {
    console.log(`GeoRoute AI NER FastAPI Backend Server running at http://localhost:${PORT}`);
});
