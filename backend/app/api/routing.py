from fastapi import APIRouter, HTTPException
from app.models import RouteRequest, RouteResponse
from app.services.ai_router import ai_router

router = APIRouter(prefix="/api/v1/routing", tags=["AI Routing"])

@router.post("/optimize", response_model=RouteResponse)
async def optimize_route(request: RouteRequest):
    """Calculates AI-optimized route between spatial coordinates with hazard penalty weighting."""
    try:
        response = ai_router.compute_ai_route(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Routing calculation failed: {str(e)}")

@router.get("/hazards")
async def get_route_hazards():
    """Returns active spatial hazards influencing AI routing engine."""
    return {"hazards": ai_router.hazards}
