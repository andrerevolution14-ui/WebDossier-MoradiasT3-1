'use client';

import React, { useState } from 'react';
import { PROPERTY } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

interface FinancialEngineeringProps {
  onRequestStudy: () => void;
}

export default function FinancialEngineering({ onRequestStudy }: FinancialEngineeringProps) {
  const [downPercent, setDownPercent] = useState<number>(0.10);
  const [termYears, setTermYears] = useState<number>(40);

  const price = PROPERTY.price; // 329.000€
  const downPayment = Math.round(price * downPercent);
  const loanAmount = price - downPayment;

  // Construction phase: only interest on tranches drawn (~60% average release)
  const avgConstructionDrawn = loanAmount * 0.58;
  const annualRate = 0.0335; // 3.35%
  const constMonthlyInterest = Math.round((avgConstructionDrawn * annualRate) / 12);

  // Post-delivery mortgage calculation
  const monthlyRate = annualRate / 12;
  const nPayments = termYears * 12;
  const finalMonthly = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, nPayments)) /
    (Math.pow(1 + monthlyRate, nPayments) - 1)
  );

  const handleDownSelect = (pct: number) => {
    setDownPercent(pct);
    trackEvent('simulator_downpayment_changed', { percent: pct, value: Math.round(price * pct) });
  };

  const handleTermSelect = (years: number) => {
    setTermYears(years);
    trackEvent('simulator_term_changed', { years });
  };

  return (
    <section className="py-6 border-t border-white/10" id="financiamento">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dfc282] mb-1">
        <span>●</span> O Grande Diferencial
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Engenharia Financeira & Equity
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        Como estruturamos a aquisição em planta para maximizar o património líquido e anular custos fiscais.
      </p>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#19202d]/80 border border-white/10 rounded-xl p-4 shadow-md">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Preço Comercial</div>
          <div className="text-2xl font-black gold-gradient-text mt-1">329.000€</div>
          <div className="text-xs text-slate-400 mt-1">Preço chave na mão fechado em contrato.</div>
        </div>

        <div className="bg-gradient-to-br from-[#242016]/85 to-[#100e0a]/95 border border-[#c5a059] rounded-xl p-4 shadow-md">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Avaliação Bancária</div>
          <div className="text-2xl font-black text-white mt-1">450.000€</div>
          <div className="text-xs text-slate-300 mt-1">Valor certificado por perito bancário oficial.</div>
        </div>

        <div className="bg-gradient-to-br from-[#10221b]/85 to-[#09130f]/95 border border-emerald-500 rounded-xl p-4 shadow-md">
          <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">Diferencial de Equity</div>
          <div className="text-2xl font-black emerald-gradient-text mt-1">+121.000€</div>
          <div className="text-xs text-slate-300 mt-1">Património líquido instantâneo gerado para o comprador.</div>
        </div>
      </div>

      {/* Caixa de Transparência IVA 31.500€ e Processo Bancário 360k */}
      <div className="mt-4 bg-gradient-to-br from-[#141b27]/90 to-[#0a0e14]/95 border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 shadow-xl">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 mb-2">
          <span>⚖️</span> Transparência Absoluta: O Processo Bancário e os 31.500€ de IVA
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mb-3.5 leading-relaxed">
          Ao contrário da mediação tradicional, todos os números são auditados e blindados contratualmente:
        </p>

        <div className="space-y-2.5 text-xs sm:text-sm">
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#c5a059] text-black font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
              1
            </span>
            <div className="text-slate-200">
              <strong className="text-white">Processo Bancário registado a 360.000€:</strong> Este é o valor formal da operação submetida para garantir máxima flexibilidade e liquidez.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#c5a059] text-black font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
              2
            </span>
            <div className="text-slate-200">
              <strong className="text-white">Direito à Taxa Reduzida de 6% do Cliente Final:</strong> Durante a obra é suportada a faturação de 17%, mas o adquirente final beneficia legalmente da taxa reduzida de 6% no preço de construção.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#c5a059] text-black font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
              3
            </span>
            <div className="text-slate-200">
              <strong className="text-white">Reembolso do Estado de <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">31.500€</span>:</strong> Ainda antes do termo da obra, o comprador recebe este reembolso direto do IVA. <strong>Este número exato vai no contrato</strong>, sem margem para desvios, obrigando a moradia a ficar exatamente nos <strong>329.000€</strong> anunciados.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-[#c5a059] text-black font-extrabold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">
              4
            </span>
            <div className="text-slate-200">
              <strong className="text-white">Poupança Fiscal de ~23.700€ no IMT:</strong> Escriturando o terreno no seu nome, o IMT e Selo incidem unicamente sobre o lote (~3.480€) em vez de incidir sobre os 329.000€ (~27.180€).
            </div>
          </div>
        </div>
      </div>

      {/* Simulador Interativo */}
      <div className="mt-5 bg-gradient-to-br from-[#161d29]/95 to-[#0c1018]/98 border border-[#c5a059]/40 rounded-2xl p-4 sm:p-5 shadow-2xl" id="simulador">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">Simulador de Crédito em Planta</h3>
            <span className="text-xs text-slate-400">Ajuste a percentagem de entrada e o prazo do crédito</span>
          </div>
          <span className="text-2xl">🧮</span>
        </div>

        {/* Entrada */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
            <span>Entrada Inicial (Capital Próprio)</span>
            <strong className="text-[#dfc282]">
              {Math.round(downPercent * 100)}% ({downPayment.toLocaleString('pt-PT')}€)
            </strong>
          </div>
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {[0.10, 0.15, 0.25, 0.50].map(pct => (
              <button
                key={pct}
                onClick={() => handleDownSelect(pct)}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                  downPercent === pct
                    ? 'bg-[#c5a059] text-slate-950 border-[#c5a059] shadow-md font-bold'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                {Math.round(pct * 100)}%
              </button>
            ))}
          </div>
        </div>

        {/* Prazo */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-200 mb-2">
            <span>Prazo do Financiamento</span>
            <strong className="text-[#dfc282]">
              {termYears} Anos ({termYears * 12} meses)
            </strong>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[30, 35, 40].map(yr => (
              <button
                key={yr}
                onClick={() => handleTermSelect(yr)}
                className={`py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                  termYears === yr
                    ? 'bg-[#c5a059] text-slate-950 border-[#c5a059] shadow-md font-bold'
                    : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                }`}
              >
                {yr} Anos
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Outputs Grid */}
        <div className="bg-[#090c11]/85 border border-white/10 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="p-3 rounded-lg bg-white/[0.02] border-l-4 border-sky-400">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Fase de Obra (10m) · Só Juros</div>
            <div className="text-xl sm:text-2xl font-black text-sky-400 mt-0.5">
              ~{constMonthlyInterest.toLocaleString('pt-PT')}€ / mês
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Sem dupla prestação; paga apenas juros do capital libertado.</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border-l-4 border-emerald-500">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Prestação Final Pós-Entrega</div>
            <div className="text-xl sm:text-2xl font-black emerald-gradient-text mt-0.5">
              ~{finalMonthly.toLocaleString('pt-PT')}€ / mês
            </div>
            <div className="text-[11px] text-slate-400 mt-1">Amortização de capital e juros após a chave na mão.</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border-l-4 border-[#c5a059]">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Impostos Escritura (IMT + Selo)</div>
            <div className="text-xl font-bold text-[#dfc282] mt-0.5">~3.480€</div>
            <div className="text-[11px] text-slate-400 mt-1">Imposto só sobre o lote. <strong>Poupança de ~23.700€</strong>.</div>
          </div>

          <div className="p-3 rounded-lg bg-white/[0.02] border-l-4 border-emerald-400">
            <div className="text-[11px] uppercase tracking-wider text-slate-400">Reembolso IVA Contratual</div>
            <div className="text-xl font-bold text-emerald-300 mt-0.5">+31.500€</div>
            <div className="text-[11px] text-slate-400 mt-1">Devolvido diretamente pelo Estado antes da entrega.</div>
          </div>
        </div>

        <button
          onClick={() => {
            trackEvent('simulator_request_study_click', {
              downPercent,
              termYears,
              finalMonthly,
            });
            onRequestStudy();
          }}
          className="w-full mt-4 bg-gradient-to-r from-[#c5a059] to-[#9f7c39] hover:from-[#dfc282] hover:to-[#c5a059] text-slate-950 font-black text-sm sm:text-base py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-[0.98] cursor-pointer"
        >
          Simular Proposta com o Meu Perfil Bancário ➔
        </button>
      </div>
    </section>
  );
}
