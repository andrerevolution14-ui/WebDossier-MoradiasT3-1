'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Triangle Section — "The Impossible Triangle of Aveiro" ─────────────── */
export default function TriangleSection() {
  const BLOCKS = [
    {
      num: '01',
      combo: 'Preço + Cidade = Sem Espaço',
      result: 'Sem Espaço',
      desc: 'Com 300.000€ no centro de Aveiro, só compra um T1 pequeno, sem jardim e sem garagem.',
      sacrifice: 'Perde: Espaço',
    },
    {
      num: '02',
      combo: 'Espaço + Preço = Longe de Tudo',
      result: 'Longe de Tudo',
      desc: 'Quer uma moradia grande por esse valor? Terá de ir morar a 40 minutos e perder horas no trânsito todos os dias.',
      sacrifice: 'Perde: Localização',
    },
    {
      num: '03',
      combo: 'Espaço + Cidade = Preço Proibitivo',
      result: 'Preço Proibitivo',
      desc: 'Moradias grandes e perto da cidade ultrapassam facilmente os 500.000€ a 600.000€.',
      sacrifice: 'Perde: Preço Acessível',
    },
  ];

  return (
    <section
      id="triangulo"
      style={{
        background: 'linear-gradient(180deg, #111111 0%, #1A1A1A 100%)',
        padding: '44px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background geometry */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(184,146,74,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Section tag ── */}
        <div className="section-tag mobile-center-tag">
          Análise de Mercado · Aveiro
        </div>

        {/* ── Headline — Alta legibilidade sem itálicos finos ── */}
        <h2 className="heading mobile-center-title" style={{
          color: '#FFFFFF',
          maxWidth: 780,
          margin: '0 auto 12px',
          textAlign: 'center',
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
          lineHeight: 1.25,
        }}>
          A Regra do Triângulo:{' '}
          <span style={{ color: 'var(--gold-light)' }}>
            Porque é que é tão difícil comprar casa em Aveiro?
          </span>
        </h2>

        {/* ── Simple intro ── */}
        <p className="mobile-center-desc" style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '0.92rem',
          lineHeight: 1.6,
          maxWidth: 640,
          margin: '0 auto 28px',
          textAlign: 'center',
        }}>
          Tamanho, Localização e Preço: o mercado imobiliário em Aveiro normalmente <strong style={{ color: 'var(--gold-light)' }}>só o deixa escolher 2</strong>:
        </p>

        {/* ── 3 Bloqueio Cards (Centrados, Cantos Arredondados 14px) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginBottom: 28,
        }}>
          {BLOCKS.map((block) => (
            <div
              key={block.combo}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 'var(--radius-card)',
                padding: '22px 20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'border-color 0.25s, background 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,146,74,0.4)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.10)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              {/* Number marker */}
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--gold-light)',
                borderBottom: '1.5px solid var(--gold)',
                paddingBottom: 2,
                marginBottom: 10,
                letterSpacing: '0.06em',
              }}>
                {block.num}
              </div>

              {/* Combo title */}
              <div style={{
                fontFamily: 'var(--serif)',
                fontWeight: 700,
                fontSize: '0.98rem',
                color: '#ffffff',
                lineHeight: 1.3,
                marginBottom: 10,
              }}>
                {block.combo}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)',
                lineHeight: 1.6, margin: '0 0 14px', textAlign: 'center',
              }}>
                {block.desc}
              </p>

              {/* Sacrifice badge — Cantos Retos (2px) para Contraste */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(239,68,68,0.12)',
                border: '1px solid rgba(239,68,68,0.28)',
                borderRadius: 'var(--radius-micro)', padding: '4px 10px',
                fontSize: '0.68rem', fontWeight: 700,
                color: '#FCA5A5',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginTop: 'auto',
              }}>
                <span>✕</span> {block.sacrifice}
              </div>
            </div>
          ))}
        </div>

        {/* ── Fecho: "Esta Moradia Quebra o Triângulo" (Cantos Arredondados 14px) ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(161,118,40,0.16) 0%, rgba(161,118,40,0.06) 100%)',
          border: '1px solid rgba(161,118,40,0.4)',
          borderRadius: 'var(--radius-card)',
          padding: '28px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '0.70rem', fontWeight: 800, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--gold-light)',
            marginBottom: 10,
          }}>
            ✦ A Solução em Oliveirinha · Entrega em 10 Meses ✦
          </div>

          <h3 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)',
            color: '#FFFFFF',
            lineHeight: 1.35,
            marginBottom: 16,
            letterSpacing: '-0.01em',
          }}>
            ESTA MORADIA QUEBRA O TRIÂNGULO:
            <span style={{ color: 'var(--gold-light)', display: 'block', marginTop: 6, fontWeight: 600, fontSize: '1.05rem' }}>
              Espaço T4 com jardim a 8 min de Aveiro por 335.000€ · Chave na mão em apenas 10 meses.
            </span>
          </h3>

          {/* 4 specifications items — Compacto 2x2 no Mobile */}
          <div className="triangle-badges-grid">
            {[
              'T4 com Jardim ~82 m²',
              '8 min de Aveiro',
              'Chave na mão em 10 meses',
              '335.000€ Chave na Mão',
            ].map(label => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 'var(--radius-micro)', padding: '7px 8px',
                fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.95)',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 1.25,
              }}>
                <span style={{ color: 'var(--gold-light)', fontSize: '0.8rem' }}>•</span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead('triangle_agendar_visita')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--gold)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '14px 32px',
                borderRadius: 'var(--radius-btn)',
                textDecoration: 'none',
                boxShadow: '0 4px 16px rgba(161,118,40,0.35)',
              }}
            >
              Quero Agendar a Minha Visita Privada →
            </a>
            <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>
              Obra com início imediato · Chave na mão em 10 meses
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
