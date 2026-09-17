'use client';
import React, { useState } from 'react';

/* ─── Location Section — Live Google Maps with guaranteed Fallback ──────── */
const MAP_EMBED = 'https://maps.google.com/maps?q=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha&t=m&z=16&output=embed';
const MAP_DIRECTIONS = 'https://www.google.com/maps/dir/?api=1&destination=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha';

const DISTANCES = [
  { tag: 'CENTRO', bold: '8 min',  rest: 'do Centro Histórico de Aveiro' },
  { tag: 'ACESSO', bold: '2 min',  rest: 'do Nó de Acesso à A17 e A25' },
  { tag: 'PRAIA',  bold: '17 min', rest: 'da Praia da Barra e Costa Nova' },
  { tag: 'SAÚDE',  bold: '10 min', rest: 'do Hospital Infante D. Pedro' },
  { tag: 'SERVIÇOS', bold: '5 min', rest: 'de Hipermercados, Farmácias e Escolas' },
];

export default function LocationSection() {
  const [mapType, setMapType] = useState<'live' | 'card'>('live');
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <section id="localizacao" style={{ background: 'var(--bg-alt)', padding: '72px 0' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 16px' }}>

        {/* Header */}
        <div className="section-tag mobile-center-tag">
          Localização &amp; Enquadramento
        </div>
        <h2 className="heading mobile-center-title" style={{ maxWidth: 820, margin: '0 auto 14px', textAlign: 'center' }}>
          Oliveirinha: A 8 Minutos de Aveiro, com a Qualidade de Vida Que o Centro Perdeu.
        </h2>
        <p className="mobile-center-desc" style={{ fontSize:'0.95rem', color:'var(--text-body)', lineHeight:1.7, maxWidth:680, margin: '0 auto 36px', textAlign: 'center' }}>
          Chegue às Glicínias ou à Universidade em escassos minutos, sem o stress do trânsito do centro nem os custos inflacionados por m². O equilíbrio perfeito entre acessibilidade e tranquilidade.
        </p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:28, alignItems:'start' }}>

          {/* Map Container with Live & Fallback rendering */}
          <div style={{
            position: 'relative',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            boxShadow: '0 6px 24px rgba(0,0,0,0.07)',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.76rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                <span style={{ color: 'var(--gold)' }}>•</span> Rua Acácio Simões Vieira, 3810-843 Oliveirinha
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => setMapType('live')}
                  style={{
                    background: mapType === 'live' ? 'var(--gold)' : 'var(--bg)',
                    color: mapType === 'live' ? '#fff' : 'var(--text-body)',
                    border: '1px solid var(--border)',
                    borderRadius: 2,
                    padding: '5px 12px',
                    fontSize: '0.70rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
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
                    borderRadius: 2,
                    padding: '5px 12px',
                    fontSize: '0.70rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  Ponto de Localização
                </button>
              </div>
            </div>

            {/* Map Area */}
            <div style={{ position: 'relative', flex: 1, width: '100%', height: '100%', overflow: 'hidden' }}>

              {/* Fallback Graphic Card */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #f4f1ea 0%, #eae5dc 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                textAlign: 'center',
              }}>
                <div style={{
                  background: '#fff',
                  borderRadius: 4,
                  padding: '28px 30px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  maxWidth: 380,
                  width: '100%',
                }}>
                  <div style={{ fontSize: '0.70rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>
                    Empreendimento
                  </div>
                  <div style={{ fontFamily: 'var(--serif)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: 4 }}>
                    Domaine XXV
                  </div>
                  <div style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: 14 }}>
                    Rua Acácio Simões Vieira (Lote 25)<br />
                    3810-843 Oliveirinha · Aveiro
                  </div>
                  <div style={{ fontSize: '0.73rem', fontWeight: 600, color: 'var(--text-body)', letterSpacing: '0.02em', marginBottom: 18, background: 'var(--bg-alt)', padding: '6px 10px', borderRadius: 2 }}>
                    40°34&apos;59.2&quot;N 8°37&apos;02.2&quot;W
                  </div>
                  <a
                    href={MAP_DIRECTIONS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold"
                    style={{ width: '100%', fontSize: '0.80rem', padding: '11px 18px', textDecoration: 'none', borderRadius: 3, letterSpacing: '0.04em', textTransform: 'uppercase' }}
                  >
                    Abrir Rota no Google Maps →
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
              background: '#161616',
              padding: '11px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              zIndex: 10,
            }}>
              <span style={{ color: '#fff', fontSize: '0.76rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Ponto de interesse certificado em Oliveirinha
              </span>
              <a
                href={MAP_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--gold-light)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
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
                Quintas · Oliveirinha · 3810-843 Aveiro
              </div>
            </address>

            {/* Distances List */}
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:24 }}>
              {DISTANCES.map((d, i) => (
                <div key={i} style={{ background:'var(--white)', border:'1px solid var(--border)', borderRadius:'var(--radius-card-sm)', padding:'12px 16px', display:'flex', alignItems:'center', gap:14 }}>
                  <span style={{
                    fontSize:'0.64rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--gold-dark)',
                    background: 'var(--gold-pale)',
                    border: '1px solid #E6D8BC',
                    borderRadius: 'var(--radius-micro)',
                    padding: '3px 6px',
                    flexShrink: 0,
                    width: 65,
                    textAlign: 'center',
                  }}>
                    {d.tag}
                  </span>
                  <div>
                    <span style={{ fontFamily:'var(--serif)', fontWeight:700, fontSize:'0.98rem', color:'var(--text-primary)' }}>{d.bold}</span>
                    <span style={{ fontSize:'0.85rem', color:'var(--text-body)' }}> {d.rest}</span>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={MAP_DIRECTIONS}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
              style={{ width: '100%', fontSize: '0.82rem', padding: '13px 20px', textDecoration: 'none', borderRadius: 'var(--radius-btn)', letterSpacing: '0.04em', textTransform: 'uppercase' }}
            >
              Abrir Trajeto Completo no Google Maps →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
