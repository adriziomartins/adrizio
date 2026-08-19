import type { Property } from '@/types/property'

export const featuredProperties: Property[] = [
  {
    id: 'BCF-TEMP-01',
    slug: 'beach-class-fortaleza-temporada',
    title: 'Beach Class Fortaleza — apartamentos de 2 quartos para temporada',
    neighborhood: 'Meireles',
    city: 'Fortaleza',
    purpose: 'aluguel',
    type: 'apartamento',
    rentalModality: 'curta-temporada',
    priceLabel: 'Valor sob consulta',
    bedrooms: 2,
    bathrooms: 1,
    parkingSpaces: 1,
    area: 56,
    maxGuests: 5,
    address: 'Rua Barão de Aracati, 145 — Meireles, Fortaleza–CE',
    description:
      'Apartamentos mobiliados no Beach Class Fortaleza para estadias de curta duração, com diferentes unidades disponíveis para acomodar de 1 a 5 pessoas. As unidades possuem dois quartos, sala, cozinha equipada com itens básicos para o preparo de refeições, banheiro e varanda.',
    features: [
      'Wi-Fi em todas as unidades',
      'Ar-condicionado nos quartos',
      'Smart TV',
      'Varanda em todas as unidades',
      'Cozinha equipada',
      'Máquina de lavar roupas',
      'Roupa de cama e toalhas incluídas',
      '7 piscinas',
      'Academia e sauna',
      'Quadra esportiva e salão de jogos',
      'Brinquedoteca e espaço infantil',
      'Espaço para home office',
      'Restaurante',
      'Lavanderia no condomínio',
      'Recepção, portaria e segurança 24 horas',
    ],
    image: '/images/properties/beach-class-fortaleza/piscina-e-torres.jpg',
    imageAlt: 'Piscina e torres do Beach Class Fortaleza no Meireles',
    gallery: [
      {
        src: '/images/properties/beach-class-fortaleza/piscina-e-torres.jpg',
        alt: 'Piscina e torres do Beach Class Fortaleza no Meireles',
      },
      {
        src: '/images/properties/beach-class-fortaleza/sala.jpg',
        alt: 'Sala mobiliada de uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/cozinha.jpg',
        alt: 'Cozinha equipada de uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/sala-de-jantar-e-cozinha.jpg',
        alt: 'Sala de jantar integrada à cozinha em uma unidade de referência',
      },
      {
        src: '/images/properties/beach-class-fortaleza/quarto-com-cama-de-casal.jpg',
        alt: 'Quarto com cama de casal e ar-condicionado em uma unidade de referência',
      },
      {
        src: '/images/properties/beach-class-fortaleza/varanda.jpg',
        alt: 'Varanda mobiliada de uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/banheiro.jpg',
        alt: 'Banheiro de uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/sala-com-smart-tv.jpg',
        alt: 'Sala com Smart TV em uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/sofa-cama.jpg',
        alt: 'Sofá-cama de uma unidade de referência do Beach Class Fortaleza',
      },
      {
        src: '/images/properties/beach-class-fortaleza/utensilios-de-cozinha.jpg',
        alt: 'Utensílios de cozinha de uma unidade de referência do Beach Class Fortaleza',
      },
    ],
    imageDisclaimer:
      'As fotografias internas apresentam uma unidade real e autorizada do Beach Class Fortaleza. Mobiliário, decoração, distribuição das camas, varanda e vista podem variar conforme o apartamento disponível.',
    detailsSections: [
      {
        title: 'Configuração das acomodações',
        description:
          'A distribuição das camas varia conforme o apartamento disponível. Existem unidades com cama de casal e beliche e outras com camas de casal nos dois quartos. A acomodação complementar poderá ser feita em sofá-cama ou colchão extra. Algumas unidades possuem vista para o mar.',
      },
      {
        title: 'Check-in e check-out',
        items: [
          'Check-in a partir das 14h',
          'Check-out até as 11h',
          'Entrada antecipada ou saída estendida mediante consulta e disponibilidade',
          'Check-in e check-out realizados na recepção',
        ],
      },
      {
        title: 'Condições da hospedagem',
        items: [
          'Animais de estimação mediante consulta, pois nem todas as unidades permitem',
          'Festas e eventos são proibidos',
          'Silêncio obrigatório após as 22h',
          'Visitantes somente com autorização prévia do anfitrião e liberação informada à recepção',
          'Estadia mínima varia conforme a unidade, as datas e o período',
          'Taxa de limpeza poderá ser cobrada separadamente, conforme o apartamento',
          'Férias, feriados e alta estação podem ter valores e condições diferentes',
        ],
      },
    ],
    contactHeading: 'Consulte as unidades disponíveis',
    contactDescription:
      'A reserva não é instantânea. O corretor Adrizio confirmará a unidade, a configuração das camas, as condições e o valor final para o período solicitado.',
    contactCta: 'Consultar disponibilidade no WhatsApp',
    contactMessage:
      'Olá, Adrizio! Quero consultar uma hospedagem no Beach Class Fortaleza.\n\nEntrada:\nSaída:\nNúmero de hóspedes:\nCrianças:\nAnimal de estimação: sim/não.',
    featured: true,
    demonstrative: false,
  },
  {
    id: 'demo-002',
    slug: 'apartamento-mucuripe-demo',
    title: 'Residência próxima à Beira-Mar',
    neighborhood: 'Mucuripe',
    city: 'Fortaleza',
    purpose: 'venda',
    type: 'apartamento',
    price: 2400000,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpaces: 3,
    area: 210,
    description:
      'Residência demonstrativa de alto padrão no Mucuripe, com ambientes generosos e proximidade com a Avenida Beira-Mar.',
    features: [
      'Planta ampla',
      'Varanda',
      'Dependência completa',
      'Portaria',
      'Três vagas de garagem',
      'Área de lazer',
    ],
    featured: true,
    demonstrative: true,
  },
  {
    id: 'demo-003',
    slug: 'apartamento-praia-iracema-demo',
    title: 'Apartamento para viver ou investir',
    neighborhood: 'Praia de Iracema',
    city: 'Fortaleza',
    purpose: 'investimento',
    type: 'apartamento',
    price: 980000,
    bedrooms: 2,
    bathrooms: 2,
    parkingSpaces: 1,
    area: 82,
    description:
      'Apartamento demonstrativo na Praia de Iracema, adequado para moradia, geração de renda ou composição patrimonial.',
    features: [
      'Localização turística',
      'Varanda',
      'Elevador',
      'Portaria',
      'Uma vaga de garagem',
      'Potencial para investimento',
    ],
    featured: true,
    demonstrative: true,
  },
]
