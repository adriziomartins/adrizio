import 'server-only'

import { catalogInclude, toFrontendProperty } from '@/lib/property-mapper'
import { getPrisma } from '@/lib/prisma'
import type { Property } from '@/types/property'

export async function listPublishedProperties(): Promise<Property[]> {
  const records = await getPrisma().property.findMany({
    where: {
      status: 'PUBLISHED',
      demonstrative: false,
    },
    include: catalogInclude,
    orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }, { code: 'asc' }],
  })

  return records.map(toFrontendProperty)
}

export async function getPublishedPropertyBySlug(slug: string): Promise<Property | null> {
  const record = await getPrisma().property.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
      demonstrative: false,
    },
    include: catalogInclude,
  })

  return record ? toFrontendProperty(record) : null
}
