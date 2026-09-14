'use client';
import React from 'react';

/* ─── Section 6: Acquisition Process (3 Steps) ──────────────────────────── */

const STEPS = [
  {
    n: '01',
    title: 'Informação & Validação',
    icon: '📋',
    items: [
      <><strong>Visita guiada ao terreno</strong> e apresentação completa do dossier</>,
      <>Escolha das personalizações: cozinha, acabamentos e climatização</>,
      <><strong>Estudo de viabilidade bancária 100% gratuito</strong> — sem compromisso</>,
      <>Enquadramento legal na taxa reduzida de <strong>6% de IVA</strong></>,
    ],
  },
  {
    n: '02',
    title: 'Reserva Protegida',
    icon: '🛡️',
    items: [
      <>Escritura do terreno <strong>registada em nome da sua família</strong></>,
      <>CPCV com sinal de <strong>38.500€ — 100% protegido contratualmente</strong></>,
      <><strong>Devolução integral</strong> do sinal se o banco recusar o crédito</>,
      <><strong>Preço blindado: 335.000€</strong> com IMT e Selo — sem derrapes</>,
    ],
  },
  {
    n: '03',
    title: 'Obra & Entrega Chave na Mão',
    icon: '🏠',
    items: [
      <><strong>10 meses de construção</strong> em LSF certificado A+</>,
      <>Entregamos a casa <strong>pronta a morar</strong> — cozinha completa e climatização</>,
      <>Recebimento do <strong>reembolso do IVA</strong> antes do fim da obra</>,
      <><strong>Entrega chave na mão contratualizada</strong> sem derrapes orçamentais</>,
    ],
  },
];

export default function ProcessSection() {
  return (
    <section id="processo" className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">Como Funciona</div>
        <h2 className="heading mobile-center-title" style={{ marginBottom: 12 }}>
          Três passos.{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>Total clareza.</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 500, marginBottom: 52 }}>
          Processo simples, transparente e com proteção contratual em cada etapa.
          Sem surpresas, sem desvios.
        </p>

        {/* Desktop: 3 horizontal steps | Mobile: vertical stack */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {STEPS.map((step, i) => (
            <div key={step.n} style={{ position: 'relative' }}>
              {/* Connector line on desktop */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block" style={{
                  position: 'absolute', top: 28, left: 'calc(100% + 12px)',
                  width: 'calc(0% + 12px)', /* zero width — connector is between cards */
                  display: 'none', // handled by CSS gap
                }} />
              )}

              <div className="card" style={{ padding: '28px 24px', height: '100%', position: 'relative', overflow: 'visible' }}>

                {/* Step number */}
                <div style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic',
                  fontSize: '2.6rem', fontWeight: 700, lineHeight: 1,
                  color: 'var(--gold)', marginBottom: 4, letterSpacing: '-0.02em',
                }}>
                  {step.n}
                </div>

                {/* Icon + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: '1.3rem' }}>{step.icon}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  {step.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0, marginTop: 1 }}>✓</span>
                      <span style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div style={{
          marginTop: 32,
          background: 'var(--bg-alt)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '16px 20px',
          fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6,
          textAlign: 'center',
        }}>
          ⏱️ &nbsp;Da reserva à escritura final: <strong style={{ color: 'var(--text-primary)' }}>10 meses</strong>.
          &nbsp;Valor fechado em contrato: <strong style={{ color: 'var(--gold)' }}>335.000€ com IMT e Imposto de Selo incluídos</strong>, sem derrapes orçamentais.
        </div>

      </div>
    </section>
  );
}
