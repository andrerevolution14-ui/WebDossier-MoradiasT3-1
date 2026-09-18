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
    <section id="topo" style={{ background: 'var(--bg)', padding: '44px 0 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px 48px' }}>

        {/* ── Section tag ── */}
        <div className="section-tag mobile-center-tag">
          Dossier Digital Exclusivo · Domaine XXV
        </div>

        {/* ── Badges de Urgência & Prova Social — above the fold ── */}
        <div className="mobile-center-flex" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(161,118,40,0.08)',
            border: '1px solid rgba(161,118,40,0.35)',
            borderRadius: 'var(--radius-micro)',
            padding: '5px 14px',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: 'var(--gold-dark)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--gold)' }} />
            <span>Início de Obra Imediato</span>
          </div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#F1F5F2',
            border: '1px solid #C8D6CD',
            borderRadius: 'var(--radius-micro)',
            padding: '5px 14px',
            fontSize: '0.74rem',
            fontWeight: 700,
            color: '#2B4739',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, background: '#3D7A58' }} />
            <span>Disponível para Visitas Esta Semana</span>
          </div>
        </div>

        {/* ── Headline — 100% legível, sem itálicos difíceis ── */}
        <h1 className="hero-headline mobile-center-title" style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(1.9rem, 4.5vw, 3.4rem)', lineHeight: 1.16, letterSpacing: '-0.02em', color: 'var(--text-primary)', maxWidth: 880, margin: '0 auto 16px', textAlign: 'center' }}>
          A Moradia T4 com Jardim às Portas de Aveiro que o Mercado Dizia Ser <span style={{ color: 'var(--gold-dark)', fontWeight: 700 }}>Impossível</span>.
        </h1>

        {/* ── Descriptive subheadline — Alta legibilidade e contraste ── */}
        <p className="hero-subheadline mobile-center-desc" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.05rem)', lineHeight: 1.7, color: 'var(--text-body)', maxWidth: 760, margin: '0 auto 20px', textAlign: 'center' }}>
          <strong>Projeto 100% aprovado pela Câmara Municipal e avaliação bancária oficial de 450.000€</strong> — sem qualquer impedimento legal ou espera por licenças. A oportunidade real de adquirir uma moradia familiar com jardim a 8 minutos de Aveiro por <strong>335.000€ chave-na-mão</strong> (~1.861€/m² ABP). Começo imediato, <strong>entrega em 10 meses</strong> e preço blindado em contrato.
        </p>

        {/* ── Destaque Financeiro — Caixa com Cantos Arredondados Suaves ── */}
        <div className="mobile-center-flex" style={{ marginBottom: 22, justifyContent: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: '#FAF6EE',
            border: '1px solid rgba(161, 118, 40, 0.32)',
            boxShadow: '0 2px 12px rgba(161, 118, 40, 0.05)',
            borderRadius: 'var(--radius-card-sm)',
            padding: '10px 20px',
            fontSize: '0.88rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '100%',
          }}>
            <span>Arranque do processo com apenas <strong style={{ fontWeight: 700, color: 'var(--gold-dark)' }}>38.500€</strong> de capitais próprios · Restante em crédito habitação faseado.</span>
          </div>
        </div>

        {/* ── Key badges — Cantos Retos Arquitetónicos (2px) para Contraste & Compacto no Mobile ── */}
        <div className="hero-badges hero-badges-grid">
          {[
            { label: '335.000€ Chave na Mão', isPrimary: true },
            { label: 'Chave na Mão em 10 Meses', isPrimary: true },
            { label: 'Cozinha 100% Equipada', isPrimary: false },
            { label: 'Climatização & Bomba A+', isPrimary: false },
            { label: 'Personalização Acabamentos', isPrimary: false },
            { label: '~180 m² ABP · ~146 m² Úteis', isPrimary: false },
            { label: 'Jardim Privado ~82 m²', isPrimary: false },
            { label: 'Garagem Coberta 30 m²', isPrimary: false },
          ].map(b => (
            <div
              key={b.label}
              className={`hero-badge-item ${b.isPrimary ? 'hero-badge-primary' : 'hero-badge-secondary'}`}
            >
              <span style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: 1,
                background: b.isPrimary ? 'var(--gold-light)' : 'var(--gold)',
                flexShrink: 0,
              }} />
              <span>{b.label}</span>
            </div>
          ))}
        </div>

        {/* ── Primary CTA — Focado na Ação & Ganho ── */}
        <div className="hero-cta-wrap mobile-center-btn-wrap" style={{ marginBottom: 26, width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', width: '100%' }} className="mobile-center-flex">
            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppLead('hero_agendar_visita')}
              className="btn btn-gold pulse-gold mobile-center-btn"
              style={{
                display: 'inline-flex',
                fontSize: '0.94rem',
                padding: '16px 36px',
                borderRadius: 'var(--radius-btn)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                textAlign: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(161,118,40,0.3)',
              }}
            >
              <span>Agendar Visita Privada ao Lote →</span>
            </a>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span>Sinal 100% protegido no CPCV · Conclusão de obra em 10 meses</span>
            </div>
          </div>
        </div>

        {/* ── Selo Institucional de Autoridade & Prova Social ── */}
        <div className="mobile-center-flex" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 36,
          padding: '9px 18px',
          background: 'var(--white)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card-sm)',
          fontSize: '0.76rem',
          color: 'var(--text-muted)',
          boxShadow: 'var(--shadow-soft)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Promotor:</span>
            <strong style={{ color: 'var(--text-primary)' }}>Silvermont Capital</strong>
          </div>
          <span style={{ color: 'var(--border)' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Construtora Oficial:</span>
            <a
              href="https://grupofreitasrenovacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--gold-dark)', fontWeight: 700, textDecoration: 'none' }}
            >
              Grupo Freitas Renovações ↗
            </a>
          </div>
          <span style={{ color: 'var(--border)' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Auditoria:</span>
            <strong style={{ color: 'var(--text-primary)' }}>7 visitas este mês</strong>
          </div>
        </div>

        {/* ── Hero Property Photo — Impacto Imediato, Sem Scroll ── */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-card)',
          overflow: 'hidden',
          marginBottom: 32,
          boxShadow: '0 16px 48px rgba(0,0,0,0.13), 0 2px 0 rgba(161,118,40,0.12)',
          border: '1px solid rgba(161,118,40,0.12)',
          lineHeight: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/exterior-noite.jpg"
            alt="Moradia T4 Domaine XXV — Vista exterior noturna com jardim privativo iluminado, Oliveirinha, Aveiro"
            style={{
              width: '100%',
              height: 'clamp(240px, 42vw, 520px)',
              objectFit: 'cover',
              objectPosition: 'center 55%',
              display: 'block',
            }}
          />
          {/* Gradient overlay bottom → caption */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(10,10,12,0.72) 0%, rgba(10,10,12,0) 100%)',
            padding: '28px 20px 14px',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.88)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              <span style={{ color: 'var(--gold-light)', marginRight: 8 }}>●</span>
              Lote 25 · Oliveirinha, Aveiro · Jardim Privado ~82 m²
            </div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(161,118,40,0.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 'var(--radius-micro)',
              padding: '4px 12px',
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              Render Oficial · Domaine XXV
            </div>
          </div>
        </div>

        {/* ── Web Doc Presentation Video ── */}
        <div>
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

      </div>
    </section>
  );
}

