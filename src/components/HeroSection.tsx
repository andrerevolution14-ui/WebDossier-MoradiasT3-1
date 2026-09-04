'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WA_VISIT } from './SiteHeader';

/* ─── Hero Section — Family-focused with instant sound startup ─────────── */
export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [browserBlockedAudio, setBrowserBlockedAudio] = useState(false);

  // Unmute function with volume 1
  const unmuteAndPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    setBrowserBlockedAudio(false);
    v.play().catch(() => {});
  }, []);

  // Initialize playback with sound as early as possible
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.volume = 1;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Playback started unmuted!
          setMuted(false);
          setBrowserBlockedAudio(false);
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser Autoplay Policy blocked unmuted audio:
          // Fall back to muted playback so visual progress starts immediately
          v.muted = true;
          setMuted(true);
          setBrowserBlockedAudio(true);
          v.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});

          // Unmute on the very first user interaction anywhere on the page
          const handleFirstGesture = () => {
            unmuteAndPlay();
            cleanupListeners();
          };

          const cleanupListeners = () => {
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('scroll', handleFirstGesture);
            window.removeEventListener('keydown', handleFirstGesture);
          };

          window.addEventListener('click', handleFirstGesture, { once: true });
          window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('scroll', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('keydown', handleFirstGesture, { once: true });
        });
    }
  }, [unmuteAndPlay]);

  const handleEnded = () => {
    setEnded(true); // video stopped — does NOT loop
    setIsPlaying(false);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.muted) {
      unmuteAndPlay();
    } else {
      v.muted = true;
      setMuted(true);
    }
  };

  const handleReplay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = false;
    v.volume = 1;
    setMuted(false);
    setEnded(false);
    v.play().catch(() => {});
  };

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
          Moradia T3 independente e térrea com aproveitamento em Oliveirinha — <strong>3 quartos</strong> com luz natural,
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
            onClick={muted ? unmuteAndPlay : undefined}
            style={{
              position: 'relative',
              borderRadius: 16,
              overflow: 'hidden',
              background: '#111',
              boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
              aspectRatio: '16/9',
              cursor: muted ? 'pointer' : 'default',
            }}
          >
            <video
              ref={videoRef}
              poster="/images/Exterior%20Capa.png"
              loop={false}
              playsInline
              preload="metadata"
              onEnded={handleEnded}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            >
              <source src="/videos/ApresentacaoWebDocT3.mp4" type="video/mp4" />
            </video>

            {/* Tap to Unmute Gold Banner (shows if browser blocked unmuted autoplay) */}
            {browserBlockedAudio && isPlaying && !ended && (
              <div
                onClick={unmuteAndPlay}
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
                    padding: '10px 20px',
                    borderRadius: 100,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    animation: 'shimmer 2s infinite',
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>🔊</span>
                  <span>O som está pronto · Toque aqui para Ativar Som</span>
                </div>
              </div>
            )}

            {/* Video Ended Overlay */}
            {ended && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.65)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  zIndex: 30,
                }}
              >
                <button
                  onClick={handleReplay}
                  style={{
                    background: 'var(--gold)',
                    border: 'none',
                    borderRadius: 50,
                    padding: '14px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#fff',
                    boxShadow: '0 4px 20px rgba(184,146,74,0.5)',
                  }}
                >
                  <span>▶</span> Rever Apresentação com Som
                </button>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                  Apresentação concluída
                </span>
              </div>
            )}

            {/* Controls Bar Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 12,
                zIndex: 10,
              }}
            >
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 2 }}>
                  Apresentação Domaine XXV
                </div>
                <div style={{ fontFamily: 'var(--serif)', color: '#fff', fontWeight: 600, fontSize: 'clamp(0.88rem, 2vw, 1.05rem)' }}>
                  Moradia T3 · Oliveirinha, Aveiro
                </div>
              </div>

              {/* Sound Toggle Button */}
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Ativar som' : 'Silenciar'}
                style={{
                  background: muted ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  borderRadius: 10,
                  color: '#fff',
                  padding: '8px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s',
                }}
              >
                <span>{muted ? '🔇' : '🔊'}</span>
                <span>{muted ? 'Ativar Som' : 'Som Ativo'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
