'use client';
import React, { useState } from 'react';
import Image from 'next/image';

/* ─── Floor Plans — Technical & 3D side by side (no tabs) ─────────────────── */
const PLANTA_TECNICA = '/images/planta-tecnica.webp';
const PLANTA_3D = '/images/planta-3d.webp';
const PLANTA_TECNICA_FALLBACK = '/Planta-tecnica.png';
const PLANTA_3D_FALLBACK = '/planta-3d.png';

const ROOMS = [
  // Piso 0
  { area: 'Cozinha e sala open space',        size: '~20 m²',  floor: 0 },
  { area: 'Sala de jantar',                    size: '~15 m²',  floor: 0 },
  { area: 'Garagem coberta',                   size: '~30 m²',  floor: 0 },
  { area: 'Garagem e espaço exterior frente',  size: '~30 m²',  floor: 0 },
  { area: 'Jardim traseiro privativo',         size: '~82 m²',  floor: 0 },
  { area: 'Anexo',                             size: '~19 m²',  floor: 0 },
  { area: 'Casa de banho de serviço',          size: '~2 m²',   floor: 0 },
  // Piso 1
  { area: 'Quarto suite',                      size: '~15 m²',  floor: 1 },
  { area: 'Casa de banho suite',               size: '~4,8 m²', floor: 1 },
  { area: 'Quarto 1',                          size: '~14 m²',  floor: 1 },
  { area: 'Quarto 2',                          size: '~11 m²',  floor: 1 },
  { area: 'Casa de banho completa',            size: '~7 m²',   floor: 1 },
  // Sótão
  { area: 'Sótão (área útil com altura 1,90 m)', size: '~34 m²', floor: 2 },
];

export default function FloorplansSection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [tecnicaSrc, setTecnicaSrc] = useState(PLANTA_TECNICA);
  const [d3Src, setD3Src] = useState(PLANTA_3D);

  const PLANS = [
    {
      src: tecnicaSrc,
      fallback: PLANTA_TECNICA_FALLBACK,
      onError: () => setTecnicaSrc(PLANTA_TECNICA_FALLBACK),
      label: 'Planta Técnica de Arquitetura',
      sub: 'Piso 0 (Área Social) + Piso 1 (Zona Privada) + Sótão',
    },
    {
      src: d3Src,
      fallback: PLANTA_3D_FALLBACK,
      onError: () => setD3Src(PLANTA_3D_FALLBACK),
      label: 'Planta 3D Humanizada',
      sub: 'Volumetria, Distribuição e Enquadramento Exterior',
    },
  ];

  return (
    <>
      <section id="plantas" style={{ background: 'var(--bg)', padding: '72px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 16px' }}>

          {/* Header */}
          <div className="mobile-center-tag" style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <span style={{ display:'inline-block', width:24, height:1.5, background:'var(--gold)' }} />
            Plantas & Distribuição
          </div>
          <h2 className="mobile-center-title" style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'clamp(1.65rem, 4vw, 2.6rem)', lineHeight:1.15, color:'var(--text-primary)', marginBottom:10 }}>
            185 m² pensados <span style={{ fontStyle:'italic', color:'var(--gold)' }}>para a sua família</span>
          </h2>
          <p className="mobile-center-desc" style={{ fontSize:'0.88rem', color:'var(--text-body)', lineHeight:1.65, maxWidth:540, marginBottom:36 }}>
            Divisões bem iluminadas e integradas, jardim amplo para as crianças e sótão aproveitável.
            Toque nas plantas para ampliar em alta definição.
          </p>

          {/* ── Two plans side by side ── */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:20, marginBottom:40 }}>
            {PLANS.map((plan) => (
              <div key={plan.label} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', boxShadow:'0 4px 16px rgba(0,0,0,0.05)' }}>
                {/* Plan header */}
                <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', background:'var(--bg-alt)' }}>
                  <div>
                    <div style={{ fontWeight:700, fontSize:'0.92rem', color:'var(--text-primary)' }}>{plan.label}</div>
                    <div style={{ fontSize:'0.73rem', color:'var(--text-muted)', marginTop:2 }}>{plan.sub}</div>
                  </div>
                  <button
                    onClick={() => setLightbox(plan.src)}
                    style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:7, padding:'6px 12px', fontSize:'0.74rem', fontWeight:600, color:'var(--gold)', cursor:'pointer' }}
                  >
                    Ampliar ↗
                  </button>
                </div>
                {/* Image container */}
                <div
                  style={{ position:'relative', aspectRatio:'4/3', cursor:'zoom-in', background:'#fff', minHeight: 260 }}
                  onClick={() => setLightbox(plan.src)}
                >
                  <Image
                    src={plan.src}
                    alt={plan.label}
                    fill
                    unoptimized
                    priority
                    onError={plan.onError}
                    sizes="(max-width: 768px) 100vw, 560px"
                    style={{ objectFit:'contain', padding: 12 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Specifications table ── */}
          <div style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:14, overflow:'hidden', boxShadow:'0 2px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--border)', background:'var(--bg-alt)', display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:'1.1rem' }}>📐</span>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.9rem', color:'var(--text-primary)' }}>Distribuição de Áreas por Piso</div>
                <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', marginTop:1 }}>Todas as áreas indicadas com símbolo aproximado (~) conforme projeto de arquitetura</div>
              </div>
            </div>

            {/* Floors grouped */}
            {[
              { label: 'Piso 0 — Área Social, Exterior & Estacionamento', emoji: '🏡', floors: ROOMS.filter(r => r.floor === 0) },
              { label: 'Piso 1 — Zona Privada dos Quartos',               emoji: '🛏️', floors: ROOMS.filter(r => r.floor === 1) },
              { label: 'Sótão Aproveitável',                              emoji: '🔺', floors: ROOMS.filter(r => r.floor === 2) },
            ].map((group, gi) => (
              <div key={gi}>
                <div style={{ padding:'10px 18px', background: gi % 2 === 0 ? 'var(--bg)' : 'var(--bg-alt)', borderBottom:'1px solid var(--border)', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', gap:8 }}>
                  <span>{group.emoji}</span> {group.label}
                </div>
                {group.floors.map((r, i) => (
                  <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'11px 18px', borderBottom:'1px solid var(--border)', background: i % 2 === 0 ? 'var(--white)' : 'var(--bg)' }}>
                    <span style={{ fontSize:'0.84rem', color:'var(--text-body)' }}>{r.area}</span>
                    <span style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'0.92rem', color:'var(--text-primary)', flexShrink:0, marginLeft:12 }}>{r.size}</span>
                  </div>
                ))}
              </div>
            ))}

            {/* Total */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 18px', background:'var(--bg-alt)', borderTop:'2px solid var(--border)' }}>
              <span style={{ fontSize:'0.9rem', fontWeight:700, color:'var(--text-primary)' }}>Área Útil Total Estimada</span>
              <span style={{ fontFamily:'var(--serif)', fontWeight:700, fontSize:'1.1rem', color:'var(--gold)' }}>~185 m²</span>
            </div>
          </div>

          {/* Customisation note */}
          <div style={{ marginTop:16, background:'var(--gold-pale)', border:'1px solid #E8D4AE', borderRadius:10, padding:'14px 18px' }}>
            <div style={{ fontSize:'0.82rem', fontWeight:700, color:'#7A5C28', marginBottom:4 }}>✏️ Personalização à medida da sua família</div>
            <p style={{ fontSize:'0.82rem', color:'#7A5C28', lineHeight:1.55, margin:0 }}>
              Pode escolher cerâmicas, pavimentos, carpintarias, loiças de casa de banho e a disposição dos armários antes do início da construção. Existe também a flexibilidade de adaptar o espaço para tipologia T4 (quarto quarto ou escritório).
            </p>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(10,9,8,0.95)', display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}
             onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            style={{ position:'absolute', top:16, right:16, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8, color:'#fff', width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', cursor:'pointer' }}>
            ✕
          </button>
          <div style={{ background:'#fff', borderRadius:16, padding:16, width:'100%', maxWidth:850, maxHeight:'90vh' }}
               onClick={e => e.stopPropagation()}>
            <div style={{ position:'relative', aspectRatio:'4/3' }}>
              <Image src={lightbox} alt="Planta" fill unoptimized style={{ objectFit:'contain' }} sizes="100vw" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
