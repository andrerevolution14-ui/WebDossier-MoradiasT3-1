'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WA_PHONE } from '@/lib/constants';
import { trackWhatsAppLead } from '@/lib/analytics';

interface LeadModalContextType {
  isOpen: boolean;
  modalTitle: string;
  source: string;
  openLeadModal: (options?: { title?: string; source?: string }) => void;
  closeLeadModal: () => void;
}

const LeadModalContext = createContext<LeadModalContextType>({
  isOpen: false,
  modalTitle: 'Saber Mais sobre o Domaine XXV',
  source: 'direct',
  openLeadModal: () => {},
  closeLeadModal: () => {},
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Saber Mais sobre o Domaine XXV');
  const [source, setSource] = useState('site_button');

  const openLeadModal = (options?: { title?: string; source?: string }) => {
    if (options?.title) setModalTitle(options.title);
    if (options?.source) setSource(options.source);
    setIsOpen(true);
  };

  const closeLeadModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider
      value={{ isOpen, modalTitle, source, openLeadModal, closeLeadModal }}
    >
      {children}
      <LeadModal
        isOpen={isOpen}
        onClose={closeLeadModal}
        title={modalTitle}
        source={source}
      />
    </LeadModalContext.Provider>
  );
}

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  source: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  title,
  source,
}: LeadModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 9);
    setPhone(cleaned);
    setPhoneError('');
  };

  const validatePhone = (value: string) => {
    return /^9\d{8}$/.test(value);
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError('');
    setSubmitError('');

    if (!name.trim()) return;

    if (!validatePhone(phone)) {
      setPhoneError('O número tem de ter 9 dígitos e começar por 9.');
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirmedSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      trackWhatsAppLead(`form_${source}`, { name: name.trim(), phone });

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name.trim(),
          telefone: phone,
          source: source || 'modal_form',
          interesse: title || 'Domaine XXV (335k c/ IMT e Selo)',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Erro de ligação. Por favor tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    onClose();
    setTimeout(() => {
      setName('');
      setPhone('');
      setPhoneError('');
      setShowConfirm(false);
      setIsSuccess(false);
      setSubmitError('');
    }, 250);
  };

  const formatDisplayPhone = (p: string) => {
    if (p.length === 9) {
      return `${p.slice(0, 3)} ${p.slice(3, 6)} ${p.slice(6)}`;
    }
    return p;
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleResetAndClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: 'rgba(5, 7, 10, 0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#15161A',
          border: '1px solid rgba(184, 146, 74, 0.35)',
          borderRadius: 18,
          padding: 'clamp(28px, 6vw, 36px) clamp(22px, 5vw, 32px)',
          maxWidth: 440,
          width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.65), 0 0 35px rgba(184, 146, 74, 0.12)',
          color: '#FFFFFF',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255, 255, 255, 0.65)',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
          aria-label="Fechar"
        >
          ✕
        </button>

        {/* ─── STATE 1: SUCESSO ───────────────────────────────────────── */}
        {isSuccess ? (
          <div>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: '50%',
                background: 'rgba(61,122,88,0.2)',
                border: '1.5px solid #3D7A58',
                color: '#7DC4A0',
                fontSize: '1.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}
            >
              ✓
            </div>
            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 8,
              }}
            >
              Contacto Registado
            </h3>
            <p
              style={{
                fontSize: '0.90rem',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.55,
                marginBottom: 24,
              }}
            >
              Obrigado, <strong style={{ color: '#fff' }}>{name.trim()}</strong>. Entraremos em contacto brevemente através do número{' '}
              <strong style={{ color: 'var(--gold-light)' }}>
                {formatDisplayPhone(phone)}
              </strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a
                href={`https://wa.me/${WA_PHONE}?text=${encodeURIComponent(
                  `Olá André! Submeti o formulário no site e gostava de receber as informações do Domaine XXV. (Nome: ${name.trim()} · Contacto: ${phone})`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  background: 'var(--gold)',
                  color: '#fff',
                  padding: '13px 20px',
                  borderRadius: 'var(--radius-btn)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                }}
              >
                Falar de Imediato no WhatsApp →
              </a>

              <button
                type="button"
                onClick={handleResetAndClose}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '11px 20px',
                  borderRadius: 'var(--radius-btn)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
              >
                Fechar
              </button>
            </div>
          </div>
        ) : showConfirm ? (
          /* ─── STATE 2: RECONFIRMAÇÃO DO NÚMERO ──────────────────────── */
          <div>
            <div
              style={{
                fontSize: '0.70rem',
                fontWeight: 700,
                color: 'var(--gold-light)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              Reconfirmação
            </div>

            <h3
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.35rem',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: 10,
              }}
            >
              O seu número está certo?
            </h3>

            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.5,
                marginBottom: 20,
              }}
            >
              Confirme se este é o contacto onde prefere ser contactado:
            </p>

            {/* Número em destaque grande e centrado */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1.5px solid var(--gold)',
                borderRadius: 12,
                padding: '18px 16px',
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: 4,
                }}
              >
                {name.trim()}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '1.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: 'var(--gold-light)',
                  lineHeight: 1.2,
                }}
              >
                {formatDisplayPhone(phone)}
              </div>
            </div>

            {submitError && (
              <div
                style={{
                  background: 'rgba(220, 38, 38, 0.2)',
                  border: '1px solid rgba(220, 38, 38, 0.5)',
                  color: '#fca5a5',
                  padding: '9px 12px',
                  borderRadius: 8,
                  fontSize: '0.80rem',
                  marginBottom: 14,
                }}
              >
                {submitError}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                type="button"
                onClick={handleConfirmedSubmit}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: 'var(--gold)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '14px 20px',
                  fontWeight: 700,
                  fontSize: '0.90rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1,
                  boxShadow: '0 4px 16px rgba(184, 146, 74, 0.35)',
                }}
              >
                {isSubmitting ? 'A registar...' : 'Sim, confirmar e enviar →'}
              </button>

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.18)',
                  color: 'rgba(255,255,255,0.75)',
                  borderRadius: 'var(--radius-btn)',
                  padding: '11px 20px',
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                }}
              >
                ← Corrigir número
              </button>
            </div>
          </div>
        ) : (
          /* ─── STATE 0: FORMULÁRIO LIMPO E DIRETO ────────────────────── */
          <div>
            <div style={{ marginBottom: 22 }}>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.25rem, 3.2vw, 1.45rem)',
                  color: '#FFFFFF',
                  marginBottom: 6,
                  lineHeight: 1.25,
                }}
              >
                {title || 'Saber Mais sobre o Domaine XXV'}
              </h3>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.68)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                335.000€ com IMT e Imposto de Selo incluídos.
              </p>
            </div>

            <form
              onSubmit={handleInitialSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 14, textAlign: 'left' }}
            >
              {/* Campo 1: Nome */}
              <div>
                <label
                  htmlFor="lead-name"
                  style={{
                    display: 'block',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: 6,
                  }}
                >
                  Nome completo
                </label>
                <input
                  id="lead-name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="O seu nome"
                  style={{
                    width: '100%',
                    padding: '13px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                />
              </div>

              {/* Campo 2: Telemóvel */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label
                    htmlFor="lead-phone"
                    style={{
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    Telemóvel
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.48)' }}>
                    9 dígitos · começar por 9
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    id="lead-phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="912 345 678"
                    maxLength={9}
                    style={{
                      width: '100%',
                      padding: '13px 16px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: phoneError
                        ? '1.5px solid #ef4444'
                        : '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '1.05rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.2s',
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
                        right: 14,
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
                  <p style={{ color: '#fca5a5', fontSize: '0.78rem', marginTop: 5, margin: '5px 0 0' }}>
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Botão de Envio */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  marginTop: 6,
                  background: 'var(--gold)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '14px 20px',
                  fontWeight: 700,
                  fontSize: '0.90rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
              >
                Avançar →
              </button>

              <div
                style={{
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.48)',
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                🔒 Contacto usado apenas para este projeto · Sem compromisso
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
