'use client';
import React from 'react';
import { WA_CREDIT } from './SiteHeader';

/* ─── Credit Section: Viability Test with Credit Intermediary ──────────── */
export default function CreditSection() {
  const BENEFITS = [
    {
      icon: '🛡️',
      title: '100% Gratuito & Sem Compromisso',
      desc: 'Sem quaisquer custos de consultoria, comissões de intermediação ou taxas escondidas para si ou para a sua família.',
    },
    {
      icon: '🏛️',
      title: 'Intermediário Registado no Banco de Portugal',
      desc: 'Processo acompanhado por profissionais certificados que negociam diretamente com todos os principais bancos nacionais.',
      note: 'Tratamos de toda a burocracia bancária por si. Risco zero.',
    },
    {
      icon: '⏱️',
      title: 'Resposta & Pré-Aprovação em 48h',
      desc: 'Simulação rápida da sua taxa de esforço e aprovação prévia com as melhores condições e spreads disponíveis no mercado.',
    },
    {
      icon: '🏗️',
      title: 'Financiamento Terreno + Construção',
      desc: 'Crédito estruturado por tranches com libertação por autos de medição. Durante os 10 meses de obra, paga apenas juros (~289€/mês). Processo bancário seguro e formalizado.',
    },
  ];

  return (
    <section id="credito" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">Apoio ao Financiamento</div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 640, marginBottom: 12 }}>
          Teste de Viabilidade de Crédito{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>100% Gratuito</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 580, marginBottom: 44 }}>
          Queremos que a sua família avance com total certeza e segurança. Disponibilizamos
          gratuitamente um intermediário de crédito vinculado para tratar de todo o processo
          bancário da moradia (<strong>335.000€ com IMT e Imposto de Selo incluídos</strong>), sem custos e sem perda de tempo.
        </p>

        {/* Benefits Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              <div style={{ fontSize: '1.8rem', lineHeight: 1 }}>{b.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {b.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                {b.desc}
              </p>
              {b.note && (
                <p style={{ fontSize: '0.84rem', color: 'var(--gold)', fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
                  ✓ {b.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Highlight Callout Box */}
        <div style={{
          background: 'var(--white)',
          border: '1.5px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: '1.2rem' }}>✨</span>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Descubra a prestação exata para o seu caso
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              Envie-nos uma mensagem e realizamos o estudo de viabilidade gratuito com os bancos para o valor chave na mão de <strong>335.000€ com IMT e Imposto de Selo já incluídos</strong>. Sem qualquer compromisso.
            </p>
          </div>

          <a
            href={WA_CREDIT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold"
            style={{ padding: '14px 28px', fontSize: '0.92rem', whiteSpace: 'nowrap' }}
          >
            <span>💬</span> Pedir Simulação de Crédito Gratuita
          </a>
        </div>

      </div>
    </section>
  );
}
