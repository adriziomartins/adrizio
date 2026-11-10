import type { Metadata } from 'next'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { PropertyValuation } from '@/sections/home/property-valuation'

export const metadata: Metadata = {
  title: 'Avaliar Imóvel na Orla de Fortaleza',
  description:
    'Solicite uma análise de posicionamento imobiliário para venda ou locação na Orla de Fortaleza.',
  alternates: { canonical: '/avaliar-imovel' },
}

export default function ValuationPage() {
  return (
    <>
      <a href="#conteudo-principal" className="fixed -top-20 left-4 z-[100] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-zinc-950 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950">
        Pular para o conteúdo principal
      </a>
      <Navbar />
      <main id="conteudo-principal" tabIndex={-1} className="min-h-screen bg-zinc-950 focus:outline-none">
        <div className="mx-auto max-w-7xl px-4 pt-14 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">Para proprietários</p>
          <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Avaliar Imóvel</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
            Entenda o posicionamento do seu imóvel no mercado imobiliário da Orla de Fortaleza.
          </p>
        </div>
        <PropertyValuation sourcePage="valuation" />
      </main>
      <Footer />
    </>
  )
}
