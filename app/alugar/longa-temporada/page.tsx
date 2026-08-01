import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'

import { TrackedInternalLink } from '@/components/analytics/tracked-internal-link'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyGrid } from '@/components/property/property-grid'
import { featuredProperties } from '@/data/featured-properties'

export const metadata: Metadata = {
  title: 'Aluguel de longa temporada em Fortaleza',
  description: 'Imóveis para locação residencial de longa temporada na Orla de Fortaleza.',
  alternates: {
    canonical: '/alugar/longa-temporada',
  },
}

const benefits = [
  'Locação residencial convencional',
  'Contratos de maior duração',
  'Atendimento na análise do perfil do imóvel',
  'Apoio durante visita, proposta e negociação',
]

export default function LongTermRentPage() {
  const properties = featuredProperties.filter(
    (property) => property.purpose === 'aluguel' && property.rentalModality === 'longa-temporada',
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
        <section className="border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Locação residencial
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Imóveis para longa temporada
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
              Encontre imóveis para morar com estabilidade, localização estratégica e atendimento
              especializado na Orla de Fortaleza.
            </p>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="size-5 text-[#D4AF37]" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-medium text-[#D4AF37]">
                {properties.length} imóveis disponíveis
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Oportunidades de locação residencial
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
                O catálogo desta modalidade será ampliado conforme novos imóveis forem integrados à
                plataforma.
              </p>
            </div>

            <PropertyGrid properties={properties} />

            <div className="mt-16 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
              <h2 className="text-2xl font-semibold text-white">Procura um imóvel específico?</h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                Informe bairro, faixa de preço, quantidade de quartos e prazo previsto para mudança.
              </p>

              <TrackedInternalLink
                href="/imoveis?finalidade=alugar&modalidade=longa-temporada"
                eventName="rent_lead"
                contactIntent="rent"
                sourcePage="long-term-rent"
                className="mt-7 inline-flex rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-[#E5C45A]"
              >
                Informar perfil do imóvel
              </TrackedInternalLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
