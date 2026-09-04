'use client';
import React, { useState } from 'react';

/* ─── Location Section — Live Google Maps with guaranteed Fallback ──────── */
const MAP_EMBED = 'https://maps.google.com/maps?q=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha&t=m&z=16&output=embed';
const MAP_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha';

const DISTANCES = [
  { icon: '🚗', bold: '8 min',  rest: 'do Centro Histórico de Aveiro' },
  { icon: '🛣️', bold: '2 min',  rest: 'do Nó de Acesso à A17 e A25' },
  { icon: '🏖️', bold: '17 min', rest: 'da Praia da Barra e Costa Nova' },
  { icon: '🏥', bold: '10 min', rest: 'do Hospital Infante D. Pedro' },
  { icon: '🛒', bold: '5 min',  rest: 'de Hipermercados, Farmácias e Escolas' },
];

export default function LocationSection() {
  const [mapType, setMapType] = useState<'live' | 'card'>('live');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="localizacao" style={{ background: 'var(--bg-alt)', padding: '72px 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div className="mobile-center-tag" style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--gold)', display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
          <span style={{ display:'inline-block', width:24, height:1.5, background:'var(--gold)' }} />
          Localização & Enquadramento
        </div>
        <h2 className="mobile-center-title" style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'clamp(1.65rem, 4vw, 2.6rem)', lineHeight:1.15, color:'var(--text-primary)', marginBottom:10 }}>
          No coração de <span style={{ fontStyle:'italic', color:'var(--gold)' }}>Oliveirinha</span>
        </h2>
        <p className="mobile-center-desc" style={{ fontSize:'0.88rem', color:'var(--text-body)', lineHeight:1.65, maxWidth:540, marginBottom:36 }}>
          Rua Acácio Simões Vieira (Lote 25) — tranquilidade residencial exclusiva com acesso rápido a Aveiro e às praias.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:28, alignItems:'start' }}>

          {/* Map Container with Live & Fallback rendering */}
          <div style={{
            position: 'relative',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            border: '1px solid var(--border)',
            height: 440,
            background: '#EAE6DD',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* View Selector Header */}
            <div style={{
              background: '#fff',
              padding: '10px 16px',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                <span>📍</span> Rua Acácio Simões Vieira, 3810-843 Oliveirinha
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setMapType('live')}
                  style={{
                    background: mapType === 'live' ? 'var(--gold)' : 'var(--bg)',
                    color: mapType === 'live' ? '#fff' : 'var(--text-body)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Mapa Interativo
                </button>
                <button
                  onClick={() => setMapType('card')}
                  style={{
                    background: mapType === 'card' ? 'var(--gold)' : 'var(--bg)',
                    color: mapType === 'card' ? '#fff' : 'var(--text-body)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Ponto de Localização
                </button>
              </div>
            </div>

            {/* Map Area */}
            <div style={{ position: 'relative', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>

              {/* Fallback Graphic Card (Always rendered underneath as instant background fallback) */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #f0ede6 0%, #e3ded5 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                textAlign: 'center',
              }}>
                <div style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '24px 28px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  maxWidth: 380,
                  width: '100%',
                }}>
                  <div style={{ fontSize: '2.4rem', marginBottom: 8, filter: 'drop-shadow(0 2px 6px rgba(184,146,74,0.4))' }}>📍</div>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                    Domaine XXV
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                    Rua Acácio Simões Vieira (Lote 25)<br />
                    3810-843 Oliveirinha · Aveiro
                  </div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.04em', marginBottom: 16 }}>
                    Coordenadas: 40°34&apos;59.2&quot;N 8°37&apos;02.2&quot;W
                  </div>
                  <a
                    href={MAP_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ width: '100%', fontSize: '0.86rem', padding: '11px 18px', textDecoration: 'none' }}
                  >
                    🗺️ Abrir Rota no Google Maps
                  </a>
                </div>
              </div>

              {/* Live Google Maps iframe (visible when mapType === 'live') */}
              {mapType === 'live' && (
                <iframe
                  title="Localização Domaine XXV — Rua Acácio Simões Vieira, 25"
                  src={MAP_EMBED}
                  width="100%"
                  height="100%"
                  onLoad={() => setIframeLoaded(true)}
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{
                    border: 0,
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: iframeLoaded ? 1 : 0.95,
                    transition: 'opacity 0.3s ease',
                  }}
                  allowFullScreen
                />
              )}
            </div>

            {/* Bottom Direct Pin Bar */}
            <div style={{
              background: 'rgba(26,26,26,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              zIndex: 10,
            }}>
              <span style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                📍 Ponto de interesse fixado em Oliveirinha
              </span>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--gold-light)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                Como Chegar →
              </a>
            </div>
          </div>

          {/* Info & Distances Column */}
          <div>
            <address style={{ fontStyle:'normal', marginBottom:20 }}>
              <div style={{ fontWeight:700, fontSize:'1.05rem', color:'var(--text-primary)', marginBottom:4 }}>
                Rua Acácio Simões Vieira, 25
              </div>
              <div style={{ fontSize:'0.88rem', color:'var(--text-muted)' }}>
                Quintas · Oliveirinha · 3800-000 Aveiro
              </div>
            </address>

            {/* Distances List */}
            <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
              {DISTANCES.map((d, i) => (
                <div key={i} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:12, padding:'13px 16px', display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{ fontSize:'1.25rem', flexShrink:0, width:30, textAlign:'center' }}>{d.icon}</span>
                  <div>
                    <span style={{ fontFamily:'var(--serif)', fontWeight:600, fontSize:'1rem', color:'var(--text-primary)' }}>{d.bold}</span>
                    <span style={{ fontSize:'0.85rem', color:'var(--text-muted)' }}> {d.rest}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.88rem', padding: '13px 20px', textDecoration: 'none' }}
            >
              🗺️ Abrir Trajeto Completo no Google Maps →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
