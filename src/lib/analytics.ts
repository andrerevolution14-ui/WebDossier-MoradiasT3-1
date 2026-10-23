/**
 * Telemetry and behavioral tracking system + Meta Pixel Integration
 * Meta Pixel ID: 979841341182458
 */

export const META_PIXEL_ID = '979841341182458';

// Valor de referência do projeto (Preço Chave na Mão de 335.000€)
export const HIGHEST_LEAD_VALUE = 335000;

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
 * Lê os cookies _fbp e _fbc do browser para passar ao CAPI
 */
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  if (typeof document === 'undefined') return {};
  const cookies = document.cookie.split(';');
  let fbp: string | undefined;
  let fbc: string | undefined;
  for (const cookie of cookies) {
    const [name, val] = cookie.trim().split('=');
    if (name === '_fbp') fbp = val;
    if (name === '_fbc') fbc = val;
  }
  return { fbp, fbc };
}

// In-memory debounce timestamp to prevent rapid double-taps
let lastClickTime = 0;

/**
 * Retorna ou gera um ID de evento único por sessão para deduplicação no Meta Pixel.
 */
export function getSessionEventId(): string {
  try {
    const existing = sessionStorage.getItem('domaine_meta_lead_event_id');
    if (existing) return existing;
    const newId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem('domaine_meta_lead_event_id', newId);
    return newId;
  } catch {
    return `lead_${Date.now()}`;
  }
}

/**
 * Disparado ao preencher e submeter o formulário de contacto / visita.
 * Regista o evento LEAD com o valor de referência (335.000€ - Preço Chave na Mão).
 * Partilha o eventId retornado com a API (CAPI) para deduplicação perfeita de 100%.
 */
export function trackFormLeadSubmit(payload: {
  name: string;
  phone: string;
  email?: string;
  source?: string;
  value?: number;
  eventId?: string;
}): { eventId: string } {
  const eventId =
    payload.eventId ||
    `lead_form_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const value = payload.value ?? HIGHEST_LEAD_VALUE;
  const source = payload.source || 'modal_form';

  if (typeof window !== 'undefined') {
    try {
      if (typeof (window as any).fbq === 'function') {
        (window as any).fbq(
          'track',
          'Lead',
          {
            content_name: 'Domaine XXV — Moradia T4 Familiar em Oliveirinha',
            content_category: 'Imobiliário Aveiro',
            currency: 'EUR',
            value: value,
            source: source,
          },
          { eventID: eventId }
        );

        console.log(
          `🎯 [Meta Pixel] Lead de formulário registado com o valor mais alto (${value}€) (ID: ${eventId})`
        );
      } else {
        console.warn('⚠️ [Meta Pixel] fbq ainda não carregado no momento da submissão.');
      }
    } catch (err) {
      console.error('Erro ao disparar Meta Pixel no formulário:', err);
    }

    trackEvent('form_lead_submitted', {
      source,
      value,
      eventId,
      name: payload.name,
      phone: payload.phone,
    });
  }

  return { eventId };
}

/**
 * Cliques ou mensagens por WhatsApp não são guardados na base de dados
 * nem considerados Lead ou Contacto (sem tracking por solicitação explícita).
 */
export function trackWhatsAppContact(
  _source = 'whatsapp_cta',
  _extra: Record<string, unknown> = {}
) {
  // Sem gravação na base de dados, sem Meta Pixel, sem CAPI, sem tracking.
}

export const trackWhatsAppLead = trackWhatsAppContact;
