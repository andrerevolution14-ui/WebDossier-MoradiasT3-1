'use client';
import React from 'react';
import Image from 'next/image';
import { WA_VISIT } from './SiteHeader';

/* ─── Dedicated Manager Section & Final CTA ────────────────────────────── */
export default function ManagerSection() {
  return (
    <section id="gestor" className="section" style={{ background: 'var(--bg-dark)' }}>
      <div className="wrap">

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

          {/* ── Left — copy ── */}
          <div>
            <div className="mobile-center-tag" style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14 }}>
              <span style={{ display: 'inline-block', width: 24, height: 1.5, background: 'var(--gold)', marginRight: 8, verticalAlign: 'middle' }} />
              Acompanhamento Dedicado à Sua Família
            </div>

            <h2 className="heading mobile-center-title" style={{ color: '#fff', marginBottom: 16 }}>
              Acompanho a sua família,{' '}
              <span className="serif-i" style={{ color: 'var(--gold-light)' }}>em cada detalhe</span>
            </h2>
            <p className="mobile-center-desc" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 460, marginBottom: 32 }}>
              Apoio os clientes de forma direta e pessoal desde o primeiro contacto e visita ao terreno,
              passando pela personalização dos acabamentos, até à entrega da chave da vossa nova moradia.
            </p>

            {/* Services */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {[
                'Visita guiada ao lote do terreno em Oliveirinha',
                'Estudo de viabilidade de crédito 100% gratuito',
                'Catálogo de acabamentos e opções de personalização',
                'Relatório fotográfico semanal durante os 10 meses de obra',
                'Contacto direto sem intermediários pelo 920 601 070',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>—</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Main CTA */}
            <div className="mobile-center-btn-wrap">
              <a
                href={WA_VISIT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold pulse-gold mobile-center-btn"
                style={{ fontSize: '1rem', padding: '16px 32px', display: 'inline-flex' }}
              >
                <span>💬</span> Agendar Visita ao Terreno no WhatsApp
              </a>
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
                    Gestor de Projeto · Domaine XXV
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--gold)', fontWeight: 600, marginTop: 2 }}>
                    WhatsApp: 920 601 070
                  </div>
                </div>
              </div>

              <a
                href={WA_VISIT}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <span>💬</span> Conversar Diretamente com o André
              </a>
            </div>

            {/* Partner logos */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', opacity: 0.5 }}>
              <div style={{ position: 'relative', height: 28, width: 130, flexShrink: 0 }}>
                <Image src="/silvermont1.png" alt="Silvermont Capital" fill style={{ objectFit: 'contain', objectPosition: 'left' }} sizes="130px" />
              </div>
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'relative', height: 24, width: 100, flexShrink: 0 }}>
                <Image src="/Positive.png" alt="Positive Project & Co" fill style={{ objectFit: 'contain', objectPosition: 'left' }} sizes="100px" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
