'use client';

import React from 'react';

// Single auto-playing video block — placed contextually across the page
export default function VideoBlock({
  src,
  poster,
  label,
  sub,
  id,
}: {
  src: string;
  poster: string;
  label: string;
  sub: string;
  id?: string;
}) {
  return (
    <section className="section-sm" id={id ?? `video-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="wrap">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="section-label">{sub}</span>
          <div className="h-px flex-1 bg-[#e8dfc9]" />
        </div>

        {/* Cinematic player */}
        <div
          className="relative rounded-2xl overflow-hidden bg-[#111] shadow-2xl"
          style={{ aspectRatio: '16/9' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={poster}
            className="w-full h-full object-cover"
            preload="none"
          >
            <source src={src} type="video/mp4" />
          </video>

          {/* Bottom label bar */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div>
              <div className="text-white/55 text-[11px] uppercase tracking-widest font-medium mb-0.5">{sub}</div>
              <div className="serif text-white font-semibold text-lg">{label}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
