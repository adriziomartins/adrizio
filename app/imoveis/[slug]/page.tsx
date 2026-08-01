import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Bath,
  BedDouble,
  Building2,
  Car,
  CheckCircle2,
  MapPin,
  Maximize2,
  MessageCircle,
} from 'lucide-react'

import { TrackedPageView } from '@/components/analytics/tracked-page-view'
import { TrackedWhatsAppLink } from '@/components/analytics/tracked-whatsapp-link'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { featuredProperties } from '@/data/featured-properties'
import { getPropertyWhatsAppUrl, WHATSAPP_REAL_PROPERTIES_URL } from '@/lib/contact'
import { createBreadcrumbList } from '@/lib/structured-data'

interface PropertyDetailsPageProps {
  params: Promise<{
    slug: string
  }>
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

const purposeLabels = {
  venda: 'Venda',
  aluguel: 'Aluguel',
  investimento: 'Investimento',
} as const

const typeLabels = {
  apartamento: 'Apartamento',
  cobertura: 'Cobertura',
  flat: 'Flat',
  casa: 'Casa',
  terreno: 'Terreno',
} as const

function findPropertyBySlug(slug: string) {
  return featuredProperties.find((property) => property.slug === slug)
}

export function generateStaticParams() {
  return featuredProperties.map((property) => ({
    slug: property.slug,
  }))
}

export async function generateMetadata({ params }: PropertyDetailsPageProps): Promise<Metadata> {
  const { slug } = await params
  const property = findPropertyBySlug(slug)

  if (!property) {
    return {
      title: 'Imóvel não encontrado',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const description =
    property.description ??
    `${property.title} em ${property.neighborhood}, ${property.city}. Conheça as características desta oportunidade imobiliária.`

  return {
    title: `${property.title} em ${property.neighborhood}`,
    description,
    alternates: {
      canonical: `/imoveis/${property.slug}`,
    },
    openGraph: {
      title: `${property.title} | ADRIZIO`,
      description,
      url: `/imoveis/${property.slug}`,
    },
    robots: property.demonstrative
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  }
}

export default async function PropertyDetailsPage({ params }: PropertyDetailsPageProps) {
  const { slug } = await params
  const property = findPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const whatsappUrl = property.demonstrative
    ? WHATSAPP_REAL_PROPERTIES_URL
    : getPropertyWhatsAppUrl({
        title: property.title,
        neighborhood: property.neighborhood,
        slug: property.slug,
      })

  const breadcrumbStructuredData = createBreadcrumbList([
    {
      name: 'Início',
      path: '/',
    },
    {
      name: 'Imóveis',
      path: '/imoveis',
    },
    {
      name: property.title,
      path: `/imoveis/${property.slug}`,
    },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, '\\u003c'),
        }}
      />

      <TrackedPageView
        event={{
          event: 'view_property',
          source_page: 'property-details',
          property_slug: property.slug,
          property_status: property.demonstrative ? 'demonstrative' : 'real',
          property_purpose: property.purpose,
          neighborhood: property.neighborhood,
        }}
      />

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
              href="/imoveis"
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#D4AF37]"
            >
              ← Voltar para os imóveis
            </Link>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.7fr)]">
            <div>
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
                <div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.2),transparent_38%)]"
                  aria-hidden="true"
                />

                <Building2 className="relative size-24 text-[#D4AF37]/35" aria-hidden="true" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-950">
                    {purposeLabels[property.purpose]}
                  </span>

                  {property.demonstrative ? (
                    <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md">
                      Conteúdo demonstrativo
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-10">
                <p className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="size-4 text-[#D4AF37]" aria-hidden="true" />
                  {property.neighborhood} · {property.city}
                </p>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {property.title}
                </h1>

                <div className="mt-5">
                  <p className="text-3xl font-semibold text-[#D4AF37]">
                    {currencyFormatter.format(property.price)}
                  </p>

                  {property.demonstrative ? (
                    <p className="mt-2 text-xs text-zinc-500">
                      Valor e características apresentados apenas para validação visual da
                      plataforma.
                    </p>
                  ) : null}
                </div>

                <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                    <BedDouble className="size-5 text-[#D4AF37]" aria-hidden="true" />
                    <dt className="mt-3 text-xs text-zinc-500">Quartos</dt>
                    <dd className="mt-1 font-semibold text-white">{property.bedrooms}</dd>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                    <Bath className="size-5 text-[#D4AF37]" aria-hidden="true" />
                    <dt className="mt-3 text-xs text-zinc-500">Banheiros</dt>
                    <dd className="mt-1 font-semibold text-white">{property.bathrooms}</dd>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                    <Car className="size-5 text-[#D4AF37]" aria-hidden="true" />
                    <dt className="mt-3 text-xs text-zinc-500">Vagas</dt>
                    <dd className="mt-1 font-semibold text-white">{property.parkingSpaces}</dd>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-900 p-4">
                    <Maximize2 className="size-5 text-[#D4AF37]" aria-hidden="true" />
                    <dt className="mt-3 text-xs text-zinc-500">Área</dt>
                    <dd className="mt-1 font-semibold text-white">{property.area} m²</dd>
                  </div>
                </dl>

                <div className="mt-12 border-t border-white/10 pt-10">
                  <h2 className="text-2xl font-semibold text-white">Sobre o imóvel</h2>

                  <p className="mt-5 max-w-3xl text-sm leading-8 text-zinc-400 sm:text-base">
                    {property.description ??
                      'Informações complementares sobre este imóvel serão adicionadas ao catálogo.'}
                  </p>
                </div>

                <div className="mt-12 border-t border-white/10 pt-10">
                  <h2 className="text-2xl font-semibold text-white">Características</h2>

                  {property.features?.length ? (
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                      {property.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                          <CheckCircle2
                            className="size-5 shrink-0 text-[#D4AF37]"
                            aria-hidden="true"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-zinc-400">
                      Características adicionais serão disponibilizadas em breve.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-[#D4AF37]/25 bg-zinc-900 p-7 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Atendimento ADRIZIO
                </p>

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {property.demonstrative
                    ? 'Conheça o atendimento imobiliário'
                    : 'Interesse neste imóvel?'}
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {property.demonstrative
                    ? 'Este conteúdo valida a experiência do catálogo. Para conversar sobre imóveis reais, informe seu objetivo, região e faixa de investimento.'
                    : 'Solicite informações, confirme disponibilidade ou organize uma visita com atendimento especializado.'}
                </p>

                <dl className="mt-7 space-y-4 border-y border-white/10 py-6 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Tipo</dt>
                    <dd className="font-medium text-white">{typeLabels[property.type]}</dd>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Finalidade</dt>
                    <dd className="font-medium text-white">{purposeLabels[property.purpose]}</dd>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Referência</dt>
                    <dd className="font-medium text-white">{property.id}</dd>
                  </div>
                </dl>

                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  sourcePage="property-details"
                  contactIntent={
                    property.demonstrative
                      ? 'real-properties'
                      : property.purpose === 'venda'
                        ? 'buy'
                        : property.purpose === 'aluguel'
                          ? 'rent'
                          : 'investment'
                  }
                  propertySlug={property.slug}
                  propertyStatus={property.demonstrative ? 'demonstrative' : 'real'}
                  className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  {property.demonstrative ? 'Falar sobre imóveis reais' : 'Falar sobre este imóvel'}
                </TrackedWhatsAppLink>

                {property.demonstrative ? (
                  <p className="mt-5 text-xs leading-5 text-zinc-500">
                    Esta página não representa imóvel disponível, oferta comercial ou anúncio
                    imobiliário publicado.
                  </p>
                ) : null}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
