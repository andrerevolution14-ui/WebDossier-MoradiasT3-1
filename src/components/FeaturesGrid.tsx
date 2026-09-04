'use client';

import React from 'react';

const FEATURES = [
  { icon: '🌳', title: 'Jardim Privado', desc: 'Terreno de ~230 m² com pátio e zona lounge exterior.' },
  { icon: '🚗', title: 'Garagem / 2 Carros', desc: 'Estacionamento coberto privativo e pré-instalação EV.' },
  { icon: '⚡', title: 'Estrutura LSF (A+)', desc: 'Isolamento térmico e acústico de topo, antissísmico e ecológico.' },
  { icon: '🏠', title: '100% Independente', desc: 'Moradia isolada sem encargos de condomínio nem áreas comuns.' },
  { icon: '🔑', title: 'Chave na Mão', desc: 'Prazo contratual de 10 meses com todas as licenças asseguradas.' },
  { icon: '🎨', title: 'Personalização Total', desc: 'Escolha de revestimentos cerâmicos, carpintarias e distribuição.' },
];

export default function FeaturesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
      {FEATURES.map((item, idx) => (
        <div
          key={idx}
          className="bg-[#131923]/70 border border-white/10 rounded-xl p-3 flex flex-col justify-between hover:border-[#c5a059]/40 hover:bg-[#19212e]/85 transition-all"
        >
          <div>
            <div className="w-8 h-8 rounded-lg bg-[#c5a059]/15 text-[#dfc282] flex items-center justify-center text-sm mb-2">
              {item.icon}
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
              {item.title}
            </div>
          </div>
          <div className="text-[11px] sm:text-xs text-slate-400 leading-tight">
            {item.desc}
          </div>
        </div>
      ))}
    </div>
  );
}
