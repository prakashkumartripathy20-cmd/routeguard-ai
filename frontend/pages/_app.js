import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Register PWA Service Worker for mobile caching and offline field reporting support
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('[PWA Service Worker] Registered successfully:', reg.scope))
        .catch((err) => console.warn('[PWA Service Worker] Registration failed:', err));
    }
  }, []);

  return (
    <>
      <Head>
        <title>GeoRoute AI - GIS Dashboard & Field Reporting PWA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
