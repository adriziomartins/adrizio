import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/contact'

const regions = ['Beira-Mar', 'Meireles', 'Mucuripe', 'Praia de Iracema', 'Praia do Futuro']

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-zinc-950"
    >
      {/* Fotografia principal */}
      <Image
        src="/images/hero/orla-fortaleza.jpg"
        alt="Vista da Beira-Mar de Fortaleza, Ceará"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay cinematográfico */}
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-zinc-950/20"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/35"
        aria-hidden="true"
      />

      {/* Luz dourada */}
      <div
        className="absolute left-1/3 top-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-center px-4 pb-40 pt-20 sm:px-6 lg:px-8 lg:pb-44">
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37] sm:text-sm">
              Especialista na Orla de Fortaleza
            </p>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            O seu refúgio ou investimento na{' '}
            <span className="text-[#D4AF37]">Orla de Fortaleza</span> começa aqui.
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">
            Imóveis selecionados nas regiões mais valorizadas do litoral de Fortaleza, com
            atendimento especializado para compra, locação e investimento.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#busca"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Encontrar meu imóvel
              <ArrowDown className="size-4" aria-hidden="true" />
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Falar com um especialista pelo WhatsApp — abre em nova aba"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-black/20 px-6 text-sm font-semibold text-white backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#D4AF37]/70 hover:bg-black/35 hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              Falar com um especialista
            </a>
          </div>

          <div className="mt-14 border-t border-white/20 pt-7">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-zinc-300/70">
              Regiões em destaque
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {regions.map((region) => (
                <li key={region} className="text-sm font-medium text-zinc-200">
                  {region}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Crédito obrigatório da imagem provisória */}
      <p className="absolute bottom-24 right-4 z-10 rounded-md bg-black/70 px-2 py-1 text-[10px] text-white/80">
        Foto: Joelkaula / Wikimedia Commons · CC BY-SA 4.0
      </p>
    </section>
  )
}
