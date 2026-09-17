import math
import uuid
from typing import List, Dict, Any
from app.models import LatLon, RouteRequest, RouteResponse, StepInstruction

class AIRoutingService:
    def __init__(self):
        # Known spatial hazard zones in North Eastern Region (NER)
        self.hazards = [
            {"id": "HAZ-101", "lat": 27.0134, "lon": 92.6416, "radius": 8.0, "risk": "Critical", "type": "Landslide Blockage (Bhalukpong-Bomdila Route)"},
            {"id": "HAZ-102", "lat": 24.8100, "lon": 92.8000, "radius": 6.0, "risk": "High", "type": "Highway Waterlogging (Silchar Route)"},
            {"id": "HAZ-103", "lat": 26.6500, "lon": 92.8000, "radius": 5.0, "risk": "Medium", "type": "Substation Washout (Tezpur Sector)"}
        ]

    def haversine_distance(self, p1: LatLon, p2: LatLon) -> float:
        """Calculate distance in kilometers between two lat/lon coordinates."""
        R = 6371.0 # Earth radius in km
        dlat = math.radians(p2.lat - p1.lat)
        dlon = math.radians(p2.lon - p1.lon)
        a = (math.sin(dlat / 2) ** 2 +
             math.cos(math.radians(p1.lat)) * math.cos(math.radians(p2.lat)) * math.sin(dlon / 2) ** 2)
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return R * c

    def is_near_hazard(self, point: LatLon) -> float:
        """Returns risk penalty factor if point is near any active hazard."""
        max_penalty = 1.0
        for h in self.hazards:
            dist = self.haversine_distance(point, LatLon(lat=h["lat"], lon=h["lon"]))
            if dist < h["radius"]:
                penalty = (1.0 - (dist / h["radius"])) * 3.0
                if penalty > max_penalty:
                    max_penalty = penalty
        return max_penalty

    def compute_ai_route(self, req: RouteRequest) -> RouteResponse:
        """Calculates optimal spatial route with AI hazard avoidance in NER."""
        steps_count = 8
        waypoints: List[LatLon] = []
        instructions: List[StepInstruction] = []

        total_distance = 0.0
        hazard_risk_accum = 0.0

        for i in range(steps_count + 1):
            t = i / float(steps_count)
            lat = req.origin.lat + t * (req.destination.lat - req.origin.lat)
            lon = req.origin.lon + t * (req.destination.lon - req.origin.lon)
            
            curr_pt = LatLon(lat=lat, lon=lon)
            hazard_penalty = self.is_near_hazard(curr_pt)

            if req.avoid_hazards and hazard_penalty > 1.2:
                # Apply AI Spatial Detour offset perpendicular to route vector
                offset_lat = 0.04 * req.hazard_penalty_weight * (1.0 if i % 2 == 0 else -1.0)
                offset_lon = 0.04 * req.hazard_penalty_weight * (1.0 if i % 2 != 0 else -1.0)
                lat += offset_lat
                lon += offset_lon
                curr_pt = LatLon(lat=lat, lon=lon)
                hazard_risk_accum += (hazard_penalty - 1.0)

            waypoints.append(curr_pt)

            if i > 0:
                prev_pt = waypoints[i - 1]
                seg_dist = self.haversine_distance(prev_pt, curr_pt)
                total_distance += seg_dist

                speed_kmh = 40.0 if req.priority == "safest" else 55.0
                duration = (seg_dist / speed_kmh) * 60.0

                warn = "Detouring around mountain landslide hazard zone" if hazard_penalty > 1.2 else None
                instructions.append(StepInstruction(
                    instruction=f"Proceed along NER Corridor segment {i} towards ({round(lat, 4)}, {round(lon, 4)})",
                    distance_km=round(seg_dist, 2),
                    duration_min=round(duration, 1),
                    hazard_warning=warn
                ))

        est_time_min = round((total_distance / (40.0 if req.priority == "safest" else 55.0)) * 60.0, 1)
        risk_score = round(min(10.0, hazard_risk_accum * 1.5), 1)

        geojson_geom = {
            "type": "LineString",
            "coordinates": [[p.lon, p.lat] for p in waypoints]
        }

        return RouteResponse(
            route_id=f"NER-ROUTE-{uuid.uuid4().hex[:6].upper()}",
            total_distance_km=round(total_distance, 2),
            estimated_time_min=est_time_min,
            hazard_risk_score=risk_score,
            waypoints=waypoints,
            geojson_geometry=geojson_geom,
            turn_instructions=instructions
        )

ai_router = AIRoutingService()
