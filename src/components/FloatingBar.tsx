'use client';
import React, { useState, useEffect } from 'react';
import { useLeadModal } from '@/components/LeadModal';

/* ─── Fixed Bottom Floating Bar — Strictly Centered & Hidden Pre-Scroll ─── */
export default function FloatingBar() {
  const { openLeadModal } = useLeadModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear only after user scrolls past the top fold (~360px)
      if (window.scrollY > 360) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      id="sticky-bar-wrapper"
      role="complementary"
      aria-label="Ação rápida Saber Mais"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        background: 'rgba(18, 19, 22, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -4px 28px rgba(0,0,0,0.35)',
        borderTop: '1px solid rgba(179,142,70,0.35)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        margin: 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(110%)',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <button
          type="button"
          id="sticky-cta-btn"
          onClick={() => openLeadModal({
            title: 'Agendar Visita ao Lote · 335.000€ (c/ IMT e Selo)',
            source: 'sticky_bar',
          })}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 8,
            width: '100%',
            background: 'var(--gold)',
            color: '#fff',
            fontFamily: 'var(--sans)',
            fontWeight: 700,
            fontSize: 'clamp(0.82rem, 3.2vw, 0.90rem)',
            padding: '13px 20px',
            borderRadius: 'var(--radius-btn)',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 3px 14px rgba(161,118,40,0.35)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s, box-shadow 0.15s',
            margin: '0 auto',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 20px rgba(184,146,74,0.55)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 3px 14px rgba(184,146,74,0.35)';
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>Saber Mais · Agendar Visita ao Lote →</span>
        </button>

        {/* Micro-copy limpo e centrado */}
        <p
          style={{
            fontSize: '0.70rem',
            color: 'rgba(255,255,255,0.72)',
            textAlign: 'center',
            lineHeight: 1.3,
            margin: '5px 0 0',
            maxWidth: 440,
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.02em',
          }}
        >
          335.000€ com IMT e Selo incluídos · Entrada 10% (33.500€) protegida
        </p>
      </div>
    </aside>
  );
}
