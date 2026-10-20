'use client';
import React, { useState } from 'react';
import { useLeadModal } from '@/components/LeadModal';

/* ─── Processo Explicado: Como Funciona a Compra & Crédito à Construção ─── */

const STEPS = [
  {
    n: '01',
    title: 'Terreno Escriturado em Seu Nome',
    tagline: 'Propriedade legal desde o início do processo',
    bullets: [
      <>Faz a <strong>escritura notarial do lote</strong> logo no arranque do processo.</>,
      <>O terreno fica registado <strong>diretamente em seu nome</strong>, sendo o proprietário legal antes de iniciar a obra.</>,
      <>O sinal inicial de 10% (33.500€) no CPCV fica <strong>salvaguardado com devolução integral</strong> se o banco não aprovar o financiamento.</>,
    ],
    highlight: 'Escritura Notarial · Terreno em Seu Nome',
    highlightColor: 'var(--gold)',
  },
  {
    n: '02',
    title: 'Crédito à Construção por Tranches',
    tagline: 'Libertação faseada mediante vistorias bancárias',
    bullets: [
      <>Na prática, funciona como um <strong>crédito à construção</strong>, acompanhado sem custos por intermediários registados no Banco de Portugal.</>,
      <>O banco liberta o capital <strong>de forma faseada (por tranches)</strong> à medida que os trabalhos progridem.</>,
      <>Cada libertação é precedida por <strong>vistorias de peritos do banco</strong>, que confirmam a boa execução de cada etapa no terreno.</>,
    ],
    highlight: 'Libertação por Tranches · Vistorias do Banco',
    highlightColor: '#476822',
  },
  {
    n: '03',
    title: 'Construção a Preço Fechado',
    tagline: 'Entrega da moradia concluída em 10 meses',
    bullets: [
      <>Contrata a obra com <strong>valor fixo estabelecido em contrato</strong> de empreitada chave na mão.</>,
      <>Sem custos imprevistos, revisões orçamentais ou derrapes durante o decorrer da obra.</>,
      <>Execução rigorosa com prazo previsto de <strong>10 meses</strong> a cargo do Grupo Freitas Renovações.</>,
    ],
    highlight: 'Preço Fixo em Contrato · Chave na Mão',
    highlightColor: 'var(--text-primary)',
  },
];

export default function ProcessoSimplificado() {
  const { openLeadModal } = useLeadModal();
  const [openStep, setOpenStep] = useState<number | null>(null);

  return (
    <section id="processo" className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Como Funciona o Processo
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Simples, Transparente e Seguro:{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>O Processo Explicado em 3 Passos</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.93rem',
          lineHeight: 1.65, maxWidth: 620, margin: '0 auto 40px', textAlign: 'center',
        }}>
          O comprador fica com o terreno em seu nome e a casa é construída a seguir. Na prática, trata-se de um crédito à construção com libertação faseada pelo banco, garantindo total segurança a cada etapa.
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
              style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: 0, borderRadius: 'var(--radius-card)', border: '1px solid var(--border)' }}
            >
              {/* Step number */}
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.8rem', fontWeight: 700, lineHeight: 1,
                color: 'var(--gold)', marginBottom: 8, letterSpacing: '0.02em',
              }}>
                {step.n}
              </div>

              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-primary)' }}>
                  {step.title}
                </h3>
              </div>

              {/* Tagline */}
              <p style={{
                fontSize: '0.8rem', color: 'var(--text-muted)',
                lineHeight: 1.5, marginBottom: 16,
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
                fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: step.highlightColor,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ display: 'inline-block', width: 5, height: 5, background: 'currentColor' }} />
                {step.highlight}
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
                  border: `1px solid ${isOpen ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-card-sm)',
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
                    gap: 12, padding: '16px 18px',
                    background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '1.4rem', fontWeight: 700,
                    color: 'var(--gold)', lineHeight: 1, flexShrink: 0,
                  }}>
                    {step.n}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {step.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 2 }}>
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
                  <div style={{ padding: '0 18px 18px' }}>
                    <p style={{
                      fontSize: '0.8rem', color: 'var(--text-muted)',
                      lineHeight: 1.5, marginBottom: 12,
                    }}>
                      {step.tagline}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
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
          borderRadius: 'var(--radius-card-sm)',
          padding: '16px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 14,
        }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--gold)', fontWeight: 800 }}>•</span>
            <span>
              Da reserva à chave: <strong style={{ color: 'var(--text-primary)' }}>10 meses</strong> de construção com acompanhamento contínuo e sem revisões de preço.
            </span>
          </div>
          <button
            type="button"
            onClick={() => openLeadModal({
              title: 'Verificar Viabilidade Gratuita · Domaine XXV',
              source: 'processo_simplificado_viabilidade',
              defaultObjective: 'Análise de Viabilidade Financeira',
            })}
            className="btn btn-gold"
            style={{ fontSize: '0.80rem', padding: '12px 22px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase', border: 'none', cursor: 'pointer' }}
          >
            Verificar Viabilidade Gratuita →
          </button>
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
