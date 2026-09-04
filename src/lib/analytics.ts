/**
 * Telemetry and behavioral tracking system
 * Captures real-time user actions, time on page, simulator calculations, and lead intents.
 */

export interface TrackingEvent {
  event: string;
  property: string;
  timestamp: string;
  [key: string]: unknown;
}

export function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const eventData: TrackingEvent = {
    event: eventName,
    property: 'Domaine XXV',
    timestamp: new Date().toISOString(),
    ...payload,
  };

  // Console logging for verification
  console.log(`[Dossier Analytics 📡] ${eventName}:`, eventData);

  // Store in LocalStorage for lead session inspection
  try {
    const existing = JSON.parse(localStorage.getItem('domaine_xxv_events') || '[]');
    existing.push(eventData);
    localStorage.setItem('domaine_xxv_events', JSON.stringify(existing.slice(-60)));
  } catch {
    // Storage quota or incognito fallback
  }

  // Dispatch custom DOM event if needed by parent integrations
  try {
    window.dispatchEvent(new CustomEvent('domaine_tracking', { detail: eventData }));
  } catch {}
}
