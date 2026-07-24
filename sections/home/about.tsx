import { MapPinned, ShieldCheck, Target } from 'lucide-react'

const pillars = [
  {
    title: 'Foco na Orla',
    description:
      'Uma atuação orientada às regiões mais estratégicas do litoral de Fortaleza e seu mercado imobiliário.',
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
      'Atendimento imobiliário conduzido por Adrizio Martins, Corretor de Imóveis, CRECI 25015F.',
    icon: ShieldCheck,
  },
]

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="scroll-mt-24 bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Sobre
              </p>
            </div>

            <h2
              id="about-title"
              className="max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Mercado imobiliário com foco na Orla de Fortaleza.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-zinc-400">
              ADRIZIO é a presença digital de Adrizio Martins no mercado imobiliário, construída
              para aproximar pessoas, imóveis e oportunidades com uma experiência cada vez mais
              organizada, informativa e especializada.
            </p>

            <div className="mt-8 border-l-2 border-[#D4AF37] pl-5">
              <p className="font-semibold text-white">Adrizio Martins</p>

              <p className="mt-1 text-sm text-zinc-400">Corretor de Imóveis · CRECI 25015F</p>
            </div>
          </div>

          <div className="grid gap-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon

              return (
                <article
                  key={pillar.title}
                  className="grid gap-5 rounded-2xl border border-white/10 bg-zinc-900/40 p-6 sm:grid-cols-[auto_1fr]"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">{pillar.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
