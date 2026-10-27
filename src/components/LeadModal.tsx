'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { trackFormLeadSubmit, getMetaCookies } from '@/lib/analytics';

export interface OpenLeadModalOptions {
  title?: string;
  source?: string;
  defaultObjective?: string;
}

interface LeadModalContextType {
  isOpen: boolean;
  modalTitle: string;
  source: string;
  defaultObjective?: string;
  openLeadModal: (options?: OpenLeadModalOptions) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  modalTitle: 'Falar com o Promotor · Domaine XXV',
  source: 'direct',
  defaultObjective: 'Falar com o Promotor',
  openLeadModal: () => {},
  closeLeadModal: () => {},
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Falar com o Promotor · Domaine XXV');
  const [source, setSource] = useState('site_button');
  const [defaultObjective, setDefaultObjective] = useState<string | undefined>('Falar com o Promotor');

  const openLeadModal = (options?: OpenLeadModalOptions) => {
    if (options?.title) setModalTitle(options.title);
    if (options?.source) setSource(options.source);
    if (options?.defaultObjective) {
      setDefaultObjective(options.defaultObjective);
    } else {
      setDefaultObjective('Falar com o Promotor');
    }
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider
      value={{ isOpen, modalTitle, source, defaultObjective, openLeadModal, closeLeadModal }}
    >
      {children}
      <LeadModal
        isOpen={isOpen}
        onClose={closeLeadModal}
        title={modalTitle}
        source={source}
        initialObjective={defaultObjective}
      />
    </LeadModalContext.Provider>
  );
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  source: string;
  initialObjective?: string;
}

const TIME_OPTIONS = [
  'Manhã (9h–12h)',
  'Almoço (12h–14h)',
  'Tarde (14h–18h)',
  'Pós-laboral (18h–21h)',
];

export default function LeadModal({
  isOpen,
  onClose,
  title,
  source,
}: LeadModalProps) {
  const router = useRouter();

  // Dados de Contacto Direto e Leve (1 Passo)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [contactTime, setContactTime] = useState(TIME_OPTIONS[0]);

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pré-carregamento imediato da página de obrigado
  useEffect(() => {
    if (isOpen) {
      try {
        router.prefetch('/obrigado');
      } catch {}
    }
  }, [isOpen, router]);

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleaned);
    setPhoneError('');
  };

  const validatePhone = (value: string) => {
    return /^9\d{8}$/.test(value);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setSubmitError('');

    if (!name.trim()) return;

    if (!validatePhone(phone)) {
      setPhoneError('O número tem de ter 9 dígitos e começar por 9.');
      return;
    }

    setIsSubmitting(true);

    try {
      const cleanPhone = phone.replace(/\D/g, '');
      const { fbp, fbc } = getMetaCookies();
      const clientEventId = `lead_form_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name.trim(),
          telefone: cleanPhone,
          horarioContacto: contactTime,
          objetivo: 'Falar com o Promotor',
          source: source || 'modal_form',
          interesse: title || 'Domaine XXV Moradia T3',
          eventId: clientEventId,
          fbp,
          fbc,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter');
      }

      trackFormLeadSubmit({
        name: name.trim(),
        phone: cleanPhone,
        source: source || 'modal_form',
        eventId: data.eventId || clientEventId,
      });

      const params = new URLSearchParams({
        nome: name.trim().split(' ')[0],
      });
      window.location.href = `/obrigado?${params.toString()}`;
    } catch (err: any) {
      setSubmitError(err.message || 'Erro de ligação. Por favor tente novamente.');
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setPhone('');
      setPhoneError('');
      setSubmitError('');
    }, 200);
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleResetAndClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5, 7, 10, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'linear-gradient(145deg, #181A20 0%, #111216 100%)',
          border: '1.5px solid rgba(184, 146, 74, 0.45)',
          borderRadius: 14,
          maxWidth: 480,
          width: '100%',
          padding: '24px 22px',
          boxShadow: '0 24px 50px rgba(0,0,0,0.65), 0 0 30px rgba(184,146,74,0.12)',
          position: 'relative',
          color: '#fff',
        }}
      >
        <button
          type="button"
          onClick={handleResetAndClose}
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            borderRadius: '50%',
            width: 32,
            height: 32,
            fontSize: '1.1rem',
            lineHeight: 1,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
          }}
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* Badge Venda Direta / Promotor */}
        <div style={{ marginBottom: 14, paddingRight: 32 }}>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(184, 146, 74, 0.18)',
              color: 'var(--gold-light)',
              border: '1px solid rgba(184, 146, 74, 0.4)',
              borderRadius: 6,
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '3px 8px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              marginBottom: 8,
            }}
          >
            Venda Direta com Promotor
          </span>
          <h3
            style={{
              fontFamily: "var(--font-heading, 'Outfit', 'Plus Jakarta Sans', sans-serif)",
              fontWeight: 700,
              fontSize: 'clamp(1.2rem, 3.4vw, 1.35rem)',
              color: '#FFFFFF',
              margin: '0 0 6px 0',
              lineHeight: 1.25,
            }}
          >
            {title || 'Falar com o Promotor · Domaine XXV'}
          </h3>
          <p
            style={{
              fontSize: '0.84rem',
              color: 'rgba(255,255,255,0.72)',
              margin: 0,
              lineHeight: 1.45,
            }}
          >
            Deixe o seu contacto para falar diretamente com o promotor André Queirós sem intermediários.
          </p>
        </div>

        <form onSubmit={handleFinalSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* NOME COMPLETO */}
          <div>
            <label
              htmlFor="lead-name"
              style={{
                display: 'block',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: 5,
              }}
            >
              1. Nome completo <span style={{ color: 'var(--gold)' }}>*</span>
            </label>
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ex: João Silva"
              style={{
                width: '100%',
                padding: '11px 13px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                borderRadius: 8,
                color: '#fff',
                fontSize: '0.94rem',
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
            />
          </div>

          {/* TELEMÓVEL */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <label
                htmlFor="lead-phone"
                style={{
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.92)',
                }}
              >
                2. Telemóvel <span style={{ color: 'var(--gold)' }}>*</span>
              </label>
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.50)' }}>
                9 dígitos · começar por 9
              </span>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="lead-phone"
                type="tel"
                autoComplete="tel-national"
                required
                inputMode="numeric"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="912 345 678"
                maxLength={9}
                style={{
                  width: '100%',
                  padding: '11px 13px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: phoneError
                    ? '1.5px solid #ef4444'
                    : '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '0.96rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  fontFamily: 'inherit',
                  outline: 'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => {
                  if (!phoneError) e.target.style.borderColor = 'var(--gold)';
                }}
                onBlur={e => {
                  if (!phoneError) e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                }}
              />
              {phone.length > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: validatePhone(phone) ? '#7DC4A0' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {phone.length}/9
                </span>
              )}
            </div>
            {phoneError && (
              <p style={{ color: '#fca5a5', fontSize: '0.78rem', margin: '4px 0 0' }}>
                {phoneError}
              </p>
            )}
          </div>

          {/* HORÁRIO PREFERENCIAL */}
          <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
            <legend
              style={{
                fontSize: '0.84rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.92)',
                marginBottom: 6,
                padding: 0,
              }}
            >
              3. Horário Preferencial para Contacto
            </legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 7 }}>
              {TIME_OPTIONS.map(opt => {
                const isSelected = contactTime === opt;
                return (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setContactTime(opt)}
                    aria-pressed={isSelected}
                    style={{
                      padding: '9px 11px',
                      borderRadius: 7,
                      cursor: 'pointer',
                      fontSize: '0.80rem',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'center',
                      color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.75)',
                      background: isSelected ? 'rgba(184,146,74,0.30)' : 'rgba(255,255,255,0.035)',
                      border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                      boxShadow: isSelected ? '0 2px 8px rgba(184,146,74,0.25)' : 'none',
                      transition: 'all 0.12s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {submitError && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '9px 12px',
                borderRadius: 7,
                fontSize: '0.80rem',
              }}
            >
              {submitError}
            </div>
          )}

          <div style={{ marginTop: 6 }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: 'var(--gold)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius-btn)',
                padding: '13px 20px',
                fontWeight: 700,
                fontSize: '0.92rem',
                letterSpacing: '0.02em',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                transition: 'opacity 0.15s, transform 0.15s',
                opacity: isSubmitting ? 0.7 : 1,
                fontFamily: 'inherit',
              }}
            >
              {isSubmitting ? 'A registar contacto...' : 'Falar com o Promotor →'}
            </button>
          </div>

          <p
            style={{
              fontSize: '0.72rem',
              color: 'rgba(255,255,255,0.45)',
              textAlign: 'center',
              margin: '2px 0 0',
              lineHeight: 1.4,
            }}
          >
            🔒 Privacidade 100% garantida · Contacto direto sem mediação imobiliária
          </p>
        </form>
      </div>
    </div>
  );
}
