import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '../components/Navbar';

const GISMap = dynamic(() => import('../components/GISMap'), { ssr: false });

export default function AIRoutingPage() {
  // Default NER Route: Unit 1 (Emergency Medicine) Guwahati to Tawang Route
  const [origin, setOrigin] = useState({ lat: 26.1445, lon: 91.7362 });
  const [destination, setDestination] = useState({ lat: 27.5861, lon: 91.8594 });
  const [avoidHazards, setAvoidHazards] = useState(true);
  const [hazardWeight, setHazardWeight] = useState(3.0);
  const [priority, setPriority] = useState('safest');

  const [loading, setLoading] = useState(false);
  const [routeResult, setRouteResult] = useState(null);

  const handleCalculateRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/routing/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin,
          destination,
          avoid_hazards: avoidHazards,
          hazard_penalty_weight: parseFloat(hazardWeight),
          priority
        })
      });
      const data = await res.json();
      setRouteResult(data);
    } catch (err) {
      alert('Error connecting to FastAPI Routing Engine: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetRoute = (origLat, origLon, destLat, destLon) => {
    setOrigin({ lat: origLat, lon: origLon });
    setDestination({ lat: destLat, lon: destLon });
  };

  return (
    <div>
      <Navbar />

      <main className="page-container">
        <h2>🤖 North Eastern Region (NER) AI Spatial Route Optimization</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          Calculates disaster relief corridors across Assam, Meghalaya, & Arunachal Pradesh with mountain landslide avoidance.
        </p>

        <div style={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
          <button className="layer-chip active" onClick={() => handlePresetRoute(26.1445, 91.7362, 27.5861, 91.8594)}>
            🚑 Unit 1: Guwahati ➔ Tawang
          </button>
          <button className="layer-chip active" onClick={() => handlePresetRoute(25.5788, 91.8933, 24.8333, 92.7789)}>
            🚚 Unit 2: Shillong ➔ Silchar
          </button>
        </div>

        <div className="dashboard-grid" style={{ marginTop: '10px' }}>
          
          {/* MAP DISPLAY */}
          <div className="map-card">
            <div className="map-header">
              <span className="map-title">📍 Calculated NER Spatial Route Overlay</span>
              {routeResult && (
                <span style={{ fontSize: '0.8rem', background: 'rgba(6,182,212,0.2)', color: '#06b6d4', padding: '4px 10px', borderRadius: '12px' }}>
                  ID: {routeResult.route_id}
                </span>
              )}
            </div>
            <div className="map-viewport">
              <GISMap route={routeResult} />
            </div>
          </div>

          {/* CONTROL PANEL */}
          <div className="side-panel">
            <div className="panel-card">
              <div className="panel-title">⚙️ AI Route Parameters</div>

              <div className="form-group">
                <label className="form-label">Origin Coordinates (Guwahati / Shillong):</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    step="0.0001"
                    className="form-input"
                    value={origin.lat}
                    onChange={e => setOrigin({ ...origin, lat: parseFloat(e.target.value) })}
                  />
                  <input
                    type="number"
                    step="0.0001"
                    className="form-input"
                    value={origin.lon}
                    onChange={e => setOrigin({ ...origin, lon: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Destination Coordinates (Tawang / Silchar):</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="number"
                    step="0.0001"
                    className="form-input"
                    value={destination.lat}
                    onChange={e => setDestination({ ...destination, lat: parseFloat(e.target.value) })}
                  />
                  <input
                    type="number"
                    step="0.0001"
                    className="form-input"
                    value={destination.lon}
                    onChange={e => setDestination({ ...destination, lon: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Landslide & Flood Penalty Weight ({hazardWeight}x):</label>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.5"
                  className="form-input"
                  value={hazardWeight}
                  onChange={e => setHazardWeight(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priority Mode:</label>
                <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
                  <option value="safest">Safest (Avoid Landslides & Floods)</option>
                  <option value="fastest">Fastest Corridor</option>
                </select>
              </div>

              <button className="btn-submit" onClick={handleCalculateRoute} disabled={loading}>
                {loading ? 'Calculating NER Path...' : '🚀 Compute AI Spatial Path'}
              </button>
            </div>

            {/* RESULTS SUMMARY */}
            {routeResult && (
              <div className="panel-card">
                <div className="panel-title">📊 Route Performance Metrics</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'rgba(30,41,59,0.8)', padding: '10px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Distance</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{routeResult.total_distance_km} km</div>
                  </div>
                  <div style={{ background: 'rgba(30,41,59,0.8)', padding: '10px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Est. Travel Time</span>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#06b6d4' }}>{routeResult.estimated_time_min} mins</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginTop: '10px' }}>Step-by-Step Guidance:</div>
                <div className="instruction-list">
                  {routeResult.turn_instructions.map((step, idx) => (
                    <div key={idx} className="instruction-step">
                      <div>{step.instruction}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                        {step.distance_km} km • {step.duration_min} mins
                        {step.hazard_warning && <span style={{ color: '#ef4444', marginLeft: '6px' }}>⚠️ {step.hazard_warning}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </main>
    </div>
  );
}
