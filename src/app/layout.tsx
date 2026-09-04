import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadataBase = new URL('https://domainexxv.pt');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A1A1A',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://domainexxv.pt'),
  title: 'Domaine XXV — Moradia T3 Familiar · Oliveirinha, Aveiro',
  description:
    'Dossier digital da Moradia T3 Domaine XXV em Oliveirinha, Aveiro. 185 m² úteis, 3 quartos, jardim privativo de ~82 m², garagem coberta, chave na mão em 10 meses e personalização total.',
  keywords: [
    'Domaine XXV',
    'Moradia T3 Oliveirinha',
    'Moradia T3 Aveiro',
    'Comprar casa Aveiro',
    'Construção LSF Aveiro',
    'Moradia chave na mão',
  ],
  authors: [{ name: 'Silvermont Capital & André Queirós' }],
  openGraph: {
    title: 'Domaine XXV — Moradia T3 Familiar em Oliveirinha, Aveiro',
    description: '185 m² úteis · Jardim Privativo ~82 m² · 3 Quartos · Garagem Coberta · Chave na Mão em 10 Meses',
    images: [{ url: '/images/Exterior%20Capa.png', width: 1200, height: 675, alt: 'Fachada Domaine XXV' }],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domaine XXV — Moradia T3 Familiar em Oliveirinha',
    description: '185 m² úteis · Jardim Privativo ~82 m² · 3 Quartos · Chave na Mão em 10 Meses',
    images: ['/images/Exterior%20Capa.png'],
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
      </head>
      <body>{children}</body>
    </html>
  );
}
