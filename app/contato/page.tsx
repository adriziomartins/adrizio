import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Building2,
  Clock3,
  HandCoins,
  Home,
  MapPinned,
  MessageCircle,
  Search,
  TrendingUp,
} from 'lucide-react'

import { TrackedWhatsAppLink } from '@/components/analytics/tracked-whatsapp-link'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import {
  WHATSAPP_BUY_URL,
  WHATSAPP_INVESTMENT_URL,
  WHATSAPP_RENT_URL,
  WHATSAPP_URL,
  WHATSAPP_VALUATION_URL,
} from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com o corretor Adrizio para comprar, alugar, investir ou avaliar imóveis na Orla de Fortaleza.',
  alternates: {
    canonical: '/contato',
  },
  openGraph: {
    title: 'Contato | ADRIZIO',
    description:
      'Escolha o motivo do atendimento e converse com Adrizio Martins sobre imóveis na Orla de Fortaleza.',
    url: '/contato',
  },
}

const contactOptions = [
  {
    title: 'Comprar um imóvel',
    description:
      'Informe região, faixa de preço, quantidade de quartos e características prioritárias.',
    cta: 'Procurar imóvel para comprar',
    href: WHATSAPP_BUY_URL,
    contactIntent: 'buy',
    icon: Home,
  },
  {
    title: 'Alugar um imóvel',
    description:
      'Converse sobre locação anual, longa temporada ou necessidades específicas de moradia.',
    cta: 'Procurar imóvel para alugar',
    href: WHATSAPP_RENT_URL,
    contactIntent: 'rent',
    icon: Search,
  },
  {
    title: 'Investir em imóveis',
    description:
      'Apresente seu objetivo patrimonial, faixa de investimento e interesse em renda ou valorização.',
    cta: 'Analisar oportunidades',
    href: WHATSAPP_INVESTMENT_URL,
    contactIntent: 'investment',
    icon: TrendingUp,
  },
  {
    title: 'Avaliar meu imóvel',
    description:
      'Solicite uma análise de posicionamento para venda, locação ou compreensão do mercado.',
    cta: 'Solicitar avaliação',
    href: WHATSAPP_VALUATION_URL,
    contactIntent: 'valuation',
    icon: Building2,
  },
] as const

const serviceInformation = [
  {
    title: 'Região de atuação',
    description:
      'Orla de Fortaleza e regiões estratégicas do litoral cearense, conforme cada demanda.',
    icon: MapPinned,
  },
  {
    title: 'Atendimento personalizado',
    description:
      'Cada contato é analisado de acordo com objetivo, localização, orçamento e momento do cliente.',
    icon: HandCoins,
  },
  {
    title: 'Retorno conforme disponibilidade',
    description:
      'As mensagens são respondidas assim que possível, respeitando atendimentos, visitas e negociações em andamento.',
    icon: Clock3,
  },
] as const

export default function ContactPage() {
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
                  Contato com o corretor Adrizio
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Como podemos ajudar?
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                Escolha o motivo do contato para iniciar um atendimento mais direcionado sobre
                compra, locação, investimento ou avaliação de imóveis.
              </p>

              <TrackedWhatsAppLink
                href={WHATSAPP_URL}
                sourcePage="contact"
                contactIntent="general"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Atendimento geral pelo WhatsApp
              </TrackedWhatsAppLink>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Escolha sua necessidade
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Atendimento organizado por objetivo
              </h2>

              <p className="mt-5 text-sm leading-8 text-zinc-400 sm:text-base">
                Ao selecionar uma opção, o WhatsApp será aberto com uma mensagem inicial relacionada
                ao tipo de atendimento escolhido.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {contactOptions.map((option) => {
                const Icon = option.icon

                return (
                  <article
                    key={option.title}
                    className="group flex flex-col rounded-3xl border border-white/10 bg-zinc-900/60 p-7 transition-colors hover:border-[#D4AF37]/35 sm:p-8"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-6 text-2xl font-semibold text-white">{option.title}</h3>

                    <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">
                      {option.description}
                    </p>

                    <TrackedWhatsAppLink
                      href={option.href}
                      sourcePage="contact"
                      contactIntent={option.contactIntent}
                      className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      {option.cta}
                    </TrackedWhatsAppLink>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {serviceInformation.map((information) => {
                const Icon = information.icon

                return (
                  <article
                    key={information.title}
                    className="rounded-3xl border border-white/10 bg-zinc-950 p-7"
                  >
                    <Icon className="size-6 text-[#D4AF37]" aria-hidden="true" />

                    <h2 className="mt-6 text-xl font-semibold text-white">{information.title}</h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">
                      {information.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Atendimento profissional
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Adrizio Martins
              </h2>

              <p className="mt-3 font-medium text-zinc-300">Corretor de Imóveis · CRECI 25015F</p>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-zinc-400 sm:text-base">
                Atendimento imobiliário com foco na Orla de Fortaleza para clientes interessados em
                comprar, alugar, investir ou posicionar melhor seus imóveis no mercado.
              </p>
            </div>

            <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Conheça o Site Adrizio
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white">
                Entenda nossa proposta de atuação
              </h2>

              <p className="mt-4 text-sm leading-7 text-zinc-400">
                Conheça o posicionamento, a especialização territorial e a proposta de atendimento
                da marca.
              </p>

              <Link
                href="/sobre"
                className="mt-7 inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
              >
                Sobre o Site Adrizio
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
