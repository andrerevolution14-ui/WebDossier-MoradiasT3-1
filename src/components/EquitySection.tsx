'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Financial Block — 3 Key Numbers + Family Protections ──────────────── */
export default function EquitySection() {
  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Ancoragem Racional &amp; Segurança
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Preço Transparente e{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Ganho Patrimonial Imediato</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 620, margin: '0 auto 36px', textAlign: 'center' }}>
          Valores claros e transparentes. Sem letras pequenas nem desvios orçamentais durante a obra.
        </p>

        {/* ── 3 Cartões de Ancoragem Racional (Centrados, Cantos Arredondados 14px) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>

          {/* 335.000€ — Preço Chave-na-Mão */}
          <div className="card" style={{ padding: '26px 20px', border: '1px solid rgba(161,118,40,0.3)', background: '#fff', textAlign: 'center', borderRadius: 'var(--radius-card)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--gold)', color: '#fff', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 'var(--radius-micro)', marginBottom: 14 }}>
              Tudo Incluído
            </div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 6 }}>
              Preço Chave-na-Mão
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.4rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              335.000€
            </div>
            <div style={{ fontSize: '0.90rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Projeto + Lote + Construção em 10 Meses
            </div>
            <div style={{ fontSize: '0.80rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>
              Preço final fechado em contrato, entrega em 10 meses com IMT e Selo do terreno incluídos
            </div>
          </div>

          {/* 450.000€ — Avaliação Estimada Pós-Construção */}
          <div className="card" style={{ padding: '26px 20px', background: '#fff', border: '1px solid var(--border)', textAlign: 'center', borderRadius: 'var(--radius-card)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', background: '#F1F5F2', border: '1px solid #C8D6CD', color: '#2B4739', fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '4px 10px', borderRadius: 'var(--radius-micro)', marginBottom: 14 }}>
              Avaliação Pericial
            </div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
              Avaliação Estimada Pós-Construção
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.4rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              450.000€
            </div>
            <div style={{ fontSize: '0.90rem', color: '#2B4739', fontWeight: 700 }}>
              Ganho de património imediato (+115.000€)
            </div>
            <div style={{ fontSize: '0.80rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.5 }}>
              Valor de mercado certificado pelo banco após a conclusão da moradia
            </div>
          </div>

          {/* 38.500€ — Capitais Próprios / Sinal de Entrada (Destaque Principal) */}
          <div className="card" style={{
            padding: '26px 20px',
            background: '#FAF6EE',
            border: '1.5px solid var(--gold)',
            boxShadow: '0 6px 24px rgba(161,118,40,0.12)',
            textAlign: 'center',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'var(--gold)', color: '#fff',
              fontSize: '0.66rem', fontWeight: 800,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              padding: '4px 10px', borderRadius: 'var(--radius-micro)',
              marginBottom: 14,
            }}>
              Entrada · Sinal
            </div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#7A5C28', marginBottom: 6 }}>
              Capitais Próprios / Sinal de Entrada
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.6rem', color: 'var(--gold-dark)', lineHeight: 1, marginBottom: 8 }}>
              38.500€
            </div>
            <div style={{ fontSize: '0.90rem', color: '#7A5C28', fontWeight: 700 }}>
              <strong>Sinal 100% Protegido</strong> por cláusula contratual
            </div>
            <div style={{ fontSize: '0.80rem', color: '#8A6E3F', marginTop: 6, lineHeight: 1.5 }}>
              Devolvido na íntegra caso o financiamento bancário não se concretize
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid rgba(161,118,40,0.25)', fontSize: '0.78rem', color: '#7A5C28', fontWeight: 600 }}>
              O único valor próprio necessário para dar início a todo o processo
            </div>
          </div>

        </div>

        {/* ── Proteções Adicionais — Centradas com Cantos Arredondados Suaves ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              CPCV
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Terreno em Seu Nome</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Escriturado logo em cartório no início do processo</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              OBRA
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Apenas Juros na Obra</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Cerca de ~289€/mês durante os 10 meses de construção</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              CLIMA
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Eficiência Energética A+</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Bomba de calor, climatização e isolamento térmico de topo</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 10, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              FIXO
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Preço Blindado em Contrato</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>335.000€ fechado — sem derrapes orçamentais garantido</div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginTop: 32, textAlign: 'center' }} className="mobile-center-flex">
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('equity_verificar_viabilidade')}
            className="btn btn-gold mobile-center-btn"
            style={{ fontSize: '0.88rem', padding: '15px 36px', display: 'inline-flex', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
          >
            Verificar Viabilidade no WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
}
