'use client';
import React, { useState } from 'react';
import Image from 'next/image';

/* ─── Gallery — 12 curated images, uniform 4:3 rectangles ────────────────── */
const ALL_IMAGES = [
  { src: '/images/exterior-capa.webp',              label: 'Fachada Principal & Entrada' },
  { src: '/images/exterior-traseiro-completo.webp', label: 'Jardim & Fachada Traseira' },
  { src: '/images/sala-de-jantar.webp',             label: 'Sala de Jantar & Estar' },
  { src: '/images/cozinha.webp',                   label: 'Cozinha Open Space' },
  { src: '/images/quarto-cama.webp',                label: 'Quarto Suite Principal' },
  { src: '/images/exterior-barbecue.webp',          label: 'Área Exterior & Barbecue' },
  { src: '/images/quarto-varanda.webp',             label: 'Quarto com Varanda' },
  { src: '/images/quarto-porta.webp',               label: 'Zona dos Quartos' },
  { src: '/images/corredor-quartos.webp',           label: 'Corredor Piso 1' },
  { src: '/images/terceiro-andar.webp',             label: 'Sótão Amplo (~34 m² úteis)' },
  { src: '/images/wc-f2.webp',                     label: 'Casa de Banho Completa' },
  { src: '/images/exterior-traseiro.webp',          label: 'Jardim Privativo de ~82 m²' },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section id="galeria" style={{ background: 'var(--bg)', padding: '56px 0' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 16px' }}>

          {/* Header */}
          <div className="mobile-center-tag" style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', justifyContent: 'center', margin: '0 auto 14px', gap:10 }}>
            <span style={{ display:'inline-block', width:24, height:1.5, background:'var(--gold)' }} />
            Galeria Fotográfica &amp; Renders
          </div>
          <h2 className="mobile-center-title" style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'clamp(1.7rem, 3.5vw, 2.6rem)', lineHeight:1.15, color:'var(--text-primary)', margin: '0 auto 10px', textAlign: 'center' }}>
            Conheça cada detalhe do seu futuro lar.
          </h2>
          <p className="mobile-center-desc" style={{ fontSize:'0.88rem', color:'var(--text-muted)', margin: '0 auto 32px', textAlign: 'center' }}>
            Clique em qualquer fotografia para abrir a galeria em ecrã inteiro.
          </p>

          {/* ── Perfect uniform rectangle grid: 3 cols desktop, 2 cols mobile (12 items) ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 14,
          }}>
            {ALL_IMAGES.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i)}
                style={{
                  position: 'relative',
                  aspectRatio: '4/3',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#EAE6DD',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />
                {/* Label overlay */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'32px 14px 12px', background:'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}>
                  <span style={{ color:'#fff', fontSize:'0.8rem', fontWeight:600, textShadow:'0 1px 3px rgba(0,0,0,0.5)' }}>{img.label}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(10,9,8,0.95)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:20 }}
             onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)}
            style={{ position:'absolute', top:20, right:20, background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8, color:'#fff', width:44, height:44, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.1rem', cursor:'pointer' }}>
            ✕
          </button>
          {lightbox > 0 && (
            <button onClick={e=>{e.stopPropagation();setLightbox(l=>(l??0)-1)}}
              style={{ position:'absolute', left:16, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8, color:'#fff', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', cursor:'pointer' }}>
              ‹
            </button>
          )}
          {lightbox < ALL_IMAGES.length - 1 && (
            <button onClick={e=>{e.stopPropagation();setLightbox(l=>(l??0)+1)}}
              style={{ position:'absolute', right:16, top:'50%', transform:'translateY(-50%)', background:'rgba(255,255,255,0.12)', border:'1px solid rgba(255,255,255,0.25)', borderRadius:8, color:'#fff', width:48, height:48, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', cursor:'pointer' }}>
              ›
            </button>
          )}
          <div style={{ position:'relative', width:'100%', maxWidth:920, maxHeight:'80vh', aspectRatio:'4/3' }} onClick={e=>e.stopPropagation()}>
            <Image src={ALL_IMAGES[lightbox].src} alt={ALL_IMAGES[lightbox].label} fill style={{ objectFit:'contain' }} sizes="100vw" priority />
          </div>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.85rem', marginTop:14 }}>
            {lightbox+1} de {ALL_IMAGES.length} · {ALL_IMAGES[lightbox].label}
          </p>
        </div>
      )}
    </>
  );
}
