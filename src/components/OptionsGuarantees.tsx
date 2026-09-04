'use client';

import React from 'react';
import Image from 'next/image';
import { PROPERTY } from '@/lib/constants';

export default function OptionsGuarantees() {
  return (
    <section className="py-6 border-t border-white/10" id="opcoes">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dfc282] mb-1">
        <span>●</span> Customização & Blindagem
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Opções & Garantias Contratuais
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        Possibilidades de evolução da moradia e proteções que conferem risco zero na reserva.
      </p>

      {/* Upgrades */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-[#121822]/80 border border-white/10 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-[#dfc282] mb-1">Opção Tipologia</div>
          <div className="text-sm font-bold text-white mb-1">Conversão T4 (4 Quartos)</div>
          <div className="text-xs text-slate-400 leading-snug">
            Criação de quarto adicional ou escritório independente no piso térreo sem comprometer áreas sociais.
          </div>
        </div>

        <div className="bg-[#121822]/80 border border-white/10 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-[#dfc282] mb-1">Exterior Premium</div>
          <div className="text-sm font-bold text-white mb-1">Piscina Privada & BBQ</div>
          <div className="text-xs text-slate-400 leading-snug">
            Piscina em betão/tela armada integrada no jardim e bancada gourmet com churrasqueira para convívio.
          </div>
        </div>

        <div className="bg-[#121822]/80 border border-white/10 rounded-xl p-3.5">
          <div className="text-[10px] uppercase font-bold text-[#dfc282] mb-1">Conforto Térmico</div>
          <div className="text-sm font-bold text-white mb-1">Climatização & Domótica</div>
          <div className="text-xs text-slate-400 leading-snug">
            Ar condicionado oculto por condutas, estores térmicos com app móvel e painéis fotovoltaicos.
          </div>
        </div>
      </div>

      {/* Proteção Total do Sinal */}
      <div className="mt-4 bg-gradient-to-br from-[#1c1610]/90 to-[#100c09]/95 border border-[#c5a059]/40 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-[#c5a059]/15 border border-[#c5a059] text-[#dfc282] flex items-center justify-center text-2xl flex-shrink-0">
          🛡️
        </div>
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white mb-1">
            Proteção Contratual do Sinal de {PROPERTY.depositAmountFormatted}
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            O seu investimento está totalmente resguardado. Caso ocorra recusa de concessão de crédito bancário por motivos alheios à sua vontade, <strong>o valor do sinal de {PROPERTY.depositAmountFormatted} é devolvido a 100%</strong>, sem penalizações nem retenções. Esta garantia consta formalmente do CPCV.
          </p>
        </div>
      </div>

      {/* 3 Passos */}
      <div className="mt-6">
        <h3 className="text-sm sm:text-base font-bold text-white mb-1">
          O Processo em 3 Passos Simples
        </h3>
        <p className="text-xs text-slate-400 mb-3">
          Acompanhamento personalizado e transparente em cada fase da aquisição.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="bg-[#121721]/70 border border-white/10 rounded-xl p-3.5">
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#dfc282] text-xs font-extrabold flex items-center justify-center mb-2">
              1
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mb-0.5">Informação & Estudo</div>
            <div className="text-[11px] sm:text-xs text-slate-400 leading-snug">
              Apresentação dos acabamentos, estudo de viabilidade bancária e escolhas de personalização.
            </div>
          </div>

          <div className="bg-[#121721]/70 border border-white/10 rounded-xl p-3.5">
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#dfc282] text-xs font-extrabold flex items-center justify-center mb-2">
              2
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mb-0.5">Reserva & Terreno</div>
            <div className="text-[11px] sm:text-xs text-slate-400 leading-snug">
              Assinatura com proteção de sinal. O terreno é escriturado diretamente em seu nome.
            </div>
          </div>

          <div className="bg-[#121721]/70 border border-white/10 rounded-xl p-3.5">
            <div className="w-7 h-7 rounded-full bg-[#c5a059]/20 border border-[#c5a059] text-[#dfc282] text-xs font-extrabold flex items-center justify-center mb-2">
              3
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mb-0.5">Obra & Entrega (10m)</div>
            <div className="text-[11px] sm:text-xs text-slate-400 leading-snug">
              Construção com gestor dedicado, relatórios semanais e entrega da chave na mão da moradia terminada.
            </div>
          </div>
        </div>
      </div>

      {/* Parceiros */}
      <div className="mt-5 bg-[#0e121a]/60 border border-white/10 rounded-xl p-3.5 flex flex-wrap items-center justify-around gap-4">
        <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <div className="relative w-24 h-6">
            <Image src="/silvermont1.png" alt="Silvermont Capital" fill className="object-contain" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Silvermont Capital</span>
        </div>

        <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <div className="relative w-20 h-6">
            <Image src="/Positive.png" alt="Positive Project & Co" fill className="object-contain" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Positive Project & Co</span>
        </div>

        <div className="flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-white/20">
            <Image src="/images/freitas1.webp" alt="Construtor Grupo Centímetro" fill className="object-cover" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Grupo Centímetro</span>
        </div>
      </div>
    </section>
  );
}
