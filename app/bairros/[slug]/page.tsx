import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Building2, Compass, MapPin, Search } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyGrid } from '@/components/property/property-grid'
import { featuredProperties } from '@/data/featured-properties'
import { regions } from '@/data/regions'
import { WHATSAPP_URL } from '@/lib/contact'

interface NeighborhoodPageProps {
  params: Promise<{
    slug: string
  }>
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function findRegionBySlug(slug: string) {
  return regions.find((region) => region.slug === slug)
}

export function generateStaticParams() {
  return regions.map((region) => ({
    slug: region.slug,
  }))
}

export async function generateMetadata({ params }: NeighborhoodPageProps): Promise<Metadata> {
  const { slug } = await params
  const region = findRegionBySlug(slug)

  if (!region) {
    return {
      title: 'Região não encontrada',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description = `${region.description} Conheça imóveis e oportunidades em ${region.name}.`

  return {
    title: `Imóveis em ${region.name}`,
    description,
    alternates: {
      canonical: `/bairros/${region.slug}`,
    },
    openGraph: {
      title: `Imóveis em ${region.name} | ADRIZIO`,
      description,
      url: `/bairros/${region.slug}`,
    },
  }
}

export default async function NeighborhoodPage({ params }: NeighborhoodPageProps) {
  const { slug } = await params
  const region = findRegionBySlug(slug)

  if (!region) {
    notFound()
  }

  const properties = featuredProperties.filter(
    (property) => normalizeText(property.neighborhood) === normalizeText(region.name),
  )

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
        <section className="border-b border-white/10 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/bairros"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#D4AF37]"
            >
              ← Voltar para bairros e regiões
            </Link>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_38%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <MapPin className="size-4" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.2em]">{region.city}</p>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {region.highlight}
              </p>

              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {region.name}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                {region.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/imoveis?bairro=${region.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <Search className="size-4" aria-hidden="true" />
                  Buscar imóveis na região
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                >
                  Falar com o corretor Adrizio
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-zinc-950 p-7">
              <Compass className="size-6 text-[#D4AF37]" aria-hidden="true" />

              <h2 className="mt-6 text-xl font-semibold text-white">Perfil da região</h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                Região com identidade própria, localização estratégica e diferentes possibilidades
                de moradia e investimento.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-zinc-950 p-7">
              <Building2 className="size-6 text-[#D4AF37]" aria-hidden="true" />

              <h2 className="mt-6 text-xl font-semibold text-white">Mercado imobiliário</h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                O perfil dos imóveis varia conforme localização, padrão construtivo, infraestrutura
                e proximidade com a orla.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-zinc-950 p-7">
              <MapPin className="size-6 text-[#D4AF37]" aria-hidden="true" />

              <h2 className="mt-6 text-xl font-semibold text-white">Atendimento local</h2>

              <p className="mt-3 text-sm leading-7 text-zinc-400">
                O corretor Adrizio acompanha oportunidades e demandas imobiliárias nas principais
                regiões do litoral de Fortaleza.
              </p>
            </article>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#D4AF37]">
                  {properties.length}{' '}
                  {properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Imóveis em {region.name}
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                  Consulte as oportunidades disponíveis ou solicite uma busca personalizada para
                  esta região.
                </p>
              </div>

              <Link
                href={`/imoveis?bairro=${region.slug}`}
                className="text-sm font-semibold text-white transition-colors hover:text-[#D4AF37]"
              >
                Ver pesquisa completa
              </Link>
            </div>

            <PropertyGrid properties={properties} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
