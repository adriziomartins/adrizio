import type { Property } from '@/types/property'

export const casaPirambu: Property = {
  id: 'PIR-VEN-01',
  slug: 'casa-venda-pirambu-fortaleza-vista-mar',
  title: 'Casa com 3 quartos e varanda com vista para o mar',
  neighborhood: 'Pirambu',
  city: 'Fortaleza',
  purpose: 'venda',
  type: 'casa',
  price: 350000,
  bedrooms: 3,
  bathrooms: 3,
  parkingSpaces: 2,
  area: 127,
  address: 'Rua Nossa Senhora das Graças, 448 — Pirambu, Fortaleza–CE',
  description:
    'Casa com 127 m² de área construída, distribuída em subsolo, térreo e primeiro andar. Possui 3 quartos, 3 banheiros, 2 cozinhas, garagem para até 2 carros e 2 varandas, uma delas com vista para o mar. A sala do primeiro andar tem teto em madeira. Documentação pendente de verificação: foi informado registro de uso, cuja natureza e condições de transferência ainda precisam ser confirmadas. Financiamento não confirmado.',
  features: [
    '127 m² de área construída informada',
    '3 pavimentos: subsolo, térreo e primeiro andar',
    '2 cozinhas',
    '2 varandas, uma com vista para o mar',
    'Garagem para até 2 carros',
    'Lavanderia e áreas de serviço',
    'Sala com teto em madeira',
    'Fachada revestida em azulejos',
    'Porcelanato branco nos ambientes internos',
    'Cimento queimado nas áreas externas',
  ],
  image: '/images/properties/casa-pirambu/fachada.png',
  imageAlt: 'Fachada da casa na Rua Nossa Senhora das Graças, no Pirambu',
  gallery: [
    { src: '/images/properties/casa-pirambu/fachada.png', alt: 'Fachada da casa no Pirambu' },
    { src: '/images/properties/casa-pirambu/sala.png', alt: 'Sala ampla com teto em madeira' },
    { src: '/images/properties/casa-pirambu/varanda.png', alt: 'Varanda com vista para o mar' },
    { src: '/images/properties/casa-pirambu/cozinha.png', alt: 'Cozinha da casa' },
    { src: '/images/properties/casa-pirambu/quarto.png', alt: 'Um dos quartos da casa' },
    { src: '/images/properties/casa-pirambu/banheiros.png', alt: 'Imagens dos banheiros da casa' },
    { src: '/images/properties/casa-pirambu/garagem.png', alt: 'Garagem da casa' },
  ],
  imageDisclaimer:
    'Fotos do imóvel fornecidas para divulgação. A inclusão de móveis e eletrodomésticos na negociação depende de confirmação.',
  detailsSections: [
    {
      title: 'Documentação e condições da negociação',
      description:
        'Foi informado registro de uso. A documentação ainda será conferida no cartório para esclarecer a titularidade, a existência de matrícula individual ou vínculo com matrícula-mãe, a natureza do direito e as condições de sua transferência. A divulgação não confirma propriedade plena, regularização concluída ou possibilidade de financiamento. Essas informações devem ser esclarecidas antes de qualquer compromisso ou pagamento.',
    },
    {
      title: 'Subsolo',
      items: ['Sala de estar', '2 quartos', 'Cozinha', 'Banheiro', 'Área de serviço'],
    },
    {
      title: 'Térreo',
      items: [
        'Cozinha',
        'Quarto',
        'Banheiro',
        'Lavanderia',
        'Garagem para até 2 carros',
        'Área de serviço',
      ],
    },
    {
      title: 'Primeiro andar',
      items: ['Sala ampla com teto em madeira', '2 varandas, uma com vista para o mar', 'Banheiro'],
    },
    {
      title: 'Medidas e acabamentos',
      description:
        'Área construída informada de 127 m², com frente de 3,80 m e profundidade de 25 m. Medidas e áreas sujeitas à conferência documental. Fachada em azulejos, pisos internos em porcelanato branco e áreas externas em cimento queimado.',
    },
  ],
  contactHeading: 'Conheça a casa e as condições',
  contactDescription:
    'Valor anunciado: R$ 350.000. Documentação pendente de verificação no cartório; financiamento não confirmado. Fale com Adrizio para consultar a situação documental e agendar uma visita.',
  contactCta: 'Consultar condições e visitar',
  contactMessage:
    'Olá, Adrizio! Tenho interesse na casa do Pirambu, referência PIR-VEN-01, anunciada por R$ 350.000. Gostaria de esclarecer a documentação e as condições da negociação e agendar uma visita.',
  featured: true,
  demonstrative: false,
}
