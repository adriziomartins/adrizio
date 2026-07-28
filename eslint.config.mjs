import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    // Next.js / build
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',

    // Dependências
    'node_modules/**',

    // Aplicações e código fora do escopo do frontend Next.js
    'backend/**',
    'legacy/**',
    'backup/**',

    // Template Next.js temporário que será removido
    'frontend/**',

    // Arquivos estáticos legados
    'public/**',
  ]),
])

export default eslintConfig
