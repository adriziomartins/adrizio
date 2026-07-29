import { ArrowRight, Building, Home, TrendingUp } from 'lucide-react'

const journeys = [
  {
    id: 'comprar',
    title: 'Comprar',
    eyebrow: 'Seu próximo patrimônio',
    description:
      'Encontre imóveis selecionados para morar, construir patrimônio ou realizar uma nova etapa da sua vida na Orla de Fortaleza.',
    cta: 'Encontrar imóveis para comprar',
    href: '/comprar',
    icon: Home,
  },
  {
    id: 'alugar',
    title: 'Alugar',
    eyebrow: 'Viva onde você deseja',
    description:
      'Descubra opções para morar com localização estratégica, qualidade de vida e proximidade com tudo que a Orla oferece.',
    cta: 'Encontrar imóveis para alugar',
    href: '/alugar',
    icon: Building,
  },
  {
    id: 'investir',
    title: 'Investir',
    eyebrow: 'Oportunidades com potencial',
    description:
      'Explore imóveis com foco em valorização patrimonial, geração de renda e oportunidades imobiliárias em regiões estratégicas.',
    cta: 'Explorar oportunidades',
    href: '/imoveis?finalidade=investir',
    icon: TrendingUp,
  },
]

export function PropertyJourneys() {
  return (
    <section
      aria-labelledby="property-journeys-title"
      className="border-y border-white/10 bg-zinc-900/40 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Como podemos ajudar?
            </p>
          </div>

          <h2
            id="property-journeys-title"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Qual é o seu objetivo imobiliário?
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            Escolha sua jornada e encontre oportunidades alinhadas ao seu momento, às suas
            necessidades e aos seus objetivos.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {journeys.map((journey, index) => {
            const Icon = journey.icon

            return (
              <article
                id={journey.id}
                key={journey.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-black/30 sm:p-8"
              >
                <span
                  className="absolute right-6 top-4 text-7xl font-semibold text-white/[0.025]"
                  aria-hidden="true"
                >
                  0{index + 1}
                </span>

                <div className="relative">
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                    {journey.eyebrow}
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold text-white">{journey.title}</h3>

                  <p className="mt-5 min-h-24 text-sm leading-7 text-zinc-400">
                    {journey.description}
                  </p>

                  <a
                    href={journey.href}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    {journey.cta}

                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
