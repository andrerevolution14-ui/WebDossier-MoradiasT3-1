export interface PropertyData {
  name: string;
  nameDisplay: string;
  typology: string;
  areaSqm: number;
  abpSqm: number;
  usefulHabitableAreaSqm: number;
  dependentUsefulAreaSqm: number;
  landSqm: number;
  addressLine: string;
  locality: string;
  fullAddress: string;
  unitsTotal: number;
  unitsReserved: number;
  unitsAvailable: number;
  deliveryMonths: number;
  price: number;
  priceFormatted: string;
  priceWithTaxes: number;
  priceWithTaxesFormatted: string;
  depositAmount: number;
  depositAmountFormatted: string;
  depositPercentage: number;
  mapsEmbed: string;
  googleMapsDirections: string;
}

export const PROPERTY: PropertyData = {
  name: 'Domaine XXV',
  nameDisplay: 'Domaine du Vingt-Cinq (Domaine XXV)',
  typology: 'T3 (com opção T4)',
  areaSqm: 180,
  abpSqm: 180,
  usefulHabitableAreaSqm: 146.34,
  dependentUsefulAreaSqm: 77.65,
  landSqm: 230,
  addressLine: 'Rua Acácio Simões Vieira (Lote 25)',
  locality: 'Oliveirinha, Aveiro',
  fullAddress: 'Rua Acácio Simões Vieira (Lote 25), 3810-843 Oliveirinha, Aveiro',
  unitsTotal: 3,
  unitsReserved: 1,
  unitsAvailable: 2,
  deliveryMonths: 10,
  price: 335000,
  priceFormatted: '335.000€',
  priceWithTaxes: 335000,
  priceWithTaxesFormatted: '335.000€ (c/ IMT e Imposto de Selo)',
  depositAmount: 33500,
  depositAmountFormatted: '33.500€',
  depositPercentage: 10,
  mapsEmbed:
    'https://maps.google.com/maps?q=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha&hl=pt&z=16&output=embed',
  googleMapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha',
};

// URL de embed da visita virtual 360° (Matterport, 3DVista, Kuula, etc.). Vazio = pré-visualização com renders.
export const TOUR_360_URL = 'https://visita3dmoradia-vvtu.vercel.app/';
export const TOUR_360_PATH = '/visita-360';

export const WHATSAPP_PHONE = '351920601070';
export const WA_PHONE = '351920601070';
export const CONTACT_PHONE_TEL = '+351919367087';
export const CONTACT_PHONE_DISPLAY = '919 367 087';

export const CRITICAL_MICRO_STATS = [
  {
    badge: 'Modelo Direto',
    icon: '🏡',
    number: '335.000€',
    label: 'Chave na Mão com Impostos',
    desc: 'Preço fechado em contrato que inclui terreno em seu nome, projeto aprovado, construção e impostos de transmissão.',
    highlight: true,
  },
  {
    badge: 'Prazo Rigoroso',
    icon: '⏱️',
    number: '10 Meses',
    label: 'Execução de Obra',
    desc: 'Prazo contratualizado com acompanhamento contínuo e sem revisões orçamentais.',
    highlight: false,
  },
  {
    badge: 'Segurança Contratual',
    icon: '🛡️',
    number: '10%',
    label: 'Entrada Salvaguardada (33.500€)',
    desc: 'Sinal protegido por cláusula resolutiva no CPCV com devolução integral se o banco recusar crédito.',
    highlight: false,
  },
];

export const VIDEOS_PLAYLIST = [
  {
    id: 'apresentacao',
    title: '1. Tour Apresentação 3D',
    src: '/videos/ApresentacaoWebDocT3.mp4',
    poster: '/images/exterior-capa.webp',
    desc: 'Visão volumétrica de conjunto, iluminação e enquadramento.',
  },
  {
    id: 'exterior',
    title: '2. Exterior & Jardim Traseiro',
    src: '/videos/tour-exterior.mp4',
    poster: '/images/exterior-traseiro-completo.webp',
    desc: 'Pátio privativo, espaço de convívio exterior e arquitetura LSF.',
  },
  {
    id: 'interior',
    title: '3. Sala, Cozinha & Vivência',
    src: '/videos/tour-interior.mp4',
    poster: '/images/sala-jantar.webp',
    desc: 'Ambiente open space, luz natural e acabamentos de requinte.',
  },
];

export const GALLERY_ITEMS = [
  {
    title: 'Fachada Principal',
    full: '/images/exterior-capa.webp',
    thumb: '/images/exterior-capa-thumb.webp',
    caption: 'Fachada Principal — Arquitetura contemporânea em LSF com ripados estéticos e iluminação zenital.',
  },
  {
    title: 'Jardim & Traseiras',
    full: '/images/exterior-traseiro-completo.webp',
    thumb: '/images/exterior-traseiro-completo-thumb.webp',
    caption: 'Exterior Traseiro & Jardim Privado — Terreno de ~230 m² com privacidade total e opção de piscina.',
  },
  {
    title: 'Sala de Estar',
    full: '/images/sala-jantar.webp',
    thumb: '/images/sala-jantar-thumb.webp',
    caption: 'Sala de Jantar e Estar em Open Space — Envidraçados rasgados para o jardim privativo.',
  },
  {
    title: 'Cozinha Design',
    full: '/images/cozinha.webp',
    thumb: '/images/cozinha-thumb.webp',
    caption: 'Cozinha Equipada com Ilha — Bancadas em composto nobre e arrumação integrada.',
  },
  {
    title: 'Master Suite',
    full: '/images/quarto-cama.webp',
    thumb: '/images/quarto-cama-thumb.webp',
    caption: 'Master Suite — Quarto principal amplo com closet privativo e acabamentos personalizáveis.',
  },
  {
    title: 'Varanda Quarto',
    full: '/images/quarto-varanda.webp',
    thumb: '/images/quarto-varanda-thumb.webp',
    caption: 'Quarto com Varanda — Espaço exterior privativo no Piso 1 com guarda-corpos em vidro.',
  },
];
