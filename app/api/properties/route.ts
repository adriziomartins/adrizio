import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = {
  'Cache-Control': 'no-store',
}

export async function GET() {
  try {
    const properties = await getPrisma().property.findMany({
      where: {
        status: 'PUBLISHED',
        demonstrative: false,
      },
      select: {
        code: true,
        slug: true,
        title: true,
        purpose: true,
        investmentOpportunity: true,
        rentalModality: true,
        type: true,
        salePrice: true,
        monthlyRent: true,
        dailyRate: true,
        priceLabel: true,
        bedrooms: true,
        bathrooms: true,
        parkingSpaces: true,
        area: true,
        maxGuests: true,
        featured: true,
        demonstrative: true,
        region: {
          select: {
            slug: true,
            name: true,
            city: true,
          },
        },
        media: {
          select: {
            url: true,
            alt: true,
            position: true,
            isCover: true,
          },
          orderBy: {
            position: 'asc',
          },
        },
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }, { code: 'asc' }],
    })

    const data = properties.map((property) => ({
      ...property,
      salePrice: property.salePrice?.toString() ?? null,
      monthlyRent: property.monthlyRent?.toString() ?? null,
      dailyRate: property.dailyRate?.toString() ?? null,
      area: property.area?.toString() ?? null,
    }))

    return Response.json(
      {
        count: data.length,
        data,
      },
      {
        status: 200,
        headers,
      },
    )
  } catch {
    console.error('PROPERTY_LIST_FAILED')

    return Response.json(
      {
        error: 'Não foi possível consultar os imóveis.',
      },
      {
        status: 500,
        headers,
      },
    )
  }
}
