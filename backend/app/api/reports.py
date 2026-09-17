import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from typing import List
from app.models import FieldReportCreate, FieldReportResponse

router = APIRouter(prefix="/api/v1/reports", tags=["Field Reports"])

REPORTS_DATABASE: List[FieldReportResponse] = [
    FieldReportResponse(
        report_id="NER-REP-101",
        category="Hazard",
        severity="Critical",
        description="Major landslide blocking highway near Bhalukpong / Bomdila sector. Emergency cleared detour required.",
        location={"lat": 27.0134, "lon": 92.6416},
        reporter_id="NER-DISASTER-03",
        photo_url="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b2?w=500&q=80",
        timestamp="2026-09-13T09:30:00Z",
        status="Triaged"
    ),
    FieldReportResponse(
        report_id="NER-REP-102",
        category="Infrastructure",
        severity="High",
        description="Heavy monsoon waterlogging & inundation along Silchar Highway section.",
        location={"lat": 24.8100, "lon": 92.8000},
        reporter_id="NER-RATION-02",
        photo_url=None,
        timestamp="2026-09-13T09:55:00Z",
        status="Under Review"
    )
]

@router.post("/submit", response_model=FieldReportResponse)
async def submit_field_report(report: FieldReportCreate):
    """Submits a new mobile field report with NER GPS coordinates and severity."""
    new_id = f"NER-REP-{uuid.uuid4().hex[:4].upper()}"
    new_report = FieldReportResponse(
        report_id=new_id,
        category=report.category,
        severity=report.severity,
        description=report.description,
        location=report.location,
        reporter_id=report.reporter_id,
        photo_url=report.photo_url,
        timestamp=datetime.utcnow().isoformat() + "Z",
        status="Pending Triage"
    )
    REPORTS_DATABASE.insert(0, new_report)
    return new_report

@router.get("/list", response_model=List[FieldReportResponse])
async def list_field_reports():
    """Retrieves all submitted field reports for NER GIS Command view."""
    return REPORTS_DATABASE
