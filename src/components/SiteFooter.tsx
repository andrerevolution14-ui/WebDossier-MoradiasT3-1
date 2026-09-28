'use client';
import React from 'react';
import { useLeadModal } from '@/components/LeadModal';

export default function SiteFooter() {
  const { openLeadModal } = useLeadModal();

  return (
    <footer style={{ background: 'var(--bg-alt)', padding: '48px 0 36px', borderTop: '1px solid var(--border)' }}>
      <div className="wrap" style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 6 }}>
          Domaine XXV
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
          Rua Acácio Simões Vieira (Lote 25) · 3810-843 Oliveirinha · Aveiro
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--gold-dark)', fontWeight: 700, marginBottom: 24 }}>
          335.000€ com IMT e Imposto de Selo incluídos · Entrada de 10% (33.500€)
        </div>

        <button
          id="footer_verificar_viabilidade"
          data-source="footer_verificar_viabilidade"
          type="button"
          onClick={() => openLeadModal({
            title: 'Saber Mais · Agendar Visita ao Domaine XXV',
            source: 'footer_btn',
          })}
          className="btn btn-gold"
          style={{ display: 'inline-flex', fontSize: '0.86rem', marginBottom: 32, borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
        >
          Saber Mais / Agendar Visita →
        </button>

        <div className="divider" style={{ marginBottom: 24 }} />
        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
          © {new Date().getFullYear()} Domaine XXV · Em parceria com Freitas Renovações Lda.<br />
          Dossier digital informativo de apresentação do projeto da Moradia em Oliveirinha.
        </p>
      </div>
    </footer>
  );
}
