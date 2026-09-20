import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'

import { featuredProperties } from '../data/featured-properties'
import { regions } from '../data/regions'
import { Prisma, PrismaClient } from '../generated/prisma/client'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL não está definida.')
}

const databaseUrl = new URL(connectionString)

if (
  process.env.NODE_ENV === 'production' ||
  !['127.0.0.1', 'localhost'].includes(databaseUrl.hostname) ||
  databaseUrl.pathname !== '/adrizio_dev'
) {
  throw new Error('SEED_BLOCKED: permitido somente no adrizio_dev local.')
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

const propertyTypeMap = {
  apartamento: 'APARTMENT',
  cobertura: 'PENTHOUSE',
  flat: 'FLAT',
  casa: 'HOUSE',
  terreno: 'LAND',
} as const

const rentalModalityMap = {
  'longa-temporada': 'LONG_TERM',
  'curta-temporada': 'SHORT_STAY',
} as const

async function seedRegions() {
  for (const region of regions) {
    await prisma.region.upsert({
      where: {
        slug: region.slug,
      },
      update: {
        name: region.name,
        city: region.city,
        state: 'CE',
        description: region.description,
        highlight: region.highlight,
        seoPath: region.seoPath,
        active: true,
      },
      create: {
        slug: region.slug,
        name: region.name,
        city: region.city,
        state: 'CE',
        description: region.description,
        highlight: region.highlight,
        seoPath: region.seoPath,
        active: true,
      },
    })
  }
}

async function seedProperties() {
  const persistedRegions = await prisma.region.findMany({
    select: {
      id: true,
      slug: true,
      name: true,
      city: true,
    },
  })

  for (const property of featuredProperties) {
    const region = persistedRegions.find(
      (candidate) => candidate.name === property.neighborhood && candidate.city === property.city,
    )

    if (!region) {
      throw new Error(
        `Região não encontrada para o imóvel ${property.id}: ${property.neighborhood}/${property.city}`,
      )
    }

    const purpose = property.purpose === 'aluguel' ? ('RENT' as const) : ('SALE' as const)

    const rentalModality = property.rentalModality
      ? rentalModalityMap[property.rentalModality]
      : null

    const investmentOpportunity =
      property.investmentOpportunity === true || property.purpose === 'investimento'

    const salePrice =
      property.purpose === 'venda' || property.purpose === 'investimento'
        ? (property.price ?? null)
        : null

    const monthlyRent =
      property.purpose === 'aluguel' && property.rentalModality === 'longa-temporada'
        ? (property.price ?? null)
        : null

    const dailyRate =
      property.purpose === 'aluguel' && property.rentalModality === 'curta-temporada'
        ? (property.price ?? null)
        : null

    const detailsSections = property.detailsSections
      ? (JSON.parse(JSON.stringify(property.detailsSections)) as Prisma.InputJsonValue)
      : Prisma.DbNull

    const propertyData = {
      slug: property.slug,
      title: property.title,
      description: property.description ?? null,
      purpose,
      rentalModality,
      type: propertyTypeMap[property.type],
      status: 'PUBLISHED' as const,
      investmentOpportunity,
      salePrice,
      monthlyRent,
      dailyRate,
      cleaningFee: null,
      priceLabel: property.priceLabel ?? null,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      parkingSpaces: property.parkingSpaces,
      area: property.area,
      maxGuests: property.maxGuests ?? null,
      minimumStay: null,
      checkInTime: null,
      checkOutTime: null,
      address: property.address ?? null,
      features: property.features ?? [],
      detailsSections,
      imageDisclaimer: property.imageDisclaimer ?? null,
      contactHeading: property.contactHeading ?? null,
      contactDescription: property.contactDescription ?? null,
      contactCta: property.contactCta ?? null,
      contactMessage: property.contactMessage ?? null,
      featured: property.featured ?? false,
      demonstrative: property.demonstrative ?? false,
      regionId: region.id,
    }

    const persistedProperty = await prisma.property.upsert({
      where: {
        code: property.id,
      },
      update: propertyData,
      create: {
        code: property.id,
        ...propertyData,
      },
    })

    const media =
      property.gallery && property.gallery.length > 0
        ? property.gallery
        : property.image
          ? [
              {
                src: property.image,
                alt: property.imageAlt ?? property.title,
              },
            ]
          : []

    for (const [index, item] of media.entries()) {
      await prisma.propertyMedia.upsert({
        where: {
          propertyId_position: {
            propertyId: persistedProperty.id,
            position: index,
          },
        },
        create: {
          propertyId: persistedProperty.id,
          type: 'IMAGE',
          url: item.src,
          alt: item.alt,
          position: index,
          isCover: index === 0,
        },
        update: {
          type: 'IMAGE',
          url: item.src,
          alt: item.alt,
          isCover: index === 0,
        },
      })
    }
  }
}

async function main() {
  await seedRegions()
  await seedProperties()

  const [regionCount, propertyCount, mediaCount] = await Promise.all([
    prisma.region.count(),
    prisma.property.count(),
    prisma.propertyMedia.count(),
  ])

  console.log('SEED_OK')
  console.log(`regions=${regionCount}`)
  console.log(`properties=${propertyCount}`)
  console.log(`propertyMedia=${mediaCount}`)
}

main()
  .catch((error) => {
    console.error('SEED_FAILED')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
