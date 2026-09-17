import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import routing, gis, reports

app = FastAPI(
    title="GeoRoute AI - Backend Spatial API",
    description="FastAPI service for AI Spatial Routing, GIS Layer Management & Mobile Field Reporting",
    version="1.0.0"
)

# Enable CORS for Next.js PWA Frontend & Mobile clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Router Endpoints
app.include_router(routing.router)
app.include_router(gis.router)
app.include_router(reports.router)

@app.get("/")
async def root():
    return {
        "app": "GeoRoute AI - Backend API",
        "status": "Online & Operational",
        "endpoints": {
            "swagger_docs": "/docs",
            "routing_api": "/api/v1/routing/optimize",
            "gis_workers": "/api/v1/gis/workers",
            "gis_layers": "/api/v1/gis/layers",
            "field_reports": "/api/v1/reports/list"
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
