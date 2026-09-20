import assert from 'node:assert/strict'
import test from 'node:test'

import { toFrontendProperty } from '../lib/property-mapper'

type CatalogRecord = Parameters<typeof toFrontendProperty>[0]

// Simula apenas os campos consumidos pelo conversor.
// Nenhum cliente Prisma ou banco de dados é inicializado.
function makeRecord(overrides: Record<string, unknown> = {}): CatalogRecord {
  return {
    code: 'LAND-TEST',
    slug: 'terreno-teste',
    title: 'Terreno de teste',
    type: 'LAND',
    purpose: 'SALE',
    investmentOpportunity: false,
    rentalModality: null,
    salePrice: null,
    monthlyRent: null,
    dailyRate: null,
    priceLabel: null,
    bedrooms: null,
    bathrooms: null,
    parkingSpaces: null,
    area: null,
    maxGuests: null,
    address: null,
    description: null,
    features: [],
    imageDisclaimer: null,
    detailsSections: null,
    contactHeading: null,
    contactDescription: null,
    contactCta: null,
    contactMessage: null,
    featured: false,
    demonstrative: false,
    region: {
      name: 'Meireles',
      city: 'Fortaleza',
    },
    media: [],
    ...overrides,
  } as unknown as CatalogRecord
}

function decimal(value: number) {
  return { toNumber: () => value }
}

test('terreno aceita características residenciais ausentes', () => {
  const property = toFrontendProperty(makeRecord())

  assert.equal(property.type, 'terreno')
  assert.equal(property.purpose, 'venda')
  assert.equal(property.bedrooms, undefined)
  assert.equal(property.bathrooms, undefined)
  assert.equal(property.parkingSpaces, undefined)
  assert.equal(property.area, undefined)
})

test('terreno converte área e preço corretamente', () => {
  const property = toFrontendProperty(
    makeRecord({
      area: decimal(250.5),
      salePrice: decimal(350000),
    }),
  )

  assert.equal(property.area, 250.5)
  assert.equal(property.price, 350000)
})

test('oportunidade de investimento preserva a finalidade de venda', () => {
  const property = toFrontendProperty(
    makeRecord({
      investmentOpportunity: true,
    }),
  )

  assert.equal(property.purpose, 'venda')
  assert.equal(property.investmentOpportunity, true)
})

test('apartamento exige características residenciais completas', () => {
  assert.throws(
    () =>
      toFrontendProperty(
        makeRecord({
          type: 'APARTMENT',
        }),
      ),
    /CATALOG_REQUIRED_FIELDS_MISSING: LAND-TEST/,
  )
})

test('registro sem região é rejeitado', () => {
  assert.throws(
    () =>
      toFrontendProperty(
        makeRecord({
          region: null,
        }),
      ),
    /CATALOG_REGION_MISSING: LAND-TEST/,
  )
})
