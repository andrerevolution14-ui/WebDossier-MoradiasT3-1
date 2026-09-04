'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#090b0e]/85 border-b border-white/10 py-3 transition-all">
      <div className="container-dossier flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#c5a059] to-[#8f7238] flex items-center justify-center font-extrabold text-xs text-[#090b0e] shadow-sm">
            XXV
          </div>
          <span className="font-bold tracking-wider text-white text-base">DOMAINE XXV</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span>Apenas 2 Disponíveis</span>
        </div>
      </div>
    </header>
  );
}
