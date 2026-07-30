import type { Metadata } from 'next'
import Link from 'next/link'
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  MapPinned,
  MessageCircle,
  TrendingUp,
} from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyGrid } from '@/components/property/property-grid'
import { featuredProperties } from '@/data/featured-properties'
import { WHATSAPP_INVESTMENT_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Investimento imobiliário na Orla de Fortaleza',
  description:
    'Conheça oportunidades imobiliárias com potencial de valorização, geração de renda e construção patrimonial na Orla de Fortaleza.',
  alternates: {
    canonical: '/investir',
  },
  openGraph: {
    title: 'Investimento imobiliário na Orla de Fortaleza | ADRIZIO',
    description:
      'Explore imóveis e regiões com potencial para valorização patrimonial e geração de renda.',
    url: '/investir',
  },
}

const investmentPillars = [
  {
    title: 'Valorização patrimonial',
    description:
      'Análise da localização, infraestrutura, desenvolvimento urbano e posicionamento imobiliário da região.',
    icon: TrendingUp,
  },
  {
    title: 'Geração de renda',
    description:
      'Avaliação do potencial de locação residencial, curta temporada e outras estratégias de ocupação.',
    icon: CircleDollarSign,
  },
  {
    title: 'Liquidez e demanda',
    description:
      'Observação do perfil de procura, características do imóvel e facilidade potencial de revenda ou locação.',
    icon: BarChart3,
  },
] as const

const analysisPoints = [
  'Objetivo e horizonte do investimento',
  'Faixa de capital disponível',
  'Região e perfil do imóvel',
  'Potencial de valorização',
  'Possibilidade de geração de renda',
  'Custos de aquisição e manutenção',
] as const

export default function InvestPage() {
  const properties = featuredProperties.filter((property) => property.purpose === 'investimento')

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
        <section className="relative overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_38%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Investir com a ADRIZIO
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Oportunidades imobiliárias com visão patrimonial
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                Avalie imóveis e regiões da Orla de Fortaleza considerando valorização, geração de
                renda, liquidez, localização e adequação aos seus objetivos.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/imoveis?finalidade=investir"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Ver oportunidades
                </Link>

                <a
                  href={WHATSAPP_INVESTMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Solicitar análise
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {investmentPillars.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <article
                    key={pillar.title}
                    className="rounded-3xl border border-white/10 bg-zinc-950 p-7"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-white">{pillar.title}</h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-[#D4AF37]">
                  {properties.length}{' '}
                  {properties.length === 1
                    ? 'oportunidade selecionada'
                    : 'oportunidades selecionadas'}
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Imóveis com perfil de investimento
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                  Os imóveis apresentados nesta etapa são demonstrativos e validam a jornada de
                  investimento do portal.
                </p>
              </div>

              <Link
                href="/imoveis?finalidade=investir"
                className="text-sm font-semibold text-white transition-colors hover:text-[#D4AF37]"
              >
                Acessar catálogo completo
              </Link>
            </div>

            <PropertyGrid properties={properties} />
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <MapPinned className="size-5" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Análise orientada
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Cada investimento exige uma estratégia própria
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-400 sm:text-base">
                A decisão não deve considerar apenas o preço do imóvel. É necessário avaliar
                localização, liquidez, demanda, custos, horizonte de permanência e objetivo
                patrimonial.
              </p>
            </div>

            <ul className="grid gap-3 sm:grid-cols-2">
              {analysisPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950 p-4 text-sm text-zinc-300"
                >
                  <Building2 className="size-4 shrink-0 text-[#D4AF37]" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Atendimento personalizado
                </p>

                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Procura uma oportunidade alinhada ao seu objetivo?
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Informe sua faixa de investimento, horizonte, interesse em renda ou valorização e
                  regiões prioritárias para iniciar uma busca direcionada.
                </p>

                <a
                  href={WHATSAPP_INVESTMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Solicitar análise de oportunidades
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
