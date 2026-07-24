import Link from 'next/link'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { WHATSAPP_URL } from '@/lib/contact'

const navigation = [
  { label: 'Comprar', href: '#comprar' },
  { label: 'Alugar', href: '#alugar' },
  { label: 'Avaliar Imóvel', href: '#avaliar' },
  { label: 'Sobre Nós', href: '#sobre' },
  { label: 'Blog', href: '#blog' },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Marca */}
        <Link href="/" className="flex flex-col leading-none" aria-label="ADRIZIO — Página inicial">
          <span className="text-lg font-semibold tracking-[0.22em] text-[#D4AF37]">ADRIZIO</span>

          <span className="mt-1 text-[10px] tracking-[0.18em] text-zinc-400">
            CRECI 25015F · ESPECIALISTA NA ORLA
          </span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-[#D4AF37]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden lg:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Fale conosco pelo WhatsApp — abre em nova aba"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#D4AF37] px-5 text-sm font-medium text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Fale Conosco
          </a>
        </div>

        {/* Navegação mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Abrir menu de navegação"
                  className="text-zinc-100"
                />
              }
            >
              <Menu className="size-6" aria-hidden="true" />
            </SheetTrigger>

            <SheetContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
              <SheetTitle className="sr-only">Menu de navegação</SheetTitle>

              <div className="border-b border-zinc-800 px-6 py-7">
                <span className="text-lg font-semibold tracking-[0.22em] text-[#D4AF37]">
                  ADRIZIO
                </span>

                <p className="mt-2 text-xs tracking-wider text-zinc-500">CRECI 25015F</p>
              </div>

              <nav className="flex flex-col gap-1 p-6" aria-label="Navegação mobile">
                {navigation.map((item) => (
                  <SheetClose
                    key={item.href}
                    nativeButton={false}
                    render={
                      <Link
                        href={item.href}
                        className="rounded-lg px-3 py-3 text-base font-medium text-zinc-200 transition-colors hover:bg-zinc-900 hover:text-[#D4AF37]"
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                ))}

                <SheetClose
                  nativeButton={false}
                  render={
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Fale conosco pelo WhatsApp — abre em nova aba"
                      className="mt-5 flex h-11 items-center justify-center rounded-full bg-[#D4AF37] px-5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A]"
                    />
                  }
                >
                  Fale Conosco
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
