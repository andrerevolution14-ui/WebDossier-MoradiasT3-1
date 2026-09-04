import { PROJECT } from './project';

export const CALENDLY_URL = 'https://calendly.com/queirosenterprise/30min';

/** Objectivo da LP: vender a chamada com o gestor — o gestor conduz a venda */
export const CTA_PRIMARY = 'QUERO RECEBER CHAMADA';

export const CTA_SHORT = 'Receber Chamada';

export const TRUST_POINTS = [
  { icon: '◆', text: 'Mapa Detalhado' },
  { icon: '◆', text: 'Opção T4 Disponível' },
  { icon: '◆', text: 'Acesso Imediato' },
] as const;

export const VIABILITY_STEPS = [
  {
    step: '1',
    title: 'Deixe o seu contacto',
    body: 'Indique nome e telemóvel. O processo demora menos de 1 minuto e a privacidade é garantida.',
  },
  {
    step: '2',
    title: 'Receba o material',
    body: `Enviamos-lhe de imediato o mapa de acabamentos e os detalhes técnicos da moradia.`,
  },
  {
    step: '3',
    title: 'Analise e decida',
    body: 'Avalie os detalhes, a qualidade de construção e os materiais sem qualquer compromisso.',
  },
] as const;

export const VIABILITY_FAQ = [
  {
    q: 'O que vou receber?',
    a: `Terá acesso ao mapa de acabamentos detalhado com todos os materiais da moradia de ${PROJECT.price}€ (Avaliação bancária: ${PROJECT.priceAppraisal}€).`,
  },
  {
    q: 'Quantas unidades restam?',
    a: `${PROJECT.unitsAvailable} unidades disponíveis — ${PROJECT.unitsReserved} já foi reservada (de ${PROJECT.unitsTotal} no empreendimento).`,
  },
  {
    q: 'O que posso personalizar?',
    a: 'Todas as áreas e acabamentos, com um gestor dedicado a orientar as suas escolhas enquanto a obra está em curso.',
  },
  {
    q: 'Porque comprar em planta?',
    a: 'Apoio bancário à obra, benefícios fiscais e preço fechado com personalização total.',
  },
  {
    q: 'Existe algum compromisso?',
    a: 'Não. O envio do mapa de acabamentos e detalhes técnicos é 100% gratuito e sem qualquer compromisso de compra.',
  },
  {
    q: 'E se o banco recusar o crédito futuramente?',
    a: 'Em caso de avançar, temos proteção contratual: sinal devolvido se a recusa for por motivos alheios ao comprador.',
  },
] as const;
