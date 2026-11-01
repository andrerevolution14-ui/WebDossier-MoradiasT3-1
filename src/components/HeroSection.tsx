'use client';
import React, { useRef, useState, useEffect } from 'react';
import { useLeadModal } from '@/components/LeadModal';
import { TOUR_360_PATH } from '@/lib/constants';

/* ─── Hero Section — Family-focused with deferred video playback ─── */
export default function HeroSection() {
  const { openLeadModal } = useLeadModal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStartedWithSound, setHasStartedWithSound] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(12);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Carregamento diferido do vídeo (apenas quando entra no viewport após scroll ou clique)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || videoLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    const timer = setTimeout(() => {
      observer.observe(el);
    }, 1800);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [videoLoaded]);

  useEffect(() => {
    if (!videoLoaded) return;
    const v = videoRef.current;
    if (!v) return;

    v.load();
    v.muted = true;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        setIsPlaying(false);
      });
  }, [videoLoaded]);

  // Play with sound from start
  const playFromStartWithSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoLoaded) {
      setVideoLoaded(true);
    }
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
    if (!videoLoaded) {
      setVideoLoaded(true);
      return;
    }
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
    <section id="topo" style={{ background: '#0a0b0d' }}>

      {/* ═══════════════════════════════════════════════════════
          CINEMATIC FULL-BLEED HERO — Photo as background
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 'clamp(500px, 80vh, 780px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/exterior-noite.webp"
          alt="Moradia T3 Domaine XXV — Vista exterior noturna, Oliveirinha, Aveiro"
          fetchPriority="high"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
          }}
        />

        {/* Multi-layer dark gradient — deep obsidian tones matching the header */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.52) 55%, rgba(5,7,12,0.18) 100%),
            linear-gradient(to top, rgba(5,7,12,0.98) 0%, rgba(5,7,12,0.62) 42%, rgba(5,7,12,0.12) 75%),
            linear-gradient(to bottom, rgba(5,7,12,0.85) 0%, transparent 26%)
          `,
        }} />

        {/* Top eyebrow strip — pinned to top */}
        <div className="hero-cinematic-eyebrow" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 'clamp(16px, 2.5vw, 28px) clamp(20px, 5vw, 60px) 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--gold-light)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{
              display: 'inline-block',
              width: 20,
              height: 1.5,
              background: 'var(--gold)',
            }} />
            Moradia T3 · Oliveirinha, Aveiro
          </div>
          <div className="hidden sm:inline-flex" style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>
            Projeto Aprovado · Chave na Mão
          </div>
        </div>

        {/* Main content — vertically centered in the hero */}
        <div style={{
          position: 'relative',
          padding: 'clamp(64px, 8vh, 90px) clamp(20px, 5vw, 60px) clamp(36px, 6vh, 52px)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }} className="hero-cinematic-content">
          {/* Headline */}
          <h1 className="hero-cinematic-title" style={{
            fontFamily: 'var(--serif)',
            fontWeight: 700,
            fontSize: 'clamp(2.1rem, 5.5vw, 4.0rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            maxWidth: 720,
            margin: '0 0 16px',
            textShadow: '0 2px 24px rgba(0,0,0,0.5)',
          }}>
            A Moradia T3 com Jardim<br />
            às Portas de Aveiro por{' '}
            <span style={{ color: 'var(--gold-light)' }}>335.000€</span>.
          </h1>

          {/* Subline */}
          <p className="hero-cinematic-sub" style={{
            fontSize: 'clamp(0.92rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,255,255,0.80)',
            lineHeight: 1.6,
            maxWidth: 560,
            margin: '0 0 28px',
            fontWeight: 400,
          }}>
            Preço chave na mão com impostos incluídos · Conclusão em 10 meses · A 8 minutos do centro de Aveiro.
          </p>

          {/* CTA único + link permitido da Visita 360° */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--gold-light)', fontWeight: 600, letterSpacing: '0.02em' }}>
              Sem compromisso, resposta rápida.
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
              <button
                type="button"
                onClick={() => openLeadModal({
                  title: 'Verificar disponibilidade · Domaine XXV',
                  source: 'hero_primary_cta',
                  defaultObjective: 'Verificar disponibilidade',
                })}
                style={{
                  background: 'var(--gold)',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '13px 26px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(184,146,74,0.4)',
                }}
              >
                Verificar disponibilidade →
              </button>

              <a
                href={TOUR_360_PATH}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '11px 16px',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 'var(--radius-btn)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.04em',
                  backdropFilter: 'blur(6px)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ width: 6, height: 6, background: 'var(--gold-light)', borderRadius: '50%', display: 'inline-block' }} />
                Explorar Visita 360° ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TRUST STRIP — sem links externos nem âncoras
          ═══════════════════════════════════════════════════════ */}
      <div className="hero-trust-strip" style={{
        background: '#111214',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '12px clamp(16px, 4vw, 48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        {[
          { label: 'Licenciamento:', value: 'Aprovado Município de Aveiro' },
          { label: 'Construtora Oficial:', value: 'Grupo Freitas Renovações' },
          { label: 'Disponibilidade:', value: 'Visitas esta semana' },
          { label: 'Entrada 10%:', value: '33.500€ (salvaguardado no CPCV)' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}>{item.label}</span>
            <strong style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 600 }}>{item.value}</strong>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          VIDEO SECTION — below the cinematic hero (carregamento diferido)
          ═══════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '28px 16px 28px' }}>
        <div className="section-tag mobile-center-tag" style={{ marginBottom: 12 }}>
          Vídeo de Apresentação Oficial
        </div>

        <div
          ref={containerRef}
          onClick={muted ? playFromStartWithSound : togglePlayPause}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            background: '#0a0a0a',
            boxShadow: '0 20px 50px rgba(0,0,0,0.22)',
            border: '1px solid rgba(255,255,255,0.08)',
            aspectRatio: '16/9',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <video
            ref={videoRef}
            muted={muted}
            playsInline
            preload="none"
            poster="/images/exterior-capa.webp"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={e => setDuration(e.currentTarget.duration || 12)}
            onEnded={handleEnded}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          >
            {videoLoaded && <source src="/videos/ApresentacaoWebDocT3.mp4" type="video/mp4" />}
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
                  padding: '8px 20px',
                  borderRadius: 3,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                <span>Ativar Áudio da Apresentação</span>
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
                background: 'rgba(0,0,0,0.35)',
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 4,
                  background: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(184,146,74,0.45)',
                  color: '#fff',
                  fontSize: '1.5rem',
                  paddingLeft: 3,
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
                background: 'rgba(10,10,10,0.85)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                zIndex: 30,
                padding: 20,
                textAlign: 'center',
              }}
            >
              <button
                onClick={playFromStartWithSound}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 3,
                  padding: '10px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                }}
              >
                <span>Rever Apresentação com Som</span>
              </button>

              <span style={{ fontSize: '0.76rem', color: 'var(--gold-light)', fontWeight: 600 }}>
                Sem compromisso, resposta rápida.
              </span>
              <button
                type="button"
                onClick={() => openLeadModal({
                  title: 'Verificar disponibilidade · Domaine XXV',
                  source: 'hero_video_ended_cta',
                  defaultObjective: 'Verificar disponibilidade',
                })}
                style={{
                  background: 'var(--gold)',
                  border: 'none',
                  borderRadius: 'var(--radius-btn)',
                  padding: '13px 26px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(184,146,74,0.4)',
                }}
              >
                Verificar disponibilidade →
              </button>
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

    </section>
  );
}
