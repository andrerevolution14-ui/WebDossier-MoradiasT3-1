'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Fixed Bottom Floating Bar — Strictly Centered & Mobile First ─────── */
export default function FloatingBar() {
  return (
    <aside
      id="sticky-bar-wrapper"
      role="complementary"
      aria-label="Ação rápida WhatsApp"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 9999,
        background: 'rgba(18, 19, 22, 0.95)',
        backdropFilter: 'blur(16px)',
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -4px 28px rgba(0,0,0,0.3)',
        borderTop: '1px solid rgba(179,142,70,0.35)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        margin: 0,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 520,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          boxSizing: 'border-box',
        }}
      >
        <a
          href={WA_VISIT}
          target="_blank"
          rel="noopener noreferrer"
          id="sticky-cta-btn"
          onClick={() => trackWhatsAppLead('sticky_bar')}
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
            fontSize: 'clamp(0.78rem, 3.2vw, 0.88rem)',
            padding: '13px 18px',
            borderRadius: 'var(--radius-btn)',
            textDecoration: 'none',
            boxShadow: '0 3px 14px rgba(161,118,40,0.35)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s, box-shadow 0.15s',
            margin: '0 auto',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(184,146,74,0.55)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 3px 14px rgba(184,146,74,0.35)';
          }}
        >
          <span style={{ whiteSpace: 'nowrap' }}>Agendar Visita Privada ao Lote →</span>
        </a>

        {/* Micro-copy de escassez e prazo */}
        <p
          style={{
            fontSize: '0.66rem',
            color: 'rgba(255,255,255,0.65)',
            textAlign: 'center',
            lineHeight: 1.25,
            margin: '5px 0 0',
            maxWidth: 480,
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            letterSpacing: '0.02em',
          }}
        >
          Chave na mão em 10 meses · Sinal 100% salvaguardado no CPCV
        </p>
      </div>
    </aside>
  );
}
