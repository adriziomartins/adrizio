import Link from 'next/link'
import { BookX } from 'lucide-react'

import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'

export default function BlogPostNotFound() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center bg-zinc-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/10 text-[#D4AF37]">
            <BookX className="size-7" aria-hidden="true" />
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
            Conteúdo não encontrado
          </p>

          <h1 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">
            Este artigo não está disponível
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            O endereço pode estar incorreto ou o conteúdo pode ter sido removido da programação
            editorial.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Voltar para o Blog
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
