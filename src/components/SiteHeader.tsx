'use client';
import React, { useState, useEffect } from 'react';
import { useLeadModal } from '@/components/LeadModal';

// ─── Legacy exports kept for type compatibility ─────────────────────────────
export const WA_PHONE = '351920601070';
export const WA_BASE  = '';
export const WA_VISIT   = '';
export const WA_MANAGER = '';
export const WA_CREDIT  = '';
export const WA_GENERIC = '';
export const WA_DOSSIER = '';

export default function SiteHeader() {
  const { openLeadModal } = useLeadModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 360);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(5, 7, 12, 0.94)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.1rem', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1 }}>
            Domaine XXV
          </div>
          <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-light)', marginTop: 3 }}>
            Oliveirinha · Aveiro
          </div>
        </div>

        {/* Single CTA Button (Sem Menu de Navegação) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {scrolled && (
            <button
              type="button"
              onClick={() => openLeadModal({
                title: 'Verificar disponibilidade · Domaine XXV',
                source: 'header_cta',
                defaultObjective: 'Verificar disponibilidade',
              })}
              style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--gold)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                padding: '9px 18px',
                borderRadius: 'var(--radius-btn)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(161, 118, 40, 0.2)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Verificar disponibilidade →</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
