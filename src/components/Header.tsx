'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#121316]/90 border-b border-white/10 py-3 transition-all">
      <div className="container-dossier flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[2px] bg-gradient-to-br from-[#c5a059] to-[#8f7238] flex items-center justify-center font-serif font-bold text-xs text-[#121316] shadow-sm">
            XXV
          </div>
          <span className="font-serif font-semibold tracking-wider text-white text-base">DOMAINE XXV</span>
        </div>
        <div className="inline-flex items-center gap-2 bg-[#1B2A22] border border-[#3E654E]/40 px-3 py-1 rounded-[2px] text-[11px] font-semibold tracking-wider uppercase text-[#7BD499]">
          <span className="w-1.5 h-1.5 rounded-[1px] bg-[#52C47C]" />
          <span>2 Unidades Disponíveis</span>
        </div>
      </div>
    </header>
  );
}
