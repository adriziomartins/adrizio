import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, CalendarDays, ArrowRight } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export const metadata: Metadata = {
  title: 'Alugar imóvel na Orla de Fortaleza',
  description: 'Escolha entre locação de longa temporada ou curta temporada na Orla de Fortaleza.',
  alternates: {
    canonical: '/alugar',
  },
}

const rentalJourneys = [
  {
    title: 'Longa temporada',
    eyebrow: 'Moradia residencial',
    description:
      'Imóveis para contratos residenciais, mudanças, moradia contínua e locações convencionais.',
    href: '/alugar/longa-temporada',
    cta: 'Ver locações residenciais',
    icon: Building2,
  },
  {
    title: 'Curta temporada',
    eyebrow: 'Estadia e hospedagem',
    description:
      'Apartamentos para férias, eventos, viagens corporativas, finais de semana e estadias temporárias.',
    href: '/alugar/curta-temporada',
    cta: 'Consultar estadias',
    icon: CalendarDays,
  },
] as const

export default function RentPage() {
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
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Locação ADRIZIO
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Como você pretende alugar?
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
                Escolha a modalidade adequada ao seu objetivo. Locação residencial e hospedagem
                possuem processos, critérios e necessidades diferentes.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
            {rentalJourneys.map((journey) => {
              const Icon = journey.icon

              return (
                <article
                  key={journey.href}
                  className="group rounded-3xl border border-white/10 bg-zinc-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-black/30 sm:p-9"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="size-6" aria-hidden="true" />
                  </div>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {journey.eyebrow}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold text-white">{journey.title}</h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-400">
                    {journey.description}
                  </p>

                  <Link
                    href={journey.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    {journey.cta}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
