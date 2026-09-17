'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Justificação de Preço & Reembolso do IVA ──────────────────────────── */
export default function IvaExplanationSection() {
  return (
    <section id="iva-explicacao" className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Estrutura Financeira &amp; Transparência Fiscal
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 760, margin: '0 auto 12px', textAlign: 'center' }}>
          Justificação de Preço e{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>o Reembolso do IVA</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.95rem',
          lineHeight: 1.65, maxWidth: 640, margin: '0 auto 40px', textAlign: 'center',
        }}>
          Como estruturamos a aquisição para que a sua família beneficie legalmente da taxa reduzida de IVA e poupe mais de 23.000€ em impostos.
        </p>

        {/* 4 Pillars of Financial Transparency */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 18,
          marginBottom: 36,
        }}>
          {/* Item 1 */}
          <div className="card" style={{ padding: '24px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card-sm)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-micro)', background: 'var(--gold-pale)',
              color: 'var(--gold-dark)', fontWeight: 800, fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              border: '1px solid #E6D8BC',
            }}>
              01
            </div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Processo Bancário a 360.000€
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              O processo formal junto do banco é instruído a <strong>360.000€</strong>. Este valor técnico assegura margem de liquidez e conforto absoluto na libertação das tranches de construção pelo perito bancário.
            </p>
          </div>

          {/* Item 2 */}
          <div className="card" style={{ padding: '24px 20px', background: 'var(--white)', border: '1px solid var(--gold)', borderRadius: 'var(--radius-card-sm)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-micro)', background: 'var(--gold)',
              color: '#fff', fontWeight: 800, fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              02
            </div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Direito à Taxa Reduzida (6%)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              Durante a obra, a faturação de materiais e mão-de-obra é emitida a 23%, mas o comprador particular de habitação própria qualifica-se legalmente para a <strong>taxa reduzida de 6%</strong> no preço final.
            </p>
          </div>

          {/* Item 3 */}
          <div className="card" style={{ padding: '24px 20px', background: '#FAF6EE', border: '1px solid var(--gold)', borderRadius: 'var(--radius-card-sm)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-micro)', background: '#2E492B',
              color: '#fff', fontWeight: 800, fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              03
            </div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: '#2E492B', marginBottom: 8 }}>
              Reembolso Direto do Estado
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#2E492B', lineHeight: 1.6, margin: 0 }}>
              Ainda <strong>antes do final da obra</strong>, recebe diretamente na sua conta a devolução da diferença de IVA. O seu custo real e líquido fica exatamente fixado nos <strong>335.000€ chave-na-mão</strong>.
            </p>
          </div>

          {/* Item 4 */}
          <div className="card" style={{ padding: '24px 20px', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-card-sm)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-micro)', background: 'var(--gold-pale)',
              color: 'var(--gold-dark)', fontWeight: 800, fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              border: '1px solid #E6D8BC',
            }}>
              04
            </div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Poupança de ~23.700€ no IMT
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              Ao escriturar o lote de terreno inicialmente em seu nome, o IMT e Selo incidem apenas sobre o terreno (~3.480€) em vez de incidirem sobre uma moradia pronta de 335.000€ (~27.180€).
            </p>
          </div>
        </div>

        {/* Closing summary banner */}
        <div style={{
          background: 'var(--bg-alt)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card-sm)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ fontWeight: 700, fontSize: '0.90rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              Auditoria e Proteção Jurídica no Contrato Promessa (CPCV)
            </div>
            <div style={{ fontSize: '0.80rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Sem cláusulas ocultas. A nossa equipa e os intermediários de crédito acompanham a sua família em todas as fases da operação financeira.
            </div>
          </div>

          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('iva_pedir_estudo')}
            className="btn btn-gold"
            style={{ fontSize: '0.82rem', padding: '12px 24px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
          >
            Pedir Estudo Financeiro Completo →
          </a>
        </div>

      </div>
    </section>
  );
}
