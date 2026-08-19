export type PropertyPurpose = 'venda' | 'aluguel' | 'investimento'

export type RentalModality = 'longa-temporada' | 'curta-temporada'

export type PropertyType = 'apartamento' | 'cobertura' | 'flat' | 'casa' | 'terreno'

export interface PropertyImage {
  src: string
  alt: string
}

export interface PropertyDetailsSection {
  title: string
  description?: string
  items?: string[]
}

export interface Property {
  id: string
  slug: string
  title: string
  neighborhood: string
  city: string
  purpose: PropertyPurpose
  type: PropertyType
  rentalModality?: RentalModality
  price?: number
  priceLabel?: string
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  area: number
  maxGuests?: number
  address?: string
  description?: string
  features?: string[]
  image?: string
  imageAlt?: string
  gallery?: PropertyImage[]
  imageDisclaimer?: string
  detailsSections?: PropertyDetailsSection[]
  contactMessage?: string
  contactCta?: string
  contactHeading?: string
  contactDescription?: string
  featured?: boolean
  demonstrative?: boolean
}
