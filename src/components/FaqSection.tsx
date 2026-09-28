'use client';
import React, { useState } from 'react';
import { useLeadModal } from '@/components/LeadModal';

/* ─── FAQs Section — Destruição de Objeções ──────────────────────────────── */
const FAQS = [
  {
    num: '01',
    q: 'E se a obra demorar anos a arrancar?',
    a: 'O projeto já está aprovado na Câmara Municipal. Não há espera por licenças camarárias nem burocracias pendentes. A construção arranca imediatamente após a escritura do terreno.',
  },
  {
    num: '02',
    q: 'O preço de 335.000€ pode subir durante a construção?',
    a: 'Não. O valor de 335.000€ com IMT e Imposto de Selo já incluídos fica blindado por contrato de empreitada chave na mão. Não há custos surpresa nem derrapes orçamentais.',
  },
  {
    num: '03',
    q: 'Qual a diferença entre o Método Tradicional e o Método Direto?',
    a: 'No método tradicional (365.000€), o IMT e Selo são pagos à parte e o cliente aguarda a restituição do IVA pelo Estado. No método direto recomendado (335.000€ com IMT e Selo incluídos), a empresa construtora recebe diretamente a restituição do IVA e desconta esse benefício fiscal no preço final.',
  },
  {
    num: '04',
    q: 'Quanto tenho de dar de entrada inicial?',
    a: 'Apenas 10% do valor final, ou seja, 33.500€. Este valor de sinal fica salvaguardado no CPCV com garantia expressa de devolução a 100% caso o financiamento bancário não se concretize.',
  },
  {
    num: '05',
    q: 'Preciso de pagar comissões ao intermediário de crédito?',
    a: 'Não, o serviço de consultoria financeira é 100% gratuito para o comprador. Os intermediários de crédito são registados e supervisionados pelo Banco de Portugal e são remunerados diretamente pela entidade bancária que conceder o crédito.',
  },
];

export default function FaqSection() {
  const { openLeadModal } = useLeadModal();
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

        {/* Lead Modal Trigger Box */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: 12 }}>
            Tem outra dúvida específica sobre o projeto ou modalidades de pagamento?
          </p>
          <button
            type="button"
            onClick={() => openLeadModal({
              title: 'Tirar Dúvida · Domaine XXV (335k c/ IMT e Selo)',
              source: 'faq_section',
            })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'none',
              border: 'none',
              borderBottom: '1.5px solid var(--gold)',
              color: 'var(--gold-dark)',
              fontWeight: 700,
              fontSize: '0.88rem',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              paddingBottom: 3,
            }}
          >
            Fazer Pergunta / Saber Mais →
          </button>
        </div>

      </div>
    </section>
  );
}
