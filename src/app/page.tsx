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
import ManagerSection from '@/components/ManagerSection';
import SocialProofSection from '@/components/SocialProofSection';
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
          SEQUÊNCIA OTIMIZADA:
          ─────────────────────────────────────────────────────────────
          1. Hero Section                 → Qualificação e apresentação imediata
          2. Galeria de Imagens 3D        → Desejo visual do projeto aprovado
          3. O Triângulo de Aveiro        → Análise de mercado & oportunidade
          4. Localização & Mapa           → Prova de proximidade imediata (8 min)
          5. Condições & Valores          → 335.000€ chave na mão com impostos incluídos
          6. Plantas & Parâmetros         → Áreas habitáveis e sótão
          7. O Processo Explicado         → Terreno em seu nome + crédito à construção faseado
          8. Licenciamento & Obras Reais  → Câmara de Aveiro, Grupo Freitas e obras concluídas
          9. FAQs / Perguntas Frequentes  → Dúvidas claras sobre compra e financiamento
          10. Perfil & Contacto Direto    → André Queirós / Interlocutor único
        */}

        {/* 1 ── HERO SECTION */}
        <HeroSection />

        {/* 2 ── GALERIA DE IMAGENS 3D */}
        <GallerySection />

        {/* 3 ── O TRIÂNGULO DE AVEIRO */}
        <div className="divider" />
        <TriangleSection />

        {/* 4 ── LOCALIZAÇÃO & MAPA */}
        <div className="divider" />
        <LocationSection />

        {/* 5 ── CONDIÇÕES & VALORES CLAROS */}
        <div className="divider" />
        <EquitySection />

        {/* 6 ── PLANTAS & PARÂMETROS TÉCNICOS */}
        <div className="divider" />
        <FloorplansSection />

        {/* 7 ── PROCESSO EXPLICADO: CRÉDITO À CONSTRUÇÃO */}
        <div className="divider" />
        <ProcessoSimplificado />

        {/* 8 ── LICENCIAMENTO & OBRAS EXECUTADAS */}
        <div className="divider" />
        <SocialProofSection />

        {/* 9 ── FAQS / RESPOSTA A DÚVIDAS */}
        <div className="divider" />
        <FaqSection />

        {/* 10 ── PERFIL & CONTACTO */}
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
