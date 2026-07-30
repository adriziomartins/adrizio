import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPinned, MessageCircle, ShieldCheck, Target } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { WHATSAPP_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Sobre a ADRIZIO',
  description:
    'Conheça a ADRIZIO, marca imobiliária de Adrizio Martins, corretor de imóveis CRECI 25015F, com atuação focada na Orla de Fortaleza.',
  alternates: {
    canonical: '/sobre',
  },
  openGraph: {
    title: 'Sobre a ADRIZIO | Imóveis na Orla de Fortaleza',
    description:
      'Atendimento imobiliário, conhecimento local e presença estratégica para apoiar decisões de compra, locação e investimento.',
    url: '/sobre',
  },
}

const pillars = [
  {
    title: 'Foco na Orla',
    description:
      'Atuação orientada às regiões mais estratégicas da Orla de Fortaleza e ao comportamento do seu mercado imobiliário.',
    icon: MapPinned,
  },
  {
    title: 'Decisão bem orientada',
    description:
      'Informação, análise e atendimento próximo para apoiar decisões de compra, locação, venda e investimento.',
    icon: Target,
  },
  {
    title: 'Atuação profissional',
    description:
      'Atendimento conduzido por Adrizio Martins, corretor de imóveis regularmente inscrito no CRECI-CE sob o número 25015F.',
    icon: ShieldCheck,
  },
] as const

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'RealEstateAgent',
      '@id': 'https://www.adrizio.com.br/#organization',
      name: 'ADRIZIO',
      url: 'https://www.adrizio.com.br/',
      description:
        'Atendimento imobiliário com foco na Orla de Fortaleza para compra, locação, investimento e avaliação de imóveis.',
      areaServed: {
        '@type': 'City',
        name: 'Fortaleza',
      },
      founder: {
        '@id': 'https://www.adrizio.com.br/#adrizio-martins',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.adrizio.com.br/#adrizio-martins',
      name: 'Adrizio Martins',
      jobTitle: 'Corretor de Imóveis',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'CRECI-CE',
        value: '25015F',
      },
      worksFor: {
        '@id': 'https://www.adrizio.com.br/#organization',
      },
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
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
        <section className="relative overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_38%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Sobre a ADRIZIO
                </p>
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Mercado imobiliário com foco na Orla de Fortaleza
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                A ADRIZIO é a marca imobiliária de Adrizio Martins, construída para aproximar
                pessoas, imóveis e oportunidades com atendimento especializado, presença local e uma
                visão cada vez mais estratégica do mercado imobiliário.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/imoveis"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Explorar imóveis
                </Link>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Falar com Adrizio
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
                <Image
                  src="/images/adrizio-sobre.jpg"
                  alt="Adrizio Martins, corretor de imóveis"
                  width={900}
                  height={1200}
                  priority
                  className="aspect-[3/4] w-full object-cover object-center"
                />
              </div>

              <div className="mt-5 border-l-2 border-[#D4AF37] pl-5">
                <p className="font-semibold text-white">Adrizio Martins</p>
                <p className="mt-1 text-sm text-zinc-400">Corretor de Imóveis · CRECI 25015F</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Proposta de valor
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Informação, presença local e atendimento próximo
              </h2>

              <p className="mt-5 text-sm leading-8 text-zinc-400 sm:text-base">
                A proposta da ADRIZIO é oferecer uma experiência imobiliária mais organizada,
                transparente e orientada à realidade de cada cliente, sem reduzir decisões
                patrimoniais importantes a uma simples listagem de anúncios.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <article
                    key={pillar.title}
                    className="rounded-3xl border border-white/10 bg-zinc-950 p-7"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <h3 className="mt-6 text-xl font-semibold text-white">{pillar.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Posicionamento
              </p>

              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Uma marca imobiliária construída com visão de longo prazo
              </h2>

              <p className="mt-5 text-sm leading-8 text-zinc-400 sm:text-base">
                A ADRIZIO nasce com o propósito de consolidar uma presença forte no mercado
                imobiliário da Orla de Fortaleza, unindo atendimento humano, conhecimento do
                território e organização comercial.
              </p>

              <p className="mt-5 text-sm leading-8 text-zinc-400 sm:text-base">
                O foco está em construir confiança, clareza e relacionamento de longo prazo com
                clientes que desejam comprar, alugar, investir ou posicionar melhor seus imóveis no
                mercado.
              </p>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                  Atendimento imobiliário
                </p>

                <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  Vamos conversar sobre seu objetivo?
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Compra, locação, investimento ou avaliação de imóvel exigem contexto. Informe sua
                  necessidade para iniciar um atendimento direcionado.
                </p>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  Falar com a ADRIZIO
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
