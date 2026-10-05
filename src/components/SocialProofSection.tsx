'use client';
import React, { useState } from 'react';
import { useLeadModal } from '@/components/LeadModal';

export default function SocialProofSection() {
  const { openLeadModal } = useLeadModal();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const COMPLETED_WORKS = [
    {
      src: '/Social Proof/Depois WC.jpeg',
      title: 'Casas de Banho de Alto Padrão',
      desc: 'Louças suspensas, torneiras embutidas, cerâmicos retificados e nichos com iluminação LED.',
      tag: 'Obra Concluída',
    },
    {
      src: '/Social Proof/Depois Q1 Solo.jpeg',
      title: 'Quartos e Pavimentos Térmicos',
      desc: 'Isolamento de elevada eficiência, carpintarias lacadas a branco e sancas de iluminação indireta.',
      tag: 'Obra Concluída',
    },
    {
      src: '/Social Proof/WhatsApp Image 2026-09-12 at 22.16.56 (3).jpeg',
      title: 'Rigor Estrutural & Alvenarias',
      desc: 'Fiscalização contínua e controlo rigoroso de materiais de betão e isolamentos térmicos/acústicos.',
      tag: 'Em Execução',
    },
    {
      src: '/Social Proof/WhatsApp Image 2026-09-12 at 22.16.57 (3).jpeg',
      title: 'Instalações Especiais Certificadas',
      desc: 'Redes de climatização, águas e eletricidade executadas segundo as normas europeias mais exigentes.',
      tag: 'Em Execução',
    },
  ];

  return (
    <section
      id="autoridade"
      style={{
        background: '#0a0b0e',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(44px, 5.5vw, 64px) 0',
        position: 'relative',
        scrollMarginTop: 80,
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 16px' }}>

        {/* ── HEADER CENTRADO ── */}
        <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 28px' }}>
          <div className="section-tag" style={{ margin: '0 auto 10px', display: 'inline-block' }}>
            Autoridade, Licenciamento &amp; Prova Real
          </div>
          <h2
            className="heading"
            style={{
              color: '#FFFFFF',
              margin: '0 auto 10px',
              fontSize: 'clamp(1.75rem, 3.8vw, 2.45rem)',
              lineHeight: 1.18,
            }}
          >
            Construção certificada,{' '}
            <span style={{ color: 'var(--gold-light)' }}>
              projeto aprovado e obras reais executadas.
            </span>
          </h2>
          <p
            style={{
              fontSize: 'clamp(0.88rem, 1.8vw, 0.98rem)',
              color: 'rgba(255, 255, 255, 0.74)',
              lineHeight: 1.6,
              maxWidth: 660,
              margin: '0 auto',
            }}
          >
            O Domaine XXV conta com aprovação municipal da Câmara de Aveiro e construção oficial pelo Grupo Freitas Renovações, com alvará ativo e obras de referência concluídas.
          </p>
        </div>

        {/* ── 1. LOGOS OFICIAIS CENTRADOS (FREITAS C/ FUNDO PRETO + CÂMARA DE AVEIRO) ── */}
        <div
          style={{
            maxWidth: 880,
            margin: '0 auto 36px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            alignItems: 'stretch',
          }}
        >
          {/* Logo 1: Grupo Freitas Renovações (FUNDO PRETO PURO PARA DESTACAR LOGO BRANCO) */}
          <div
            style={{
              background: '#000000',
              border: '1.5px solid rgba(184, 146, 74, 0.45)',
              borderRadius: 14,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
              transition: 'border-color 0.2s',
            }}
          >
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--gold-light)',
                background: 'rgba(184, 146, 74, 0.15)',
                padding: '3px 10px',
                borderRadius: 4,
                marginBottom: 16,
              }}
            >
              Construtora Oficial Certificada
            </span>

            {/* Container fundo preto com logo branco em alta visibilidade e tamanho maior */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 240,
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
                padding: '6px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Social Proof/Logo freitas.png"
                alt="Grupo Freitas Renovações Lda — Construtora Oficial"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 8px rgba(255,255,255,0.1))',
                }}
              />
            </div>

            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
              Grupo Freitas Renovações
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: '0 0 12px' }}>
              Mais de 15 anos de excelência em construção e remodelações de luxo no distrito de Aveiro.
            </p>
            <a
              href="https://grupofreitasrenovacoes.pt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.76rem',
                fontWeight: 700,
                color: 'var(--gold-light)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span>Ver Portfólio da Construtora</span>
              <span>↗</span>
            </a>
          </div>

          {/* Logo 2: Câmara Municipal de Aveiro */}
          <div
            style={{
              background: '#0d0f14',
              border: '1.5px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 14,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            }}
          >
            <span
              style={{
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#7DC4A0',
                background: 'rgba(61, 122, 88, 0.18)',
                padding: '3px 10px',
                borderRadius: 4,
                marginBottom: 16,
              }}
            >
              Aprovação &amp; Licenciamento Municipal
            </span>

            {/* Container do logo da câmara em destaque maior */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 220,
                height: 72,
                background: '#FFFFFF',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 14,
                padding: '8px 14px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Social Proof/Camara Aveiro Logo.png"
                alt="Câmara Municipal de Aveiro — Projeto Aprovado"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#FFFFFF', marginBottom: 4 }}>
              Município de Aveiro
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: '0 0 12px' }}>
              Processo de arquitetura aprovado em Oliveirinha, com conformidade urbanística integral.
            </p>
            <span style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
              ✓ Alvará &amp; Projeto Aprovado
            </span>
          </div>
        </div>

        {/* ── 2. GALERIA DE OBRAS REAIS (MAIORES E COM MAIS QUALIDADE) ── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <div style={{ fontSize: '0.70rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 4 }}>
              Qualidade Construtiva Comprovada
            </div>
            <h3 style={{ fontSize: '1.28rem', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
              Acabamentos Reais das Nossas Obras em Aveiro
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)', margin: '4px 0 0' }}>
              Toque em qualquer fotografia para ampliar em ecrã inteiro
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 16,
            }}
          >
            {COMPLETED_WORKS.map((work, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(work.src)}
                style={{
                  background: '#12141a',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'zoom-in',
                  transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Imagem com altura generosa e alta qualidade */}
                <div style={{ position: 'relative', width: '100%', height: 240, background: '#000' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={encodeURI(work.src)}
                    alt={work.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(5, 7, 10, 0.85)',
                      backdropFilter: 'blur(6px)',
                      color: 'var(--gold-light)',
                      border: '1px solid rgba(184, 146, 74, 0.5)',
                      padding: '4px 9px',
                      borderRadius: 4,
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {work.tag}
                  </span>
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 10,
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      padding: '2px 8px',
                      borderRadius: 4,
                      fontSize: '0.64rem',
                      fontWeight: 500,
                    }}
                  >
                    🔍 Ampliar
                  </span>
                </div>

                <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: '0.90rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                    {work.title}
                  </div>
                  <p style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45, margin: 0 }}>
                    {work.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. 4 PILARES DE SEGURANÇA E RIGOR CENTRADOS ── */}
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto 28px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 12,
          }}
        >
          {[
            {
              icon: '🛡️',
              title: 'Sinal 10% 100% Protegido',
              desc: 'Cláusula expressa no CPCV com devolução integral dos 33.500€ se o banco não aprovar o crédito.',
            },
            {
              icon: '🔒',
              title: '335.000€ Chave-na-Mão',
              desc: 'IMT e Imposto de Selo já incluídos no preço contratual. Zero derrapes ou custos surpresa.',
            },
            {
              icon: '⏱️',
              title: 'Prazo Fixo de 10 Meses',
              desc: 'Data de entrega contratada com penalização diária à construtora em caso de atraso.',
            },
            {
              icon: '📸',
              title: 'Acompanhamento Semanal',
              desc: 'Relatório fotográfico e evolução técnica semanal partilhados diretamente consigo.',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: 10,
                padding: '14px 16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.35rem', marginBottom: 6 }}>{item.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {item.title}
              </div>
              <p style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.4, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ── 4. CTA CENTRADO E DIRETO ── */}
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(184, 146, 74, 0.14) 0%, rgba(13, 15, 20, 0.8) 100%)',
            border: '1px solid rgba(184, 146, 74, 0.45)',
            borderRadius: 14,
            padding: '24px 18px',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
            Agende a Sua Visita ao Lote em Oliveirinha
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.72)', maxWidth: 480, margin: '0 auto 16px', lineHeight: 1.5 }}>
            Acompanhamento pessoal pelo gestor do projeto e contacto direto com quem constrói.
          </p>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => openLeadModal({
                title: 'Agendar Visita ao Lote · Domaine XXV',
                source: 'social_proof_visita',
                defaultObjective: 'Agendar Visita ao Lote',
              })}
              style={{
                background: 'var(--gold)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.86rem',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                padding: '13px 26px',
                borderRadius: 'var(--radius-btn)',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(184, 146, 74, 0.35)',
              }}
            >
              Agendar Visita ao Lote →
            </button>

            <button
              type="button"
              onClick={() => openLeadModal({
                title: 'Falar com o Promotor · Domaine XXV',
                source: 'social_proof_promotor',
                defaultObjective: 'Falar com o Promotor',
              })}
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.84rem',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                padding: '12px 20px',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid rgba(184, 146, 74, 0.6)',
                cursor: 'pointer',
              }}
            >
              👤 Falar com o Promotor
            </button>
          </div>
        </div>

      </div>

      {/* Lightbox em ecrã inteiro */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100000,
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            cursor: 'zoom-out',
          }}
        >
          <div style={{ position: 'relative', maxWidth: 940, maxHeight: '88vh', width: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(selectedImage)}
              alt="Obra Concluída"
              style={{ width: '100%', height: 'auto', maxHeight: '88vh', objectFit: 'contain', borderRadius: 8 }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: -38,
                right: 0,
                background: 'rgba(255,255,255,0.25)',
                border: 'none',
                color: '#fff',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
