import { existsSync, readFileSync } from 'node:fs'

const expectedValue = 'GTM-MWBZLVJ5'

function readLocalValue() {
  if (!existsSync('.env.local')) {
    return undefined
  }

  const content = readFileSync('.env.local', 'utf8')
  const match = content.match(/^NEXT_PUBLIC_GTM_ID=(.+)$/m)

  return match?.[1]?.trim().replace(/^['"]|['"]$/g, '')
}

const actualValue = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? readLocalValue()

if (actualValue !== expectedValue) {
  console.error('GTM_ENV_BUILD=FALHOU')
  process.exit(1)
}

console.log('GTM_ENV_BUILD=OK')
