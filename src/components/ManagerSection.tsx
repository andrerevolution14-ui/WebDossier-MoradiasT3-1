'use client';
import React from 'react';
import Image from 'next/image';
import { WA_VISIT } from './SiteHeader';
import { trackWhatsAppLead } from '@/lib/analytics';

/* ─── Dedicated Manager Section & Final Action CTAs ────────────────────── */
export default function ManagerSection() {
  return (
    <section id="gestor" className="section" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap">

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

          {/* ── Left — copy ── */}
          <div>
            <div className="section-tag mobile-center-tag">
              Acompanhamento Pessoal &amp; Rigor Construtivo
            </div>

            {/* Dinamismo / Escassez */}
            <div className="mobile-center-flex" style={{ marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(92, 122, 62, 0.15)',
                border: '1px solid #4D6B26',
                borderRadius: 'var(--radius-micro)',
                padding: '5px 12px',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: '#B5E698',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, background: '#6EE7B7' }} />
                <span>Disponível para visitas esta semana · 7 visitas este mês</span>
              </div>
            </div>

            <h2 className="heading mobile-center-title" style={{ color: '#fff', marginBottom: 16 }}>
              As oportunidades em Aveiro{' '}
              <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>não ficam disponíveis por muito tempo.</span>
            </h2>
            <p className="mobile-center-desc" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 480, marginBottom: 28 }}>
              Desenvolvido por <strong>André Queirós</strong> em parceria oficial com o <strong>Grupo Freitas Renovações</strong> (<a href="https://grupofreitasrenovacoes.pt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)', textDecoration: 'underline' }}>grupofreitasrenovacoes.pt</a>). Asseguramos cumprimento escrupuloso de prazos, alvará de construção certificado e apoio direto à sua família.
            </p>

            {/* Services */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                'Visita guiada ao lote do terreno em Oliveirinha',
                'Estudo de viabilidade bancária 100% gratuito (335.000€ chave-na-mão)',
                'Personalização total da cozinha equipada, acabamentos e climatização',
                'Relatório fotográfico semanal durante os 10 meses de obra',
                'Contacto direto sem intermediários pelo 920 601 070',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold-light)', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Main Action CTA (Apenas 1 CTA) */}
            <div className="mobile-center-btn-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <a
                  href={WA_VISIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppLead('manager_agendar_visita')}
                  className="btn btn-gold pulse-gold mobile-center-btn"
                  style={{ fontSize: '0.92rem', padding: '16px 36px', display: 'inline-flex', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
                >
                  Agendar Visita Privada ao Lote →
                </a>
              </div>
              <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.6)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', textAlign: 'center', letterSpacing: '0.02em' }}>
                <span>Conclusão da obra em 10 meses · Sinal 100% salvaguardado no CPCV</span>
              </div>
            </div>
          </div>

          {/* ── Right — profile card ── */}
          <div>
            <div className="card" style={{ padding: '28px 24px', marginBottom: 20, borderRadius: 'var(--radius-card)', background: 'var(--white)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                <div style={{
                  position: 'relative', width: 72, height: 72, flexShrink: 0,
                  borderRadius: 'var(--radius-card-sm)', overflow: 'hidden',
                  border: '1px solid var(--gold)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                }}>
                  <Image
                    src="/EU1.jpeg"
                    alt="André Queirós — Gestor do Projeto Domaine XXV"
                    fill
                    sizes="72px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                    André Queirós
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--gold-dark)', fontWeight: 600, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Gestor do Projeto · Domaine XXV
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    Oliveirinha · Aveiro
                  </div>
                </div>
              </div>

              {/* Status pill */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--gold-pale)', border: '1px solid #E6D8BC',
                borderRadius: 'var(--radius-micro)', padding: '5px 12px',
                fontSize: '0.72rem', fontWeight: 700, color: 'var(--gold-dark)',
                letterSpacing: '0.04em', textTransform: 'uppercase',
                marginBottom: 20,
              }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--gold)' }} />
                <span>Interlocutor Único do CPCV à Escritura</span>
              </div>

              <a
                href={WA_VISIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppLead('manager_card_visita')}
                className="btn btn-gold"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '100%',
                  fontSize: '0.85rem',
                  padding: '13px 20px',
                  borderRadius: 'var(--radius-btn)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Agendar a Minha Visita Privada →
              </a>

              <p style={{
                fontSize: '0.70rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                lineHeight: 1.5,
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                Empreendimento exclusivo. Sem projetos adjacentes nas mesmas condições de mercado.
              </p>
            </div>

            {/* Partner logos with Promotor & Grupo Freitas Renovações */}
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-card-sm)',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)' }}>
                  Promotor
                </span>
                <div style={{ position: 'relative', height: 26, width: 110, flexShrink: 0 }}>
                  <Image src="/silvermont1.webp" alt="Silvermont Capital" fill style={{ objectFit: 'contain', objectPosition: 'left' }} sizes="110px" />
                </div>
              </div>

              <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.2)' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <span style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)' }}>
                  Construtora Oficial
                </span>
                <a
                  href="https://grupofreitasrenovacoes.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: 'var(--gold-light)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <span>Grupo Freitas Renovações</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
