/** Identidade e dados institucionais do projeto */
export const PROJECT = {
  name: 'DOMAINE DU VINGT-CINQ',
  nameDisplay: 'Domaine du Vingt-Cinq',
  typology: 'T3',
  areaSqm: '185',
  addressLine: 'Rua Acácio Simões Vieira, 25',
  locality: 'Quintas, Oliveirinha, Aveiro',
  fullAddress: 'Rua Acácio Simões Vieira, 25, Quintas, Oliveirinha, Aveiro',
  unitsTotal: 3,
  unitsReserved: 1,
  unitsAvailable: 2,
  deliveryLabel: '10 meses',
  callDuration: '~10 min',
  price: '390.000',
  priceAppraisal: '450.000',
  promoter: 'Silvermont Capital',
  managerTitle: 'Gestor de Projeto dedicado',
  mapsEmbed:
    'https://maps.google.com/maps?q=Rua+Ac%C3%A1cio+Sim%C3%B5es+Vieira,+25,+Quintas,+Oliveirinha,+Aveiro,+3810-000,+Portugal&hl=pt&z=17&output=embed',
} as const;

export const UNITS_LABEL = `${PROJECT.unitsAvailable} unidades disponíveis · ${PROJECT.unitsReserved} já reservada`;

export const PROJECT_HIGHLIGHTS = [
  {
    label: 'Disponibilidade',
    value: `${PROJECT.unitsAvailable} unidades`,
    detail: `${PROJECT.unitsReserved} já reservada · ${PROJECT.unitsTotal} no total`,
  },
  {
    label: 'Comercialização',
    value: `${PROJECT.price}€`,
    detail: 'Venda directa · compra em planta',
  },
  {
    label: 'Avaliação bancária',
    value: `${PROJECT.priceAppraisal}€`,
    detail: 'Valor avaliado pelo banco',
  },
  {
    label: 'Acesso imediato',
    value: 'Envio no minuto',
    detail: 'Mapa de acabamentos no WhatsApp',
  },
] as const;
