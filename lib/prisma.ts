import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@/generated/prisma/client'

const globalForPrisma = globalThis as typeof globalThis & {
  adrizioPrisma?: PrismaClient
}

let productionPrisma: PrismaClient | undefined

export function getPrisma(): PrismaClient {
  const existing =
    process.env.NODE_ENV === 'production' ? productionPrisma : globalForPrisma.adrizioPrisma

  if (existing) return existing

  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL não configurada.')
  }

  const adapter = new PrismaPg({ connectionString })
  const prisma = new PrismaClient({ adapter })

  if (process.env.NODE_ENV === 'production') {
    productionPrisma = prisma
  } else {
    globalForPrisma.adrizioPrisma = prisma
  }

  return prisma
}
