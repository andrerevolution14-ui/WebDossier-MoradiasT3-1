'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
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
  modalTitle: 'Agendar Visita ao Lote · Domaine XXV',
  source: 'direct',
  defaultObjective: 'Agendar Visita ao Lote',
  openLeadModal: () => {},
  closeLeadModal: () => {},
});

export const useLeadModal = () => useContext(LeadModalContext);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Agendar Visita ao Lote · Domaine XXV');
  const [source, setSource] = useState('site_button');
  const [defaultObjective, setDefaultObjective] = useState<string | undefined>('Agendar Visita ao Lote');

  const openLeadModal = (options?: OpenLeadModalOptions) => {
    if (options?.title) setModalTitle(options.title);
    if (options?.source) setSource(options.source);
    if (options?.defaultObjective) {
      setDefaultObjective(options.defaultObjective);
    } else {
      setDefaultObjective('Agendar Visita');
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

const INTENT_OPTIONS = [
  'Agendar Visita',
  'Esclarecer Dúvidas',
  'Mediação Imobiliária',
];

const TIME_OPTIONS = [
  'Manhã (9h–12h)',
  'Almoço (12h–14h)',
  'Tarde (14h–18h)',
  'Pós-laboral (18h–21h)',
];

const normalizeIntent = (val?: string) => {
  if (!val) return INTENT_OPTIONS[0];
  const lower = val.toLowerCase();
  if (lower.includes('visita')) return 'Agendar Visita';
  if (lower.includes('duvida') || lower.includes('dúvida')) return 'Esclarecer Dúvidas';
  if (lower.includes('media') || lower.includes('imobil')) return 'Mediação Imobiliária';
  return INTENT_OPTIONS.includes(val) ? val : INTENT_OPTIONS[0];
};

export default function LeadModal({
  isOpen,
  onClose,
  title,
  source,
  initialObjective,
}: LeadModalProps) {
  // Ordem pedida: nome - telefone - objetivo - horario contacto - notes
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState(normalizeIntent(initialObjective));
  const [contactTime, setContactTime] = useState(TIME_OPTIONS[0]);
  const [notes, setNotes] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  React.useEffect(() => {
    if (initialObjective) {
      setIntent(normalizeIntent(initialObjective));
    }
  }, [initialObjective, isOpen]);

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
      const cleanPhone = phone.replace(/\D/g, '');
      const { fbp, fbc } = getMetaCookies();

      // Disparar evento LEAD no Meta Pixel com eventId para deduplicação CAPI
      const { eventId } = trackFormLeadSubmit({
        name: name.trim(),
        phone: cleanPhone,
        source: source || 'modal_form',
      });

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: name.trim(),
          telefone: cleanPhone,
          objetivo: intent,
          horarioContacto: contactTime,
          notes: notes.trim(),
          source: source || 'modal_form',
          interesse: title || 'Domaine XXV Moradia T3',
          eventId,
          fbp,
          fbc,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao submeter');
      }

      // Redirecionamento direto para a página de agradecimento
      const params = new URLSearchParams({
        nome: name.trim().split(' ')[0],
        i: String(INTENT_OPTIONS.indexOf(intent)),
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
      setShowConfirm(false);
      setNotes('');
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
        background: 'rgba(5, 7, 10, 0.85)',
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
          padding: 'clamp(24px, 5vw, 34px) clamp(18px, 4vw, 28px)',
          maxWidth: 460,
          width: '100%',
          boxShadow: '0 24px 60px rgba(0,0,0,0.7), 0 0 35px rgba(184, 146, 74, 0.12)',
          color: '#FFFFFF',
          textAlign: 'left',
          boxSizing: 'border-box',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
      >
        {/* Botão Fechar */}
        <button
          onClick={handleResetAndClose}
          type="button"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
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

        {showConfirm ? (
          /* ─── ETAPA 2: RECONFIRMAÇÃO DO CONTACTO ───────────────────────── */
          <div style={{ textAlign: 'center' }}>
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
              Confirma o seu contacto?
            </h3>

            <p
              style={{
                fontSize: '0.86rem',
                color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.5,
                marginBottom: 18,
              }}
            >
              O promotor entrará em contacto direto consigo no horário indicado:
            </p>

            {/* Caixa resumo */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1.5px solid var(--gold)',
                borderRadius: 12,
                padding: '16px 14px',
                marginBottom: 18,
                textAlign: 'left',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)' }}>Nome:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{name.trim()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)' }}>Telemóvel:</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gold-light)', letterSpacing: '0.04em' }}>
                  {formatDisplayPhone(phone)}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)' }}>Objetivo:</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#fff' }}>{intent}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: notes ? 6 : 0 }}>
                <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)' }}>Horário:</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)' }}>{contactTime}</span>
              </div>
              {notes && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 6, marginTop: 6 }}>
                  <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: 2 }}>Notas:</span>
                  <span style={{ fontSize: '0.80rem', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>{notes}</span>
                </div>
              )}
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
                {isSubmitting ? 'A registar...' : 'Sim, Confirmar e Enviar →'}
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
                ← Alterar dados
              </button>
            </div>
          </div>
        ) : (
          /* ─── ETAPA 1: FORMULÁRIO COM A ORDEM PEDIDA ──────────────────── */
          /* nome -> telefone -> objetivo -> horario contacto -> notes     */
          <div>
            <div style={{ marginBottom: 16 }}>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.2rem, 3.2vw, 1.38rem)',
                  color: '#FFFFFF',
                  marginBottom: 6,
                  lineHeight: 1.25,
                }}
              >
                {title || 'Agendar Visita ao Lote · Domaine XXV'}
              </h3>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: 'rgba(255,255,255,0.68)',
                  lineHeight: 1.45,
                  margin: 0,
                }}
              >
                335.000€ c/ IMT e Selo incluídos · Contacto direto com o promotor
              </p>
            </div>

            {/* Aviso Proativo: As Plantas e Localização já estão no site */}
            <div
              style={{
                background: 'rgba(184, 146, 74, 0.12)',
                border: '1px solid rgba(184, 146, 74, 0.35)',
                borderRadius: 10,
                padding: '10px 14px',
                marginBottom: 16,
                fontSize: '0.78rem',
                lineHeight: 1.45,
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--gold-light)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span>💡</span>
                <span>Plantas e Localização já publicadas no site:</span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.78)', marginBottom: 6 }}>
                Não precisa de esperar — consulte todas as plantas e o mapa nesta página. Preencha este formulário para agendamento presencial ou contacto com o promotor.
              </div>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <a
                  href="#plantas"
                  onClick={handleResetAndClose}
                  style={{ color: 'var(--gold-light)', textDecoration: 'underline', fontWeight: 600 }}
                >
                  📐 Ver Plantas Técnicas no Site
                </a>
                <a
                  href="#localizacao"
                  onClick={handleResetAndClose}
                  style={{ color: 'var(--gold-light)', textDecoration: 'underline', fontWeight: 600 }}
                >
                  📍 Ver Localização Exata
                </a>
              </div>
            </div>

            <form
              onSubmit={handleInitialSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left' }}
            >
              {/* 1. NOME */}
              <div>
                <label
                  htmlFor="lead-name"
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
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
                    padding: '11px 14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                />
              </div>

              {/* 2. TELEFONE */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <label
                    htmlFor="lead-phone"
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    2. Telemóvel <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <span style={{ fontSize: '0.70rem', color: 'rgba(255,255,255,0.45)' }}>
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
                      padding: '11px 14px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: phoneError
                        ? '1.5px solid #ef4444'
                        : '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
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

              {/* 3. OBJETIVO */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 6,
                    padding: 0,
                  }}
                >
                  3. Objetivo da sua Consulta
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {INTENT_OPTIONS.map(opt => {
                    const isSelected = intent === opt;
                    return (
                      <label
                        key={opt}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '9px 12px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: '0.82rem',
                          color: isSelected ? '#fff' : 'rgba(255,255,255,0.75)',
                          background: isSelected ? 'rgba(184,146,74,0.22)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.15s',
                        }}
                      >
                        <input
                          type="radio"
                          name="lead-intent"
                          checked={isSelected}
                          onChange={() => setIntent(opt)}
                          style={{ accentColor: '#B8924A' }}
                        />
                        <span style={{ fontWeight: isSelected ? 700 : 500 }}>{opt}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {/* 4. HORÁRIO CONTACTO */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 8,
                    padding: 0,
                  }}
                >
                  4. Horário Preferencial para Contacto
                </legend>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 8,
                }}>
                  {TIME_OPTIONS.map(opt => {
                    const isSelected = contactTime === opt;
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setContactTime(opt)}
                        aria-pressed={isSelected}
                        style={{
                          padding: '9px 12px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: 'center',
                          color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                          background: isSelected ? 'rgba(184,146,74,0.30)' : 'rgba(255,255,255,0.035)',
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                          boxShadow: isSelected ? '0 2px 8px rgba(184,146,74,0.25)' : 'none',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 5. NOTES (Observações / Dúvida específica) */}
              <div>
                <label
                  htmlFor="lead-notes"
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 5,
                  }}
                >
                  5. Notas / Observações <span style={{ fontSize: '0.70rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', fontWeight: 400 }}>(opcional)</span>
                </label>
                <textarea
                  id="lead-notes"
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Alguma nota sobre a visita ou questão sobre acabamentos / financiamento..."
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                />
              </div>

              {/* Botões de Ação */}
              <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'var(--gold)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 'var(--radius-btn)',
                    padding: '13px 18px',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                    transition: 'opacity 0.15s, transform 0.15s',
                  }}
                >
                  {intent === 'Agendar Visita'
                    ? 'Agendar Visita ao Lote →'
                    : intent === 'Mediação Imobiliária'
                    ? 'Contactar como Mediador →'
                    : 'Enviar Pedido de Esclarecimento →'}
                </button>
              </div>

              <div
                style={{
                  fontSize: '0.70rem',
                  color: 'rgba(255,255,255,0.45)',
                  textAlign: 'center',
                  marginTop: 2,
                }}
              >
                🔒 Contacto direto · Sem intermediários · Resposta no horário indicado
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
