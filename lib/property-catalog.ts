import 'server-only'

import { featuredProperties } from '@/data/featured-properties'

import type { Property } from '@/types/property'

export function isDatabaseCatalogEnabled(): boolean {
  return process.env.NODE_ENV === 'development' && process.env.CATALOG_SOURCE === 'database'
}

export async function getCatalogProperties(): Promise<Property[]> {
  if (isDatabaseCatalogEnabled()) {
    const { listPublishedProperties } = await import('@/lib/property-repository')

    return listPublishedProperties()
  }

  return featuredProperties
}
