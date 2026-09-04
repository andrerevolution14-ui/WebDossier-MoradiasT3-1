'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GALLERY_ITEMS } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function GalleryLightbox() {
  const [activeItem, setActiveItem] = useState<{ full: string; caption: string } | null>(null);

  const openLightbox = (item: { full: string; caption: string }) => {
    setActiveItem(item);
    trackEvent('gallery_lightbox_opened', { caption: item.caption });
  };

  const closeLightbox = () => {
    setActiveItem(null);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {GALLERY_ITEMS.map((item, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(item)}
            className="group relative rounded-xl overflow-hidden aspect-[4/3] cursor-pointer border border-white/10 bg-[#0e1219]"
          >
            <Image
              src={item.thumb}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 260px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-[10px] sm:text-xs text-white font-medium bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/30 rounded-full w-10 h-10 flex items-center justify-center text-lg z-50 cursor-pointer"
            aria-label="Fechar galeria"
          >
            ✕
          </button>

          <div
            onClick={e => e.stopPropagation()}
            className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center"
          >
            <div className="relative w-full aspect-[16/10] max-h-[72vh]">
              <Image
                src={activeItem.full}
                alt={activeItem.caption}
                fill
                sizes="(max-width: 1200px) 100vw, 1000px"
                className="object-contain"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 text-center px-4 max-w-xl">
              {activeItem.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
