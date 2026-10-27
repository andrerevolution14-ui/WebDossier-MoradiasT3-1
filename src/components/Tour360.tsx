'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LeadModalProvider, useLeadModal } from '@/components/LeadModal';
import { TOUR_360_URL } from '@/lib/constants';

/* ─── Visita 360° — página dedicada, imersiva e minimalista ─────────────── */
const SCENES = [
  { src: '/images/exterior-capa.webp', label: 'Fachada & Entrada', zone: 'Exterior' },
  { src: '/images/exterior-traseiro-completo.webp', label: 'Jardim & Fachada Traseira', zone: 'Exterior' },
  { src: '/images/exterior-barbecue.webp', label: 'Área de Barbecue', zone: 'Exterior' },
  { src: '/images/sala-de-jantar.webp', label: 'Sala de Jantar & Estar', zone: 'Piso 0' },
  { src: '/images/cozinha.webp', label: 'Cozinha Open Space', zone: 'Piso 0' },
  { src: '/images/corredor-quartos.webp', label: 'Corredor', zone: 'Piso 1' },
  { src: '/images/quarto-cama.webp', label: 'Suite Principal', zone: 'Piso 1' },
  { src: '/images/quarto-varanda.webp', label: 'Quarto com Varanda', zone: 'Piso 1' },
  { src: '/images/quarto-porta.webp', label: 'Zona dos Quartos', zone: 'Piso 1' },
  { src: '/images/wc-f2.webp', label: 'Casa de Banho', zone: 'Piso 1' },
  { src: '/images/terceiro-andar.webp', label: 'Sótão', zone: 'Sótão' },
];

function TourInner() {
  const { openLeadModal } = useLeadModal();
  const [idx, setIdx] = useState(0);
  const scene = SCENES[idx];

  const go = useCallback((d: number) => setIdx(i => (i + d + SCENES.length) % SCENES.length), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  const glass: React.CSSProperties = {
    background: 'rgba(8,10,14,0.55)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,255,255,0.14)',
  };

  const arrow: React.CSSProperties = {
    ...glass, width: 46, height: 46, borderRadius: '50%', color: '#fff',
    fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#05070c', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <header style={{ position: 'absolute', top: 0, left: 0, zIndex: 20, padding: '16px clamp(16px,4vw,40px)', pointerEvents: 'none' }}>
        <a href="/" style={{ ...glass, pointerEvents: 'auto', color: '#fff', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 600, padding: '9px 16px', borderRadius: 100, letterSpacing: '0.03em' }}>
          ← Voltar ao dossier
        </a>
      </header>

      {TOUR_360_URL ? (
        <iframe
          src={TOUR_360_URL}
          title="Visita virtual 360° — Moradia T3 Domaine XXV"
          allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          style={{ flex: 1, border: 0, width: '100%' }}
        />
      ) : (
        <div style={{ position: 'relative', flex: 1, minHeight: 0 }}>
          {/* key forces fade-in on every scene change */}
          <div key={scene.src} className="tour-fade" style={{ position: 'absolute', inset: 0 }}>
            <Image src={scene.src} alt={`${scene.label} — Moradia T3 Domaine XXV`} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,7,12,0.92) 0%, rgba(5,7,12,0.1) 45%, rgba(5,7,12,0.35) 100%)' }} />

          <div style={{ position: 'absolute', left: 'clamp(12px,3vw,32px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
            <button type="button" aria-label="Anterior" onClick={() => go(-1)} style={arrow}>‹</button>
          </div>
          <div style={{ position: 'absolute', right: 'clamp(12px,3vw,32px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}>
            <button type="button" aria-label="Seguinte" onClick={() => go(1)} style={arrow}>›</button>
          </div>

          {/* Scene caption + thumbnails */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 clamp(16px,4vw,40px) clamp(16px,3vh,28px)', zIndex: 10 }}>
            <div style={{ fontSize: '0.64rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 6 }}>
              {scene.zone} · {idx + 1} / {SCENES.length}
            </div>
            <h1 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: 'clamp(1.6rem,4vw,2.6rem)', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
              {scene.label}
            </h1>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 14, scrollbarWidth: 'none' }}>
              {SCENES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={s.label}
                  aria-current={i === idx}
                  style={{
                    position: 'relative', flex: '0 0 auto', width: 84, height: 56, borderRadius: 6, overflow: 'hidden', padding: 0, cursor: 'pointer',
                    border: i === idx ? '2px solid var(--gold-light)' : '2px solid rgba(255,255,255,0.15)',
                    opacity: i === idx ? 1 : 0.6, transition: 'all 0.2s', background: '#111',
                  }}
                >
                  <Image src={s.src} alt="" fill sizes="84px" style={{ objectFit: 'cover' }} />
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                type="button"
                id="tour_cta_agendar_visita"
                onClick={() => openLeadModal({ title: 'Agendar Visita ao Lote · Domaine XXV', source: 'tour360_cta', defaultObjective: 'Falar com o Promotor' })}
                style={{ background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 'var(--radius-btn)', padding: '13px 26px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 6px 24px rgba(161,118,40,0.45)' }}
              >
                Falar com o Promotor →
              </button>
              <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.6)' }}>Use as setas ← → do teclado para navegar</span>
            </div>
          </div>
        </div>
      )}

      {TOUR_360_URL && (
        <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 20, pointerEvents: 'none' }}>
          <button
            type="button"
            onClick={() => openLeadModal({ title: 'Agendar Visita ao Lote · Domaine XXV', source: 'tour360_cta', defaultObjective: 'Falar com o Promotor' })}
            style={{ pointerEvents: 'auto', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 'var(--radius-btn)', padding: '13px 26px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Falar com o Promotor →
          </button>
        </div>
      )}

      <style>{`.tour-fade{animation:tourFade .7s ease both}@keyframes tourFade{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );
}

export default function Tour360() {
  return (
    <LeadModalProvider>
      <TourInner />
    </LeadModalProvider>
  );
}
