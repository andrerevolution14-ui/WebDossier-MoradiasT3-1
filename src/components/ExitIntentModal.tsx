'use client';

import React, { useState, useEffect, useRef } from 'react';
import { WA_PHONE } from '@/lib/constants';
import { trackFormLeadSubmit, getMetaCookies } from '@/lib/analytics';
import { useLeadModal } from '@/components/LeadModal';

export default function ExitIntentModal() {
  const { isOpen: isLeadModalOpen } = useLeadModal();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const hasTriggeredRef = useRef(false);
  const lastScrollYRef = useRef(0);

  // Exit intent detection for Desktop and Mobile
  useEffect(() => {
    // Check if user already dismissed or submitted this session
    try {
      if (
        sessionStorage.getItem('domaine_exit_intent_shown') === 'true' ||
        localStorage.getItem('domaine_lead_submitted') === 'true'
      ) {
        hasTriggeredRef.current = true;
        return;
      }
    } catch {
      // Storage unavailable fallback
    }

    // Check URL param for instant preview/testing (e.g. ?exit=1)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('exit') === '1' || params.get('exit_intent') === '1' || params.get('modal') === 'exit') {
        setIsVisible(true);
      }
    }

    const triggerPopup = () => {
      if (hasTriggeredRef.current || isLeadModalOpen) return;
      hasTriggeredRef.current = true;
      try {
        sessionStorage.setItem('domaine_exit_intent_shown', 'true');
      } catch {}
      setIsVisible(true);
    };

    // 1. Desktop: Mouse leaves viewport through the top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 25) {
        triggerPopup();
      }
    };

    // 1b. Desktop mouseout (fires when cursor crosses document boundary)
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 25) {
        triggerPopup();
      }
    };

    // 2. Mobile & Tablet: Fast scroll up after scrolling down significantly
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Only trigger if user has scrolled down into content (> 300px)
      if (docHeight > 0 && currentScrollY > 600 && performance.now() > 20000) {
        const scrollDelta = lastScrollYRef.current - currentScrollY;
        // User is scrolling UP rapidly towards the top
        if (scrollDelta > 120) {
          triggerPopup();
        }
      }
      lastScrollYRef.current = currentScrollY;
    };

    // 3. Fallback: Tab blur / Visibility change (when switching away or closing tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && window.scrollY > 300) {
        // Pre-arm or record intention
      }
    };

    // Allow manual trigger for testing via custom event and window global
    const handleManualTrigger = () => {
      setIsVisible(true);
    };

    if (typeof window !== 'undefined') {
      (window as any).openExitIntent = handleManualTrigger;
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('domaine_open_exit_intent', handleManualTrigger);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('domaine_open_exit_intent', handleManualTrigger);
    };
  }, [isLeadModalOpen]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleaned);
    setPhoneError('');
  };

  const validatePhone = (value: string) => {
    return /^9\d{8}$/.test(value);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setSubmitError('');

    if (!name.trim()) return;

    if (!validatePhone(phone)) {
      setPhoneError('O número de telemóvel tem de ter 9 dígitos e começar por 9.');
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const { fbp, fbc } = getMetaCookies();

      const { eventId } = trackFormLeadSubmit({
        name: name.trim(),
        phone: cleanPhone,
        source: 'exit_intent_popup',
      });

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name.trim(),
          telefone: cleanPhone,
          source: 'exit_intent_popup',
          interesse:
            'Exit Intent — Moradia T3 Oliveirinha 335k c/ IMT e Selo Incluídos (Dossier + Simulação)',
          eventId,
          fbp,
          fbc,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter');
      }

      try {
        localStorage.setItem('domaine_lead_submitted', 'true');
      } catch {}

      window.location.href = `/obrigado?nome=${encodeURIComponent(name.trim().split(' ')[0])}`;
      return;
    } catch (err: any) {
      setSubmitError(err.message || 'Erro de ligação. Por favor tente novamente.');
      setIsSubmitting(false);
    }
  };

  const formatDisplayPhone = (p: string) => {
    if (p.length === 9) {
      return `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;
    }
    return p;
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      onClick={handleClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100001,
        background: 'rgba(5, 7, 10, 0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'exitFadeIn 0.25s ease-out forwards',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#131418',
          border: '1.5px solid rgba(239, 68, 68, 0.45)',
          borderRadius: 20,
          padding: 'clamp(24px, 5vw, 36px) clamp(20px, 4.5vw, 32px)',
          maxWidth: 530,
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 65px rgba(0,0,0,0.8), 0 0 35px rgba(239, 68, 68, 0.15)',
          color: '#FFFFFF',
          boxSizing: 'border-box',
          animation: 'exitScaleUp 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* Botão Fechar (Top Right) */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Fechar"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.75)',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
          }}
        >
          ✕
        </button>

        {isSuccess ? (
          /* ─── ESTADO: SUCESSO ─────────────────────────────────────── */
          <div style={{ textAlign: 'center', padding: '16px 8px 8px' }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(61, 122, 88, 0.25)',
                border: '2px solid #3D7A58',
                color: '#7DC4A0',
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 18px',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 10,
              }}
            >
              Pedido Registado com Sucesso!
            </h3>
            <p
              style={{
                fontSize: '0.94rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Obrigado, <strong style={{ color: '#fff' }}>{name.trim()}</strong>. Irá ser
              contactado brevemente no número{' '}
              <strong style={{ color: 'var(--gold-light)' }}>
                {formatDisplayPhone(phone)}
              </strong>{' '}
              com o seu dossier digital e a simulação de crédito gratuita.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a
                href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                  `Olá André! Vi a proposta de 335.000€ chave-na-mão com IMT e Selo incluídos e gostaria de receber o dossier digital e simulação gratuita. (Nome: ${name.trim()} · Contacto: ${phone})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: 'var(--gold)',
                  color: '#fff',
                  padding: '14px 20px',
                  borderRadius: 'var(--radius-btn)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                }}
              >
                Falar de Imediato no WhatsApp →
              </a>

              <button
                type="button"
                onClick={handleClose}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'rgba(255,255,255,0.75)',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-btn)',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                Continuar a navegar no site
              </button>
            </div>
          </div>
        ) : (
          /* ─── ESTADO: CONTEÚDO DO EXIT INTENT POPUP ────────────────── */
          <div>
            {/* Tag / Eyebrow de Urgência */}
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(239, 68, 68, 0.14)',
                  border: '1px solid rgba(239, 68, 68, 0.35)',
                  color: '#F87171',
                  padding: '5px 13px',
                  borderRadius: 20,
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                ⚠️ Espera! Antes de sair...
              </span>
            </div>

            {/* Título: A Vermelho e Negrito */}
            <h2
              id="exit-intent-title"
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(1.35rem, 3.6vw, 1.75rem)',
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#EF4444',
                textAlign: 'center',
                margin: '0 0 12px 0',
                letterSpacing: '-0.015em',
              }}
            >
              Vai mesmo arriscar pagar IMT e Imposto de Selo noutra casa?
            </h2>

            {/* Texto de Enquadramento */}
            <p
              style={{
                fontSize: '0.94rem',
                color: 'rgba(255, 255, 255, 0.88)',
                lineHeight: 1.55,
                textAlign: 'center',
                margin: '0 0 20px 0',
              }}
            >
              Moradia T3 com jardim a 8 min de Aveiro por 335.000€ chave-na-mão. Preço final bloqueado e obra concluída em apenas 10 meses.
            </p>

            {/* Checklist de Benefícios Visíveis */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                background: 'rgba(255, 255, 255, 0.035)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 14,
                padding: '14px 16px',
                marginBottom: 20,
              }}
            >
              {/* Benefício 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✅
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    color: 'rgba(255, 255, 255, 0.88)',
                  }}
                >
                  <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    Zero Surpresas:
                  </strong>{' '}
                  IMT e Imposto de Selo já estão 100% incluídos no valor de 335.000€.
                </p>
              </div>

              {/* Benefício 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✅
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    color: 'rgba(255, 255, 255, 0.88)',
                  }}
                >
                  <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    Entrada Segura:
                  </strong>{' '}
                  O seu sinal de 10% (33.500€) está blindado no CPCV — devolução integral se o crédito não for aprovado.
                </p>
              </div>

              {/* Benefício 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span
                  style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  ✅
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.85rem',
                    lineHeight: 1.45,
                    color: 'rgba(255, 255, 255, 0.88)',
                  }}
                >
                  <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>
                    Ganho Imediato:
                  </strong>{' '}
                  Moradia com avaliação estimada de 450.000€ (ganha 115.000€ de valorização patrimonial logo na escritura).
                </p>
              </div>
            </div>

            {/* Chamada à Ação */}
            <p
              style={{
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--gold-light)',
                lineHeight: 1.45,
                textAlign: 'center',
                margin: '0 0 16px 0',
              }}
            >
              Prefere agendar visita ao lote ou falar diretamente com o promotor?
            </p>

            {/* Links rápidos para plantas e localização */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
              <a
                href="#plantas"
                onClick={handleClose}
                style={{ fontSize: '0.74rem', color: 'var(--gold-light)', textDecoration: 'underline', fontWeight: 600 }}
              >
                📐 Ver Plantas no Site
              </a>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.74rem' }}>•</span>
              <a
                href="#localizacao"
                onClick={handleClose}
                style={{ fontSize: '0.74rem', color: 'var(--gold-light)', textDecoration: 'underline', fontWeight: 600 }}
              >
                📍 Ver Localização Exata
              </a>
            </div>

            {/* Formulário: Campos Nome + Número */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              {/* Campo 1: Nome */}
              <div>
                <label
                  htmlFor="exit-lead-name"
                  style={{
                    display: 'block',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: 5,
                    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                  }}
                >
                  Nome completo
                </label>
                <input
                  id="exit-lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="O seu nome"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.94rem',
                    fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.18)')}
                />
              </div>

              {/* Campo 2: Telemóvel */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 5,
                  }}
                >
                  <label
                    htmlFor="exit-lead-phone"
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.92)',
                      fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)",
                    }}
                  >
                    Número de Telemóvel
                  </label>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.50)' }}>
                    9 dígitos · começar por 9
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="exit-lead-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="912 345 678"
                    maxLength={9}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: phoneError
                        ? '1.5px solid #ef4444'
                        : '1px solid rgba(255, 255, 255, 0.18)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
                    }}
                    onFocus={e => {
                      if (!phoneError) e.target.style.borderColor = 'var(--gold)';
                    }}
                    onBlur={e => {
                      if (!phoneError) e.target.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                    }}
                  />
                  {phone.length > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        right: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: validatePhone(phone) ? '#7DC4A0' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {phone.length}/9
                    </span>
                  )}
                </div>
                {phoneError && (
                  <p style={{ color: '#fca5a5', fontSize: '0.76rem', margin: '4px 0 0' }}>
                    {phoneError}
                  </p>
                )}
              </div>

              {submitError && (
                <div
                  style={{
                    background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid rgba(220, 38, 38, 0.5)',
                    color: '#fca5a5',
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: '0.78rem',
                  }}
                >
                  {submitError}
                </div>
              )}

              {/* Botão com alta intenção */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  marginTop: 6,
                  background: 'linear-gradient(135deg, #B88B38 0%, #A17628 100%)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '14px 20px',
                  fontWeight: 700,
                  fontSize: '0.90rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.75 : 1,
                  boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                  transition: 'transform 0.15s, box-shadow 0.15s, opacity 0.15s',
                }}
                onMouseEnter={e => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 22px rgba(184, 146, 74, 0.5)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 18px rgba(184, 146, 74, 0.35)';
                  }
                }}
              >
                {isSubmitting ? 'A registar contacto...' : 'Agendar Visita ao Lote / Falar com Promotor →'}
              </button>

              {/* Dismiss silencioso / Rodapé de garantia */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.48)',
                  marginTop: 2,
                  padding: '0 2px',
                }}
              >
                <span>🔒 Contacto 100% confidencial</span>
                <button
                  type="button"
                  onClick={handleClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.48)',
                    textDecoration: 'underline',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Continuar no site
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes exitFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes exitScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
