import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function FieldReportPWA() {
  const [category, setCategory] = useState('Hazard');
  const [severity, setSeverity] = useState('Critical');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: 26.1445, lon: 91.7362 }); // Guwahati default
  const [locating, setLocating] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your mobile browser.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: parseFloat(pos.coords.latitude.toFixed(4)),
          lon: parseFloat(pos.coords.longitude.toFixed(4))
        });
        setLocating(false);
      },
      (err) => {
        alert('Geolocation error: ' + err.message);
        setLocating(false);
      }
    );
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter field observations for the report.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/reports/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          severity,
          description,
          location,
          reporter_id: "NER-MOBILE-FIELD-PWA",
          photo_url: photoPreview || null
        })
      });

      const data = await res.json();
      setSubmittedReport(data);
      setDescription('');
      setPhotoPreview(null);
    } catch (err) {
      alert('Error submitting report to FastAPI server: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="page-container">
        
        <div className="form-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>📱 NER Field Incident Mobile PWA</h2>
            <span style={{ fontSize: '0.75rem', background: 'rgba(16,185,129,0.2)', color: '#10b981', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              MDoNER Offline Sync
            </span>
          </div>

          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Submit spatial incident reports directly from field units across Assam, Meghalaya, & Arunachal Pradesh.
          </p>

          {submittedReport && (
            <div style={{ padding: '14px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', borderRadius: '10px', color: '#10b981' }}>
              <strong>✅ Field Report Submitted Successfully!</strong>
              <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                Report ID: <b>{submittedReport.report_id}</b> • Status: {submittedReport.status}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div className="form-group">
              <label className="form-label">Report Category:</label>
              <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Hazard">⚠️ Active Landslide / Blockage</option>
                <option value="Infrastructure">⚡ Flood Inundation & Substation Damage</option>
                <option value="Emergency">🚨 Medical Relief Convoy Request</option>
                <option value="Maintenance">🔧 Road Repair & Clearance</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Incident Severity:</label>
              <select className="form-select" value={severity} onChange={e => setSeverity(e.target.value)}>
                <option value="Low">Low - Informational</option>
                <option value="Medium">Medium - Requires Attention</option>
                <option value="High">High - Urgent Priority</option>
                <option value="Critical">Critical - Immediate Emergency Response</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">GPS Spatial Location (NER):</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="text"
                  className="form-input"
                  value={`Lat: ${location.lat}, Lon: ${location.lon}`}
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="btn-submit"
                  style={{ padding: '10px 14px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                >
                  {locating ? 'GPS Detecting...' : '📍 Use Current GPS'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Field Notes & Damage Assessment:</label>
              <textarea
                rows="4"
                className="form-textarea"
                placeholder="Describe mountain landslide severity, highway waterlogging depth, or emergency relief needs..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Attach Field Photo:</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="form-input" />
              {photoPreview && (
                <div style={{ marginTop: '10px', borderRadius: '10px', overflow: 'hidden', maxHeight: '180px' }}>
                  <img src={photoPreview} alt="Preview" style={{ width: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Transmitting to NER GIS Command...' : '📡 Submit Field Report'}
            </button>

          </form>

        </div>

      </main>
    </div>
  );
}
