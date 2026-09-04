'use client';

import React, { useState, useRef } from 'react';
import { VIDEOS_PLAYLIST } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function VideoShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentVideo = VIDEOS_PLAYLIST[activeTab];

  const handleTabChange = (idx: number) => {
    setActiveTab(idx);
    trackEvent('video_tab_switched', {
      index: idx,
      title: VIDEOS_PLAYLIST[idx].title,
      src: VIDEOS_PLAYLIST[idx].src,
    });

    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextState = !videoRef.current.muted;
    videoRef.current.muted = nextState;
    setIsMuted(nextState);
    trackEvent('video_mute_toggle', { muted: nextState });
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (!document.fullscreenElement) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen) {
        (videoRef.current as unknown as { webkitEnterFullscreen: () => void }).webkitEnterFullscreen();
      }
      trackEvent('video_fullscreen_opened');
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <section className="py-6 border-t border-white/10" id="videosTour">
      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#dfc282] mb-1">
        <span>●</span> Vídeos em Repeat & Imersão
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
        Visualização 3D das Moradias
      </h2>
      <p className="text-xs sm:text-sm text-slate-400 mb-4">
        Acompanhe a volumetria, luz natural e acabamentos arquitetónicos em vídeo contínuo.
      </p>

      <div className="bg-black rounded-2xl overflow-hidden border border-[#c5a059]/30 shadow-2xl relative">
        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            playsInline
            loop
            muted={isMuted}
            autoPlay
            poster={currentVideo.poster}
            className="w-full h-full object-cover"
            onPlay={() => trackEvent('video_auto_played', { video: currentVideo.id })}
          >
            <source src={currentVideo.src} type="video/mp4" />
            O seu navegador não suporta reprodução de vídeo.
          </video>

          {/* Quick Overlay Controls */}
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={toggleMute}
              className="bg-black/60 hover:bg-[#c5a059] hover:text-black backdrop-blur-md border border-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm transition-colors cursor-pointer"
              title={isMuted ? 'Ativar Som' : 'Desativar Som'}
              aria-label="Alternar som do vídeo"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button
              onClick={toggleFullscreen}
              className="bg-black/60 hover:bg-[#c5a059] hover:text-black backdrop-blur-md border border-white/20 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm transition-colors cursor-pointer"
              title="Ecrã Inteiro"
              aria-label="Ecrã inteiro"
            >
              ⛶
            </button>
          </div>
        </div>

        {/* Playlist Tabs */}
        <div className="flex bg-[#0e121a]/95 border-t border-white/10 overflow-x-auto scrollbar-none">
          {VIDEOS_PLAYLIST.map((vid, idx) => (
            <button
              key={vid.id}
              onClick={() => handleTabChange(idx)}
              className={`flex-1 min-w-[135px] py-3 px-2 text-xs font-semibold text-center border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? 'border-[#c5a059] text-white bg-[#c5a059]/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {vid.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
