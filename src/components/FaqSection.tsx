'use client';
import React, { useState } from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── FAQs Section — Destruição de Objeções ──────────────────────────────── */
const FAQS = [
  {
    num: '01',
    q: 'E se a obra demorar anos a arrancar?',
    a: 'O projeto já está aprovado na Câmara Municipal. Não há espera por licenças camarárias nem burocracias pendentes. A construção arranca imediatamente após a escritura do terreno.',
  },
  {
    num: '02',
    q: 'O preço pode subir durante a construção?',
    a: 'Não. O contrato de empreitada fecha o valor global de 335.000€ (com IMT e Imposto de Selo já incluídos). O preço fica blindado juridicamente do primeiro dia à entrega das chaves, sem derrapes orçamentais.',
  },
  {
    num: '03',
    q: 'Preciso de pagar comissões ao intermediário de crédito?',
    a: 'Não, o serviço de consultoria financeira é 100% gratuito para o comprador. Os intermediários de crédito são registados e supervisionados pelo Banco de Portugal e são remunerados diretamente pela entidade bancária que conceder o crédito.',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faqs" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Perguntas Frequentes
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Respostas Claras.{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Zero Dúvidas.</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.95rem',
          lineHeight: 1.65, maxWidth: 580, margin: '0 auto 40px', textAlign: 'center',
        }}>
          Esclarecemos de forma transparente as questões mais importantes para a sua família tomar uma decisão com total segurança.
        </p>

        {/* FAQs List */}
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: `1px solid ${isOpen ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: 'var(--radius-card-sm)',
                  boxShadow: isOpen ? '0 4px 16px rgba(161,118,40,0.12)' : 'var(--shadow-soft)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{
                      fontFamily: 'var(--serif)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: 'var(--gold)',
                      borderRight: '1px solid var(--border)',
                      paddingRight: 12,
                    }}>
                      {faq.num}
                    </span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 'clamp(0.92rem, 2.5vw, 1.02rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}>
                      {faq.q}
                    </span>
                  </div>
                  <span style={{
                    color: 'var(--gold)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    transform: isOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                  }}>
                    ▾
                  </span>
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 22px 20px 48px',
                    fontSize: '0.88rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.65,
                    borderTop: '1px solid #f2ede4',
                    paddingTop: 14,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle WhatsApp Help Box */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 10 }}>
            Tem outra dúvida específica sobre o projeto ou financiamento?
          </p>
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('faq_tirar_duvida')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--gold)',
              fontWeight: 700,
              fontSize: '0.86rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderBottom: '1px solid var(--gold)',
              paddingBottom: 2,
            }}
          >
            Falar Diretamente com o André no WhatsApp →
          </a>
        </div>

      </div>
    </section>
  );
}
