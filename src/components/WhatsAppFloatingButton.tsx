'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { trackWhatsAppContact } from '@/lib/analytics';

const PHONE_NUMBER = '351920601070';
const PHONE_DISPLAY = '+351 920 601 070';

interface ObjectiveOption {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  message: string;
}

const OBJECTIVES: ObjectiveOption[] = [
  {
    id: 'visita',
    icon: '🏡',
    title: 'Agendar Visita ao Lote',
    subtitle: 'Conhecer o Lote 25 presencialmente',
    message:
      'Olá André! Vi as Moradias Domaine XXV em Oliveirinha (335k chave na mão c/ impostos) e gostaria de agendar uma visita presencial ao Lote 25. Quais os dias e horários com disponibilidade?',
  },
  {
    id: 'condicoes',
    icon: '💶',
    title: 'Condições 335k & Entrada 10%',
    subtitle: 'Preço chave na mão c/ impostos incluídos',
    message:
      'Olá André! Gostaria de esclarecer as condições de pagamento (335.000€ c/ IMT e Selo incluídos) e como funciona a salvaguarda dos 10% de entrada no CPCV das Moradias Domaine XXV. Pode dar-me mais detalhes?',
  },
  {
    id: 'credito',
    icon: '🏦',
    title: 'Simulação de Crédito Bancário',
    subtitle: 'Apoio gratuito com intermediária de crédito',
    message:
      'Olá André! Gostaria de saber mais sobre o processo de crédito à construção das Moradias Domaine XXV e fazer uma simulação gratuita com a vossa equipa. Como podemos avançar?',
  },
  {
    id: 'plantas',
    icon: '📐',
    title: 'Plantas & Personalização',
    subtitle: 'Áreas, acabamentos e prazo de 10 meses',
    message:
      'Olá André! Gostaria de consultar as plantas detalhadas das Moradias Domaine XXV e saber que opções de personalização de acabamentos e cozinha estão incluídas no prazo de 10 meses.',
  },
  {
    id: 'geral',
    icon: '💬',
    title: 'Mensagem Geral / Outra Dúvida',
    subtitle: 'Falar diretamente com o André',
    message:
      'Olá André! Tenho interesse nas Moradias Domaine XXV em Oliveirinha e gostaria de falar consigo para esclarecer algumas dúvidas sobre o projeto. Como podemos conversar?',
  },
];

export default function WhatsAppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<ObjectiveOption>(OBJECTIVES[0]);
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Monitor scroll para ajustar posição quando o sticky footer (FloatingBar) aparece
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPastTop(window.scrollY > 360);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar popover ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleOpenWhatsApp = (objectiveToUse?: ObjectiveOption) => {
    const targetObj = objectiveToUse || selectedObjective;
    setHasInteracted(true);

    // Rastreamento ao mesmo nível que os formulários:
    // 1. Pixel do Browser (Lead deduplicado + Contact)
    // 2. Meta Conversions API (CAPI) Server-to-Server
    // 3. Registo na Base de Dados Neon (status: whatsapp_iniciado)
    trackWhatsAppContact('whatsapp_floating_widget', {
      objective: targetObj.title,
      message: targetObj.message,
    });

    const encoded = encodeURIComponent(targetObj.message);
    const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;

    // Abrir WhatsApp numa nova janela/app
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Fechar popover suavemente
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <>
      <style jsx>{`
        @keyframes waPulseRing {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.35);
            opacity: 0;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
        @keyframes waBeaconDot {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }
        @keyframes waCardSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      {/* Container Flutuante Fixo */}
      <div
        ref={popoverRef}
        aria-label="Atendimento Direto WhatsApp com o André"
        style={{
          position: 'fixed',
          right: '18px',
          bottom: hasScrolledPastTop
            ? 'calc(86px + env(safe-area-inset-bottom, 0px))'
            : 'calc(20px + env(safe-area-inset-bottom, 0px))',
          zIndex: 100000,
          transition: 'bottom 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily:
            "var(--font-body, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        }}
      >
        {/* ─── POPOVER / CARTÃO DE ESCOLHA DE OBJETIVO ─── */}
        {isOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 14px)',
              right: 0,
              width: 'min(380px, calc(100vw - 32px))',
              background: 'rgba(16, 18, 22, 0.96)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(184, 146, 74, 0.38)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow:
                '0 24px 60px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05)',
              color: '#FFFFFF',
              boxSizing: 'border-box',
              animation: 'waCardSlideIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Header do Cartão */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                <div
                  style={{
                    position: 'relative',
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--gold, #B8924A)',
                    flexShrink: 0,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  <Image
                    src="/EU1.jpeg"
                    alt="André Queirós"
                    width={44}
                    height={44}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 1,
                      right: 1,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#25D366',
                      border: '2px solid #101216',
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.94rem',
                      color: '#FFFFFF',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.2,
                    }}
                  >
                    André Queirós
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--gold-light, #DFC58D)',
                      letterSpacing: '0.02em',
                      marginTop: '2px',
                    }}
                  >
                    Promotor · Domaine XXV
                  </div>
                </div>
              </div>

              {/* Botão Fechar */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar janela do WhatsApp"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  lineHeight: 1,
                  transition: 'background 0.15s, color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Balão de Apresentação */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '11px 13px',
                fontSize: '0.80rem',
                lineHeight: 1.45,
                color: 'rgba(255, 255, 255, 0.88)',
                marginBottom: '14px',
              }}
            >
              👋 Olá! Estou online para esclarecer as suas dúvidas sobre a{' '}
              <strong style={{ color: '#fff' }}>Moradia Domaine XXV em Oliveirinha</strong> (335.000€ chave na mão). Escolha o seu objetivo:
            </div>

            {/* Lista de Objetivos da Landing Page */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '7px',
                marginBottom: '14px',
                maxHeight: '230px',
                overflowY: 'auto',
                paddingRight: '2px',
              }}
            >
              {OBJECTIVES.map((obj) => {
                const isSelected = selectedObjective.id === obj.id;
                return (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => {
                      setSelectedObjective(obj);
                    }}
                    onDoubleClick={() => handleOpenWhatsApp(obj)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      background: isSelected
                        ? 'rgba(37, 211, 102, 0.14)'
                        : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected
                        ? '1px solid rgba(37, 211, 102, 0.55)'
                        : '1px solid rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      width: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span style={{ fontSize: '1.15rem', flexShrink: 0 }}>{obj.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: '0.80rem',
                          fontWeight: isSelected ? 700 : 600,
                          color: isSelected ? '#A8F5C4' : '#FFFFFF',
                          lineHeight: 1.25,
                        }}
                      >
                        {obj.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.68rem',
                          color: 'rgba(255, 255, 255, 0.55)',
                          marginTop: '2px',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {obj.subtitle}
                      </div>
                    </div>
                    {isSelected && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          color: '#25D366',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Pré-visualização da Mensagem Aberta */}
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px dashed rgba(184, 146, 74, 0.35)',
                borderRadius: '9px',
                padding: '9px 11px',
                fontSize: '0.72rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.4,
                marginBottom: '14px',
                fontStyle: 'italic',
              }}
            >
              &ldquo;{selectedObjective.message}&rdquo;
            </div>

            {/* Botão Principal de Envio no WhatsApp */}
            <button
              type="button"
              id="wa_widget_submit_cta"
              onClick={() => handleOpenWhatsApp()}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #25D366 0%, #1EBE5D 100%)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                padding: '13px 16px',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.02em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 211, 102, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)';
              }}
            >
              {/* WhatsApp Icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.124-.533-1.619-.672-2.67-2.316-2.75-2.423-.08-.108-.66-88-.66-1.678 0-.798.417-1.19.566-1.35.148-.16.324-.2.432-.2.108 0 .216.001.311.006.101.005.236-.039.37.284.14.337.478 1.168.52 1.254.042.086.07.187.012.302-.058.115-.088.187-.174.288-.087.101-.182.226-.26.304-.087.087-.177.182-.076.356.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.101-.115.433-.504.549-.677.115-.173.231-.144.389-.086.158.058 1.002.472 1.175.558.173.086.288.13.331.202.043.072.043.418-.101.823z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.42 21.536 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.47-4.464-1.282l-.32-.2-2.956.775.789-2.883-.209-.333C3.967 15.011 3.5 13.547 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
              </svg>
              <span>Falar no WhatsApp com o André</span>
            </button>

            {/* Rodapé Seguro */}
            <div
              style={{
                fontSize: '0.64rem',
                color: 'rgba(255, 255, 255, 0.45)',
                textAlign: 'center',
                marginTop: '10px',
                letterSpacing: '0.02em',
              }}
            >
              🔒 Canal direto oficial ({PHONE_DISPLAY}) · Sem compromisso
            </div>
          </div>
        )}

        {/* ─── BOTÃO FLUTUANTE PERMANENTE (ALWAYS ACTIVE) ─── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Badge de Texto "Online / Fale com o André" no Desktop */}
          {!isOpen && (
            <div
              onClick={() => setIsOpen(true)}
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(16, 18, 22, 0.94)',
                border: '1px solid rgba(184, 146, 74, 0.4)',
                borderRadius: '30px',
                padding: '8px 14px 8px 10px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
                cursor: 'pointer',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                transition: 'transform 0.15s, border-color 0.15s',
              }}
              className="wa-floating-badge"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.7)';
                e.currentTarget.style.transform = 'translateX(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(184, 146, 74, 0.4)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#25D366',
                  boxShadow: '0 0 8px #25D366',
                  animation: 'waBeaconDot 2s infinite ease-in-out',
                }}
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.01em',
                }}
              >
                Falar com o André
              </span>
              <span
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  color: 'var(--gold-light, #DFC58D)',
                  background: 'rgba(184, 146, 74, 0.15)',
                  padding: '2px 6px',
                  borderRadius: '10px',
                }}
              >
                Online
              </span>
            </div>
          )}

          {/* O Botão Circular Flutuante WhatsApp */}
          <button
            type="button"
            id="wa_floating_trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Abrir conversa de WhatsApp"
            style={{
              position: 'relative',
              width: 58,
              height: 58,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
              border: '2px solid rgba(255, 255, 255, 0.25)',
              boxShadow:
                '0 8px 28px rgba(37, 211, 102, 0.45), 0 2px 10px rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              outline: 'none',
              transform: isOpen ? 'rotate(90deg)' : 'scale(1)',
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!isOpen) {
                e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 12px 34px rgba(37, 211, 102, 0.6), 0 2px 12px rgba(0, 0, 0, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isOpen) {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 8px 28px rgba(37, 211, 102, 0.45), 0 2px 10px rgba(0, 0, 0, 0.5)';
              }
            }}
          >
            {/* Anel de Pulso Radiante ao Redor do Botão */}
            {!isOpen && (
              <span
                style={{
                  position: 'absolute',
                  inset: -6,
                  borderRadius: '50%',
                  border: '2px solid rgba(37, 211, 102, 0.55)',
                  animation: 'waPulseRing 2.6s infinite cubic-bezier(0.25, 0.8, 0.25, 1)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {isOpen ? (
              <span style={{ fontSize: '1.4rem', fontWeight: 300, lineHeight: 1 }}>✕</span>
            ) : (
              /* WhatsApp Icon SVG */
              <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.124-.533-1.619-.672-2.67-2.316-2.75-2.423-.08-.108-.66-.88-.66-1.678 0-.798.417-1.19.566-1.35.148-.16.324-.2.432-.2.108 0 .216.001.311.006.101.005.236-.039.37.284.14.337.478 1.168.52 1.254.042.086.07.187.012.302-.058.115-.088.187-.174.288-.087.101-.182.226-.26.304-.087.087-.177.182-.076.356.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.101-.115.433-.504.549-.677.115-.173.231-.144.389-.086.158.058 1.002.472 1.175.558.173.086.288.13.331.202.043.072.043.418-.101.823z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.42 21.536 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.47-4.464-1.282l-.32-.2-2.956.775.789-2.883-.209-.333C3.967 15.011 3.5 13.547 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Media query para exibir o badge de texto em ecrãs >= 640px */}
      <style jsx global>{`
        @media (min-width: 640px) {
          .wa-floating-badge {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
}
