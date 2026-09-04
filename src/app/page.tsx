import React from 'react';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import VideoSection from '@/components/VideoSection';
import FloorplansSection from '@/components/FloorplansSection';
import LocationSection from '@/components/LocationSection';
import CreditSection from '@/components/CreditSection';
import ProcessSection from '@/components/ProcessSection';
import EquitySection from '@/components/EquitySection';
import ManagerSection from '@/components/ManagerSection';
import FloatingBar from '@/components/FloatingBar';
import { WA_VISIT } from '@/components/SiteHeader';

export default function HomePage() {
  return (
    <>
      {/* ─── 0. TOP NAVIGATION ─────────────────────────────────── */}
      <SiteHeader />

      <main>
        {/*
          HIGH-CONVERTING FAMILY-FOCUSED SEQUENCE (Curated Digital Dossier):
          ──────────────────────────────────────────────────────────────────
          1. Hero + Presentation Video (Sound on, plays once, family copy)
          2. Gallery (Curated 12 photos in perfect 4:3 rectangular grid)
          3. 3D Video Tours (Exterior garden & Interior living spaces)
          4. Floor Plans (Technical + 3D side-by-side, all exact ~ areas)
          5. Location (Rua Acácio Simões Vieira, 25 on Google Maps)
          6. Credit Viability (100% Free test with certified credit intermediary)
          7. Turnkey Process (3 clear steps with protected deposit)
          8. Financial Conditions & Tax Savings (Family safety & equity)
          9. Dedicated Manager (André Queirós + Terrain visit WhatsApp)
        */}

        {/* 1 ── HERO & PRESENTATION VIDEO */}
        <HeroSection />

        <div className="divider" />

        {/* 2 ── PHOTO GALLERY */}
        <GallerySection />

        <div className="divider" />

        {/* 3 ── 3D VIDEO TOURS */}
        <VideoSection />

        <div className="divider" />

        {/* 4 ── FLOOR PLANS (Technical + 3D side by side) */}
        <FloorplansSection />

        <div className="divider" />

        {/* 5 ── LOCATION & MAP */}
        <LocationSection />

        <div className="divider" />

        {/* 6 ── FREE CREDIT INTERMEDIARY VIABILITY TEST */}
        <CreditSection />

        <div className="divider" />

        {/* 7 ── TURNKEY 3-STEP ACQUISITION PROCESS */}
        <ProcessSection />

        <div className="divider" />

        {/* 8 ── FINANCIAL CONDITIONS, EQUITY & TAX SAVINGS */}
        <EquitySection />

        {/* 9 ── MANAGER & FINAL CTA */}
        <ManagerSection />

        {/* ── FOOTER ── */}
        <footer style={{ background: 'var(--bg-alt)', padding: '48px 0 36px', borderTop: '1px solid var(--border)' }}>
          <div className="wrap" style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 6 }}>
              Domaine XXV
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 24 }}>
              Rua Acácio Simões Vieira (Lote 25) · 3810-843 Oliveirinha · Aveiro
            </div>

            <a
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ display: 'inline-flex', fontSize: '0.92rem', marginBottom: 32 }}
            >
              <span>💬</span> Agendar Visita ao Terreno no WhatsApp
            </a>

            <div className="divider" style={{ marginBottom: 24 }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
              © {new Date().getFullYear()} Domaine XXV · Silvermont Capital & Positive Project.<br />
              Dossier digital informativo de apresentação do projeto da Moradia T3 em Oliveirinha.
            </p>
          </div>
        </footer>
      </main>

      {/* ─── FIXED BOTTOM BAR (Always accessible) ───────────────── */}
      <FloatingBar />
    </>
  );
}
