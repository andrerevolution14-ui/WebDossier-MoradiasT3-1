'use client';
import React, { useRef, useState, useEffect } from 'react';
import { WA_VISIT } from './SiteHeader';

/* ─── Hero Section — Family-focused with guaranteed presentation playback ─── */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedWithSound, setHasStartedWithSound] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12);

  // Initialize playback on mount (always start muted so browser autoplay succeeds 100%)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay fully blocked by browser policy — waiting for user gesture
        setIsPlaying(false);
      });
  }, []);

  // Play with sound from start
  const playFromStartWithSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    setEnded(false);
    setHasStartedWithSound(true);
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Fallback if browser requires muted
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
  };

  // Toggle play/pause
  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    if (ended) {
      playFromStartWithSound(e);
      return;
    }

    if (v.paused) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  };

  // Toggle mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted) {
      v.volume = 1;
      setHasStartedWithSound(true);
    }
  };

  // Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const c = containerRef.current || videoRef.current;
    if (!c) return;

    if (!document.fullscreenElement) {
      if (c.requestFullscreen) {
        c.requestFullscreen().catch(() => {});
      } else if ((c as any).webkitRequestFullscreen) {
        (c as any).webkitRequestFullscreen();
      }
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Handle video end
  const handleEnded = () => {
    // If the user hasn't actively engaged with sound yet, loop the visual preview
    if (!hasStartedWithSound) {
      const v = videoRef.current;
      if (v) {
        v.currentTime = 0;
        v.play().catch(() => {});
      }
      return;
    }
    setEnded(true);
    setIsPlaying(false);
  };

  // Format time (e.g. 0:08)
  const formatTime = (secs: number) => {
    const s = Math.floor(secs || 0);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  // Progress percentage
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section id="topo" style={{ background: 'var(--bg)', padding: '44px 0 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px 48px' }}>

        {/* ── Section tag ── */}
        <div className="mobile-center-tag" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'var(--gold)' }} />
          Dossier Digital Exclusivo · Domaine XXV
        </div>

        {/* ── Family-focused headline ── */}
        <h1 className="hero-headline mobile-center-title" style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', lineHeight: 1.14, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: 820, marginBottom: 16 }}>
          A moradia onde a sua família vai crescer,{' '}
          <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>com espaço para viver a sério.</span>
        </h1>

        {/* ── Descriptive subheadline ── */}
        <p className="hero-subheadline mobile-center-desc" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.7, color: 'var(--text-body)', maxWidth: 660, marginBottom: 26 }}>
          Moradia T3 independente com aproveitamento em Oliveirinha — <strong>3 quartos</strong> com luz natural,
          sala e cozinha em open space, <strong>jardim privativo de ~82 m²</strong> para momentos em família, garagem coberta para 2 viaturas
          e sótão amplo com 34 m². Chave na mão em 10 meses e personalização total ao vosso gosto.
        </p>

        {/* ── Key badges ── */}
        <div className="hero-badges mobile-center-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
          {[
            '🏡 T3 Independente · 185 m²',
            '🌳 Jardim Privado ~82 m²',
            '🚗 Garagem Coberta 30 m²',
            '📅 Chave na mão em 10 meses',
            '✏️ Personalização total',
            '⚡ Classe Energética A+',
          ].map(b => (
            <span key={b} style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'6px 14px', borderRadius:100, fontSize:'0.76rem', fontWeight:600, background:'var(--gold-pale)', border:'1px solid #E8D4AE', color:'#7A5C28' }}>
              {b}
            </span>
          ))}
        </div>

        {/* ── Primary CTA ── */}
        <div className="hero-cta-wrap mobile-center-btn-wrap" style={{ marginBottom: 44 }}>
          <a
            href={WA_VISIT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold pulse-gold mobile-center-btn"
            style={{ display: 'inline-flex', fontSize: '0.98rem', padding: '15px 32px', borderRadius: 10, textDecoration: 'none' }}
          >
            <span>💬</span> Marcar Visita ao Terreno no WhatsApp
          </a>
        </div>

        {/* ── Web Doc Presentation Video ── */}
        <div>
          <div className="mobile-center-tag" style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <span style={{ display:'block', width:28, height:1.5, background:'var(--border)' }} />
            Vídeo de Apresentação Oficial
            <span style={{ display:'block', width:28, height:1.5, background:'var(--border)' }} />
          </div>

          <div
            ref={containerRef}
            onClick={muted ? playFromStartWithSound : togglePlayPause}
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              background: '#0a0a0a',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22)',
              aspectRatio: '16/9',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted={muted}
              playsInline
              preload="auto"
              poster="/images/Exterior%20Capa.png"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={e => setDuration(e.currentTarget.duration || 12)}
              onEnded={handleEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/videos/ApresentacaoWebDocT3.mp4" type="video/mp4" />
            </video>

            {/* Top Sound Prompt Pill (shows when playing muted preview) */}
            {muted && !ended && (
              <div
                onClick={playFromStartWithSound}
                style={{
                  position: 'absolute',
                  top: 16,
                  left: 16,
                  right: 16,
                  zIndex: 20,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    background: 'rgba(184,146,74,0.95)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: 100,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    animation: 'shimmer 2s infinite',
                  }}
                >
                  <span style={{ fontSize: '1.15rem' }}>🔊</span>
                  <span>Clique aqui para Ouvir com Som</span>
                </div>
              </div>
            )}

            {/* Center Play Button Overlay (shows when paused) */}
            {!isPlaying && !ended && (
              <div
                onClick={playFromStartWithSound}
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 15,
                  background: 'rgba(0,0,0,0.3)',
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(184,146,74,0.55)',
                    color: '#fff',
                    fontSize: '1.8rem',
                    paddingLeft: 4,
                    transition: 'transform 0.2s',
                  }}
                >
                  ▶
                </div>
              </div>
            )}

            {/* Video Ended Overlay */}
            {ended && (
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(10,10,10,0.75)',
                  backdropFilter: 'blur(6px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 18,
                  zIndex: 30,
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                <button
                  onClick={playFromStartWithSound}
                  style={{
                    background: 'var(--gold)',
                    border: 'none',
                    borderRadius: 50,
                    padding: '14px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#fff',
                    boxShadow: '0 4px 24px rgba(184,146,74,0.6)',
                    transition: 'transform 0.15s',
                  }}
                >
                  <span>▶</span> Rever Apresentação com Som
                </button>

                <a
                  href={WA_VISIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    borderBottom: '1px dashed var(--gold)',
                    paddingBottom: 2,
                  }}
                >
                  <span>💬</span> Agendar Visita ao Terreno no WhatsApp →
                </a>
              </div>
            )}

            {/* Controls Bar Overlay */}
            <div
              onClick={e => e.stopPropagation()}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '24px 20px 14px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 65%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                zIndex: 25,
              }}
            >
              {/* Progress track bar */}
              <div
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  if (videoRef.current) {
                    videoRef.current.currentTime = ratio * duration;
                  }
                }}
                style={{
                  width: '100%',
                  height: 4,
                  background: 'rgba(255,255,255,0.25)',
                  borderRadius: 100,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'var(--gold)',
                    borderRadius: 100,
                    transition: 'width 0.1s linear',
                  }}
                />
              </div>

              {/* Bottom tools row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {/* Play / Pause button */}
                  <button
                    onClick={togglePlayPause}
                    aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 8,
                      color: '#fff',
                      width: 34,
                      height: 34,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    {isPlaying ? '⏸' : '▶'}
                  </button>

                  {/* Title & Time */}
                  <div>
                    <div style={{ fontFamily: 'var(--serif)', color: '#fff', fontWeight: 600, fontSize: 'clamp(0.85rem, 2vw, 0.95rem)', lineHeight: 1.2 }}>
                      Moradia T3 · Domaine XXV
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', fontWeight: 500, marginTop: 2 }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>

                {/* Right controls: Sound & Fullscreen */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    onClick={toggleMute}
                    aria-label={muted ? 'Ativar som' : 'Silenciar'}
                    style={{
                      background: muted ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      borderRadius: 8,
                      color: '#fff',
                      padding: '7px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span>{muted ? '🔇' : '🔊'}</span>
                    <span>{muted ? 'Ativar Som' : 'Som Ativo'}</span>
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    aria-label="Ecrã inteiro"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: 8,
                      color: '#fff',
                      width: 34,
                      height: 34,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    ⛶
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

