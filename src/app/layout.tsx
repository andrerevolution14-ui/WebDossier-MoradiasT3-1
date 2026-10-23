import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

import { getSiteUrl } from '@/lib/siteUrl';

const siteUrl = getSiteUrl();

export const metadataBase = new URL(siteUrl);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1A1A',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Domaine XXV — Moradia T3 com Jardim · 335.000€ · Oliveirinha, Aveiro',
  description:
    'Dossier digital da Moradia T3 (opção T4) Domaine XXV em Oliveirinha, Aveiro. 335.000€ com IMT e Selo incluídos, entrada de 10% protegida, jardim privativo de ~82 m², garagem e chave na mão em 10 meses.',
  keywords: [
    'Domaine XXV',
    'Moradia Oliveirinha',
    'Moradia Aveiro',
    'Comprar moradia Aveiro',
    'Construção LSF Aveiro',
    'Moradia chave na mão',
  ],
  authors: [{ name: 'André Queirós · Grupo Freitas Renovações' }],
  openGraph: {
    title: 'Domaine XXV — Moradia T3 Familiar em Oliveirinha, Aveiro',
    description: '~180 m² ABP · ~146 m² Úteis · Jardim Privativo ~82 m² · Chave na Mão por 335.000€',
    url: siteUrl,
    siteName: 'Domaine XXV',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Moradia T3 Domaine XXV em Oliveirinha, Aveiro',
        type: 'image/jpeg',
      },
      {
        url: '/images/exterior-capa.webp',
        width: 1200,
        height: 675,
        alt: 'Fachada Domaine XXV',
        type: 'image/webp',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domaine XXV — Moradia T3 Familiar em Oliveirinha',
    description: '~180 m² ABP · ~146 m² Úteis · Chave na Mão por 335.000€',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="format-detection" content="telephone=no" />

        {/* ─── Meta Pixel Code (ID: 979841341182458) ────────────────────── */}
        <script
          id="meta-pixel"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('set', 'autoConfig', false, '979841341182458');
              fbq('init', '979841341182458');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=979841341182458&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
