'use client';
import React from 'react';
import { useLeadModal } from '@/components/LeadModal';

export default function EquitySection() {
  const { openLeadModal } = useLeadModal();

  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">
          Preço Transparente &amp; Opções de Aquisição
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 780, margin: '0 auto 12px', textAlign: 'center' }}>
          Valores Claros: Chave na Mão por{' '}
          <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>335.000€ com IMT e Selo</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.98rem', lineHeight: 1.65, maxWidth: 680, margin: '0 auto 36px', textAlign: 'center' }}>
          Sem estimativas vagas nem surpresas de custos adicionais. Saiba exatamente quanto investe desde o primeiro dia.
        </p>

        {/* ── 3 Cartões de Ancoragem Racional Simples (Poucos Números) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 36 }}>

          {/* 335.000€ — Destaque Central */}
          <div className="card" style={{
            padding: '28px 22px',
            border: '2px solid var(--gold)',
            background: '#FAF6EE',
            textAlign: 'center',
            borderRadius: 'var(--radius-card)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 8px 30px rgba(161,118,40,0.14)',
            position: 'relative',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'var(--gold)', color: '#fff',
              fontSize: '0.68rem', fontWeight: 800,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 'var(--radius-micro)',
              marginBottom: 14,
            }}>
              Preço Final Chave-na-Mão
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', marginBottom: 6 }}>
              Valor Total Fechado
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              335.000€
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--gold-dark)', fontWeight: 800, letterSpacing: '0.02em', marginBottom: 4 }}>
              COM IMT E IMPOSTO DE SELO INCLUÍDOS
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
              O valor de <strong>335.000€</strong> já contempla todos os impostos de transmissão (IMT e Selo), lote, projeto aprovado e construção terminada em 10 meses.
            </div>
          </div>

          {/* 33.500€ — Entrada 10% */}
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
              10% de Entrada · CPCV
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#2B4739', marginBottom: 6 }}>
              Valor de Entrada (10%)
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.8rem', color: '#2B4739', lineHeight: 1, marginBottom: 8 }}>
              33.500€
            </div>
            <div style={{ fontSize: '0.95rem', color: '#2B4739', fontWeight: 800 }}>
              Sinal 100% Protegido Contratualmente
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.55 }}>
              Apenas 10% do valor final (33.500€). Devolvido na íntegra caso haja recusa bancária alheia, com cláusula explícita em contrato.
            </div>
          </div>

          {/* 450.000€ — Avaliação Bancária de Referência */}
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
              Valorização Patrimonial
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 6 }}>
              Avaliação Estimada
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.8rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              450.000€
            </div>
            <div style={{ fontSize: '0.95rem', color: '#2B4739', fontWeight: 800 }}>
              Ganho Patrimonial Imediato (+115.000€)
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.55 }}>
              Comprando por 335.000€ com impostos incluídos, cria uma valorização direta face ao valor de mercado da zona.
            </div>
          </div>

        </div>

        {/* ── COMPARAÇÃO DAS 2 FORMAS QUE OFERECEMOS ── */}
        <div style={{
          background: '#fff',
          border: '1.5px solid rgba(161,118,40,0.35)',
          borderRadius: 'var(--radius-card)',
          padding: 'clamp(24px, 4vw, 36px)',
          marginBottom: 36,
          boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
        }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 28px' }}>
            <div className="section-tag mobile-center-tag" style={{ marginBottom: 8 }}>
              Escolha a Solução Ideal
            </div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px' }}>
              As 2 Formas de Aquisição Disponíveis
            </h3>
            <p style={{ fontSize: '0.90rem', color: 'var(--text-body)', margin: 0, lineHeight: 1.6 }}>
              Transparência absoluta: compare como funciona o método tradicional versus o nosso modelo direto otimizado.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>

            {/* Opção 1: Método Tradicional */}
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ display: 'inline-block', background: '#E5E7EB', color: '#4B5563', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 4, marginBottom: 12 }}>
                  Método Tradicional
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2.1rem', fontWeight: 700, color: '#374151', lineHeight: 1, marginBottom: 4 }}>
                  365.000€
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#DC2626', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14 }}>
                  SEM contar com IMT e Imposto de Selo
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.84rem', color: '#4B5563' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#9CA3AF' }}>•</span>
                    <span><strong>Preço Base:</strong> 365.000€ sem impostos de transmissão.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#9CA3AF' }}>•</span>
                    <span><strong>Impostos à parte:</strong> IMT e Imposto de Selo pagos pelo comprador.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: '#9CA3AF' }}>•</span>
                    <span><strong>Restituição do IVA:</strong> O cliente aguarda o processo de devolução do diferencial do IVA pelo Estado.</span>
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid #E5E7EB', fontSize: '0.78rem', color: '#6B7280' }}>
                Opção para quem prefere fazer a gestão fiscal própria do processo bancário tradicional.
              </div>
            </div>

            {/* Opção 2: Método Direto / Chave na Mão Otimizado (Recomendado) */}
            <div style={{
              background: '#FAF6EE',
              border: '2px solid var(--gold)',
              borderRadius: 12,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 18px rgba(161,118,40,0.12)',
            }}>
              <div>
                <div style={{ display: 'inline-block', background: 'var(--gold)', color: '#fff', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 10px', borderRadius: 4, marginBottom: 12 }}>
                  ★ Opção Recomendada · Direto &amp; Chave na Mão
                </div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '2.3rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1, marginBottom: 4 }}>
                  335.000€
                </div>
                <div style={{ fontSize: '0.80rem', fontWeight: 800, color: 'var(--gold-dark)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14 }}>
                  COM IMT E IMPOSTO DE SELO JÁ INCLUÍDOS
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: 'var(--text-body)' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>✓</span>
                    <span><strong>Preço Final Blindado:</strong> 335.000€ sem derrapes nem despesas ocultas.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>✓</span>
                    <span><strong>IMT e Selo Incluídos:</strong> Não tem custos surpresa de impostos na escritura.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>✓</span>
                    <span><strong>Restituição de IVA pela Construtora:</strong> A empresa construtora recebe diretamente a restituição do IVA e abate de imediato esse valor no custo final para o comprador.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>✓</span>
                    <span><strong>Entrada de 10%:</strong> Apenas 33.500€ com proteção contratual no CPCV.</span>
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 20, paddingTop: 14, borderTop: '1px solid rgba(161,118,40,0.25)', fontSize: '0.78rem', color: 'var(--gold-dark)', fontWeight: 700 }}>
                A forma mais simples, económica e segura para ter a moradia pronta em 10 meses.
              </div>
            </div>

          </div>
        </div>

        {/* ── 4 Salvaguardas Rápidas ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              CPCV
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Terreno em Seu Nome</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Escriturado logo no início do processo com escritura notarial</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              ENTRADA 10%
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>Sinal de 33.500€ Protegido</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Garantia de devolução integral caso o banco não aprove financiamento</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              OBRA
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>10 Meses de Execução</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Cronograma semanal de construção acompanhado por perito</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8, borderRadius: 'var(--radius-card-sm)' }}>
            <span style={{ fontSize: '0.66rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-dark)', background: 'var(--gold-pale)', border: '1px solid #E6D8BC', borderRadius: 'var(--radius-micro)', padding: '3px 8px' }}>
              TUDO INCLUÍDO
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>335.000€ c/ IMT e Selo</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.45 }}>Sem custos adicionais de impostos ou orçamentos surpresa</div>
            </div>
          </div>

        </div>

        {/* CTA — Opens Lead Form Modal */}
        <div style={{ marginTop: 36, textAlign: 'center' }} className="mobile-center-flex">
          <button
            type="button"
            onClick={() => openLeadModal({
              title: 'Receber Informações: 335.000€ (c/ IMT e Selo)',
              source: 'equity_comparacao_335k',
            })}
            className="btn btn-gold mobile-center-btn"
            style={{ fontSize: '0.88rem', padding: '15px 36px', display: 'inline-flex', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
          >
            Saber Mais e Pedir Estudo Detalhado →
          </button>
        </div>

      </div>
    </section>
  );
}
