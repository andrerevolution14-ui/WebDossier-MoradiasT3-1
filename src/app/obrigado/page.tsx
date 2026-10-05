import type { Metadata } from 'next';
import { WA_PHONE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Obrigado | Domaine XXV',
  description: 'Pedido recebido. O André Queirós vai contactá-lo em breve.',
  robots: { index: false, follow: false },
};

export default async function ObrigadoPage({
  searchParams,
}: {
  searchParams: Promise<{ nome?: string }>;
}) {
  const { nome } = await searchParams;
  const firstName = (nome || '').slice(0, 40);

  const gold = '#B8924A';

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(circle at top, #1d1a14, #0a0b0d 70%)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <section
        style={{
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          background: '#15161A',
          border: '1px solid rgba(184,146,74,0.35)',
          borderRadius: 18,
          padding: '36px 24px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.65)',
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: '50%',
            margin: '0 auto 16px',
            background: 'rgba(61,122,88,0.2)',
            border: '1.5px solid #3D7A58',
            color: '#7DC4A0',
            fontSize: '1.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✓
        </div>
        <h1 style={{ fontSize: '1.6rem', margin: '0 0 8px' }}>
          Pedido recebido{firstName ? `, ${firstName}` : ''}!
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.55, margin: '0 0 24px' }}>
          O André Moradia Quintãs vai ligar-lhe em breve. Para saber que é ele a ligar, guarde já o contacto.
        </p>

        <a
          href="/andre-queiros-domaine-xxv.vcf"
          download="Andre-Queiros-Domaine-XXV.vcf"
          id="download-vcard"
          style={{
            display: 'block',
            background: gold,
            color: '#fff',
            padding: '16px 18px',
            borderRadius: 10,
            fontWeight: 700,
            fontSize: '0.95rem',
            lineHeight: 1.35,
            textDecoration: 'none',
            boxShadow: '0 4px 18px rgba(184,146,74,0.4)',
            marginBottom: 12,
          }}
        >
          📥 Guarde o meu contacto para saber quem lhe está a ligar - 919 367 087
        </a>

        <a
          href={`https://wa.me/${WA_PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.85)',
            padding: '12px 18px',
            borderRadius: 10,
            fontSize: '0.88rem',
            textDecoration: 'none',
            marginBottom: 18,
          }}
        >
          Falar já no WhatsApp →
        </a>

        <a href="/" style={{ color: gold, fontSize: '0.85rem' }}>
          ← Voltar ao dossier
        </a>
      </section>
    </main>
  );
}
