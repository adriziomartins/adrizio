import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { RegionCard } from '@/components/region/region-card'
import { regions } from '@/data/regions'

export const metadata: Metadata = {
  title: 'Bairros e regiões da Orla de Fortaleza',
  description:
    'Conheça os bairros e regiões apresentados pelo Site Adrizio e encontre oportunidades para comprar, alugar ou investir na Orla de Fortaleza.',
  alternates: {
    canonical: '/bairros',
  },
  openGraph: {
    title: 'Bairros e regiões da Orla de Fortaleza | ADRIZIO',
    description:
      'Explore regiões com diferentes estilos de vida, perfis imobiliários e oportunidades na Orla de Fortaleza.',
    url: '/bairros',
  },
}

export default function NeighborhoodsPage() {
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
                  Especialista na Orla
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Bairros e regiões da Orla de Fortaleza
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                Conheça o perfil de cada região, sua localização, características urbanas e
                oportunidades para morar, investir ou construir patrimônio.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10">
              <p className="text-sm font-medium text-[#D4AF37]">
                {regions.length} regiões em destaque
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                Explore as regiões apresentadas pelo Site Adrizio
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                Cada região possui características próprias de mobilidade, serviços, estilo de vida
                e posicionamento imobiliário.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {regions.map((region, index) => (
                <RegionCard key={region.id} region={region} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
