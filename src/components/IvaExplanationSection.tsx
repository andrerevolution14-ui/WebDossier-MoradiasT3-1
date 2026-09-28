'use client';
import React from 'react';
import { useLeadModal } from '@/components/LeadModal';

/* ─── Explicação das Duas Formas & Estrutura Fiscal ──────────────────────────── */
export default function IvaExplanationSection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="iva-explicacao" className="section" style={{ background: 'var(--bg)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Transparência Fiscal &amp; Estrutura de Preço
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 760, margin: '0 auto 12px', textAlign: 'center' }}>
          Como Funciona o Preço de{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>335.000€ com IMT e Selo</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.95rem',
          lineHeight: 1.65, maxWidth: 660, margin: '0 auto 40px', textAlign: 'center',
        }}>
          Explicamos de forma simples e transparente as duas modalidades disponíveis e por que razão o método direto de 335k já inclui IMT e Imposto de Selo.
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
              Método Tradicional (365.000€)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              Na compra tradicional a <strong>365.000€</strong>, os impostos de transmissão (IMT e Imposto de Selo) são suportados à parte pelo comprador. O cliente fica responsável por aguardar a restituição posterior do diferencial de IVA pelo Estado.
            </p>
          </div>

          {/* Item 2 */}
          <div className="card" style={{ padding: '24px 20px', background: 'var(--white)', border: '1.5px solid var(--gold)', borderRadius: 'var(--radius-card-sm)' }}>
            <div style={{
              width: 28, height: 28, borderRadius: 'var(--radius-micro)', background: 'var(--gold)',
              color: '#fff', fontWeight: 800, fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14,
            }}>
              02
            </div>
            <h3 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
              Método Direto (335.000€ Tudo Incluído)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              Na opção recomendada a <strong>335.000€</strong>, o valor é fechado e <strong>já inclui o IMT e Imposto de Selo</strong>. A empresa construtora assume e recebe diretamente a restituição do IVA, transferindo esse benefício imediato para o comprador.
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
              Zero Surpresas com Impostos
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#2E492B', lineHeight: 1.6, margin: 0 }}>
              Ao optar pelo valor de <strong>335.000€</strong>, não tem custos inesperados de impostos no cartório. Tanto o IMT como o Imposto de Selo estão devidamente acautelados no contrato chave na mão.
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
              Apenas 10% de Entrada (33.500€)
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-body)', lineHeight: 1.6, margin: 0 }}>
              O único valor inicial a disponibilizar é o sinal de <strong>10% (33.500€)</strong>, que fica protegido no CPCV com garantia de reembolso integral se o financiamento bancário não se concretizar.
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
            <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', marginBottom: 4 }}>
              Dúvidas sobre qual o melhor método para o seu caso?
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Preencha o formulário para receber a simulação detalhada entre as duas opções e o cronograma de pagamentos.
            </div>
          </div>

          <button
            type="button"
            onClick={() => openLeadModal({
              title: 'Pedir Estudo das Opções (335k c/ IMT e Selo)',
              source: 'iva_explicacao_section',
            })}
            className="btn btn-gold"
            style={{ fontSize: '0.82rem', padding: '12px 24px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
          >
            Saber Mais e Pedir Estudo →
          </button>
        </div>

      </div>
    </section>
  );
}
