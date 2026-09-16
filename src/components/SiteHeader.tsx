'use client';
import React, { useState } from 'react';
import { trackWhatsAppLead } from '@/lib/analytics';

// ─── WhatsApp Config — 920601070 ──────────────────────────────────────────
export const WA_PHONE = '351920601070';
export const WA_BASE  = `https://wa.me/${WA_PHONE}`;

// Mensagem automática unificada para todos os botões de contacto
const WA_MSG = encodeURIComponent(
  'Olá André! Vi a Moradia Domaine XXV em Oliveirinha e gostaria de agendar uma visita. Como podemos combinar?'
);

export const WA_VISIT   = `${WA_BASE}?text=${WA_MSG}`;
export const WA_MANAGER = `${WA_BASE}?text=${WA_MSG}`;
export const WA_CREDIT  = `${WA_BASE}?text=${WA_MSG}`;
export const WA_GENERIC = `${WA_BASE}?text=${WA_MSG}`;
export const WA_DOSSIER = `${WA_BASE}?text=${WA_MSG}`;

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_LINKS = [
    ['#galeria', 'Galeria'],
    ['#videos', 'Vídeos 3D'],
    ['#plantas', 'Plantas'],
    ['#localizacao', 'Localização'],
    ['#credito', 'Crédito Gratuito'],
    ['#condicoes', 'Valores'],
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(249,248,243,0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <a href="#topo" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.08rem', color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1 }}>
            Domaine XXV
          </div>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: 2 }}>
            Oliveirinha · Aveiro
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="site-nav-desktop">
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text-body)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-body)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('header_desktop_visita')}
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'var(--gold)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.82rem',
              padding: '9px 16px',
              borderRadius: 8,
              textDecoration: 'none',
              boxShadow: '0 2px 10px rgba(184,146,74,0.3)',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            <span>💬</span> <span className="hidden sm:inline">Marcar</span> Visita
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Menu de Navegação"
            className="site-menu-mobile-btn"
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: 8,
              width: 38,
              height: 38,
              cursor: 'pointer',
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              lineHeight: 1,
            }}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--white)',
            borderBottom: '1px solid var(--border)',
            padding: '16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid #f2ede4',
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppLead('header_mobile_drawer_visita');
              setMobileMenuOpen(false);
            }}
            className="btn btn-gold"
            style={{ marginTop: 8, width: '100%', fontSize: '0.9rem' }}
          >
            <span>💬</span> Marcar Visita ao Terreno
          </a>
        </div>
      )}
    </header>
  );
}
