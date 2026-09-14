'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Triangle Section — "The Impossible Triangle of Aveiro" ─────────────── */
export default function TriangleSection() {
  const BLOCKS = [
    {
      emoji: '🔴',
      combo: 'Preço + Cidade = Sem Espaço',
      result: 'Sem Espaço',
      desc: 'Com 300.000€ no centro de Aveiro, só compra um T1 pequeno, sem jardim e sem garagem.',
      sacrifice: 'Perde: Espaço',
    },
    {
      emoji: '🔴',
      combo: 'Espaço + Preço = Longe de Tudo',
      result: 'Longe de Tudo',
      desc: 'Quer uma moradia grande por esse valor? Terá de ir morar a 40 minutos e perder horas no trânsito todos os dias.',
      sacrifice: 'Perde: Localização',
    },
    {
      emoji: '🔴',
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
        <div className="mobile-center-tag" style={{
          fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: 'var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', gap: 10,
        }}>
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'var(--gold)' }} />
          Análise de Mercado · Aveiro
        </div>

        {/* ── Headline ── */}
        <h2 className="heading mobile-center-title" style={{
          color: '#FFFFFF',
          maxWidth: 780,
          margin: '0 auto 10px',
          textAlign: 'center',
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
        }}>
          A Regra do Triângulo:{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold-light)' }}>
            Porque é que é tão difícil comprar casa em Aveiro?
          </span>
        </h2>

        {/* ── Simple intro ── */}
        <p className="mobile-center-desc" style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          maxWidth: 640,
          margin: '0 auto 28px',
          textAlign: 'center',
        }}>
          Tamanho, Localização e Preço: o mercado de Aveiro normalmente <strong style={{ color: 'var(--gold-light)' }}>só o deixa escolher 2</strong>:
        </p>

        {/* ── 3 Bloqueio Cards (Mais compactos) ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 14,
          marginBottom: 24,
        }}>
          {BLOCKS.map((block) => (
            <div
              key={block.combo}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                padding: '16px 18px',
                position: 'relative',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(184,146,74,0.35)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.07)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.1)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.04)';
              }}
            >
              {/* Result with emoji */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
              }}>
                <span style={{ fontSize: '1.15rem' }}>{block.emoji}</span>
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 700,
                  fontSize: '0.92rem',
                  color: '#ffffff',
                  lineHeight: 1.2,
                }}>
                  {block.combo}
                </div>
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.5, margin: '0 0 10px',
              }}>
                {block.desc}
              </p>

              {/* Sacrifice badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(220,60,60,0.12)',
                border: '1px solid rgba(220,60,60,0.25)',
                borderRadius: 100, padding: '3px 10px',
                fontSize: '0.70rem', fontWeight: 700,
                color: '#FF8080',
              }}>
                ✗ {block.sacrifice}
              </div>
            </div>
          ))}
        </div>

        {/* ── Fecho Compacto: "Esta Moradia Quebra o Triângulo" ── */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(184,146,74,0.18) 0%, rgba(184,146,74,0.08) 100%)',
          border: '1.5px solid rgba(184,146,74,0.45)',
          borderRadius: 14,
          padding: '22px 20px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          maxWidth: 900,
          margin: '0 auto',
        }}>
          <div style={{
            fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--gold)',
            marginBottom: 8,
          }}>
            ✦ A Solução em Oliveirinha · Entrega em 10 Meses ✦
          </div>

          <h3 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 700,
            fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
            color: '#FFFFFF',
            lineHeight: 1.3,
            marginBottom: 14,
            letterSpacing: '-0.01em',
          }}>
            ESTA MORADIA QUEBRA O TRIÂNGULO:{' '}
            <span style={{ color: 'var(--gold-light)', fontStyle: 'italic' }}>
              Espaço T4 com jardim, a 8 min de Aveiro por 335.000€ — chave na mão em apenas 10 meses de obra.
            </span>
          </h3>

          {/* 3 checkmarks compactos */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 10,
            marginBottom: 16,
          }}>
            {[
              { icon: '📐', label: 'T4 com Jardim ~82 m²' },
              { icon: '📍', label: '8 min de Aveiro' },
              { icon: '⏱️', label: 'Chave na mão em 10 meses' },
              { icon: '💰', label: '335.000€ Chave na Mão' },
            ].map(item => (
              <div key={item.label} style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8, padding: '7px 12px',
                fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.9)',
              }}>
                <span style={{ fontSize: '0.95rem', flexShrink: 0 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead('triangle_agendar_visita')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #C9A24F 0%, #B8924A 100%)',
                color: '#fff',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '12px 28px',
                borderRadius: 8,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(184,146,74,0.45)',
                letterSpacing: '0.01em',
              }}
            >
              <span>📅</span>
              Quero Agendar a Minha Visita Privada
            </a>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)' }}>
              Obra com início imediato · Chave na mão em 10 meses
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
