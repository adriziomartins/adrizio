import { TrackedInternalLink } from '@/components/analytics/tracked-internal-link'
import { ArrowRight, Building2, MessageCircle } from 'lucide-react'

export function FinalCta() {
  return (
    <section
      id="contato"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden border-y border-white/10 bg-zinc-900 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08),transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
          Seu próximo passo
        </p>

        <h2
          id="final-cta-title"
          className="mx-auto mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-6xl"
        >
          Vamos transformar seu objetivo imobiliário em uma decisão bem orientada.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
          Seja para encontrar um imóvel na Orla de Fortaleza ou entender como posicionar melhor o
          seu patrimônio, escolha por onde deseja começar.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <TrackedInternalLink
            href="/contato"
            eventName="contact_start"
            contactIntent="general"
            sourcePage="home"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-7 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Escolher atendimento
            <ArrowRight className="size-4" aria-hidden="true" />
          </TrackedInternalLink>

          <TrackedInternalLink
            href="#avaliar"
            eventName="valuation_start"
            sourcePage="home"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 px-7 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/60 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Building2 className="size-4" aria-hidden="true" />
            Quero avaliar meu imóvel
          </TrackedInternalLink>
        </div>

        <p className="mt-7 text-xs leading-5 text-zinc-400">
          Atendimento imobiliário com foco na Orla de Fortaleza · Adrizio Martins · CRECI 25015F.
        </p>
      </div>
    </section>
  )
}
