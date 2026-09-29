import 'dotenv/config'

import { PrismaPg } from '@prisma/adapter-pg'

import { featuredProperties } from '../data/featured-properties'
import { regions } from '../data/regions'
import { Prisma, PrismaClient } from '../generated/prisma/client'

const APPLY_FLAG = '--apply'
const CONFIRMATION_VALUE = 'CONFIRM'

const expectedProductionDatabase = {
  host: 'aws-0-sa-east-1.pooler.supabase.com',
  port: '5432',
  database: '/postgres',
  user: 'postgres.rztokryjkpmpjkfilkom',
} as const

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

const realProperties = featuredProperties.filter((property) => property.demonstrative !== true)

function printPlan() {
  const mediaCount = realProperties.reduce((total, property) => {
    if (property.gallery?.length) {
      return total + property.gallery.length
    }

    return total + (property.image ? 1 : 0)
  }, 0)

  console.log('PRODUCTION_CATALOG_BOOTSTRAP_DRY_RUN')
  console.log(`regions=${regions.length}`)
  console.log(`properties=${realProperties.length}`)
  console.log(`media=${mediaCount}`)
  console.log(`excludedDemonstrative=${featuredProperties.length - realProperties.length}`)

  for (const property of realProperties) {
    console.log(`property=${property.id} slug=${property.slug}`)
  }
}

function getProductionConnectionString(): string {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL não está definida.')
  }

  const url = new URL(connectionString)

  if (
    url.hostname !== expectedProductionDatabase.host ||
    url.port !== expectedProductionDatabase.port ||
    url.pathname !== expectedProductionDatabase.database ||
    url.username !== expectedProductionDatabase.user
  ) {
    throw new Error('BOOTSTRAP_BLOCKED: DATABASE_URL não corresponde ao Supabase de produção.')
  }

  if (
    url.searchParams.get('sslmode') !== 'require' ||
    url.searchParams.get('uselibpqcompat') !== 'true'
  ) {
    throw new Error('BOOTSTRAP_BLOCKED: uselibpqcompat=true e sslmode=require são obrigatórios.')
  }

  return connectionString
}

async function applyBootstrap() {
  if (process.env.PRODUCTION_CATALOG_BOOTSTRAP !== CONFIRMATION_VALUE) {
    throw new Error(
      `BOOTSTRAP_BLOCKED: defina PRODUCTION_CATALOG_BOOTSTRAP=${CONFIRMATION_VALUE} para confirmar.`,
    )
  }

  const connectionString = getProductionConnectionString()
  const adapter = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter })

  try {
    const existingDemonstrativeCount = await prisma.property.count({
      where: {
        demonstrative: true,
      },
    })

    if (existingDemonstrativeCount > 0) {
      throw new Error('BOOTSTRAP_BLOCKED: o banco de produção contém imóveis demonstrativos.')
    }
    await prisma.$transaction(async (tx) => {
      for (const region of regions) {
        await tx.region.upsert({
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

      const persistedRegions = await tx.region.findMany({
        select: {
          id: true,
          name: true,
          city: true,
        },
      })

      for (const property of realProperties) {
        const region = persistedRegions.find(
          (candidate) =>
            candidate.name === property.neighborhood && candidate.city === property.city,
        )

        if (!region) {
          throw new Error(
            `Região não encontrada para ${property.id}: ${property.neighborhood}/${property.city}`,
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
          bedrooms: property.bedrooms ?? null,
          bathrooms: property.bathrooms ?? null,
          parkingSpaces: property.parkingSpaces ?? null,
          area: property.area ?? null,
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
          demonstrative: false,
          regionId: region.id,
        }

        const persistedProperty = await tx.property.upsert({
          where: {
            code: property.id,
          },
          update: propertyData,
          create: {
            code: property.id,
            ...propertyData,
          },
        })

        const media = property.gallery?.length
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
          await tx.propertyMedia.upsert({
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

        await tx.propertyMedia.deleteMany({
          where: {
            propertyId: persistedProperty.id,
            position: {
              gte: media.length,
            },
          },
        })
      }
    })

    const [regionCount, propertyCount, mediaCount, demonstrativeCount] = await Promise.all([
      prisma.region.count(),
      prisma.property.count(),
      prisma.propertyMedia.count(),
      prisma.property.count({
        where: {
          demonstrative: true,
        },
      }),
    ])

    console.log('PRODUCTION_CATALOG_BOOTSTRAP_OK')
    console.log(`regions=${regionCount}`)
    console.log(`properties=${propertyCount}`)
    console.log(`media=${mediaCount}`)
    console.log(`demonstrative=${demonstrativeCount}`)
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  if (!process.argv.includes(APPLY_FLAG)) {
    printPlan()
    return
  }

  await applyBootstrap()
}

main().catch((error) => {
  console.error('PRODUCTION_CATALOG_BOOTSTRAP_FAILED')
  console.error(error)
  process.exitCode = 1
})
