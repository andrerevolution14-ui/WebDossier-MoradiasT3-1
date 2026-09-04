'use client';

import React from 'react';
import { PROPERTY } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

interface FloatingBottomBarProps {
  onOpenCallModal: () => void;
  onScrollToSimulator: () => void;
}

export default function FloatingBottomBar({
  onOpenCallModal,
  onScrollToSimulator,
}: FloatingBottomBarProps) {
  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#090c11]/95 backdrop-blur-xl border-t border-[#c5a059]/30 py-2.5 px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
      style={{ paddingBottom: 'calc(0.6rem + env(safe-area-inset-bottom, 14px))' }}
      aria-label="Ações de contacto rápido"
    >
      <div className="container-dossier flex items-center gap-2">
        {/* Botão Primário */}
        <button
          onClick={() => {
            trackEvent('floating_cta_call_click');
            onOpenCallModal();
          }}
          className="flex-[2] bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-xs sm:text-sm py-3 px-3 rounded-full flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/30 whitespace-nowrap animate-pulse-button cursor-pointer active:scale-95 transition-all"
        >
          <span>🟢</span> QUERO RECEBER CHAMADA
        </button>

        {/* Botão Secundário */}
        <button
          onClick={() => {
            trackEvent('floating_cta_sim_click');
            onScrollToSimulator();
          }}
          className="flex-1 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm py-3 px-2 rounded-full text-center whitespace-nowrap cursor-pointer transition-colors"
        >
          📊 Simular
        </button>

        {/* Botão Terciário (Mapa) */}
        <a
          href={PROPERTY.googleMapsDirections}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('floating_cta_map_click')}
          className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white flex items-center justify-center text-base flex-shrink-0 cursor-pointer transition-colors"
          title="Ver Localização no Mapa"
          aria-label="Ver localização no mapa"
        >
          🗺️
        </a>
      </div>
    </aside>
  );
}
