export const PROPERTY_SEARCH_FIELDS = ['finalidade', 'bairro', 'tipo', 'preco', 'quartos'] as const

export type PropertySearchField = (typeof PROPERTY_SEARCH_FIELDS)[number]

type SearchParamValue = string | string[] | undefined

export type PropertySearchParams = Record<string, SearchParamValue>

export type PropertySearchValues = Record<PropertySearchField, string>

export const PROPERTY_SEARCH_ALLOWED_VALUES: Record<PropertySearchField, readonly string[]> = {
  finalidade: ['comprar', 'alugar', 'investir'],
  bairro: ['beira-mar', 'meireles', 'mucuripe', 'praia-de-iracema', 'praia-do-futuro', 'cumbuco'],
  tipo: ['apartamento', 'cobertura', 'flat', 'casa', 'terreno'],
  preco: ['ate-500000', 'ate-1000000', 'ate-2000000', 'ate-5000000', 'acima-5000000'],
  quartos: ['1', '2', '3', '4'],
}

export const PROPERTY_SEARCH_DEFAULT_VALUES: PropertySearchValues = {
  finalidade: 'comprar',
  bairro: '',
  tipo: '',
  preco: '',
  quartos: '',
}

function getFirstSearchParamValue(value: SearchParamValue): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export function isAllowedPropertySearchValue(field: PropertySearchField, value: string): boolean {
  return PROPERTY_SEARCH_ALLOWED_VALUES[field].includes(value)
}

export function getPropertySearchValues(searchParams: PropertySearchParams): PropertySearchValues {
  const values: PropertySearchValues = {
    ...PROPERTY_SEARCH_DEFAULT_VALUES,
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
