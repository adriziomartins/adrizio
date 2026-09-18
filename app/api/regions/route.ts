import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = {
  'Cache-Control': 'no-store',
}

export async function GET() {
  try {
    const regions = await getPrisma().region.findMany({
      where: {
        active: true,
      },
      select: {
        slug: true,
        name: true,
        city: true,
        state: true,
        description: true,
        highlight: true,
        seoPath: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return Response.json(
      {
        count: regions.length,
        data: regions,
      },
      {
        status: 200,
        headers,
      },
    )
  } catch {
    console.error('REGION_LIST_FAILED')

    return Response.json(
      {
        error: 'Não foi possível consultar as regiões.',
      },
      {
        status: 500,
        headers,
      },
    )
  }
}
