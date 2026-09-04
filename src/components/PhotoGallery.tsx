'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const GALLERY = [
  { src: '/images/exterior-capa.webp', thumb: '/images/exterior-capa-thumb.webp', label: 'Fachada Principal', caption: 'Fachada principal em LSF — linha contemporânea com ripados decorativos e envidraçados de piso a teto.' },
  { src: '/images/exterior-traseiro-completo.webp', thumb: '/images/exterior-traseiro-completo-thumb.webp', label: 'Jardim & Traseiras', caption: 'Jardim privado com ~120 m² — espaço de convívio, refeições ao ar livre e opção de piscina.' },
  { src: '/images/sala-jantar.webp', thumb: '/images/sala-jantar-thumb.webp', label: 'Sala de Estar', caption: 'Open space integrado de sala e jantar com luz zenital e acesso direto ao jardim.' },
  { src: '/images/cozinha.webp', thumb: '/images/cozinha-thumb.webp', label: 'Cozinha', caption: 'Cozinha com ilha, eletrodomésticos embutidos e bancadas em composto nobre.' },
  { src: '/images/quarto-cama.webp', thumb: '/images/quarto-cama-thumb.webp', label: 'Master Suite', caption: 'Quarto principal com closet privativo, acabamentos personalizáveis e excelente exposição solar.' },
  { src: '/images/quarto-varanda.webp', thumb: '/images/quarto-varanda-thumb.webp', label: 'Quarto com Varanda', caption: 'Quarto do Piso 1 com varanda privativa e guarda-corpos em vidro temperado.' },
];

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState<{ src: string; caption: string } | null>(null);

  return (
    <>
      <section className="section" id="galeria">
        <div className="wrap">

          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="section-label mb-2">Galeria</div>
              <h2 className="serif font-semibold text-[#1a1714] leading-tight"
                  style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
                Renders 3D{' '}
                <span className="serif-italic text-[#7a5c3e]">do projeto</span>
              </h2>
            </div>
            <p className="hidden md:block text-sm text-[#8a7d6f] max-w-xs text-right leading-relaxed">
              Visualize cada espaço antes de existir. Clique nas imagens para ampliar.
            </p>
          </div>

          {/* Grid — 1 large hero + 2 columns right */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Large feature image */}
            <div
              className="col-span-2 md:col-span-2 row-span-2 relative rounded-xl overflow-hidden img-hover cursor-pointer shadow-sm"
              style={{ aspectRatio: '16/11' }}
              onClick={() => setLightbox({ src: GALLERY[0].src, caption: GALLERY[0].caption })}
            >
              <Image src={GALLERY[0].thumb} alt={GALLERY[0].label} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/55 to-transparent">
                <span className="text-white text-xs font-medium">{GALLERY[0].label}</span>
              </div>
            </div>

            {/* Small images on right */}
            {GALLERY.slice(1, 5).map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl overflow-hidden img-hover cursor-pointer shadow-sm"
                style={{ aspectRatio: i < 2 ? '4/3' : '4/3' }}
                onClick={() => setLightbox({ src: img.src, caption: img.caption })}
              >
                <Image src={img.thumb} alt={img.label} fill sizes="(max-width: 768px) 50vw, 300px" className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/55 to-transparent">
                  <span className="text-white text-xs font-medium">{img.label}</span>
                </div>
              </div>
            ))}

            {/* Last full-width image */}
            <div
              className="col-span-2 md:col-span-3 relative rounded-xl overflow-hidden img-hover cursor-pointer shadow-sm"
              style={{ aspectRatio: '21/7' }}
              onClick={() => setLightbox({ src: GALLERY[5].src, caption: GALLERY[5].caption })}
            >
              <Image src={GALLERY[5].thumb} alt={GALLERY[5].label} fill sizes="100vw" className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/55 to-transparent">
                <span className="text-white text-xs font-medium">{GALLERY[5].label}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl font-light w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:border-white/50 transition-colors"
            aria-label="Fechar"
          >✕</button>
          <div
            className="relative max-w-4xl w-full"
            style={{ maxHeight: '78vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ aspectRatio: '16/10', maxHeight: '72vh' }}>
              <Image src={lightbox.src} alt="" fill className="object-contain" />
            </div>
            {lightbox.caption && (
              <p className="text-white/70 text-sm text-center mt-4 leading-relaxed">
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
