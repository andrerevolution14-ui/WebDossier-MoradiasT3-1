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
  bankProcessValue: number;
  bankProcessValueFormatted: string;
  bankAppraisal: number;
  bankAppraisalFormatted: string;
  immediateEquity: number;
  immediateEquityFormatted: string;
  ivaRefund: number;
  ivaRefundFormatted: string;
  depositAmount: number;
  depositAmountFormatted: string;
  taxSavings: number;
  taxSavingsFormatted: string;
  landImtTaxes: number;
  landImtTaxesFormatted: string;
  traditionalImtTaxes: number;
  traditionalImtTaxesFormatted: string;
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
  price: 329000,
  priceFormatted: '329.000€',
  priceWithTaxes: 335000,
  priceWithTaxesFormatted: '335.000€ (c/ IMT e Selo)',
  bankProcessValue: 360000,
  bankProcessValueFormatted: '360.000€',
  bankAppraisal: 450000,
  bankAppraisalFormatted: '450.000€',
  immediateEquity: 121000,
  immediateEquityFormatted: '+121.000€',
  ivaRefund: 31500,
  ivaRefundFormatted: '31.500€',
  depositAmount: 38500,
  depositAmountFormatted: '38.500€',
  taxSavings: 23700,
  taxSavingsFormatted: '~23.700€',
  landImtTaxes: 3480,
  landImtTaxesFormatted: '~3.480€',
  traditionalImtTaxes: 27180,
  traditionalImtTaxesFormatted: '~27.180€',
  mapsEmbed:
    'https://maps.google.com/maps?q=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha&hl=pt&z=16&output=embed',
  googleMapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=R.+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+3810-843+Oliveirinha',
};

export const WHATSAPP_PHONE = '351920601070';

export const CRITICAL_MICRO_STATS = [
  {
    badge: 'Equity Imediato',
    icon: '💎',
    number: '+121.000€',
    label: 'Avaliação Bancária: 450.000€',
    desc: 'Comprando em planta por 329.000€, cria um ganho patrimonial líquido instantâneo de 121k€ na escritura.',
    highlight: true,
  },
  {
    badge: 'Garantia Rigorosa',
    icon: '⏱️',
    number: '10 Meses',
    label: 'Preço Fechado Sem Desvios',
    desc: 'Contrato de empreitada chave na mão com valor blindado e cronograma semanal de execução.',
    highlight: false,
  },
  {
    badge: 'Segurança Contratual',
    icon: '🛡️',
    number: '100%',
    label: 'Sinal Protegido (38.500€)',
    desc: 'Cláusula expressa de devolução integral do sinal se o banco recusar financiamento por motivos alheios.',
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
