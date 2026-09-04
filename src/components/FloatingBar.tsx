'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';

/* ─── Fixed Bottom Floating Bar ─────────────────────────────────────────── */
export default function FloatingBar() {
  return (
    <div
      className="bottom-bar"
      style={{
        boxShadow: '0 -4px 20px rgba(0,0,0,0.18)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Property summary */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--gold)',
          lineHeight: 1, marginBottom: 3,
        }}>
          Domaine XXV · 329.000€
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Moradia T3 · Jardim ~82 m² · Oliveirinha
        </div>
      </div>

      {/* Map button (desktop only) */}
      <a
        href="https://www.google.com/maps/dir/?api=1&destination=Rua+Ac%C3%A1cio+Sim%C3%B5es+Vieira%2C+25%2C+Oliveirinha%2C+Aveiro"
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost-white hidden md:inline-flex"
        style={{ fontSize: '0.8rem', padding: '10px 16px', flexShrink: 0 }}
      >
        🗺️ Ver no Mapa
      </a>

      {/* Primary WhatsApp CTA */}
      <a
        href={WA_VISIT}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-gold"
        style={{
          fontSize: '0.85rem',
          padding: '11px 18px',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(184,146,74,0.4)',
        }}
      >
        <span>💬</span> <span className="hidden sm:inline">Marcar</span> Visita <span className="hidden xs:inline sm:inline">ao Terreno</span>
      </a>
    </div>
  );
}
