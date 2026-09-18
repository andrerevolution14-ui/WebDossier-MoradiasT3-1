'use client';
import React, { useRef, useState, useEffect } from 'react';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

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
    <section id="topo" style={{ background: '#0a0b0d' }}>

      {/* ═══════════════════════════════════════════════════════
          CINEMATIC FULL-BLEED HERO — Photo as background
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(520px, 90vh, 860px)',
        overflow: 'hidden',
      }}>
        {/* Background photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/exterior-noite.jpg"
          alt="Moradia T4 Domaine XXV — Vista exterior noturna, Oliveirinha, Aveiro"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
          }}
        />

        {/* Multi-layer dark gradient: strong on left/bottom, subtle on right */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right, rgba(5,5,8,0.88) 0%, rgba(5,5,8,0.42) 55%, rgba(5,5,8,0.10) 100%),
            linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.5) 35%, rgba(5,5,8,0.0) 70%)
          `,
        }} />

        {/* Top eyebrow strip */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: 'clamp(20px, 3vw, 36px) clamp(20px, 5vw, 60px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          zIndex: 10,
        }}>
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.55)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <span style={{
              display: 'inline-block',
              width: 22,
              height: 1,
              background: 'var(--gold-light)',
              opacity: 0.6,
            }} />
            Dossier Digital Exclusivo
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(161,118,40,0.18)',
              border: '1px solid rgba(161,118,40,0.45)',
              borderRadius: 2,
              padding: '4px 12px',
              fontSize: '0.67rem', fontWeight: 700,
              color: 'var(--gold-light)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, background: 'var(--gold)' }} />
              Início de Obra Imediato
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(61,122,88,0.18)',
              border: '1px solid rgba(61,122,88,0.45)',
              borderRadius: 2,
              padding: '4px 12px',
              fontSize: '0.67rem', fontWeight: 700,
              color: '#7DC4A0',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <span style={{ display: 'inline-block', width: 5, height: 5, background: '#3D7A58' }} />
              Visitas Esta Semana
            </div>
          </div>
        </div>

        {/* Main content — anchored bottom-left */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(24px, 5vw, 56px) clamp(20px, 5vw, 60px) clamp(28px, 4vw, 48px)',
          zIndex: 10,
        }}>
          {/* Headline */}
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 700,
            fontSize: 'clamp(2.0rem, 5.5vw, 4.2rem)',
            lineHeight: 1.08,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            maxWidth: 740,
            margin: '0 0 16px',
            textShadow: '0 2px 24px rgba(0,0,0,0.45)',
          }}>
            A Moradia T4 com Jardim<br />
            às Portas de Aveiro por{' '}
            <span style={{ color: 'var(--gold-light)' }}>335.000€</span>.
          </h1>

          {/* Subline */}
          <p style={{
            fontSize: 'clamp(0.88rem, 1.8vw, 1.02rem)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.65,
            maxWidth: 540,
            margin: '0 0 28px',
            fontWeight: 400,
          }}>
            Avaliação bancária de <strong style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>450.000€</strong> · Projeto aprovado · Chave na mão em <strong style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>10 meses</strong> · Preço blindado em contrato.
          </p>

          {/* CTA Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead('hero_agendar_visita')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--gold)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 30px',
                borderRadius: 'var(--radius-btn)',
                textDecoration: 'none',
                boxShadow: '0 6px 24px rgba(161,118,40,0.45)',
                transition: 'opacity 0.2s',
              }}
            >
              <span>Agendar Visita Privada</span>
              <span style={{ fontSize: '1rem' }}>→</span>
            </a>
            <div style={{
              fontSize: '0.76rem',
              color: 'rgba(255,255,255,0.52)',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}>
              Sinal 100% protegido no CPCV
            </div>
          </div>

          {/* Key spec pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}>
            {[
              '~180 m² ABP',
              'Jardim ~82 m²',
              'Garagem 30 m²',
              'Cozinha Equipada',
              '8 min Aveiro',
            ].map(tag => (
              <span key={tag} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 11px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 2,
                fontSize: '0.68rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.75)',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                backdropFilter: 'blur(6px)',
              }}>
                <span style={{ width: 3, height: 3, background: 'var(--gold-light)', borderRadius: 1, display: 'inline-block' }} />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Corner accent — slide number UI like references */}
        <div style={{
          position: 'absolute',
          bottom: 'clamp(28px, 4vw, 48px)',
          right: 'clamp(20px, 4vw, 48px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          zIndex: 10,
        }}>
          {['01', '02', '03'].map((n, i) => (
            <div key={n} style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.28)',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}>{n}</div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          TRUST STRIP — below the hero photo
          ═══════════════════════════════════════════════════════ */}
      <div style={{
        background: '#111214',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '14px clamp(20px, 5vw, 60px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}>
        {[
          { label: 'Promotor:', value: 'Silvermont Capital', href: undefined },
          { label: 'Construtora:', value: 'Grupo Freitas Renovações ↗', href: 'https://grupofreitasrenovacoes.pt' },
          { label: 'Auditoria:', value: '7 visitas este mês', href: undefined },
          { label: 'Capital próprio:', value: '38.500€ para arrancar', href: undefined },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}>{item.label}</span>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--gold-light)', fontWeight: 700, textDecoration: 'none' }}>
                {item.value}
              </a>
            ) : (
              <strong style={{ color: 'rgba(255,255,255,0.82)', fontWeight: 600 }}>{item.value}</strong>
            )}
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════
          VIDEO SECTION — below the cinematic hero
          ═══════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '48px 20px 48px' }}>
        <div className="section-tag mobile-center-tag" style={{ marginBottom: 14 }}>
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
            autoPlay
            muted={muted}
            playsInline
            preload="auto"
            poster="/images/exterior-capa.webp"
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
                  background: 'var(--gold)',
                  border: 'none',
                  borderRadius: 3,
                  padding: '13px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: '#fff',
                  boxShadow: '0 4px 16px rgba(184,146,74,0.4)',
                  transition: 'transform 0.15s',
                }}
              >
                <span>Rever Apresentação com Som →</span>
              </button>

              <a
                href={WA_VISIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppLead('hero_video_ended_visita')}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  borderBottom: '1px dashed var(--gold)',
                  paddingBottom: 2,
                }}
              >
                <span>Agendar Visita ao Terreno no WhatsApp →</span>
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

    </section>
  );
}
