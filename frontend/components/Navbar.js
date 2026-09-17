import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  return (
    <header className="navbar">
      <Link href="/" className="nav-brand">
        <div className="nav-logo">G</div>
        <div>
          <span className="brand-title">GeoRoute AI</span>
          <span className="brand-tag">PWA 2.0</span>
        </div>
      </Link>

      <nav className="nav-links">
        <Link href="/" className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
          🗺️ GIS Command
        </Link>
        <Link href="/hierarchy" className={`nav-item ${router.pathname === '/hierarchy' ? 'active' : ''}`}>
          🏰 Zone Hierarchy
        </Link>
        <Link href="/routing" className={`nav-item ${router.pathname === '/routing' ? 'active' : ''}`}>
          🤖 AI Route Planner
        </Link>
        <Link href="/field-report" className={`nav-item ${router.pathname === '/field-report' ? 'active' : ''}`}>
          📱 Mobile Field PWA
        </Link>
      </nav>

      <div className="nav-status">
        <span className="status-dot"></span>
        <span>FastAPI Connected</span>
      </div>
    </header>
  );
}
