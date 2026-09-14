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
            <div className="mobile-center-tag" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'var(--gold)', marginRight: 8, verticalAlign: 'middle' }} />
              Acompanhamento Pessoal &amp; Rigor Construtivo
            </div>

            {/* Dinamismo / Escassez */}
            <div className="mobile-center-flex" style={{ marginBottom: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(92, 122, 62, 0.2)',
                border: '1px solid #5C7A3E',
                borderRadius: 100,
                padding: '6px 14px',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#A8D984',
              }}>
                <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: '#6EE7B7' }} />
                <span>Imóvel disponível para visitas esta semana · 7 visitas realizadas este mês</span>
              </div>
            </div>

            <h2 className="heading mobile-center-title" style={{ color: '#fff', marginBottom: 16 }}>
              As oportunidades em Aveiro{' '}
              <span className="serif-i" style={{ color: 'var(--gold-light)' }}>não ficam disponíveis por muito tempo.</span>
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
                  <span style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
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
                  style={{ fontSize: '1.02rem', padding: '16px 36px', display: 'inline-flex' }}
                >
                  <span>📅</span> Quero Agendar a Minha Visita Privada
                </a>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.65)', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', textAlign: 'center' }}>
                <span>🛡️</span> Garantia: Chave na mão em 10 meses · Sinal 100% protegido por salvaguarda no CPCV.
              </div>
            </div>
          </div>

          {/* ── Right — profile card ── */}
          <div>
            <div className="card" style={{ padding: '28px 24px', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
                <div style={{
                  position: 'relative', width: 76, height: 76, flexShrink: 0,
                  borderRadius: '50%', overflow: 'hidden',
                  boxShadow: '0 0 0 3px var(--gold), 0 0 0 5px var(--bg-dark)',
                }}>
                  <Image
                    src="/EU1.jpeg"
                    alt="André Queirós — Gestor do Projeto Domaine XXV"
                    fill
                    sizes="76px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: 3 }}>
                    André Queirós
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Domaine XXV &amp; Grupo Freitas Renovações
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, marginTop: 2 }}>
                    WhatsApp: 920 601 070
                  </div>
                </div>
              </div>

              {/* Final closing CTA Button Grande */}
              <a
                href={WA_VISIT}
                target="_blank"
                rel="noopener noreferrer"
                id="final-cta-btn"
                onClick={() => trackWhatsAppLead('manager_profile_final_cta')}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  background: 'linear-gradient(135deg, #C9A24F 0%, #B8924A 100%)',
                  color: '#fff',
                  fontFamily: 'var(--sans)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  padding: '16px 20px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(184,146,74,0.45)',
                  letterSpacing: '0.01em',
                  marginBottom: 14,
                }}
              >
                <span>📅</span> Quero Agendar a Minha Visita Privada
              </a>

              <p style={{
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                lineHeight: 1.5,
                margin: 0,
              }}>
                👉 Projeto único. Não existem projetos adjacentes nas mesmas condições.
              </p>
            </div>

            {/* Partner logos with Promotor & Grupo Freitas Renovações */}
            <div style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
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
