'use client';
import React from 'react';
import { WA_VISIT } from './SiteHeader';

/* ─── Financial Section — Family-focused Financial Clarity & Protection ─── */
export default function EquitySection() {
  return (
    <section id="condicoes" className="section" style={{ background: 'var(--bg-alt)' }}>
      <div className="wrap">

        <div className="section-tag mobile-center-tag">Condições & Segurança Familiar</div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 700, marginBottom: 12 }}>
          Preço transparente e sem surpresas:{' '}
          <span className="serif-i" style={{ color: 'var(--gold)' }}>335.000€ Chave na Mão</span>
        </h2>
        <p className="mobile-center-desc" style={{ color: 'var(--text-body)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: 620, marginBottom: 36 }}>
          Valores claros, sem letras pequenas. A moradia é entregue 100% equipada, com IMT e Imposto de Selo já contemplados e proteção contratual total do seu capital.
        </p>

        {/* ── 1. Painel Simplificado de 3 Números Essenciais ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 28 }}>
          
          {/* Card 1: Preço Chave na Mão com Impostos */}
          <div className="card" style={{ padding: '26px 22px', border: '1.5px solid var(--gold)', position: 'relative', background: '#fff' }}>
            <div style={{ position: 'absolute', top: -11, right: 18, background: 'var(--gold)', color: '#fff', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100 }}>
              Tudo Incluído
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
              Preço Final Chave na Mão
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.3rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              335.000€
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-body)', fontWeight: 600 }}>
              Com IMT e Imposto de Selo já incluídos
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
              (Preço base de 329.000€ + ~6.000€ de IMT e Selo do terreno)
            </div>
          </div>

          {/* Card 2: Avaliação Bancária */}
          <div className="card" style={{ padding: '26px 22px', background: '#fff' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Avaliação Bancária Estimada
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.3rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              450.000€
            </div>
            <div style={{ fontSize: '0.84rem', color: '#5C7A3E', fontWeight: 700 }}>
              +115.000€ de ganho patrimonial imediato
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Valor de mercado oficial do imóvel após conclusão
            </div>
          </div>

          {/* Card 3: Sinal Protegido */}
          <div className="card" style={{ padding: '26px 22px', background: '#fff' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
              Sinal Inicial Protegido
            </div>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '2.3rem', color: 'var(--text-primary)', lineHeight: 1, marginBottom: 8 }}>
              38.500€
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-body)', fontWeight: 600 }}>
              100% Devolvido se o crédito não for aprovado
            </div>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Cláusula expressa em CPCV e terreno logo em seu nome
            </div>
          </div>

        </div>

        {/* ── 2. Caixa de Explicação Direta: Os 329k, 335k c/ IMT/Selo, 360k bancário e devolução do IVA ── */}
        <div style={{
          background: 'var(--white)',
          border: '1.5px solid #E8D4AE',
          borderRadius: 16,
          padding: '30px 28px',
          boxShadow: '0 6px 24px rgba(0,0,0,0.04)',
          marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: '1.6rem' }}>💡</span>
            <div>
              <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                Como funciona o valor bancário de 360.000€ e a devolução do IVA?
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
                Explicado de forma direta, simples e transparente:
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>
            
            {/* Ponto 1 */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>1</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Processo Bancário a 360.000€</strong>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
                O processo formal junto do banco é instruído a <strong>360.000€</strong>. Isto assegura que todas as tranches de construção são aprovadas com folga e sem constrangimentos de liquidez.
              </p>
            </div>

            {/* Ponto 2 */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>2</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>Nós Pagamos 23% · O Projeto é a 6%</strong>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
                Durante a obra, nós adiantamos o pagamento do IVA à taxa de <strong>23%</strong> na construção. No entanto, este projeto qualifica-se legalmente na categoria de incentivo com taxa reduzida a <strong>6%</strong>.
              </p>
            </div>

            {/* Ponto 3 */}
            <div style={{ background: 'var(--gold-pale)', borderRadius: 12, padding: '16px 18px', border: '1px solid #E8D4AE' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ background: '#7A5C28', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>3</span>
                <strong style={{ fontSize: '0.88rem', color: '#7A5C28' }}>Recebe a Diferença Antes do Fim da Obra</strong>
              </div>
              <p style={{ fontSize: '0.83rem', color: '#7A5C28', lineHeight: 1.55, margin: 0 }}>
                Ainda <strong>antes do final da obra</strong>, o cliente final <strong>vai receber diretamente a diferença de valor dos 23% para os 6%</strong>. Desta forma, o custo real que paga fica exatamente nos <strong>329.000€</strong> (ou <strong>335.000€ com IMT e Selo já incluídos</strong>).
              </p>
            </div>

            {/* Ponto 4 */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '16px 18px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ background: 'var(--gold)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>4</span>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>100% Contratualizado e Sem Derrapes</strong>
              </div>
              <p style={{ fontSize: '0.83rem', color: 'var(--text-body)', lineHeight: 1.55, margin: 0 }}>
                Toda esta estrutura, as datas de devolução e o valor final estão <strong>expressamente blindados no contrato (CPCV e empreitada)</strong>. Não há derrapes, custos surpresa ou imprevistos para a sua família.
              </p>
            </div>

          </div>

          {/* Banner de Garantia Contratual */}
          <div style={{
            background: 'var(--bg-alt)',
            borderRadius: 10,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            border: '1px solid var(--border)',
          }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-body)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🛡️</span> <strong>Garantia de Preço Fechado:</strong> Valor final de <strong>335.000€ com IMT e Selo</strong> estipulado em contrato escrito.
            </div>
            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ fontSize: '0.82rem', padding: '8px 18px' }}
            >
              <span>💬</span> Esclarecer com o Gestor no WhatsApp
            </a>
          </div>

        </div>

        {/* ── 3. Proteções Adicionais da Família ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          
          <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>📜</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Terreno em Seu Nome</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>Escriturado logo em cartório no início do processo</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>📅</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Apenas Juros na Obra</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>Cerca de ~289€/mês durante a construção de 10 meses</div>
            </div>
          </div>

          <div className="card" style={{ padding: '18px 20px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>⚡</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>Eficiência Energética A+</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 2 }}>Bomba de calor, climatização e isolamento térmico de topo</div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
