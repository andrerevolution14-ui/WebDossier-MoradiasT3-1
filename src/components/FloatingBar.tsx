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
        background: '#1A1A1A',
        padding: '10px 16px',
        paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -4px 28px rgba(0,0,0,0.45)',
        borderTop: '1.5px solid rgba(184,146,74,0.35)',
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
            background: 'linear-gradient(135deg, #C9A24F 0%, #B8924A 50%, #9E7A38 100%)',
            color: '#fff',
            fontFamily: 'var(--sans)',
            fontWeight: 800,
            fontSize: 'clamp(0.80rem, 3.5vw, 0.95rem)',
            padding: '11px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            boxShadow: '0 3px 16px rgba(184,146,74,0.45)',
            letterSpacing: '0.01em',
            boxSizing: 'border-box',
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s, box-shadow 0.15s',
            margin: '0 auto',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(184,146,74,0.7)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 3px 16px rgba(184,146,74,0.45)';
          }}
        >
          <span style={{ fontSize: '1.05rem', flexShrink: 0 }}>📅</span>
          <span style={{ whiteSpace: 'nowrap' }}>Quero Agendar a Minha Visita Privada</span>
        </a>

        {/* Micro-copy de escassez e prazo */}
        <p
          style={{
            fontSize: '0.64rem',
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center',
            lineHeight: 1.25,
            margin: '4px 0 0',
            maxWidth: 480,
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          👉 Chave na mão em 10 meses · Sinal 100% salvaguardado no CPCV
        </p>
      </div>
    </aside>
  );
}
