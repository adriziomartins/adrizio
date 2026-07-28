export type PropertyPurpose = 'venda' | 'aluguel' | 'investimento'

export type RentalModality = 'longa-temporada' | 'curta-temporada'

export interface Property {
  id: string
  slug: string
  title: string
  neighborhood: string
  city: string
  purpose: PropertyPurpose
  rentalModality?: RentalModality
  price: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  area: number
  image?: string
  featured?: boolean
  demonstrative?: boolean
}
