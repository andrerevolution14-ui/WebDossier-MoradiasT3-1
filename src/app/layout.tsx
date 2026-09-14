import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
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
  title: 'Domaine XXV — Moradia T4 com Jardim · Oliveirinha, Aveiro',
  description:
    'Dossier digital da Moradia T4 Domaine XXV em Oliveirinha, Aveiro. 185 m² úteis, jardim privativo de ~82 m², garagem coberta, chave na mão em 10 meses e personalização total.',
  keywords: [
    'Domaine XXV',
    'Moradia Oliveirinha',
    'Moradia Aveiro',
    'Comprar moradia Aveiro',
    'Construção LSF Aveiro',
    'Moradia chave na mão',
  ],
  authors: [{ name: 'Silvermont Capital & André Queirós' }],
  openGraph: {
    title: 'Domaine XXV — Moradia T4 Familiar em Oliveirinha, Aveiro',
    description: '185 m² úteis · Jardim Privativo ~82 m² · Garagem Coberta · Chave na Mão por 335.000€',
    images: [{ url: '/images/exterior-capa.webp', width: 1200, height: 675, alt: 'Fachada Domaine XXV' }],
    locale: 'pt_PT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domaine XXV — Moradia T4 Familiar em Oliveirinha',
    description: '185 m² úteis · Jardim Privativo ~82 m² · Chave na Mão por 335.000€',
    images: ['/images/exterior-capa.webp'],
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

        {/* ─── Meta Pixel Code (ID: 26022738390737044) ────────────────────── */}
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
              fbq('init', '26022738390737044');
              fbq('track', 'PageView');

              // Global Delegated WhatsApp Click Tracker for Meta Ads
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a');
                if (!target) return;
                var href = target.getAttribute('href') || '';
                if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp.com') !== -1) {
                  try {
                    if (typeof fbq === 'function') {
                      fbq('track', 'Lead', {
                        content_name: 'Moradia Oliveirinha Domaine XXV',
                        content_category: 'Imobiliário',
                        currency: 'EUR',
                        value: 335000,
                        source: target.id || 'whatsapp_link'
                      });
                      fbq('track', 'Contact', {
                        content_name: 'WhatsApp Lead André Queirós',
                        source: target.id || 'whatsapp_link'
                      });
                      console.log('🎯 [Meta Pixel] Lead & Contact disparados com sucesso!');
                    }
                  } catch(err) {
                    console.error('Erro Meta Pixel:', err);
                  }
                }
              }, { capture: true });
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26022738390737044&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
