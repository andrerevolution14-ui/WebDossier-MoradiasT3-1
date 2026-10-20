/**
 * Obter a URL canónica do site em produção.
 * Prioriza NEXT_PUBLIC_SITE_URL, depois as variáveis automáticas de produção da Vercel
 * (VERCEL_PROJECT_PRODUCTION_URL ou VERCEL_URL), e fallback para o domínio padrão da Vercel.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    const raw = process.env.NEXT_PUBLIC_SITE_URL.trim();
    return raw.startsWith('http') ? raw : `https://${raw}`;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'https://webdossier-moradiast3-1.vercel.app';
}
