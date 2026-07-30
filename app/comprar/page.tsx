import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, KeyRound, MapPinned, ShieldCheck } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyGrid } from '@/components/property/property-grid'
import { featuredProperties } from '@/data/featured-properties'
import { WHATSAPP_BUY_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Comprar imóvel na Orla de Fortaleza',
  description:
    'Encontre apartamentos e oportunidades para comprar no Meireles, Mucuripe, Praia de Iracema e demais regiões da Orla de Fortaleza.',
  alternates: {
    canonical: '/comprar',
  },
  openGraph: {
    title: 'Comprar imóvel na Orla de Fortaleza | ADRIZIO',
    description:
      'Conheça imóveis selecionados para morar, investir e construir patrimônio na Orla de Fortaleza.',
    url: '/comprar',
  },
}

const benefits = [
  {
    title: 'Seleção orientada',
    description:
      'Imóveis alinhados ao seu perfil, localização desejada, orçamento e objetivo patrimonial.',
    icon: MapPinned,
  },
  {
    title: 'Análise da oportunidade',
    description:
      'Apoio para avaliar características, preço, contexto do bairro e adequação da compra.',
    icon: ShieldCheck,
  },
  {
    title: 'Acompanhamento da negociação',
    description:
      'Atendimento durante visitas, propostas, contrapropostas e encaminhamento da aquisição.',
    icon: KeyRound,
  },
] as const

export default function BuyPage() {
  const properties = featuredProperties.filter((property) => property.purpose === 'venda')

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
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Comprar com o corretor Adrizio
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Encontre seu imóvel na Orla de Fortaleza
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                Descubra oportunidades para morar, investir ou construir patrimônio nas regiões mais
                valorizadas do litoral de Fortaleza.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/imoveis?finalidade=comprar"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Ver imóveis à venda
                </Link>

                <a
                  href={WHATSAPP_BUY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Solicitar busca personalizada
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon

                return (
                  <article
                    key={benefit.title}
                    className="rounded-3xl border border-white/10 bg-zinc-950 p-7"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h2 className="mt-6 text-xl font-semibold text-white">{benefit.title}</h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">{benefit.description}</p>
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
                  {properties.length === 1 ? 'imóvel selecionado' : 'imóveis selecionados'}
                </p>

                <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                  Oportunidades para compra
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                  Os imóveis apresentados nesta etapa são demonstrativos e validam a estrutura
                  inicial do portal.
                </p>
              </div>

              <Link
                href="/imoveis?finalidade=comprar"
                className="text-sm font-semibold text-white transition-colors hover:text-[#D4AF37]"
              >
                Acessar catálogo completo
              </Link>
            </div>

            <PropertyGrid properties={properties} />

            <div className="mt-16 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <CheckCircle2 className="size-5" aria-hidden="true" />

                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Busca personalizada
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Ainda não encontrou a oportunidade certa?
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Informe bairro, faixa de investimento, quantidade de quartos e características
                  prioritárias. O corretor Adrizio poderá direcionar a busca conforme seu perfil.
                </p>

                <a
                  href={WHATSAPP_BUY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Informar perfil do imóvel
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
