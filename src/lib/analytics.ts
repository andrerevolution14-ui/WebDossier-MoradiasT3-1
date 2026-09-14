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
 * PRIORIDADE MÁXIMA DE CONVERSÃO NO META ADS: Evento "Contact" (Contacto)
 */
export function trackWhatsAppContact(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  try {
    if (typeof (window as any).fbq === 'function') {
      // 1. PRIORIDADE MÁXIMA: Contact (Contacto direto via WhatsApp para o Meta Ads otimizar)
      (window as any).fbq('track', 'Contact', {
        content_name: 'Contacto WhatsApp - Moradia Oliveirinha',
        content_category: 'Imobiliário Aveiro',
        currency: 'EUR',
        value: 335000,
        source,
        ...extra,
      });

      // 2. Evento complementar: Lead
      (window as any).fbq('track', 'Lead', {
        content_name: 'Moradia Oliveirinha Domaine XXV',
        content_category: 'Imobiliário',
        currency: 'EUR',
        value: 335000,
        source,
        ...extra,
      });

      console.log('🎯 [Meta Pixel] Evento CONTACTO (Prioridade Máxima de Conversão) disparado com sucesso!');
    } else {
      console.warn('⚠️ [Meta Pixel] fbq ainda não carregado no momento do clique.');
    }
  } catch (err) {
    console.error('Erro ao disparar Meta Pixel Contact:', err);
  }

  trackEvent('whatsapp_click_contact', { source, ...extra });
}

// Alias para compatibilidade com componentes existentes
export const trackWhatsAppLead = trackWhatsAppContact;
