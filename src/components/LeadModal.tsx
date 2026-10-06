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
      setDefaultObjective('Agendar Visita ao Lote');
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

// Opções de Qualificação (Diretas, Rápidas e sem Ruído)
const CAPITAL_OPTIONS = [
  {
    id: 'B',
    label: 'Tenho mais de 35.000€',
    badge: 'Cumpre os 10% de entrada',
  },
  {
    id: 'D',
    label: 'Tenho menos de 30.000€',
    badge: 'Abaixo da entrada bancária',
  },
];

const CREDITO_OPTIONS = [
  {
    id: 'A',
    label: 'Já tenho crédito Pré-Aprovado no banco para este valor.',
    badge: 'Top Lead',
  },
  {
    id: 'B',
    label: 'Já fiz simulações e sei qual é o meu limite de financiamento.',
    badge: 'Em análise',
  },
  {
    id: 'C',
    label: 'Ainda não pedi, mas quero uma Simulação Gratuita com a vossa Intermediária de Crédito.',
    badge: 'Apoio gratuito',
  },
];

const URGENCIA_OPTIONS = [
  {
    id: 'A',
    label: 'Imediato / Próximos 30 a 60 dias.',
    badge: 'Prioridade Máxima',
  },
  {
    id: 'B',
    label: 'Nos próximos 3 a 6 meses.',
    badge: 'Prioridade Média',
  },
  {
    id: 'C',
    label: 'Apenas a explorar o mercado sem data definida.',
    badge: 'Prioridade Baixa',
  },
];

const INTENT_OPTIONS = [
  'Agendar Visita ao Lote',
  'Falar com o Promotor',
  'Esclarecer Dúvidas / Financiamento',
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
  if (lower.includes('visita')) return 'Agendar Visita ao Lote';
  if (lower.includes('promotor')) return 'Falar com o Promotor';
  if (lower.includes('duvida') || lower.includes('dúvida') || lower.includes('financiamento')) {
    return 'Esclarecer Dúvidas / Financiamento';
  }
  return INTENT_OPTIONS.includes(val) ? val : INTENT_OPTIONS[0];
};

export default function LeadModal({
  isOpen,
  onClose,
  title,
  source,
  initialObjective,
}: LeadModalProps) {
  const router = useRouter();

  // Fluxo de 2 passos otimizado para velocidade máxima:
  // Passo 1: 3 cliques de filtro (sem digitação)
  // Passo 2: Nome + Telemóvel + Envio imediato
  const [step, setStep] = useState<1 | 2>(1);

  // Perguntas de Filtro (Passo 1)
  const [capital, setCapital] = useState(CAPITAL_OPTIONS[0].label);
  const [credito, setCredito] = useState(CREDITO_OPTIONS[0].label);
  const [urgencia, setUrgencia] = useState(URGENCIA_OPTIONS[0].label);

  // Dados de Contacto (Passo 2)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [intent, setIntent] = useState(normalizeIntent(initialObjective));
  const [contactTime, setContactTime] = useState(TIME_OPTIONS[0]);
  const [notes, setNotes] = useState('');

  const [phoneError, setPhoneError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Pré-carregamento imediato da página de obrigado para velocidade instantânea
  useEffect(() => {
    if (isOpen) {
      try {
        router.prefetch('/obrigado');
      } catch {}
    }
  }, [isOpen, router]);

  useEffect(() => {
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

  // Submissão ultra-rápida no Passo 2
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
          horarioContacto: contactTime,
          objetivo: intent,
          disponibilidadeCapital: capital,
          creditoHabitacao: credito,
          horizonteTemporal: urgencia,
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

      // Redirecionamento instantâneo para a página de obrigado
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
      setStep(1);
      setName('');
      setPhone('');
      setPhoneError('');
      setNotes('');
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
        zIndex: 100000,
        background: 'rgba(5, 7, 10, 0.88)',
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
          padding: 'clamp(20px, 5vw, 30px) clamp(16px, 4vw, 26px)',
          maxWidth: 480,
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

        {/* ─── 1. AVISO DE TOPO (O FILTRO VISUAL IMEDIATO) ───────────────── */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1.5px solid rgba(239, 68, 68, 0.45)',
            borderRadius: 12,
            padding: '11px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <span style={{ fontSize: '1.2rem', lineHeight: 1.1, flexShrink: 0 }}>⚠️</span>
          <div>
            <div
              style={{
                fontWeight: 800,
                fontSize: '0.78rem',
                color: '#fca5a5',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: 2,
              }}
            >
              AVISO: Venda direta pelo construtor/promotor
            </div>
            <div
              style={{
                fontSize: '0.80rem',
                color: 'rgba(255, 255, 255, 0.90)',
                lineHeight: 1.42,
              }}
            >
              Não aceitamos mediação imobiliária nem fazemos parcerias com agências.
            </div>
          </div>
        </div>

        {/* ─── BARRA DE PROGRESSO RÁPIDA ─────────────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.70rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--gold-light)',
              marginBottom: 5,
            }}
          >
            <span>
              {step === 1 ? 'Passo 1 de 2: Filtro de Elegibilidade' : 'Passo 2 de 2: Contacto Direto'}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.45)' }}>
              {step === 1 ? '50%' : '100%'}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: 4,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 99,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
                width: step === 1 ? '50%' : '100%',
                transition: 'width 0.25s ease',
              }}
            />
          </div>
        </div>

        {/* ─── PASSO 1: AS 3 PERGUNTAS DE FILTRO RÁPIDAS (3 TOQUES) ───────── */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.15rem, 3.2vw, 1.30rem)',
                  color: '#FFFFFF',
                  margin: '0 0 3px 0',
                  lineHeight: 1.25,
                }}
              >
                Qualificação de Comprador
              </h3>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                Moradia T3 Chave-na-Mão · 335.000€ c/ IMT e Selo incluídos.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* PERGUNTA 2: ENTRADA E CAPITAIS PRÓPRIOS (SEM TEXTO REALITY CHECK) */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: 3,
                  }}
                >
                  1. Entrada e Capitais Próprios
                </label>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.60)',
                    margin: '0 0 7px 0',
                    lineHeight: 1.35,
                  }}
                >
                  Para uma moradia de 335.000€, o banco exige no mínimo 10% de entrada. Qual é a sua disponibilidade de capital hoje?
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                  {CAPITAL_OPTIONS.map(opt => {
                    const isSelected = capital === opt.label;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setCapital(opt.label)}
                        style={{
                          padding: '9px 10px',
                          borderRadius: 8,
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                          background: isSelected ? 'rgba(184, 146, 74, 0.22)' : 'rgba(255,255,255,0.035)',
                          color: '#fff',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 2,
                          transition: 'all 0.12s ease',
                          boxShadow: isSelected ? '0 2px 8px rgba(184, 146, 74, 0.20)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '0.80rem', fontWeight: isSelected ? 700 : 600 }}>
                            {opt.label}
                          </span>
                          <span
                            style={{
                              width: 13,
                              height: 13,
                              borderRadius: '50%',
                              border: isSelected ? '4px solid var(--gold-light)' : '1.5px solid rgba(255,255,255,0.3)',
                              background: isSelected ? '#15161A' : 'transparent',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.67rem', color: isSelected ? 'var(--gold-light)' : 'rgba(255,255,255,0.48)' }}>
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PERGUNTA 3: CRÉDITO HABITAÇÃO */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: 3,
                  }}
                >
                  2. Situação do Crédito Habitação
                </label>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.60)',
                    margin: '0 0 7px 0',
                    lineHeight: 1.35,
                  }}
                >
                  Como está a sua situação em relação ao Crédito Habitação?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {CREDITO_OPTIONS.map(opt => {
                    const isSelected = credito === opt.label;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setCredito(opt.label)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                          background: isSelected ? 'rgba(184, 146, 74, 0.22)' : 'rgba(255,255,255,0.035)',
                          color: '#fff',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          transition: 'all 0.12s ease',
                          boxShadow: isSelected ? '0 2px 8px rgba(184, 146, 74, 0.20)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            style={{
                              width: 13,
                              height: 13,
                              flexShrink: 0,
                              borderRadius: '50%',
                              border: isSelected ? '4px solid var(--gold-light)' : '1.5px solid rgba(255,255,255,0.3)',
                              background: isSelected ? '#15161A' : 'transparent',
                            }}
                          />
                          <span style={{ fontSize: '0.78rem', fontWeight: isSelected ? 700 : 500, lineHeight: 1.35 }}>
                            {opt.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: isSelected ? 'var(--gold-light)' : 'rgba(255,255,255,0.45)',
                            flexShrink: 0,
                            padding: '2px 5px',
                            borderRadius: 4,
                            background: isSelected ? 'rgba(184,146,74,0.25)' : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PERGUNTA 4: URGÊNCIA / TEMPO */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.92)',
                    marginBottom: 3,
                  }}
                >
                  3. Prazo para Fechar Negócio
                </label>
                <p
                  style={{
                    fontSize: '0.75rem',
                    color: 'rgba(255,255,255,0.60)',
                    margin: '0 0 7px 0',
                    lineHeight: 1.35,
                  }}
                >
                  Qual é o seu horizonte temporal para fechar negócio? Lembrando que a casa é entregue em 10 meses.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {URGENCIA_OPTIONS.map(opt => {
                    const isSelected = urgencia === opt.label;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setUrgencia(opt.label)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: 8,
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                          background: isSelected ? 'rgba(184, 146, 74, 0.22)' : 'rgba(255,255,255,0.035)',
                          color: '#fff',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 10,
                          transition: 'all 0.12s ease',
                          boxShadow: isSelected ? '0 2px 8px rgba(184, 146, 74, 0.20)' : 'none',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span
                            style={{
                              width: 13,
                              height: 13,
                              flexShrink: 0,
                              borderRadius: '50%',
                              border: isSelected ? '4px solid var(--gold-light)' : '1.5px solid rgba(255,255,255,0.3)',
                              background: isSelected ? '#15161A' : 'transparent',
                            }}
                          />
                          <span style={{ fontSize: '0.78rem', fontWeight: isSelected ? 700 : 500 }}>
                            {opt.label}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: isSelected ? 'var(--gold-light)' : 'rgba(255,255,255,0.45)',
                            flexShrink: 0,
                            padding: '2px 5px',
                            borderRadius: 4,
                            background: isSelected ? 'rgba(184,146,74,0.25)' : 'rgba(255,255,255,0.05)',
                          }}
                        >
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Botão de Avanço Rápido para o Passo 2 */}
            <div style={{ marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{
                  width: '100%',
                  background: 'var(--gold)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '13px 20px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                  transition: 'opacity 0.15s, transform 0.15s',
                }}
              >
                Continuar para Contacto (Passo 2 de 2) →
              </button>
            </div>
          </div>
        )}

        {/* ─── PASSO 2: DADOS DE CONTACTO & SUBMISSÃO DIRETA ─────────────── */}
        {step === 2 && (
          <div>
            {/* Mini Resumo das Escolhas do Passo 1 com opção de voltar */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(184, 146, 74, 0.3)',
                borderRadius: 9,
                padding: '8px 12px',
                marginBottom: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.85)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>
                <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>Perfil: </span>
                <span>{capital} · {urgencia.split('/')[0].trim()}</span>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-light)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Alterar
              </button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: 'clamp(1.15rem, 3.2vw, 1.28rem)',
                  color: '#FFFFFF',
                  margin: '0 0 3px 0',
                  lineHeight: 1.25,
                }}
              >
                {title || 'Agendar Visita ao Lote · Domaine XXV'}
              </h3>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.65)',
                  margin: 0,
                  lineHeight: 1.35,
                }}
              >
                Contacto direto com o construtor/promotor. Sem intermediários.
              </p>
            </div>

            <form
              onSubmit={handleFinalSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
            >
              {/* NOME COMPLETO */}
              <div>
                <label
                  htmlFor="lead-name"
                  style={{
                    display: 'block',
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 4,
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
                    padding: '10px 13px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.90rem',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label
                    htmlFor="lead-phone"
                    style={{
                      fontSize: '0.73rem',
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.85)',
                    }}
                  >
                    2. Telemóvel <span style={{ color: 'var(--gold)' }}>*</span>
                  </label>
                  <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>
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
                      padding: '10px 13px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: phoneError
                        ? '1.5px solid #ef4444'
                        : '1px solid rgba(255, 255, 255, 0.16)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
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
                        fontSize: '0.70rem',
                        fontWeight: 700,
                        color: validatePhone(phone) ? '#7DC4A0' : 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {phone.length}/9
                    </span>
                  )}
                </div>
                {phoneError && (
                  <p style={{ color: '#fca5a5', fontSize: '0.74rem', margin: '3px 0 0' }}>
                    {phoneError}
                  </p>
                )}
              </div>

              {/* HORÁRIO PREFERENCIAL */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
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
                          padding: '8px 10px',
                          borderRadius: 7,
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: isSelected ? 700 : 500,
                          textAlign: 'center',
                          color: isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                          background: isSelected ? 'rgba(184,146,74,0.30)' : 'rgba(255,255,255,0.035)',
                          border: isSelected ? '1.5px solid var(--gold)' : '1px solid rgba(255,255,255,0.12)',
                          boxShadow: isSelected ? '0 2px 8px rgba(184,146,74,0.25)' : 'none',
                          transition: 'all 0.12s ease',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* OBJETIVO DA CONSULTA */}
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend
                  style={{
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 5,
                    padding: 0,
                  }}
                >
                  4. Objetivo da sua Consulta
                </legend>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                  {INTENT_OPTIONS.map(opt => {
                    const isSelected = intent === opt;
                    return (
                      <label
                        key={opt}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 9,
                          padding: '8px 11px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          fontSize: '0.80rem',
                          color: isSelected ? '#fff' : 'rgba(255,255,255,0.75)',
                          background: isSelected ? 'rgba(184,146,74,0.22)' : 'rgba(255,255,255,0.03)',
                          border: isSelected ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                          transition: 'all 0.12s',
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

              {/* NOTAS (OPCIONAL) */}
              <div>
                <label
                  htmlFor="lead-notes"
                  style={{
                    display: 'block',
                    fontSize: '0.73rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.85)',
                    marginBottom: 4,
                  }}
                >
                  5. Notas / Questões <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)', textTransform: 'none', fontWeight: 400 }}>(opcional)</span>
                </label>
                <textarea
                  id="lead-notes"
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Alguma nota sobre a visita ou questão sobre acabamentos / financiamento..."
                  style={{
                    width: '100%',
                    padding: '8px 11px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    borderRadius: 8,
                    color: '#fff',
                    fontSize: '0.84rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.16)')}
                />
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

              {/* Botão de Registo Direto e Imediato */}
              <div style={{ marginTop: 4, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
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
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    opacity: isSubmitting ? 0.75 : 1,
                    boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
                    transition: 'opacity 0.15s, transform 0.15s',
                  }}
                >
                  {isSubmitting ? 'A registar contacto...' : 'Confirmar e Enviar Pedido →'}
                </button>

                <div
                  style={{
                    fontSize: '0.68rem',
                    color: 'rgba(255,255,255,0.45)',
                    textAlign: 'center',
                  }}
                >
                  🔒 Contacto direto com o promotor · Sem agências · Resposta no horário indicado
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
