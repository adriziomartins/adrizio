export type PropertyPurpose = 'venda' | 'aluguel' | 'investimento'

export interface Property {
  id: string
  slug: string
  title: string
  neighborhood: string
  city: string
  purpose: PropertyPurpose
  price: number
  bedrooms: number
  bathrooms: number
  parkingSpaces: number
  area: number
  image?: string
  featured?: boolean
  demonstrative?: boolean
}
