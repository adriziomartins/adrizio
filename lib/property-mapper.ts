import { z } from 'zod'

import type { Prisma } from '@/generated/prisma/client'
import type { Property } from '@/types/property'

export const catalogInclude = {
  region: true,
  media: {
    orderBy: {
      position: 'asc',
    },
  },
} as const

type CatalogRecord = Prisma.PropertyGetPayload<{
  include: typeof catalogInclude
}>

const propertyTypes = {
  APARTMENT: 'apartamento',
  PENTHOUSE: 'cobertura',
  FLAT: 'flat',
  HOUSE: 'casa',
  LAND: 'terreno',
} as const

const detailsSectionsSchema = z.array(
  z.object({
    title: z.string(),
    description: z.string().optional(),
    items: z.array(z.string()).optional(),
  }),
)

export function toFrontendProperty(record: CatalogRecord): Property {
  if (!record.region) {
    throw new Error(`CATALOG_REGION_MISSING: ${record.code}`)
  }

  if (
    record.type !== 'LAND' &&
    (record.bedrooms === null ||
      record.bathrooms === null ||
      record.parkingSpaces === null ||
      record.area === null)
  ) {
    throw new Error(`CATALOG_REQUIRED_FIELDS_MISSING: ${record.code}`)
  }

  const purpose: Property['purpose'] = record.purpose === 'RENT' ? 'aluguel' : 'venda'

  const rentalModality: Property['rentalModality'] =
    record.rentalModality === 'SHORT_STAY'
      ? 'curta-temporada'
      : record.rentalModality === 'LONG_TERM'
        ? 'longa-temporada'
        : undefined

  const databasePrice =
    record.purpose === 'SALE'
      ? record.salePrice
      : record.rentalModality === 'SHORT_STAY'
        ? record.dailyRate
        : record.rentalModality === 'LONG_TERM'
          ? record.monthlyRent
          : null

  const images = record.media.filter((media) => media.type === 'IMAGE')

  const cover = images.find((media) => media.isCover) ?? images[0]

  const orderedImages = cover ? [cover, ...images.filter((media) => media.id !== cover.id)] : []

  return {
    id: record.code,
    slug: record.slug,
    title: record.title,
    neighborhood: record.region.name,
    city: record.region.city,
    purpose,
    investmentOpportunity: record.investmentOpportunity,
    type: propertyTypes[record.type],
    rentalModality,
    price: databasePrice?.toNumber(),
    priceLabel: record.priceLabel ?? undefined,
    bedrooms: record.bedrooms ?? undefined,
    bathrooms: record.bathrooms ?? undefined,
    parkingSpaces: record.parkingSpaces ?? undefined,
    area: record.area?.toNumber(),
    maxGuests: record.maxGuests ?? undefined,
    address: record.address ?? undefined,
    description: record.description ?? undefined,
    features: record.features,
    image: cover?.url,
    imageAlt: cover?.alt ?? undefined,
    gallery: orderedImages.map((media) => ({
      src: media.url,
      alt: media.alt ?? record.title,
    })),
    imageDisclaimer: record.imageDisclaimer ?? undefined,
    detailsSections:
      record.detailsSections === null
        ? undefined
        : detailsSectionsSchema.parse(record.detailsSections),
    contactHeading: record.contactHeading ?? undefined,
    contactDescription: record.contactDescription ?? undefined,
    contactCta: record.contactCta ?? undefined,
    contactMessage: record.contactMessage ?? undefined,
    featured: record.featured,
    demonstrative: record.demonstrative,
  }
}
