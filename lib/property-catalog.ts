import 'server-only'

import { unstable_cache } from 'next/cache'

import { featuredProperties } from '@/data/featured-properties'
import { resolveCatalogSource } from '@/lib/property-catalog-config'

import type { Property } from '@/types/property'

const CATALOG_REVALIDATE_SECONDS = 300

const getCachedPublishedProperties = unstable_cache(
  async (): Promise<Property[]> => {
    const { listPublishedProperties } = await import('@/lib/property-repository')

    return listPublishedProperties()
  },
  ['catalog-published-properties'],
  {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: ['property-catalog'],
  },
)

const getCachedPublishedPropertyBySlug = unstable_cache(
  async (slug: string): Promise<Property | null> => {
    const { getPublishedPropertyBySlug } = await import('@/lib/property-repository')

    return getPublishedPropertyBySlug(slug)
  },
  ['catalog-published-property-by-slug'],
  {
    revalidate: CATALOG_REVALIDATE_SECONDS,
    tags: ['property-catalog'],
  },
)

export function isDatabaseCatalogEnabled(): boolean {
  return resolveCatalogSource(process.env.CATALOG_SOURCE) === 'database'
}

export async function getCatalogProperties(): Promise<Property[]> {
  if (isDatabaseCatalogEnabled()) {
    return getCachedPublishedProperties()
  }

  return featuredProperties
}

export async function getCatalogPropertyBySlug(slug: string): Promise<Property | null> {
  if (isDatabaseCatalogEnabled()) {
    return getCachedPublishedPropertyBySlug(slug)
  }

  return featuredProperties.find((property) => property.slug === slug) ?? null
}
