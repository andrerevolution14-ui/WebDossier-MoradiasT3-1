'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { trackEvent } from '@/lib/analytics';

export default function PresenterCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);
  const duration = 48;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    setIsPlaying(prev => {
      const next = !prev;
      trackEvent(next ? 'presenter_audio_play' : 'presenter_audio_pause', {
        position: currentTime,
      });
      return next;
    });
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(t => {
          if (t >= duration) {
            setIsPlaying(false);
            trackEvent('presenter_audio_completed');
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="mt-4 bg-gradient-to-br from-[#1c2330]/90 to-[#0f141c]/95 border border-[#c5a059]/30 rounded-2xl p-4 sm:p-5 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#c5a059] to-transparent" />

      <div className="flex items-center gap-3.5">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#c5a059] shadow-md relative">
            <Image
              src="/EU1.jpeg"
              alt="André Queirós — Gestor de Projeto Domaine XXV"
              fill
              sizes="64px"
              className="object-cover"
              priority
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#090b0e] rounded-full" title="Disponível para chamada" />
        </div>

        <div>
          <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
            André Queirós <span className="text-[#c5a059] text-sm font-black">✓</span>
          </h4>
          <span className="text-xs sm:text-sm text-slate-400">
            Gestor de Projeto Dedicado · Silvermont Capital
          </span>
        </div>
      </div>

      <div className="mt-3.5 text-xs sm:text-sm text-slate-200 bg-black/35 p-3 rounded-xl border-l-4 border-[#c5a059] leading-relaxed">
        &ldquo;Montei esta página interativa para te mostrar não apenas os renders 3D e as plantas, mas a <strong>engenharia financeira</strong> que torna viável adquirir uma moradia avaliada em <strong>450.000€</strong> pelo valor fechado de <strong>329.000€</strong>.&rdquo;
      </div>

      {/* Audio Player Box */}
      <div className="mt-3.5 bg-[#090c11]/80 border border-white/10 rounded-xl p-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar áudio' : 'Reproduzir áudio'}
          className="w-11 h-11 rounded-full bg-gradient-to-br from-[#c5a059] to-[#967434] text-slate-950 font-bold text-base flex items-center justify-center shadow-lg transition-transform active:scale-95 flex-shrink-0"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between text-xs font-semibold text-slate-200">
            <span>Áudio de Boas-Vindas</span>
            <span className="text-slate-400 font-mono text-[11px]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1 h-5 mt-1.5">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(idx => (
              <div
                key={idx}
                className="flex-1 rounded-sm transition-all duration-200"
                style={{
                  height: isPlaying ? `${Math.min(95, Math.max(20, ((idx * 23 + currentTime * 15) % 100)))}%` : '25%',
                  backgroundColor: isPlaying ? '#c5a059' : 'rgba(197, 160, 89, 0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setShowTranscript(v => !v);
          trackEvent('presenter_transcript_toggle', { open: !showTranscript });
        }}
        className="mt-2 text-xs text-[#dfc282] underline cursor-pointer hover:text-white transition-colors"
      >
        {showTranscript ? 'Ocultar transcrição' : 'Ver transcrição do áudio'}
      </button>

      {showTranscript && (
        <div className="mt-2 text-xs text-slate-300 border-t border-dashed border-white/10 pt-2 leading-relaxed italic">
          &ldquo;Olá! Bem-vindo ao dossier do Domaine XXV. Preparei este material especificamente para quem procura uma moradia independente, moderna e energeticamente eficiente em Aveiro, sem pagar margens inflacionadas. Aqui encontras a explicação detalhada de como poupas cerca de 23.700€ em impostos, como recebes 31.500€ de reembolso de IVA pelo Estado antes da conclusão da obra, e como o teu sinal de 38.500€ está 100% blindado caso o banco recuse crédito. Explora a página e estou disponível para uma chamada rápida.&rdquo;
        </div>
      )}
    </div>
  );
}
