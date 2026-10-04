'use client';
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
import SiteFooter from '@/components/SiteFooter';
import { LeadModalProvider } from '@/components/LeadModal';
import ExitIntentModal from '@/components/ExitIntentModal';

export default function HomePage() {
  return (
    <LeadModalProvider>
      {/* ─── EXIT INTENT POPUP ─────────────────────────────────── */}
      <ExitIntentModal />
      {/* ─── 0. TOP NAVIGATION ─────────────────────────────────── */}
      <SiteHeader />

      <main>
        {/*
          SEQUÊNCIA OTIMIZADA MOBILE-FIRST (Preço logo após o Mapa):
          ─────────────────────────────────────────────────────────────
          1. Hero Section                 → Atenção, qualificação imediata & vídeo
          2. Galeria de Fotos             → Desejo visual
          3. O Triângulo de Aveiro        → Análise de mercado & dor do comprador
          4. Localização & Mapa           → Prova de proximidade imediata (8 min)
          5. Preço & Ganho Patrimonial    → Ancoragem racional (335k c/ IMT e Selo)
          6. Plantas & Parâmetros         → Validação racional e áreas
          7. Processo Simples & Sem Risco → 3 passos sem burocracia nem derrapes
          8. FAQs / Resposta a Objeções   → Destruição de dúvidas
          9. O Reembolso do IVA           → Justificação das 2 formas e impostos
          10. Perfil & Fecho Agressivo    → André Queirós / Freitas Renovações Lda.
        */}

        {/* 1 ── HERO SECTION */}
        <HeroSection />

        {/* 2 ── GALERIA DE FOTOS */}
        <GallerySection />

        {/* 3 ── O TRIÂNGULO IMPOSSÍVEL DE AVEIRO */}
        <div className="divider" />
        <TriangleSection />

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

        {/* 9 ── O REEMBOLSO DO IVA & AS 2 FORMAS */}
        <div className="divider" />
        <IvaExplanationSection />

        {/* 10 ── PERFIL & FECHO */}
        <div className="divider" />
        <ManagerSection />

        {/* ── FOOTER ── */}
        <SiteFooter />
      </main>

      {/* ─── FIXED BOTTOM BAR (Sticky Footer Mobile First) ─────── */}
      <FloatingBar />
    </LeadModalProvider>
  );
}
