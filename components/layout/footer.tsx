import Link from 'next/link'

const propertyLinks = [
  {
    label: 'Comprar',
    href: '/imoveis?finalidade=comprar',
  },
  {
    label: 'Alugar',
    href: '/alugar',
  },
  {
    label: 'Investir',
    href: '/imoveis?finalidade=investir',
  },
  {
    label: 'Avaliar imóvel',
    href: '/#avaliar',
  },
]

const exploreLinks = [
  {
    label: 'Imóveis em destaque',
    href: '/#imoveis-destaque',
  },
  {
    label: 'Bairros e regiões',
    href: '/#bairros',
  },
  {
    label: 'Conteúdo imobiliário',
    href: '/#blog',
  },
  {
    label: 'Avaliações',
    href: '/#depoimentos',
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-black px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-md">
            <Link href="/" aria-label="ADRIZIO — Página inicial" className="inline-flex flex-col">
              <span className="text-xl font-semibold tracking-[0.22em] text-[#D4AF37]">
                ADRIZIO
              </span>

              <span className="mt-2 text-[11px] tracking-[0.17em] text-zinc-400">
                CRECI 25015F · ESPECIALISTA NA ORLA
              </span>
            </Link>

            <p className="mt-6 text-sm leading-7 text-zinc-400">
              Imóveis, oportunidades e inteligência imobiliária com foco na Orla de Fortaleza.
            </p>

            <p className="mt-5 text-xs leading-6 text-zinc-400">
              Atendimento imobiliário especializado na Orla de Fortaleza para compra, locação,
              investimento e avaliação de imóveis.
            </p>
          </div>

          <nav aria-label="Imóveis">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Imóveis
            </p>

            <ul className="mt-5 space-y-3">
              {propertyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explorar">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">
              Explorar
            </p>

            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 transition-colors hover:text-[#D4AF37]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} ADRIZIO. Todos os direitos reservados.</p>

          <p>Adrizio Martins · Corretor de Imóveis · CRECI 25015F</p>
        </div>
      </div>
    </footer>
  )
}
