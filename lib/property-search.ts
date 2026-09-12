import type { Property, PropertyPurpose, PropertyType, RentalModality } from '@/types/property'

export const PROPERTY_SEARCH_FIELDS = [
  'finalidade',
  'modalidade',
  'bairro',
  'tipo',
  'preco',
  'quartos',
] as const

export type PropertySearchField = (typeof PROPERTY_SEARCH_FIELDS)[number]

type SearchParamValue = string | string[] | undefined

export type PropertySearchParams = Record<string, SearchParamValue>

export type PropertySearchValues = Record<PropertySearchField, string>

export const PROPERTY_SEARCH_ALLOWED_VALUES: Record<PropertySearchField, readonly string[]> = {
  finalidade: ['comprar', 'alugar', 'investir'],
  modalidade: ['longa-temporada', 'curta-temporada'],
  bairro: ['beira-mar', 'meireles', 'mucuripe', 'praia-de-iracema', 'praia-do-futuro', 'cumbuco'],
  tipo: ['apartamento', 'cobertura', 'flat', 'casa', 'terreno'],
  preco: ['ate-500000', 'ate-1000000', 'ate-2000000', 'ate-5000000', 'acima-5000000'],
  quartos: ['1', '2', '3', '4'],
}

export const PROPERTY_SEARCH_DEFAULT_VALUES: PropertySearchValues = {
  finalidade: 'comprar',
  modalidade: '',
  bairro: '',
  tipo: '',
  preco: '',
  quartos: '',
}

const purposeMap: Record<string, PropertyPurpose | undefined> = {
  comprar: 'venda',
  alugar: 'aluguel',
  investir: 'investimento',
}

const propertyTypeMap: Record<string, PropertyType | undefined> = {
  apartamento: 'apartamento',
  cobertura: 'cobertura',
  flat: 'flat',
  casa: 'casa',
  terreno: 'terreno',
}

const rentalModalityMap: Record<string, RentalModality | undefined> = {
  'longa-temporada': 'longa-temporada',
  'curta-temporada': 'curta-temporada',
}

const neighborhoodSlugMap: Record<string, string> = {
  'beira-mar': 'beira-mar',
  meireles: 'meireles',
  mucuripe: 'mucuripe',
  'praia-de-iracema': 'praia de iracema',
  'praia-do-futuro': 'praia do futuro',
  cumbuco: 'cumbuco',
}

function getFirstSearchParamValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function matchesPrice(property: Property, priceFilter: string): boolean {
  if (priceFilter && property.price === undefined) {
    return false
  }

  switch (priceFilter) {
    case 'ate-500000':
      return property.price !== undefined && property.price <= 500000
    case 'ate-1000000':
      return property.price !== undefined && property.price <= 1000000
    case 'ate-2000000':
      return property.price !== undefined && property.price <= 2000000
    case 'ate-5000000':
      return property.price !== undefined && property.price <= 5000000
    case 'acima-5000000':
      return property.price !== undefined && property.price > 5000000
    default:
      return true
  }
}

export function isAllowedPropertySearchValue(field: PropertySearchField, value: string): boolean {
  return PROPERTY_SEARCH_ALLOWED_VALUES[field].includes(value)
}

export function getPropertySearchValues(
  searchParams: PropertySearchParams,
  defaults: Partial<PropertySearchValues> = {},
): PropertySearchValues {
  const values: PropertySearchValues = {
    ...PROPERTY_SEARCH_DEFAULT_VALUES,
    ...defaults,
  }

  PROPERTY_SEARCH_FIELDS.forEach((field) => {
    const value = getFirstSearchParamValue(searchParams[field])

    if (typeof value === 'string' && isAllowedPropertySearchValue(field, value)) {
      values[field] = value
    }
  })

  return values
}

export function hasAppliedPropertySearchParams(searchParams: PropertySearchParams): boolean {
  return PROPERTY_SEARCH_FIELDS.some((field) => {
    const value = getFirstSearchParamValue(searchParams[field])

    return Boolean(typeof value === 'string' && isAllowedPropertySearchValue(field, value))
  })
}

export function filterProperties(
  properties: Property[],
  filters: PropertySearchValues,
): Property[] {
  const selectedPurpose = purposeMap[filters.finalidade]
  const selectedType = propertyTypeMap[filters.tipo]
  const selectedRentalModality = rentalModalityMap[filters.modalidade]

  return properties.filter((property) => {
    if (selectedPurpose && property.purpose !== selectedPurpose) {
      return false
    }

    if (selectedRentalModality && property.rentalModality !== selectedRentalModality) {
      return false
    }

    if (selectedType && property.type !== selectedType) {
      return false
    }

    if (filters.bairro) {
      const selectedNeighborhood = neighborhoodSlugMap[filters.bairro]

      if (
        selectedNeighborhood &&
        normalizeText(property.neighborhood) !== normalizeText(selectedNeighborhood)
      ) {
        return false
      }
    }

    if (filters.quartos && property.bedrooms < Number(filters.quartos)) {
      return false
    }

    if (!matchesPrice(property, filters.preco)) {
      return false
    }

    return true
  })
}

export function getPropertySearchSummary(filters: PropertySearchValues): string {
  const parts: string[] = []

  if (filters.finalidade === 'comprar') {
    parts.push('para compra')
  }

  if (filters.finalidade === 'alugar') {
    parts.push('para locação')
  }

  if (filters.finalidade === 'investir') {
    parts.push('para investimento')
  }

  if (filters.modalidade === 'longa-temporada') {
    parts.push('de longa temporada')
  }

  if (filters.modalidade === 'curta-temporada') {
    parts.push('de curta temporada')
  }

  if (filters.tipo) {
    parts.push(`do tipo ${filters.tipo}`)
  }

  if (filters.bairro) {
    const neighborhood = neighborhoodSlugMap[filters.bairro]

    if (neighborhood) {
      parts.push(`em ${neighborhood}`)
    }
  }

  if (filters.quartos) {
    parts.push(`com ${filters.quartos} ou mais quartos`)
  }

  return parts.length > 0 ? parts.join(' ') : 'na Orla de Fortaleza'
}
