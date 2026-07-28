import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyGrid } from '@/components/property/property-grid'
import { featuredProperties } from '@/data/featured-properties'
import { getPropertySearchValues } from '@/lib/property-search'

import type { PropertySearchParams, PropertySearchValues } from '@/lib/property-search'
import type { Property, PropertyPurpose } from '@/types/property'

export const metadata: Metadata = {
  title: 'Imóveis na Orla de Fortaleza',
  description:
    'Explore imóveis para comprar, alugar ou investir no Meireles, Mucuripe, Praia de Iracema e demais regiões da Orla de Fortaleza.',
  alternates: {
    canonical: '/imoveis',
  },
  openGraph: {
    title: 'Imóveis na Orla de Fortaleza | ADRIZIO',
    description:
      'Encontre oportunidades imobiliárias nas regiões mais valorizadas da Orla de Fortaleza.',
    url: '/imoveis',
  },
}

interface PropertiesPageProps {
  searchParams: Promise<PropertySearchParams>
}

const purposeMap: Record<string, PropertyPurpose | undefined> = {
  comprar: 'venda',
  alugar: 'aluguel',
  investir: 'investimento',
}

const neighborhoodSlugMap: Record<string, string> = {
  'beira-mar': 'beira-mar',
  meireles: 'meireles',
  mucuripe: 'mucuripe',
  'praia-de-iracema': 'praia de iracema',
  'praia-do-futuro': 'praia do futuro',
  cumbuco: 'cumbuco',
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function matchesPrice(property: Property, priceFilter: string): boolean {
  switch (priceFilter) {
    case 'ate-500000':
      return property.price <= 500000
    case 'ate-1000000':
      return property.price <= 1000000
    case 'ate-2000000':
      return property.price <= 2000000
    case 'ate-5000000':
      return property.price <= 5000000
    case 'acima-5000000':
      return property.price > 5000000
    default:
      return true
  }
}

function filterProperties(properties: Property[], filters: PropertySearchValues): Property[] {
  const selectedPurpose = purposeMap[filters.finalidade]

  return properties.filter((property) => {
    if (selectedPurpose && property.purpose !== selectedPurpose) {
      return false
    }

    if (filters.bairro) {
      const selectedNeighborhood = neighborhoodSlugMap[filters.bairro]

      if (
        selectedNeighborhood &&
        normalizeText(property.neighborhood) !== normalizeText(selectedNeighborhood)
      ) {
        return false
      }
    }

    if (filters.quartos && property.bedrooms < Number(filters.quartos)) {
      return false
    }

    if (!matchesPrice(property, filters.preco)) {
      return false
    }

    return true
  })
}

function getSearchSummary(filters: PropertySearchValues): string {
  const parts: string[] = []

  if (filters.finalidade === 'comprar') {
    parts.push('para compra')
  }

  if (filters.finalidade === 'alugar') {
    parts.push('para locação')
  }

  if (filters.finalidade === 'investir') {
    parts.push('para investimento')
  }

  if (filters.bairro) {
    const neighborhood = neighborhoodSlugMap[filters.bairro]

    if (neighborhood) {
      parts.push(`em ${neighborhood}`)
    }
  }

  if (filters.quartos) {
    parts.push(`com ${filters.quartos} ou mais quartos`)
  }

  return parts.length > 0 ? parts.join(' ') : 'na Orla de Fortaleza'
}

export default async function PropertiesPage({ searchParams }: PropertiesPageProps) {
  const resolvedSearchParams = await searchParams
  const filters = getPropertySearchValues(resolvedSearchParams)
  const properties = filterProperties(featuredProperties, filters)
  const searchSummary = getSearchSummary(filters)

  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed -top-20 left-4 z-[100] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-zinc-950 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="min-h-screen bg-zinc-950 focus:outline-none"
      >
        <section className="border-b border-white/10 bg-zinc-950 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Portal ADRIZIO
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Imóveis na Orla de Fortaleza
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                Explore oportunidades para morar, investir ou construir patrimônio nas regiões mais
                valorizadas do litoral de Fortaleza.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#D4AF37]">
                  {properties.length}{' '}
                  {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Oportunidades {searchSummary}
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-400">
                  Os imóveis exibidos nesta etapa são dados demonstrativos usados no desenvolvimento
                  do catálogo.
                </p>
              </div>

              <Link
                href="/#busca"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                Alterar busca
              </Link>
            </div>

            <PropertyGrid properties={properties} />

            <div className="mt-16 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-6 py-10 sm:px-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Atendimento personalizado
                </p>

                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Não encontrou o imóvel ideal?
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Informe o perfil do imóvel que procura. A ADRIZIO poderá identificar oportunidades
                  alinhadas à sua localização, faixa de preço e objetivo.
                </p>

                <Link
                  href="/#avaliar"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Falar com a ADRIZIO
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
