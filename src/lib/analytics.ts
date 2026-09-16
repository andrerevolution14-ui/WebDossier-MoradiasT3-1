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

// In-memory debounce timestamp to prevent rapid double-taps
let lastClickTime = 0;

/**
 * Retorna ou gera um ID de evento único por sessão para deduplicação no Meta Pixel.
 */
function getSessionEventId(): string {
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
 * Disparado ao clicar em qualquer botão do WhatsApp.
 * Implementa DEBOUNCING (2s) e DEDUPLICAÇÃO POR SESSÃO para garantir
 * que 1 visitante real = exatamente 1 Lead registado no Facebook Ads!
 */
export function trackWhatsAppContact(source = 'whatsapp_cta', extra: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const now = Date.now();
  // 1. Prevenir disparos duplicados em cliques rápidos / double-tap (debounce de 2 segundos)
  if (now - lastClickTime < 2000) {
    return;
  }
  lastClickTime = now;

  // 2. Deduplicação por Sessão:
  // Se o utilizador já clicou no WhatsApp nesta sessão, não disparamos um novo "Lead" no Meta Pixel,
  // evitando que o mesmo cliente clicando em 2 botões conte como 2, 3 ou 4 leads no Facebook Ads.
  let isFirstLeadInSession = true;
  try {
    if (sessionStorage.getItem('meta_wa_lead_fired')) {
      isFirstLeadInSession = false;
    } else {
      sessionStorage.setItem('meta_wa_lead_fired', '1');
    }
  } catch {
    // Fallback se sessionStorage estiver desativado/modo restrito
  }

  const eventId = getSessionEventId();

  try {
    if (typeof (window as any).fbq === 'function') {
      if (isFirstLeadInSession) {
        // Evento LEAD disparado APENAS UMA VEZ por visitante/sessão para manter os números 100% fiéis
        (window as any).fbq(
          'track',
          'Lead',
          {
            content_name: 'Moradia Oliveirinha Domaine XXV',
            content_category: 'Imobiliário Aveiro',
            currency: 'EUR',
            value: 335000,
            source,
            ...extra,
          },
          { eventID: eventId }
        );

        console.log(`🎯 [Meta Pixel] Novo Lead único registado com sucesso (Source: ${source}, ID: ${eventId})`);
      } else {
        console.log(`ℹ️ [Meta Pixel] Clique WhatsApp registado, mas Lead já contabilizado nesta sessão (deduplicado).`);
      }

      // Evento de Contacto direto (também associado ao eventID para deduplicação)
      (window as any).fbq(
        'track',
        'Contact',
        {
          content_name: 'Contacto WhatsApp - Moradia Oliveirinha',
          content_category: 'Imobiliário Aveiro',
          currency: 'EUR',
          value: 335000,
          source,
          ...extra,
        },
        { eventID: `${eventId}_contact` }
      );
    } else {
      console.warn('⚠️ [Meta Pixel] fbq ainda não carregado no momento do clique.');
    }
  } catch (err) {
    console.error('Erro ao disparar Meta Pixel:', err);
  }

  trackEvent('whatsapp_click_contact', { source, isFirstLeadInSession, ...extra });
}

// Inicializar listener global para apanhar quaisquer links wa.me sem onClick explícito
if (typeof window !== 'undefined') {
  window.addEventListener(
    'click',
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const source = target.id || target.getAttribute('data-source') || 'wa_link';
        trackWhatsAppContact(source);
      }
    },
    { capture: true }
  );
}

// Alias para compatibilidade com componentes existentes
export const trackWhatsAppLead = trackWhatsAppContact;
