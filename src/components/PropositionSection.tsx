'use client';

import React from 'react';
import Image from 'next/image';
import { WA_MANAGER } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

interface PropositionProps {
  onContact: () => void;
}

export default function PropositionSection({ onContact }: PropositionProps) {
  return (
    <section className="section" id="proposta" style={{ background: '#f0ead8' }}>
      <div className="wrap">

        {/* ── Header ── */}
        <div className="max-w-2xl mb-14">
          <div className="section-label mb-3">A Proposta</div>
          <h2
            className="serif font-semibold text-[#1a1714] leading-tight mb-5"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}
          >
            Mais do que uma casa.{' '}
            <span className="serif-italic text-[#7a5c3e]">Uma decisão financeira inteligente.</span>
          </h2>
          <p className="text-[#4a3f35] text-base leading-relaxed">
            Comprar em planta no Domaine XXV é estruturar uma aquisição com equity imediato,
            proteção fiscal e total controlo sobre o resultado final.
          </p>
        </div>

        {/* ── Two-column: Equity card + included items ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 mb-12">

          {/* ── LEFT — Visual Equity Comparison Card ── */}
          <div className="bg-white rounded-2xl border border-[#e8dfc9] overflow-hidden shadow-sm">
            <div className="px-6 py-5 border-b border-[#e8dfc9]">
              <div className="section-label mb-0.5">Comparação de Valor</div>
              <h3 className="serif font-semibold text-[#1a1714] text-lg">O seu equity desde o primeiro dia</h3>
            </div>

            <div className="px-6 py-6 space-y-5">

              {/* Appraised value bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#8a7d6f]">Avaliação Bancária</span>
                  <span className="serif font-semibold text-[#1a1714] text-base">450.000€</span>
                </div>
                <div className="h-3 bg-[#f0ead8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#c5a059] rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              {/* Sale price bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#8a7d6f]">Preço de Venda</span>
                  <span className="serif font-semibold text-[#1a1714] text-base">329.000€</span>
                </div>
                <div className="h-3 bg-[#f0ead8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#7a5c3e] rounded-full" style={{ width: `${(329/450)*100}%` }} />
                </div>
              </div>

              {/* Equity callout */}
              <div className="rounded-xl bg-[#faf7f2] border border-[#e8dfc9] p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#7a5c3e]/10 flex items-center justify-center text-xl flex-shrink-0">
                  💎
                </div>
                <div>
                  <div className="text-[#8a7d6f] text-xs font-medium mb-0.5">Equity imediato</div>
                  <div className="serif font-bold text-[#7a5c3e] text-2xl">+121.000€</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#e8dfc9]" />

              {/* Tax savings */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4a3f35]">IMT + Imposto de Selo (só terreno)</span>
                  <span className="text-sm font-semibold text-[#1a1714]">~3.480€</span>
                </div>
                <div className="flex items-center justify-between text-[#7a5c3e]">
                  <span className="text-sm">Reembolso de IVA pelo Estado</span>
                  <span className="text-sm font-semibold">+31.500€</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#e8dfc9]">
                  <span className="text-sm font-semibold text-[#1a1714]">Poupança fiscal total estimada</span>
                  <span className="serif font-bold text-[#7a5c3e] text-base">~55.200€</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── RIGHT — What's included + image ── */}
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden img-hover shadow-md" style={{ aspectRatio: '3/2' }}>
              <Image
                src="/images/exterior-traseiro-completo.webp"
                alt="Jardim Privado — Domaine XXV"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-[#1a1714] text-base">Incluído no preço</h3>
              {[
                'Jardim privado de ~230 m² com opção de piscina e BBQ',
                'Garagem coberta para 2 viaturas + pré-instalação de carregador EV',
                'Construção LSF com classe energética A+',
                'Personalização total de acabamentos e distribuição interior',
                'Gestor de projeto dedicado com relatório semanal de obra',
                'Licenças, projetos técnicos e CPCV incluídos no preço',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#7a5c3e] mt-0.5 flex-shrink-0 font-semibold">✓</span>
                  <span className="text-[#4a3f35] text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Financial structure ── */}
        <div className="bg-white rounded-2xl border border-[#e8dfc9] overflow-hidden shadow-sm mb-6">
          <div className="px-6 py-4 border-b border-[#e8dfc9]">
            <h3 className="serif font-semibold text-[#1a1714] text-lg">Estrutura Financeira</h3>
            <p className="text-[#8a7d6f] text-xs mt-0.5">Como funciona a aquisição em planta</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#e8dfc9]">
            {[
              { label: 'Entrada inicial', value: '38.500€', sub: 'Terreno fica em seu nome' },
              { label: 'Fase de obra (10 meses)', value: '~289€/mês', sub: 'Apenas juros do crédito' },
              { label: 'Impostos na escritura', value: '~3.480€', sub: 'IMT só sobre o terreno' },
              { label: 'Reembolso IVA do Estado', value: '+31.500€', sub: 'Antes do fim da obra' },
            ].map((item, i) => (
              <div key={i} className="px-6 py-5">
                <div className="text-[#8a7d6f] text-[11px] font-semibold uppercase tracking-wide mb-1.5">{item.label}</div>
                <div className="serif font-semibold text-xl text-[#1a1714] mb-1">{item.value}</div>
                <div className="text-[#8a7d6f] text-xs">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-[#e8dfc9] bg-[#faf7f2]">
            <p className="text-xs text-[#8a7d6f] leading-relaxed max-w-3xl">
              <strong className="text-[#4a3f35]">Como funciona:</strong> O banco regista a operação a 360.000€.
              Como comprador final beneficia da taxa reduzida de IVA de 6% em vez dos 17% pagos na construção,
              originando um reembolso de <strong className="text-[#4a3f35]">exatamente 31.500€</strong> pelo Estado —
              o que mantém o preço líquido final em 329.000€ sem desvios.
            </p>
          </div>
        </div>

        {/* ── Guarantee + CTA ── */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white rounded-2xl px-6 py-5 border border-[#e8dfc9] shadow-sm">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🛡️</span>
            <div>
              <div className="font-semibold text-[#1a1714] text-sm mb-0.5">Sinal 100% protegido por contrato</div>
              <p className="text-[#8a7d6f] text-xs leading-snug max-w-sm">
                Se o banco recusar o crédito por motivos alheios, os 38.500€ são devolvidos na íntegra. Cláusula expressa no CPCV.
              </p>
            </div>
          </div>
          <a
            href={WA_MANAGER}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppLead('proposta_gestor')}
            className="btn-primary flex-shrink-0 whitespace-nowrap"
          >
            Falar com o Gestor →
          </a>
        </div>

      </div>
    </section>
  );
}
