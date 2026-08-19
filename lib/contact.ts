export const WHATSAPP_NUMBER = '5585984425281'

export const WHATSAPP_MESSAGE =
  'Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de falar sobre imóveis na Orla de Fortaleza.'

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`

export const WHATSAPP_VALUATION_MESSAGE =
  'Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de conversar sobre a avaliação e o posicionamento do meu imóvel.'

export const WHATSAPP_VALUATION_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_VALUATION_MESSAGE,
)}`

export const WHATSAPP_BUY_MESSAGE =
  'Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de encontrar um imóvel para comprar na Orla de Fortaleza.'

export const WHATSAPP_BUY_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_BUY_MESSAGE,
)}`

interface PropertyContactData {
  title: string
  neighborhood: string
  slug: string
  message?: string
}

export function getPropertyWhatsAppUrl({
  title,
  neighborhood,
  slug,
  message,
}: PropertyContactData): string {
  const propertyUrl = `https://www.adrizio.com.br/imoveis/${slug}`

  const contactMessage = message
    ? `${message}\n\nAnúncio: ${propertyUrl}`
    : `Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de saber mais sobre o imóvel ` +
      `"${title}", localizado em ${neighborhood}. ${propertyUrl}`

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(contactMessage)}`
}

export const WHATSAPP_INVESTMENT_MESSAGE =
  'Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de analisar oportunidades de investimento imobiliário na Orla de Fortaleza.'

export const WHATSAPP_INVESTMENT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_INVESTMENT_MESSAGE,
)}`

export const WHATSAPP_RENT_MESSAGE =
  'Olá, Adrizio. Vim pelo site ADRIZIO e gostaria de encontrar um imóvel para alugar na Orla de Fortaleza.'

export const WHATSAPP_RENT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_RENT_MESSAGE,
)}`

export const WHATSAPP_REAL_PROPERTIES_MESSAGE =
  'Olá, Adrizio. Vim pelo Site Adrizio e gostaria de conversar sobre imóveis reais disponíveis na Orla de Fortaleza.'

export const WHATSAPP_REAL_PROPERTIES_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_REAL_PROPERTIES_MESSAGE,
)}`
