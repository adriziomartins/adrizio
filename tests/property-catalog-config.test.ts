import assert from 'node:assert/strict'
import test from 'node:test'

import { resolveCatalogSource } from '../lib/property-catalog-config'

test('catálogo estático é o padrão quando CATALOG_SOURCE não está definida', () => {
  assert.equal(resolveCatalogSource(undefined), 'static')
})

test('valor vazio mantém o catálogo estático', () => {
  assert.equal(resolveCatalogSource(''), 'static')
})

test('CATALOG_SOURCE=static seleciona a fonte estática', () => {
  assert.equal(resolveCatalogSource('static'), 'static')
})

test('CATALOG_SOURCE=database seleciona o PostgreSQL em qualquer ambiente', () => {
  assert.equal(resolveCatalogSource('database'), 'database')
})

test('valor inválido é rejeitado em vez de selecionar uma fonte silenciosamente', () => {
  assert.throws(() => resolveCatalogSource('databse'), /CATALOG_SOURCE_INVALID: databse/)
})
