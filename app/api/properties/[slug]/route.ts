import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = {
  'Cache-Control': 'no-store',
}

interface RouteContext {
  params: Promise<{ slug: string }>
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params

  if (slug.length > 180 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return Response.json({ error: 'Slug inválido.' }, { status: 400, headers })
  }

  try {
    const property = await getPrisma().property.findFirst({
      where: {
        slug,
        status: 'PUBLISHED',
        demonstrative: false,
      },
      select: {
        code: true,
        slug: true,
        title: true,
        description: true,
        purpose: true,
        rentalModality: true,
        type: true,
        salePrice: true,
        monthlyRent: true,
        dailyRate: true,
        cleaningFee: true,
        priceLabel: true,
        bedrooms: true,
        bathrooms: true,
        parkingSpaces: true,
        area: true,
        maxGuests: true,
        minimumStay: true,
        checkInTime: true,
        checkOutTime: true,
        address: true,
        features: true,
        detailsSections: true,
        imageDisclaimer: true,
        contactHeading: true,
        contactDescription: true,
        contactCta: true,
        contactMessage: true,
        featured: true,
        demonstrative: true,
        investmentOpportunity: true,
        region: {
          select: {
            slug: true,
            name: true,
            city: true,
          },
        },
        media: {
          select: {
            type: true,
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
    })

    if (!property) {
      return Response.json({ error: 'Imóvel não encontrado.' }, { status: 404, headers })
    }

    const data = {
      ...property,
      salePrice: property.salePrice?.toString() ?? null,
      monthlyRent: property.monthlyRent?.toString() ?? null,
      dailyRate: property.dailyRate?.toString() ?? null,
      cleaningFee: property.cleaningFee?.toString() ?? null,
      area: property.area?.toString() ?? null,
    }

    return Response.json({ data }, { status: 200, headers })
  } catch {
    console.error('PROPERTY_DETAIL_FAILED')

    return Response.json(
      { error: 'Não foi possível consultar o imóvel.' },
      { status: 500, headers },
    )
  }
}
