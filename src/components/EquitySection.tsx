'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';

/* ─── Financial Section — Family-focused Financial Clarity & Protection ─── */
export default function EquitySection() {
  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag">Condições & Segurança Familiar</div>
        <h2 className="heading" style={{ maxWidth: 640, marginBottom: 12 }}>
          Transparência total{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>e poupança para a sua família</span>
        </h2>
        <p style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 580, marginBottom: 48 }}>
          Comprar em planta com a nossa estrutura permite à sua família poupar dezenas de milhares
          de euros em impostos, ter o terreno logo escriturado em seu nome e proteger 100% do seu capital.
        </p>

        {/* ── Main grid: comparison card + side metrics ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, alignItems: 'start' }}>

          {/* Left: Value comparison card */}
          <div className="card" style={{ padding: 32 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 24 }}>
              Valor Real vs Custo de Aquisição
            </div>

            {/* Appraised value */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Avaliação Bancária Estimada</span>
                <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>450.000€</span>
              </div>
              <div className="equity-bar">
                <div className="equity-bar-fill" style={{ width: '100%', background: 'var(--gold-light)' }} />
              </div>
            </div>

            {/* Purchase price */}
            <div style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Preço Chave na Mão</span>
                <span style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.2rem', color: 'var(--text-primary)' }}>329.000€</span>
              </div>
              <div className="equity-bar">
                <div className="equity-bar-fill" style={{ width: '73.1%', background: '#5C7A3E' }} />
              </div>
            </div>

            {/* Callout */}
            <div style={{
              background: 'var(--gold-pale)', border: '1px solid #E8D4AE',
              borderRadius: 12, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 16, marginBottom: 26,
            }}>
              <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>🏡</div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A5C28', marginBottom: 3 }}>
                  Margem de Segurança Familiar
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.8rem', color: '#7A5C28', letterSpacing: '-0.01em' }}>
                  +121.000€
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7A5C28', opacity: 0.9, marginTop: 2 }}>
                  Valor patrimonial imediato superior ao custo de compra
                </div>
              </div>
            </div>

            {/* Tax breakdown */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: 'var(--text-body)' }}>IMT + Imposto de Selo (apenas sobre o terreno)</span>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-primary)' }}>~3.480€</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.86rem', color: '#5C7A3E' }}>Reembolso de IVA pelo Estado</span>
                <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#5C7A3E' }}>+31.500€</span>
              </div>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>Poupança fiscal estimada para a família</span>
                <span style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.15rem', color: '#5C7A3E' }}>~55.200€</span>
              </div>
            </div>
          </div>

          {/* Right: Security & conditions cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Land Deed */}
            <div className="card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>📜</div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', lineHeight: 1 }}>38.500€ de Entrada</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>O terreno fica registado no cartório logo em nome da sua família</div>
              </div>
            </div>

            {/* Signal Guarantee */}
            <div style={{ background: 'var(--text-primary)', borderRadius: 'var(--radius)', padding: '24px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>🛡️</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.98rem', marginBottom: 6 }}>
                    Sinal 100% Protegido por Contrato
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>
                    Caso ocorra recusa de crédito bancário por motivos alheios à sua família, os <strong style={{ color: '#fff' }}>38.500€ são devolvidos na totalidade</strong>, com cláusula expressa no CPCV.
                  </p>
                </div>
              </div>
              <a
                href={WA_VISIT}
                target="_blank" rel="noopener noreferrer"
                className="btn btn-gold"
                style={{ width: '100%', fontSize: '0.86rem', justifyContent: 'center' }}
              >
                <span>💬</span> Agendar Visita ao Terreno
              </a>
            </div>

            {/* Monthly Interest during construction */}
            <div className="card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>📅</div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', lineHeight: 1 }}>~289€/mês</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Durante os 10 meses de obra — apenas juros sobre as tranches libertadas</div>
              </div>
            </div>

            {/* Class A+ */}
            <div className="card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ fontSize: '1.6rem', flexShrink: 0 }}>⚡</div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', lineHeight: 1 }}>Classe Energética A+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Isolamento térmico e acústico de topo — menor custo elétrico para o lar</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
