from fastapi import APIRouter
from typing import List
from app.models import GISWorker, LatLon

router = APIRouter(prefix="/api/v1/gis", tags=["GIS Data Layers"])

# Real North Eastern Region (NER) Field Relief Convoys with Rich Telemetry & License Plates
MOCK_WORKERS = [
    GISWorker(
        worker_id="NER-MED-01",
        name="Unit 1 (Emergency Medicine)",
        role="Guwahati to Tawang Corridor Relief",
        status="Active Patrol",
        location=LatLon(lat=26.1445, lon=91.7362),
        battery_level=94,
        reg_number="AS-01-GB-4012",
        cargo_type="Life-Saving Vaccines & Medicines (Cold Chain)",
        cargo_weight="2.5 Metric Tonnes",
        priority_tag="CRITICAL (Priority-1)",
        origin="Guwahati Central Depot",
        destination="Tawang Military Hospital",
        speed_kmh=38,
        route_status="Rerouted via Foothills",
        eta="Today, 18:30 IST (Delayed +45 mins: Bhalukpong alert)",
        driver_name="Rajesh Borah",
        contact_number="+91 94350-12890"
    ),
    GISWorker(
        worker_id="NER-RATION-02",
        name="Unit 2 (Food Ration)",
        role="Shillong to Silchar Highway Convoy",
        status="En Route",
        location=LatLon(lat=25.5788, lon=91.8933),
        battery_level=88,
        reg_number="ML-05-B-7890",
        cargo_type="Emergency Dry Food & Clean Water Rations",
        cargo_weight="6.0 Metric Tonnes",
        priority_tag="HIGH",
        origin="Shillong Relief Warehouse",
        destination="Silchar Relief Camp 4",
        speed_kmh=42,
        route_status="On Schedule / Moving",
        eta="Today, 16:15 IST",
        driver_name="Ksanbor Lyngdoh",
        contact_number="+91 98620-54321"
    ),
    GISWorker(
        worker_id="NER-DISASTER-03",
        name="Unit 3 (Landslide Rapid Action)",
        role="Bomdila Sector Response",
        status="On Scene",
        location=LatLon(lat=27.2500, lon=92.4000),
        battery_level=82,
        reg_number="AR-01-C-2045",
        cargo_type="Heavy Earthmoving Hydraulic Equipment",
        cargo_weight="12.0 Metric Tonnes",
        priority_tag="CRITICAL (Priority-1)",
        origin="Tezpur Heavy Yard",
        destination="Bomdila Landslide Sector",
        speed_kmh=25,
        route_status="Clearing Debris",
        eta="Today, 14:00 IST",
        driver_name="Tsering Dorjee",
        contact_number="+91 94360-88123"
    ),
    GISWorker(
        worker_id="NER-TELECOM-04",
        name="Unit 4 (Telecom Restorer)",
        role="Kohima / Imphal Highway Survey",
        status="Active Patrol",
        location=LatLon(lat=25.6751, lon=94.1086),
        battery_level=96,
        reg_number="NL-01-H-3391",
        cargo_type="VSAT Mobile Towers & Fiber Cable Spools",
        cargo_weight="3.8 Metric Tonnes",
        priority_tag="HIGH",
        origin="Dimapur Telecom Hub",
        destination="Kohima Highway Relay Base",
        speed_kmh=48,
        route_status="On Schedule / Moving",
        eta="Today, 17:00 IST",
        driver_name="Vikato Sumi",
        contact_number="+91 94362-77410"
    ),
]

MOCK_INFRASTRUCTURE = [
    {"id": "NER-INF-01", "name": "Guwahati Central Logistics Hub", "type": "Emergency Depot", "status": "Operational", "lat": 26.1445, "lon": 91.7362},
    {"id": "NER-INF-02", "name": "Brahmaputra Flood Hydrological Station (Tezpur)", "type": "Water Infrastructure", "status": "Warning", "lat": 26.6338, "lon": 92.8000},
    {"id": "NER-INF-03", "name": "Shillong Mountain Comms Relay Base", "type": "Telecom", "status": "Operational", "lat": 25.5788, "lon": 91.8933},
    {"id": "NER-INF-04", "name": "Silchar District Supply Warehouse", "type": "Ration Depot", "status": "Operational", "lat": 24.8333, "lon": 92.7789},
]

@router.get("/workers", response_model=List[GISWorker])
async def get_active_workers():
    """Returns active NER field units with rich vehicle telemetry & registration details."""
    return MOCK_WORKERS

@router.get("/layers")
async def get_gis_layers():
    """Returns North Eastern Region spatial infrastructure layers in GeoJSON format."""
    features = []
    for item in MOCK_INFRASTRUCTURE:
        features.append({
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [item["lon"], item["lat"]]
            },
            "properties": {
                "id": item["id"],
                "name": item["name"],
                "type": item["type"],
                "status": item["status"]
            }
        })

    return {
        "type": "FeatureCollection",
        "features": features
    }
