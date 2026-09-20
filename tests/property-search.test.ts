import assert from 'node:assert/strict'
import test from 'node:test'

import { filterProperties, getPropertySearchValues } from '../lib/property-search'

import type { Property } from '../types/property'

const base: Property = {
  id: 'sale',
  slug: 'sale',
  title: 'Apartamento à venda',
  neighborhood: 'Meireles',
  city: 'Fortaleza',
  purpose: 'venda',
  type: 'apartamento',
  price: 450000,
  bedrooms: 2,
  bathrooms: 1,
  parkingSpaces: 1,
  area: 60,
}

const properties: Property[] = [
  base,
  {
    ...base,
    id: 'legacy',
    purpose: 'investimento',
  },
  {
    ...base,
    id: 'flagged',
    investmentOpportunity: true,
  },
  {
    ...base,
    id: 'land',
    type: 'terreno',
    bedrooms: undefined,
    bathrooms: undefined,
    parkingSpaces: undefined,
    area: 250,
  },
  {
    ...base,
    id: 'rent',
    purpose: 'aluguel',
  },
]

function search(params: Record<string, string>): string[] {
  const filters = getPropertySearchValues(params)

  return filterProperties(properties, filters)
    .map((property) => property.id)
    .sort()
}

test('compra inclui venda e investimento legado', () => {
  assert.deepEqual(search({ finalidade: 'comprar' }), ['sale', 'legacy', 'flagged', 'land'].sort())
})

test('investimento reconhece indicador e classificação legada', () => {
  assert.deepEqual(search({ finalidade: 'investir' }), ['legacy', 'flagged'].sort())
})

test('locação não inclui imóveis à venda', () => {
  assert.deepEqual(search({ finalidade: 'alugar' }), ['rent'])
})

test('filtro de terrenos identifica a categoria', () => {
  assert.deepEqual(search({ finalidade: 'comprar', tipo: 'terreno' }), ['land'])
})

test('terreno sem quartos não atende ao filtro residencial', () => {
  assert.deepEqual(search({ finalidade: 'comprar', tipo: 'terreno', quartos: '2' }), [])
})
