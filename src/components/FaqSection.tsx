'use client';
import React, { useState } from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── FAQs Section — Destruição de Objeções ──────────────────────────────── */
const FAQS = [
  {
    q: 'E se a obra demorar anos a arrancar?',
    a: 'O projeto já está aprovado na Câmara Municipal. Não há espera por licenças camarárias nem burocracias pendentes. A construção arranca imediatamente após a escritura do terreno.',
    icon: '⚡',
  },
  {
    q: 'O preço pode subir durante a construção?',
    a: 'Não. O contrato de empreitada fecha o valor global de 335.000€ (com IMT e Imposto de Selo já incluídos). O preço fica blindado juridicamente do primeiro dia à entrega das chaves, sem derrapes orçamentais.',
    icon: '🛡️',
  },
  {
    q: 'Preciso de pagar comissões ao intermediário de crédito?',
    a: 'Não, o serviço de consultoria financeira é 100% gratuito para o comprador. Os intermediários de crédito são registados e supervisionados pelo Banco de Portugal e são remunerados diretamente pela entidade bancária que conceder o crédito.',
    icon: '💰',
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faqs" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag" style={{ justifyContent: 'center', margin: '0 auto 14px' }}>Perguntas Frequentes</div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 740, margin: '0 auto 12px', textAlign: 'center' }}>
          Respostas Claras.{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>Zero Dúvidas.</span>
        </h2>
        <p className="mobile-center-desc" style={{
          color: 'var(--text-body)', fontSize: '0.93rem',
          lineHeight: 1.65, maxWidth: 580, margin: '0 auto 40px', textAlign: 'center',
        }}>
          Esclarecemos de forma transparente as questões mais importantes para a sua família tomar uma decisão com total segurança.
        </p>

        {/* FAQs List */}
        <div style={{ maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: `1.5px solid ${isOpen ? 'var(--gold)' : 'var(--border)'}`,
                  borderRadius: 14,
                  boxShadow: isOpen ? '0 6px 24px rgba(184,146,74,0.15)' : '0 2px 8px rgba(0,0,0,0.04)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1.25rem' }}>{faq.icon}</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.4,
                    }}>
                      {faq.q}
                    </span>
                  </div>
                  <span style={{
                    color: 'var(--gold)',
                    fontSize: '1.2rem',
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
                    padding: '0 24px 22px 52px',
                    fontSize: '0.9rem',
                    color: 'var(--text-body)',
                    lineHeight: 1.7,
                    borderTop: '1px solid #f2ede4',
                    paddingTop: 16,
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
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 12 }}>
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
              fontSize: '0.9rem',
              textDecoration: 'none',
              borderBottom: '1.5px dashed var(--gold)',
              paddingBottom: 2,
            }}
          >
            <span>💬</span> Tirar Dúvida no WhatsApp Diretamente com o André →
          </a>
        </div>

      </div>
    </section>
  );
}
