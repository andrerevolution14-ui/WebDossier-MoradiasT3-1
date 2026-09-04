/** Caminhos WebP pré-optimizados (ver scripts/optimize-images.mjs) */

export interface GalleryPhoto {
  thumb: string;
  full: string;
  alt: string;
  caption: string;
  isPlan?: boolean;
}

export const IMAGES = {
  hero: '/images/exterior-capa.webp',
  salaJantar: '/images/sala-jantar.webp',
  sign2: '/images/sign2.webp',
  freitas1: '/images/freitas1.webp',
} as const;

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { thumb: '/images/exterior-capa-thumb.webp', full: '/images/exterior-capa.webp', alt: 'Fachada principal', caption: 'Exterior — Fachada Principal' },
  { thumb: '/images/exterior-traseiro-completo-thumb.webp', full: '/images/exterior-traseiro-completo.webp', alt: 'Exterior traseiro', caption: 'Exterior — Vista Traseira' },
  { thumb: '/images/exterior-traseiro-thumb.webp', full: '/images/exterior-traseiro.webp', alt: 'Exterior traseiro', caption: 'Exterior — Traseiro' },
  { thumb: '/images/sala-jantar-thumb.webp', full: '/images/sala-jantar.webp', alt: 'Sala de jantar', caption: 'Sala de Jantar' },
  { thumb: '/images/cozinha-thumb.webp', full: '/images/cozinha.webp', alt: 'Cozinha equipada', caption: 'Cozinha' },
  { thumb: '/WC F2.png', full: '/WC F2.png', alt: 'Casa de banho', caption: 'Casa de Banho' },
  { thumb: '/images/terceiro-andar-thumb.webp', full: '/images/terceiro-andar.webp', alt: 'Interior terceiro andar', caption: 'Terceiro Andar' },
  { thumb: '/images/quarto-cama-thumb.webp', full: '/images/quarto-cama.webp', alt: 'Quarto principal', caption: 'Quarto' },
  { thumb: '/images/quarto-varanda-thumb.webp', full: '/images/quarto-varanda.webp', alt: 'Quarto com varanda', caption: 'Quarto com Varanda' },
  { thumb: '/images/quarto-porta-thumb.webp', full: '/images/quarto-porta.webp', alt: 'Quarto — entrada', caption: 'Quarto' },
  { thumb: '/images/corredor-quartos-thumb.webp', full: '/images/corredor-quartos.webp', alt: 'Corredor dos quartos', caption: 'Corredor' },
];

export const PLAN_PHOTOS: GalleryPhoto[] = [
  { thumb: '/images/planta-3d.webp', full: '/images/planta-3d.webp', alt: 'Planta em 3D', caption: 'Planta em 3D', isPlan: true },
  { thumb: '/images/planta-tecnica.webp', full: '/images/planta-tecnica.webp', alt: 'Planta Técnica', caption: 'Planta Técnica', isPlan: true },
];

/** sizes para grelhas responsivas */
export const GALLERY_SIZES = '(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw';
export const CONTENT_IMAGE_SIZES = '(max-width: 1080px) 100vw, 1080px';
