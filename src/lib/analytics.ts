/**
 * Telemetry and behavioral tracking system + Meta Pixel Integration
 * Meta Pixel ID: 26022738390737044
 */

export const META_PIXEL_ID = '26022738390737044';

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

/**
 * Disparado especificamente ao clicar em qualquer botão do WhatsApp
 * Envia os eventos Lead e Contact para o Meta Pixel
 */
export function trackWhatsAppLead(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Moradia Oliveirinha Domaine XXV',
        content_category: 'Imobiliário',
        currency: 'EUR',
        value: 335000,
        source,
        ...extra,
      });

      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp Contact Lead',
        source,
        ...extra,
      });
      console.log('🎯 [Meta Pixel] Disparados eventos Lead e Contact com sucesso!');
    } else {
      console.warn('⚠️ [Meta Pixel] fbq ainda não carregado no momento do clique.');
    }
  } catch (err) {
    console.error('Erro ao disparar Meta Pixel Lead:', err);
  }

  trackEvent('whatsapp_click_lead', { source, ...extra });
}
