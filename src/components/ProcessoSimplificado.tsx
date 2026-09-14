'use client';
import React, { useState } from 'react';
import { WA_CREDIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Merged: Processo Simples & Protegido ───────────────────────────────── */
/* Funde: CreditSection + ProcessSection + Explicação IVA do EquitySection  */

const STEPS = [
  {
    n: '01',
    icon: '🛡️',
    title: 'Passo 1: Sinal Protegido (38.500€)',
    tagline: 'O seu valor fica salvaguardado com garantia total',
    bullets: [
      <>O seu valor de <strong>38.500€</strong> fica salvaguardado desde o primeiro dia.</>,
      <>Se por algum motivo o banco não aprovar o financiamento, <strong>o valor é devolvido na totalidade</strong>.</>,
      <><strong>Zero risco:</strong> proteção blindada por cláusula expressa no contrato promessa (CPCV).</>,
    ],
    highlight: 'Zero risco · Devolução integral garantida',
    highlightColor: 'var(--gold)',
  },
  {
    n: '02',
    icon: '🏛️',
    title: 'Passo 2: Financiamento Garantido',
    tagline: 'Burocracia bancária tratada por especialistas',
    bullets: [
      <>Trabalhamos em parceria direta com <strong>Intermediários de Crédito registados no Banco de Portugal</strong>.</>,
      <>Tratam de <strong>todo o processo bancário por si</strong>, sem qualquer custo para o comprador.</>,
      <>Processo ágil com condições otimizadas e pré-aprovação rápida.</>,
    ],
    highlight: 'Intermediário registado Banco de Portugal · 100% gratuito',
    highlightColor: '#5C7A3E',
  },
  {
    n: '03',
    icon: '🏠',
    title: 'Passo 3: Construção e Chave na Mão',
    tagline: 'Preço contratualizado sem derrapes orçamentais',
    bullets: [
      <><strong>Sem surpresas de orçamento:</strong> o preço assinado no contrato é o preço final até à entrega das chaves.</>,
      <><strong>335.000€ fechado:</strong> inclui projeto aprovado, terreno, construção e acabamentos.</>,
      <>Execução rigorosa em <strong>10 meses</strong> de obra chave-na-mão.</>,
    ],
    highlight: 'Preço final blindado · Chave na mão em 10 meses',
    highlightColor: '#4A6B8A',
  },
];

export default function ProcessoSimplificado() {
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <section id="processo" className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag" style={{ justifyContent: 'center', margin: '0 auto 14px' }}>Processo Simples &amp; Sem Risco</div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Sem Burocracia, Sem Derrapes.{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>Como Funciona o Processo:</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.93rem',
          lineHeight: 1.65, maxWidth: 580, margin: '0 auto 40px', textAlign: 'center',
        }}>
          Três passos simples e transparentes para a sua família conquistar a moradia sem dores de cabeça nem surpresas no caminho. Chave na mão em apenas 10 meses.
        </p>

        {/* ── Desktop: 3 colunas ── Mobile: accordion ── */}

        {/* DESKTOP GRID */}
        <div className="processo-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 36,
        }}>
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="card"
              style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 0 }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: 'var(--serif)', fontStyle: 'italic',
                fontSize: '2.4rem', fontWeight: 700, lineHeight: 1,
                color: 'var(--gold)', marginBottom: 4, letterSpacing: '-0.02em',
              }}>
                {step.n}
              </div>

              {/* Icon + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: '1.25rem' }}>{step.icon}</span>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
              </div>

              {/* Tagline */}
              <p style={{
                fontSize: '0.8rem', color: 'var(--text-muted)',
                lineHeight: 1.5, marginBottom: 16, fontStyle: 'italic',
              }}>
                {step.tagline}
              </p>

              {/* Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
                {step.bullets.map((b, j) => (
                  <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{
                      color: 'var(--gold)', fontWeight: 700,
                      fontSize: '0.8rem', flexShrink: 0, marginTop: 1,
                    }}>✓</span>
                    <span style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.55 }}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Highlight pill */}
              <div style={{
                marginTop: 18, paddingTop: 14,
                borderTop: '1px solid var(--border)',
                fontSize: '0.75rem', fontWeight: 700,
                color: step.highlightColor,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span>●</span> {step.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE ACCORDION */}
        <div className="processo-accordion" style={{ display: 'none', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
          {STEPS.map((step, idx) => {
            const isOpen = openStep === idx;
            return (
              <div
                key={step.n}
                style={{
                  border: `1.5px solid ${isOpen ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: 14,
                  background: isOpen ? 'var(--gold-pale)' : 'var(--white)',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}
              >
                {/* Header / trigger */}
                <button
                  onClick={() => setOpenStep(isOpen ? null : idx)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    gap: 12, padding: '18px 20px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--serif)', fontStyle: 'italic',
                    fontSize: '1.6rem', fontWeight: 700,
                    color: 'var(--gold)', lineHeight: 1, flexShrink: 0,
                  }}>
                    {step.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>{step.icon}</span>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                        {step.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {step.highlight}
                    </div>
                  </div>
                  <span style={{
                    color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>
                    ▾
                  </span>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding: '0 20px 20px' }}>
                    <p style={{
                      fontSize: '0.8rem', color: 'var(--text-muted)',
                      lineHeight: 1.5, marginBottom: 14, fontStyle: 'italic',
                    }}>
                      {step.tagline}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {step.bullets.map((b, j) => (
                        <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{
                            color: 'var(--gold)', fontWeight: 700,
                            fontSize: '0.8rem', flexShrink: 0, marginTop: 2,
                          }}>✓</span>
                          <span style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6 }}>
                            {b}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom summary bar */}
        <div style={{
          background: 'var(--bg-alt)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span>⏱️</span>
            <span>
              Da reserva à chave: <strong style={{ color: 'var(--text-primary)' }}>10 meses</strong>.
              &nbsp;Valor fechado em contrato:{' '}
              <strong style={{ color: 'var(--gold)' }}>335.000€ com IMT e Imposto de Selo incluídos</strong>.
            </span>
          </div>
          <a
            href={WA_CREDIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('processo_simplificado')}
            className="btn btn-gold"
            style={{ fontSize: '0.85rem', padding: '10px 20px', whiteSpace: 'nowrap' }}
          >
            <span>💬</span> Verificar Viabilidade Gratuitamente
          </a>
        </div>

      </div>

      {/* CSS for grid/accordion responsive toggle */}
      <style>{`
        @media (max-width: 767px) {
          .processo-grid     { display: none !important; }
          .processo-accordion { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
