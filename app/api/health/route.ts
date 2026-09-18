import { getPrisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const headers = {
  'Cache-Control': 'no-store',
}

export async function GET() {
  try {
    const prisma = getPrisma()

    await prisma.$queryRaw`SELECT 1`

    return Response.json({ status: 'ok' }, { status: 200, headers })
  } catch {
    console.error('DATABASE_HEALTH_CHECK_FAILED')

    return Response.json({ status: 'unavailable' }, { status: 503, headers })
  }
}
