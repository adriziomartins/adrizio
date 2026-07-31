import type { Metadata } from 'next'
import { CalendarDays, MapPin, Users } from 'lucide-react'

import { TrackedWhatsAppLink } from '@/components/analytics/tracked-whatsapp-link'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { WHATSAPP_URL } from '@/lib/contact'

export const metadata: Metadata = {
  title: 'Aluguel por curta temporada em Fortaleza',
  description:
    'Consulte apartamentos para curta temporada, férias, eventos e viagens corporativas em Fortaleza.',
  alternates: {
    canonical: '/alugar/curta-temporada',
  },
}

const requestFields = [
  {
    title: 'Datas da estadia',
    description: 'Informe entrada e saída para verificarmos disponibilidade.',
    icon: CalendarDays,
  },
  {
    title: 'Quantidade de hóspedes',
    description: 'Adultos, crianças e necessidades específicas da acomodação.',
    icon: Users,
  },
  {
    title: 'Região desejada',
    description: 'Beach Class, Beira-Mar, Meireles ou outra localização.',
    icon: MapPin,
  },
]

export default function ShortStayPage() {
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Estadias e hospedagem
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Curta temporada na Orla de Fortaleza
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
              Consulte apartamentos para férias, eventos, finais de semana, viagens corporativas e
              outras estadias temporárias.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {requestFields.map((field) => {
                const Icon = field.icon

                return (
                  <article
                    key={field.title}
                    className="rounded-3xl border border-white/10 bg-zinc-900 p-7"
                  >
                    <Icon className="size-6 text-[#D4AF37]" aria-hidden="true" />

                    <h2 className="mt-6 text-xl font-semibold text-white">{field.title}</h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">{field.description}</p>
                  </article>
                )
              })}
            </div>

            <div className="mt-12 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
                Consulta personalizada
              </p>

              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Solicite uma cotação de curta temporada
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                A disponibilidade e o valor final dependem das datas, número de hóspedes, acomodação
                escolhida e regras da unidade.
              </p>

              <TrackedWhatsAppLink
                href={WHATSAPP_URL}
                sourcePage="short-term-rent"
                contactIntent="rent"
                className="mt-7 inline-flex rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-[#E5C45A]"
              >
                Consultar pelo WhatsApp
              </TrackedWhatsAppLink>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
