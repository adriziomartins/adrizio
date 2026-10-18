import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

import { casaPirambu } from '../data/casa-pirambu'
import { filterProperties, getPropertySearchValues } from '../lib/property-search'

test('filtro comprar/Pirambu/casa encontra o imóvel e exclui outro bairro', () => {
  const filters = getPropertySearchValues({
    finalidade: 'comprar',
    bairro: 'pirambu',
    tipo: 'casa',
  })
  const other = { ...casaPirambu, id: 'other', neighborhood: 'Meireles' }
  assert.deepEqual(
    filterProperties([other, casaPirambu], filters).map((p) => p.id),
    ['PIR-VEN-01'],
  )
})

test('publicação por código limita o plano a um imóvel e rejeita código inválido', () => {
  const run = (code: string) =>
    spawnSync(
      process.execPath,
      ['--import', 'tsx', 'scripts/bootstrap-production-catalog.ts', '--code', code],
      { encoding: 'utf8', env: { ...process.env, DATABASE_URL: '' } },
    )
  const valid = run('PIR-VEN-01')
  assert.equal(valid.status, 0, valid.stderr)
  assert.match(valid.stdout, /regions=1\nproperties=1\nmedia=7/)
  assert.doesNotMatch(valid.stdout, /property=BCF-TEMP-01/)
  const invalid = run('INVALID')
  assert.notEqual(invalid.status, 0)
  assert.match(invalid.stderr, /BOOTSTRAP_BLOCKED/)
})
