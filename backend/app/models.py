from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class LatLon(BaseModel):
    lat: float = Field(..., example=37.7749)
    lon: float = Field(..., example=-122.4194)

class RouteRequest(BaseModel):
    origin: LatLon
    destination: LatLon
    avoid_hazards: bool = True
    hazard_penalty_weight: float = Field(default=2.5, ge=1.0, le=10.0)
    priority: str = Field(default="safest", example="safest") # "safest" or "fastest"

class StepInstruction(BaseModel):
    instruction: str
    distance_km: float
    duration_min: float
    hazard_warning: Optional[str] = None

class RouteResponse(BaseModel):
    route_id: str
    total_distance_km: float
    estimated_time_min: float
    hazard_risk_score: float
    waypoints: List[LatLon]
    geojson_geometry: Dict[str, Any]
    turn_instructions: List[StepInstruction]

class FieldReportCreate(BaseModel):
    category: str = Field(..., example="Infrastructure Damage")
    severity: str = Field(..., example="High") # Low, Medium, High, Critical
    description: str
    location: LatLon
    reporter_id: str = "FIELD-WORKER-09"
    photo_url: Optional[str] = None

class FieldReportResponse(FieldReportCreate):
    report_id: str
    timestamp: str
    status: str = "Pending Triage"

class GISWorker(BaseModel):
    worker_id: str
    name: str
    role: str
    status: str
    location: LatLon
    battery_level: int
    reg_number: Optional[str] = "AS-01-GB-4012"
    cargo_type: Optional[str] = "Emergency Medical Rations"
    cargo_weight: Optional[str] = "2.5 MT"
    priority_tag: Optional[str] = "CRITICAL (Priority-1)"
    origin: Optional[str] = "Guwahati Central Depot"
    destination: Optional[str] = "Tawang Civil Hospital"
    speed_kmh: Optional[int] = 38
    route_status: Optional[str] = "On Schedule / Moving"
    eta: Optional[str] = "Today, 18:30 IST"
    driver_name: Optional[str] = "Rajesh Borah"
    contact_number: Optional[str] = "+91 94350-12890"
