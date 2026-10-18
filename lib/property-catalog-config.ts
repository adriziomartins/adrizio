export type CatalogSource = 'static' | 'database'

export function resolveCatalogSource(value: string | undefined): CatalogSource {
  if (value === undefined || value === '' || value === 'static') {
    return 'static'
  }

  if (value === 'database') {
    return 'database'
  }

  throw new Error(`CATALOG_SOURCE_INVALID: ${value}`)
}
