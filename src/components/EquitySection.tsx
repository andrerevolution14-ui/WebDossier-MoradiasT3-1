'use client';
import React from 'react';
import { useLeadModal } from '@/components/LeadModal';

export default function EquitySection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Condições de Aquisição
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 780, margin: '0 auto 12px', textAlign: 'center' }}>
          Valores Claros: Chave na Mão por{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>335.000€ com Impostos</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.65, maxWidth: 680, margin: '0 auto 36px', textAlign: 'center' }}>
          Sem custos imprevistos nem orçamentos abertos. Saiba com clareza o que está incluído desde o primeiro dia.
        </p>

        {/* ── 3 Cartões de Estrutura Racional ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 32 }}>

          {/* 1. Preço Chave na Mão */}
          <div className="card" style={{
            padding: '28px 22px',
            border: '2px solid var(--gold)',
            background: '#FAF6EE',
            textAlign: 'center',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 6px 24px rgba(161,118,40,0.12)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'var(--gold)', color: '#fff',
              fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 'var(--radius-micro)',
              marginBottom: 14,
            }}>
              Preço Chave-na-Mão
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 6 }}>
              Valor Total Fechado
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              335.000€
            </div>
            <div style={{ fontSize: '0.90rem', color: 'var(--gold-dark)', fontWeight: 800, letterSpacing: '0.02em', marginBottom: 8 }}>
              COM IMT E IMPOSTO DE SELO INCLUÍDOS
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Inclui o lote de terreno, projeto aprovado, construção terminada em 10 meses e os respetivos impostos de transmissão.
            </div>
          </div>

          {/* 2. Entrada 10% */}
          <div className="card" style={{
            padding: '28px 22px',
            background: '#fff',
            border: '1.5px solid #d4c3a3',
            textAlign: 'center',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#2B4739', color: '#fff',
              fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 'var(--radius-micro)',
              marginBottom: 14,
            }}>
              Entrada Inicial · CPCV
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2B4739', marginBottom: 6 }}>
              Valor de Entrada (10%)
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.8rem', color: '#2B4739', lineHeight: 1, marginBottom: 8 }}>
              33.500€
            </div>
            <div style={{ fontSize: '0.90rem', color: '#2B4739', fontWeight: 800, marginBottom: 8 }}>
              Sinal Salvaguardado em Contrato
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Apenas 10% no contrato promessa. Salvaguardado por cláusula resolutiva com devolução integral se não houver aprovação bancária.
            </div>
          </div>

          {/* 3. O Modelo Direto */}
          <div className="card" style={{
            padding: '28px 22px',
            background: '#fff',
            border: '1px solid var(--border)',
            textAlign: 'center',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: '#F1F5F2', border: '1px solid #C8D6CD',
              color: '#2B4739', fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 'var(--radius-micro)',
              marginBottom: 14,
            }}>
              Modelo Direto
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
              Terreno + Construção
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.9rem', color: 'var(--text-primary)', lineHeight: 1.2, margin: '8px 0 12px' }}>
              Preço Fechado
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              Compra o terreno em seu nome e contrata a construção a preço fixo contratualizado, com entrega das chaves prevista em 10 meses.
            </div>
          </div>

        </div>

        {/* Reassuring note */}
        <div style={{
          background: '#fff',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card-sm)',
          padding: '16px 20px',
          maxWidth: 780,
          margin: '0 auto 28px',
          textAlign: 'center',
          fontSize: '0.84rem',
          color: 'var(--text-body)',
          lineHeight: 1.6,
        }}>
          💡 <strong>Transparência total:</strong> Todos os custos, especificações de materiais e cronograma de obra constam expressamente do contrato promessa e do caderno de encargos.
        </div>

        {/* CTA — Opens Lead Form Modal */}
        <div style={{ textAlign: 'center' }} className="mobile-center-flex">
          <button
            type="button"
            onClick={() => openLeadModal({
              title: 'Pedir Estudo Detalhado · Domaine XXV',
              source: 'equity_condicoes_335k',
              defaultObjective: 'Pedir Simulação Detalhada',
            })}
            className="btn btn-gold mobile-center-btn"
            style={{ fontSize: '0.88rem', padding: '15px 36px', display: 'inline-flex', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
          >
            Pedir Estudo Detalhado e Condições →
          </button>
        </div>

      </div>
    </section>
  );
}
