import React from 'react';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import TriangleSection from '@/components/TriangleSection';
import GallerySection from '@/components/GallerySection';
import LocationSection from '@/components/LocationSection';
import EquitySection from '@/components/EquitySection';
import FloorplansSection from '@/components/FloorplansSection';
import ProcessoSimplificado from '@/components/ProcessoSimplificado';
import FaqSection from '@/components/FaqSection';
import IvaExplanationSection from '@/components/IvaExplanationSection';
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
          SEQUÊNCIA OTIMIZADA MOBILE-FIRST (Preço logo após o Mapa):
          ─────────────────────────────────────────────────────────────
          1. Hero Section                 → Atenção, qualificação imediata & vídeo
          2. O Triângulo de Aveiro        → Análise de mercado & dor do comprador
          3. Galeria de Fotos             → Desejo visual
          4. Localização & Mapa           → Prova de proximidade imediata (8 min)
          5. Preço & Ganho Patrimonial    → Ancoragem racional (abaixo do mapa)
          6. Plantas & Parâmetros         → Validação racional e áreas
          7. Processo Simples & Sem Risco → 3 passos sem burocracia nem derrapes
          8. FAQs / Resposta a Objeções   → Destruição de dúvidas
          9. Reembolso do IVA             → Justificação do preço e estrutura fiscal
          10. Perfil & Fecho Agressivo    → André Queirós / Freitas Renovações Lda.
        */}

        {/* 1 ── HERO SECTION */}
        <HeroSection />

        {/* 2 ── O TRIÂNGULO IMPOSSÍVEL DE AVEIRO */}
        <TriangleSection />

        {/* 3 ── GALERIA DE FOTOS */}
        <div className="divider" />
        <GallerySection />

        {/* 4 ── LOCALIZAÇÃO & MAPA */}
        <div className="divider" />
        <LocationSection />

        {/* 5 ── PREÇO TRANSPARENTE E GANHO PATRIMONIAL (Abaixo do Mapa) */}
        <div className="divider" />
        <EquitySection />

        {/* 6 ── PLANTAS & PARÂMETROS TÉCNICOS */}
        <div className="divider" />
        <FloorplansSection />

        {/* 7 ── PROCESSO SIMPLES & SEM RISCO */}
        <div className="divider" />
        <ProcessoSimplificado />

        {/* 8 ── FAQS / RESPOSTA A OBJEÇÕES */}
        <div className="divider" />
        <FaqSection />

        {/* 9 ── O REEMBOLSO DO IVA & JUSTIFICAÇÃO DE PREÇO */}
        <div className="divider" />
        <IvaExplanationSection />

        {/* 10 ── PERFIL & FECHO AGRESSIVO */}
        <div className="divider" />
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
              id="footer_verificar_viabilidade"
              data-source="footer_verificar_viabilidade"
              href={WA_VISIT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ display: 'inline-flex', fontSize: '0.92rem', marginBottom: 32 }}
            >
              <span>💬</span> Agendar Visita no WhatsApp
            </a>

            <div className="divider" style={{ marginBottom: 24 }} />
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 620, margin: '0 auto' }}>
              © {new Date().getFullYear()} Domaine XXV · Em parceria com Freitas Renovações Lda.<br />
              Dossier digital informativo de apresentação do projeto da Moradia em Oliveirinha.
            </p>
          </div>
        </footer>
      </main>

      {/* ─── FIXED BOTTOM BAR (Sticky Footer Mobile First) ─────── */}
      <FloatingBar />
    </>
  );
}
