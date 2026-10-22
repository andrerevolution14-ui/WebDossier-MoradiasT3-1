'use client';

import React, { useState, useEffect } from 'react';
import { trackWhatsAppContact } from '@/lib/analytics';

const PHONE_NUMBER = '351920601070';
const PHONE_DISPLAY = '+351 920 601 070';

// Mensagem pré-definida única, aberta, cordial e geral sobre o projeto
const DEFAULT_PRESET_MESSAGE =
  'Olá André! Vi o projeto das Moradias Domaine XXV em Oliveirinha e gostaria de obter mais informações. Podemos falar?';

export default function WhatsAppFloatingButton() {
  const [hasScrolledPastTop, setHasScrolledPastTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Ajustar posição suavemente quando a barra sticky mobile (FloatingBar) aparece ao scrollar
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolledPastTop(window.scrollY > 360);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    // 1. Rastreamento completo (Pixel Lead/Contact + Server-Side Meta CAPI + Registo Neon DB)
    trackWhatsAppContact('whatsapp_floating_widget', {
      objective: 'Contacto Direto WhatsApp',
      message: DEFAULT_PRESET_MESSAGE,
    });

    // 2. Abrir WhatsApp direto com a mensagem pré-definida única
    const encoded = encodeURIComponent(DEFAULT_PRESET_MESSAGE);
    const waUrl = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
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
            opacity: 0.35;
            transform: scale(0.85);
          }
        }
      `}</style>

      {/* Botão Flutuante Permanente — Canto Inferior Direito */}
      <aside
        id="wa-floating-container"
        aria-label="Contacto WhatsApp direto com o André"
        style={{
          position: 'fixed',
          right: '18px',
          bottom: hasScrolledPastTop
            ? 'calc(86px + env(safe-area-inset-bottom, 0px))'
            : 'calc(20px + env(safe-area-inset-bottom, 0px))',
          zIndex: 100000,
          transition: 'bottom 0.32s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily:
            "var(--font-body, 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)",
        }}
      >
        {/* Badge lateral (Desktop) — Clicável e elegante */}
        <button
          type="button"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="wa-floating-badge"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 18, 22, 0.94)',
            border: isHovered
              ? '1px solid rgba(37, 211, 102, 0.7)'
              : '1px solid rgba(184, 146, 74, 0.38)',
            borderRadius: '30px',
            padding: '9px 15px 9px 12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45)',
            cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            transform: isHovered ? 'translateX(-3px)' : 'translateX(0)',
            transition: 'all 0.2s ease',
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
              fontSize: '0.80rem',
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
              padding: '2px 7px',
              borderRadius: '10px',
            }}
          >
            Online
          </span>
        </button>

        {/* Botão Circular Flutuante Verde WhatsApp */}
        <button
          type="button"
          id="wa_floating_trigger"
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          aria-label={`Enviar mensagem WhatsApp para ${PHONE_DISPLAY}`}
          style={{
            position: 'relative',
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            border: '2px solid rgba(255, 255, 255, 0.28)',
            boxShadow: isHovered
              ? '0 12px 34px rgba(37, 211, 102, 0.65), 0 2px 12px rgba(0, 0, 0, 0.6)'
              : '0 8px 28px rgba(37, 211, 102, 0.45), 0 2px 10px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            cursor: 'pointer',
            outline: 'none',
            transform: isHovered ? 'scale(1.08) translateY(-2px)' : 'scale(1)',
            transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s',
          }}
        >
          {/* Anel de Pulso Radiante suave em volta */}
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

          {/* Ícone Oficial WhatsApp em SVG */}
          <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.124-.533-1.619-.672-2.67-2.316-2.75-2.423-.08-.108-.66-.88-.66-1.678 0-.798.417-1.19.566-1.35.148-.16.324-.2.432-.2.108 0 .216.001.311.006.101.005.236-.039.37.284.14.337.478 1.168.52 1.254.042.086.07.187.012.302-.058.115-.088.187-.174.288-.087.101-.182.226-.26.304-.087.087-.177.182-.076.356.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.375-.044.101-.115.433-.504.549-.677.115-.173.231-.144.389-.086.158.058 1.002.472 1.175.558.173.086.288.13.331.202.043.072.043.418-.101.823z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.176L2 22l4.981-1.306C8.42 21.536 10.15 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.25c-1.637 0-3.167-.47-4.464-1.282l-.32-.2-2.956.775.789-2.883-.209-.333C3.967 15.011 3.5 13.547 3.5 12c0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
          </svg>
        </button>
      </aside>

      {/* Mostrar badge de texto em ecrãs >= 640px */}
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
