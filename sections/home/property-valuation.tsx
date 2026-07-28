import { WHATSAPP_VALUATION_URL } from '@/lib/contact'
import { ArrowRight, BarChart3, CheckCircle2, FileSearch, Handshake, Home } from 'lucide-react'

const benefits = [
  'Análise do perfil e das características do imóvel',
  'Referências do mercado imobiliário da região',
  'Posicionamento adequado para venda ou locação',
  'Orientação comercial especializada',
]

const steps = [
  {
    number: '01',
    title: 'Conhecemos o imóvel',
    description:
      'Entendemos localização, características, estado, diferenciais e o objetivo do proprietário.',
    icon: Home,
  },
  {
    number: '02',
    title: 'Analisamos o mercado',
    description:
      'Comparamos o imóvel com referências e oportunidades da região para construir uma visão de mercado.',
    icon: BarChart3,
  },
  {
    number: '03',
    title: 'Definimos a estratégia',
    description:
      'Apresentamos uma orientação de posicionamento para venda, locação ou geração de renda.',
    icon: Handshake,
  },
]

export function PropertyValuation() {
  return (
    <section
      id="avaliar"
      aria-labelledby="property-valuation-title"
      className="relative overflow-hidden border-y border-white/10 bg-zinc-900/40 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* Proposta de valor */}
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Para proprietários
              </p>
            </div>

            <h2
              id="property-valuation-title"
              className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Descubra como posicionar melhor o seu imóvel no mercado.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              Uma boa negociação começa com uma análise criteriosa do imóvel, da região e do
              mercado. A ADRIZIO ajuda você a tomar decisões com mais informação antes de vender ou
              alugar.
            </p>

            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                >
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-[#D4AF37]"
                    aria-hidden="true"
                  />

                  {benefit}
                </li>
              ))}
            </ul>

            <a
              href={WHATSAPP_VALUATION_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Solicitar uma avaliação pelo WhatsApp — abre em nova aba"
              className="mt-10 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Solicitar uma avaliação
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>

            <p className="mt-4 text-xs leading-5 text-zinc-400">
              Atendimento personalizado para proprietários que desejam vender, alugar ou compreender
              melhor o posicionamento do imóvel no mercado.
            </p>
          </div>

          {/* Processo */}
          <div className="rounded-3xl border border-white/10 bg-zinc-950 p-6 shadow-2xl shadow-black/20 sm:p-8">
            <div className="flex items-center gap-3">
              <FileSearch className="size-5 text-[#D4AF37]" aria-hidden="true" />

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Como funciona
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <article
                    key={step.number}
                    className="group grid gap-5 rounded-2xl border border-white/10 p-5 transition-colors hover:border-[#D4AF37]/30 hover:bg-white/[0.02] sm:grid-cols-[auto_1fr]"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-[#D4AF37]">{step.number}</span>

                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-zinc-400">{step.description}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
