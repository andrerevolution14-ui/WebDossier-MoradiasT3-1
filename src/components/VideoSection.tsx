'use client';
import React, { useRef, useState, useEffect } from 'react';

/* ─── Video Tours Section: 3D Exterior and Interior ─────────────────────── */
const TOURS = [
  {
    src: '/videos/tour-exterior.mp4',
    poster: '/images/Exterior%20Capa.png',
    title: 'Tour 3D Exterior & Jardim',
    desc: 'Visualização da volumetria, luminosidade, pátio e jardim privativo de ~82 m².',
  },
  {
    src: '/videos/tour-interior.mp4',
    poster: '/images/Sala%20de%20Jantar.png',
    title: 'Tour 3D Vivência Interior',
    desc: 'Espaços amplos em open space, luz natural, cozinha e zona dos quartos.',
  },
];

export default function VideoSection() {
  const [mutedStates, setMutedStates] = useState<boolean[]>([true, true]);
  const video0Ref = useRef<HTMLVideoElement>(null);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const videoRefs = [video0Ref, video1Ref];

  // Smart lazy-play: only play when in view to save mobile bandwidth and GPU decode resources
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { rootMargin: '150px' }
    );

    videoRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const toggleSound = (idx: number) => {
    const v = videoRefs[idx].current;
    if (!v) return;
    v.muted = !v.muted;
    setMutedStates(prev => {
      const next = [...prev];
      next[idx] = v.muted;
      return next;
    });
  };

  return (
    <section id="videos" style={{ background: 'var(--bg-alt)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 20px' }}>

        <div className="mobile-center-tag" style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
          <span style={{ display:'inline-block', width:24, height:1.5, background:'var(--gold)' }} />
          Tours Virtuais 3D
        </div>
        <h2 className="mobile-center-title" style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight:1.15, color:'var(--text-primary)', marginBottom:10 }}>
          Sinta a experiência <span style={{ fontStyle:'italic', color:'var(--gold)' }}>de estar em casa</span>
        </h2>
        <p className="mobile-center-desc" style={{ fontSize:'0.88rem', color:'var(--text-muted)', marginBottom:36, maxWidth:580 }}>
          Tours 3D contínuos para explorar o enquadramento exterior e a harmonia dos espaços interiores da sua futura moradia.
        </p>

        {/* Side by side video tours */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20 }}>
          {TOURS.map((tour, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: 'hidden',
                background: 'var(--white)',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Video container */}
              <div style={{ position:'relative', aspectRatio:'16/9', background:'#111' }}>
                <video
                  ref={videoRefs[i]}
                  loop
                  muted={mutedStates[i]}
                  playsInline
                  preload="metadata"
                  poster={tour.poster}
                  style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                >
                  <source src={tour.src} type="video/mp4" />
                </video>

                {/* Sound toggle button */}
                <button
                  onClick={() => toggleSound(i)}
                  aria-label={mutedStates[i] ? 'Ativar som' : 'Silenciar'}
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 8,
                    color: '#fff',
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>{mutedStates[i] ? '🔇' : '🔊'}</span>
                  <span>{mutedStates[i] ? 'Ativar Som' : 'Som Ligado'}</span>
                </button>
              </div>

              {/* Caption */}
              <div className="mobile-center-box" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <h3 className="mobile-center-title" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                  {tour.title}
                </h3>
                <p className="mobile-center-desc" style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {tour.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
