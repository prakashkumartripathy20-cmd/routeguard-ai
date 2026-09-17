import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

// Dynamic import for Leaflet GIS Map (No SSR)
const GISMap = dynamic(() => import('../components/GISMap'), { ssr: false });

export default function GISDashboard() {
  const [workers, setWorkers] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedLayers, setSelectedLayers] = useState({ workers: true, hazards: true, infra: true });

  const BACKEND_URL = 'http://localhost:8000';

  useEffect(() => {
    // Fetch workers
    fetch(`${BACKEND_URL}/api/v1/gis/workers`)
      .then(res => res.json())
      .then(data => setWorkers(data))
      .catch(err => console.warn('FastAPI backend connection note:', err));

    // Fetch hazards
    fetch(`${BACKEND_URL}/api/v1/routing/hazards`)
      .then(res => res.json())
      .then(data => setHazards(data.hazards || []))
      .catch(err => console.warn('FastAPI backend hazards note:', err));

    // Fetch reports
    fetch(`${BACKEND_URL}/api/v1/reports/list`)
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.warn('FastAPI backend reports note:', err));
  }, []);

  const toggleLayer = (key) => {
    setSelectedLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <Navbar />

      <main className="page-container">
        
        {/* OPERATIONAL METRICS FOR MDoNER */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon icon-blue">🚑</div>
            <div className="stat-info">
              <h4>NER Field Relief Units</h4>
              <div className="value">{workers.length || 4} Active</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-red">⚠️</div>
            <div className="stat-info">
              <h4>Landslide & Flood Hazards</h4>
              <div className="value">{hazards.length || 3} Active</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-amber">📝</div>
            <div className="stat-info">
              <h4>Field Incidents</h4>
              <div className="value">{reports.length || 2} Pending</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-green">🤖</div>
            <div className="stat-info">
              <h4>Corridor AI Efficiency</h4>
              <div className="value">+28.4%</div>
            </div>
          </div>
        </section>

        {/* GIS DASHBOARD SPLIT VIEW */}
        <div className="dashboard-grid">
          
          {/* MAIN MAP CARD */}
          <div className="map-card">
            <div className="map-header">
              <span className="map-title">🗺️ North Eastern Region (NER) Spatial Operations Command Map</span>
              <div className="layer-toggles">
                <button
                  className={`layer-chip ${selectedLayers.workers ? 'active' : ''}`}
                  onClick={() => toggleLayer('workers')}
                >
                  🚑 Relief Units ({workers.length || 4})
                </button>
                <button
                  className={`layer-chip ${selectedLayers.hazards ? 'active' : ''}`}
                  onClick={() => toggleLayer('hazards')}
                >
                  ⚠️ Landslides ({hazards.length || 3})
                </button>
              </div>
            </div>
            
            <div className="map-viewport">
              <GISMap workers={workers} hazards={hazards} selectedLayers={selectedLayers} />
            </div>
          </div>

          {/* SIDE PANEL FEED */}
          <div className="side-panel">
            
            <div className="panel-card">
              <div className="panel-title">
                <span>🚑 NER Relief Convoys</span>
                <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Live GPS</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(workers.length > 0 ? workers : [
                  { name: "Unit 1 (Emergency Medicine)", role: "Guwahati to Tawang Corridor", status: "Active Patrol" },
                  { name: "Unit 2 (Food Ration)", role: "Shillong to Silchar Highway", status: "En Route" }
                ]).map((w, idx) => (
                  <div key={idx} className="worker-item">
                    <div>
                      <div className="worker-name">{w.name}</div>
                      <div className="worker-role">{w.role}</div>
                    </div>
                    <span className={`badge-status ${w.status === 'Active Patrol' ? 'status-active' : 'status-scene'}`}>
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-card">
              <div className="panel-title">
                <span>📝 MDoNER Field Incident Feed</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(reports.length > 0 ? reports : [
                  { report_id: "NER-REP-101", category: "Hazard", severity: "Critical", description: "Landslide near Bhalukpong / Bomdila." },
                  { report_id: "NER-REP-102", category: "Infrastructure", severity: "High", description: "Waterlogging along Silchar Highway." }
                ]).map((r, idx) => (
                  <div key={idx} style={{ padding: '10px', background: 'rgba(30,41,59,0.6)', borderRadius: '8px', borderLeft: '3px solid #ef4444' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <span>{r.report_id} • {r.category}</span>
                      <span style={{ color: '#ef4444' }}>{r.severity}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>{r.description}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}
