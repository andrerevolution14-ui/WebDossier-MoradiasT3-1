'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const PLANS = [
  {
    key: 'piso0',
    label: 'Piso 0 — Área Social',
    img: '/images/planta-tecnica.webp',
    desc: 'Sala de estar e jantar em open space, cozinha com ilha, WC de serviço, zona de arrumação e acesso coberto para 2 viaturas.',
    areas: [
      { room: 'Sala / Jantar', size: '38,50 m²' },
      { room: 'Cozinha (open space)', size: '16,20 m²' },
      { room: 'Garagem coberta', size: '32,00 m²' },
      { room: 'Jardim privado', size: '~120 m²' },
    ],
  },
  {
    key: 'piso1',
    label: 'Piso 1 — Zona Privada',
    img: '/images/plantas3.webp',
    desc: 'Master Suite com closet privativo, dois quartos adicionais com roupeiro embutido e varanda exterior, e casa de banho comum de apoio.',
    areas: [
      { room: 'Master Suite + Closet', size: '22,40 m²' },
      { room: 'Quarto 2 com Varanda', size: '14,80 m²' },
      { room: 'Quarto 3 com Varanda', size: '13,90 m²' },
      { room: 'I.S. + Circulação', size: '18,30 m²' },
    ],
  },
  {
    key: '3d',
    label: 'Vista 3D Volumétrica',
    img: '/images/planta-3d.webp',
    desc: 'Volumetria completa da moradia com estrutura em LSF, cobertura inclinada e integração no lote de ~230 m².',
    areas: [
      { room: 'Área Bruta Privativa (ABP)', size: '~ 180 m²' },
      { room: 'Área Útil Habitável (R/C+P1+Sótão)', size: '~ 146,34 m²' },
      { room: 'Área Dependente Útil', size: '77,65 m²' },
      { room: 'Lote de terreno', size: '~230 m²' },
      { room: 'Classe energética', size: 'A+' },
    ],
  },
];

export default function FloorplanExplorer() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const plan = PLANS[active];

  return (
    <>
      <section className="section bg-[#f0ead8]" id="plantas">
        <div className="wrap">

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left — copy + tabs + areas */}
            <div>
              <div className="section-label mb-3">Plantas & Distribuição</div>
              <h2 className="serif font-semibold text-[#1a1714] leading-tight mb-5"
                  style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)' }}>
                ~180 m² ABP pensados{' '}
                <span className="serif-italic text-[#7a5c3e]">para você</span>
              </h2>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {PLANS.map((p, i) => (
                  <button
                    key={p.key}
                    onClick={() => setActive(i)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active === i
                        ? 'bg-[#1a1714] text-white border-[#1a1714]'
                        : 'bg-transparent text-[#4a3f35] border-[#e8dfc9] hover:border-[#7a5c3e]'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <p className="text-[#4a3f35] text-sm leading-relaxed mb-7">
                {plan.desc}
              </p>

              {/* Areas table */}
              <div className="space-y-2.5 mb-7">
                {plan.areas.map((a, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-[#e8dfc9]">
                    <span className="text-[#8a7d6f] text-sm">{a.room}</span>
                    <span className="font-semibold text-[#1a1714] text-sm serif">{a.size}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-4 border border-[#e8dfc9]">
                <p className="text-xs text-[#8a7d6f] leading-relaxed">
                  <strong className="text-[#4a3f35]">Personalização total:</strong>{' '}
                  Antes de iniciar a obra pode escolher cerâmicas, revestimentos, carpintaria, sanitários e cor das fachadas.
                  Opção T4 (4 quartos / escritório independente) também disponível.
                </p>
              </div>
            </div>

            {/* Right — plan image */}
            <div
              className="relative rounded-2xl overflow-hidden bg-white shadow-md cursor-zoom-in border border-[#e8dfc9] img-hover"
              style={{ aspectRatio: '4/3' }}
              onClick={() => setLightbox(true)}
            >
              <Image
                src={plan.img}
                alt={plan.label}
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-contain p-4"
              />
              <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[11px] px-2.5 py-1 rounded-full">
                Clique para ampliar
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button onClick={() => setLightbox(false)} className="absolute top-5 right-5 text-white/70 hover:text-white text-2xl w-10 h-10 flex items-center justify-center border border-white/20 rounded-full">✕</button>
          <div className="relative w-full max-w-3xl" style={{ aspectRatio: '4/3', maxHeight: '80vh' }} onClick={e => e.stopPropagation()}>
            <Image src={plan.img} alt={plan.label} fill className="object-contain" />
          </div>
        </div>
      )}
    </>
  );
}
