'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Financial Block — 3 Key Numbers + Family Protections ──────────────── */
export default function EquitySection() {
  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag" style={{ justifyContent: 'center', margin: '0 auto 14px' }}>Ancoragem Racional &amp; Segurança</div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Preço Transparente e{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>Ganho Patrimonial Imediato</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 620, margin: '0 auto 36px', textAlign: 'center' }}>
          Valores claros e transparentes. Sem letras pequenas nem desvios orçamentais durante a obra.
        </p>

        {/* ── 3 Cartões de Ancoragem Racional (Mobile First: sem sobreposições) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>

          {/* 335.000€ — Preço Chave-na-Mão */}
          <div className="card" style={{ padding: '24px 20px', border: '1.5px solid var(--gold)', background: '#fff', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--gold)', color: '#fff', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>
              Tudo Incluído
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>
              Preço Chave-na-Mão
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.4rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              335.000€
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Projeto + Lote + Construção em 10 Meses
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Preço final fechado em contrato, entrega em 10 meses com IMT e Selo do terreno incluídos
            </div>
          </div>

          {/* 450.000€ — Avaliação Estimada Pós-Construção */}
          <div className="card" style={{ padding: '24px 20px', background: '#fff', border: '1px solid var(--border)', textAlign: 'left' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#EAF3DE', color: '#4A6B22', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 100, marginBottom: 12 }}>
              Avaliação Pericial
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
              Avaliação Estimada Pós-Construção
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.4rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              450.000€
            </div>
            <div style={{ fontSize: '0.9rem', color: '#5C7A3E', fontWeight: 700 }}>
              Ganho de património imediato (+115.000€)
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Valor de mercado certificado pelo banco após a conclusão da moradia
            </div>
          </div>

          {/* 38.500€ — Capitais Próprios / Sinal de Entrada (Destaque Principal) */}
          <div className="card" style={{
            padding: '24px 20px',
            background: 'linear-gradient(135deg, #FDF6E9 0%, #F5ECD8 100%)',
            border: '2.5px solid var(--gold)',
            boxShadow: '0 8px 32px rgba(184,146,74,0.22)',
            textAlign: 'left',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'var(--gold)', color: '#fff',
              fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: 100,
              marginBottom: 12,
            }}>
              <span>⭐</span> Destaque · Entrada
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A5C28', marginBottom: 6 }}>
              Capitais Próprios / Sinal de Entrada
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.6rem', color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>
              38.500€
            </div>
            <div style={{ fontSize: '0.9rem', color: '#7A5C28', fontWeight: 700 }}>
              <strong>Sinal 100% Protegido</strong> por cláusula contratual
            </div>
            <div style={{ fontSize: '0.78rem', color: '#9A7A4A', marginTop: 6 }}>
              Devolvido na íntegra caso o financiamento bancário não se concretize
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(184,146,74,0.25)', fontSize: '0.8rem', color: '#7A5C28', fontWeight: 600 }}>
              👉 O único valor próprio necessário para dar início a todo o processo
            </div>
          </div>

        </div>

        {/* ── Proteções Adicionais ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>

          <div className="card" style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>📜</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Terreno em Seu Nome</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>Escriturado logo em cartório no início do processo</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>📅</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Apenas Juros na Obra</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>Cerca de ~289€/mês durante os 10 meses de construção</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Eficiência Energética A+</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>Bomba de calor, climatização e isolamento térmico de topo</div>
            </div>
          </div>

          <div className="card" style={{ padding: '16px 18px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>🛡️</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Preço Blindado em Contrato</div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>335.000€ fechado — sem derrapes orçamentais garantido</div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginTop: 28, textAlign: 'center' }} className="mobile-center-flex">
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('equity_verificar_viabilidade')}
            className="btn btn-gold mobile-center-btn"
            style={{ fontSize: '0.95rem', padding: '14px 30px', display: 'inline-flex' }}
          >
            <span>💬</span> Verificar Viabilidade no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
