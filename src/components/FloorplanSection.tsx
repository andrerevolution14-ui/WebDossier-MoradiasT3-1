'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PLANS = [
  {
    key: 'tecnica',
    label: 'Planta Técnica',
    sub: 'Piso 0 — Área Social + Piso 1 — Zona Privada',
    img: '/images/planta-tecnica.webp',
    areas: [
      { room: 'Sala / Jantar', size: '38,50 m²' },
      { room: 'Cozinha', size: '16,20 m²' },
      { room: 'Master Suite', size: '22,40 m²' },
      { room: 'Quartos 2 e 3', size: '14,80 + 13,90 m²' },
    ],
  },
  {
    key: '3d',
    label: 'Vista 3D',
    sub: 'Volumetria e Implantação no Lote',
    img: '/images/planta-3d.webp',
    areas: [
      { room: 'Área Bruta Privativa (ABP)', size: '~ 180 m²' },
      { room: 'Área Útil Habitável (R/C+P1+Sótão)', size: '~ 146,34 m²' },
      { room: 'Área Dependente Útil', size: '77,65 m²' },
      { room: 'Lote de terreno', size: '~230 m²' },
      { room: 'Classe energética', size: 'A+' },
    ],
  },
];

export default function FloorplanSection() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <section className="section" id="plantas">
        <div className="wrap">

          {/* ── Header ── */}
          <div className="mb-10">
            <div className="section-label mb-2">Plantas & Distribuição</div>
            <h2
              className="serif font-semibold text-[#1a1714] leading-tight"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}
            >
              ~180 m² ABP pensados{' '}
              <span className="serif-italic text-[#7a5c3e]">para si</span>
            </h2>
          </div>

          {/* ── Two plans side by side ── */}
          <div className="grid md:grid-cols-2 gap-6">
            {PLANS.map((plan, idx) => (
              <div key={plan.key} className="bg-white rounded-2xl border border-[#e8dfc9] overflow-hidden shadow-sm">

                {/* Plan label */}
                <div className="px-5 py-4 border-b border-[#e8dfc9] flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#1a1714] text-sm">{plan.label}</div>
                    <div className="text-[#8a7d6f] text-xs mt-0.5">{plan.sub}</div>
                  </div>
                  <button
                    onClick={() => setLightbox(idx)}
                    className="text-[#7a5c3e] text-xs font-medium hover:text-[#4a3f35] transition-colors cursor-pointer"
                  >
                    Ampliar ↗
                  </button>
                </div>

                {/* Plan image */}
                <div
                  className="relative cursor-zoom-in img-hover"
                  style={{ aspectRatio: '4/3' }}
                  onClick={() => setLightbox(idx)}
                >
                  <Image
                    src={plan.img}
                    alt={plan.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-contain p-6"
                  />
                </div>

                {/* Areas list */}
                <div className="px-5 pb-5 divide-y divide-[#f0ead8]">
                  {plan.areas.map((a, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5">
                      <span className="text-[#8a7d6f] text-xs">{a.room}</span>
                      <span className="font-semibold text-[#1a1714] text-sm serif">{a.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Customisation note ── */}
          <div className="mt-8 bg-[#f0ead8] rounded-xl px-6 py-5 border border-[#e8dfc9]">
            <div className="flex items-start gap-4">
              <span className="text-xl flex-shrink-0 mt-0.5">✏️</span>
              <div>
                <div className="font-semibold text-[#1a1714] text-sm mb-1">Personalização total antes do início de obra</div>
                <p className="text-[#8a7d6f] text-xs leading-relaxed max-w-2xl">
                  Cerâmicas, revestimentos, carpintaria, louças sanitárias e cor das fachadas são escolhidos pelo comprador antes do início da obra.
                  Opção <strong className="text-[#4a3f35]">T4</strong> (4.º quarto / escritório independente) também disponível sem alteração de preço.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white w-11 h-11 flex items-center justify-center border border-white/20 rounded-full text-xl"
          >✕</button>
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl p-6"
            style={{ maxHeight: '88vh' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full" style={{ aspectRatio: '4/3' }}>
              <Image
                src={PLANS[lightbox].img}
                alt={PLANS[lightbox].label}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <p className="text-[#8a7d6f] text-sm text-center mt-4">{PLANS[lightbox].label} — {PLANS[lightbox].sub}</p>
          </div>
        </div>
      )}
    </>
  );
}
