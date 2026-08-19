import type { Property } from '@/types/property'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function getPropertyPriceLabel(property: Property): string {
  if (property.priceLabel) {
    return property.priceLabel
  }

  if (property.price !== undefined) {
    return currencyFormatter.format(property.price)
  }

  return 'Valor sob consulta'
}
