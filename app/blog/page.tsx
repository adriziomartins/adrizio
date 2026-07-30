import type { Metadata } from 'next'
import { BookOpen, MapPinned, Search, TrendingUp } from 'lucide-react'

import { BlogCard } from '@/components/blog/blog-card'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { blogPosts } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Blog imobiliário',
  description:
    'Guias sobre bairros, compra, locação, investimento e mercado imobiliário na Orla de Fortaleza.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog imobiliário | ADRIZIO',
    description:
      'Informação prática para compradores, proprietários e investidores na Orla de Fortaleza.',
    url: '/blog',
  },
}

const editorialPillars = [
  {
    title: 'Bairros e regiões',
    description:
      'Características urbanas, localização, infraestrutura e perfil imobiliário das principais regiões.',
    icon: MapPinned,
  },
  {
    title: 'Compra e locação',
    description:
      'Critérios, cuidados e informações para apoiar decisões imobiliárias mais bem orientadas.',
    icon: Search,
  },
  {
    title: 'Mercado e investimento',
    description:
      'Conteúdos sobre valorização, geração de renda, liquidez e construção patrimonial.',
    icon: TrendingUp,
  },
] as const

export default function BlogPage() {
  const publishedPosts = blogPosts.filter((post) => post.status === 'published')
  const plannedPosts = blogPosts.filter((post) => post.status === 'planned')

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
        <section className="relative overflow-hidden border-b border-white/10 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.16),transparent_38%)]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#D4AF37]" aria-hidden="true" />

                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                  Conteúdo imobiliário
                </p>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Informação para decisões imobiliárias mais claras
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
                Guias, análises e conteúdos sobre bairros, compra, locação, investimento e mercado
                imobiliário com foco na Orla de Fortaleza.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/10 bg-zinc-900/40 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
            {editorialPillars.map((pillar) => {
              const Icon = pillar.icon

              return (
                <article
                  key={pillar.title}
                  className="rounded-3xl border border-white/10 bg-zinc-950 p-7"
                >
                  <Icon className="size-6 text-[#D4AF37]" aria-hidden="true" />

                  <h2 className="mt-6 text-xl font-semibold text-white">{pillar.title}</h2>

                  <p className="mt-3 text-sm leading-7 text-zinc-400">{pillar.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            {publishedPosts.length > 0 ? (
              <>
                <div className="mb-10">
                  <p className="text-sm font-medium text-[#D4AF37]">
                    {publishedPosts.length}{' '}
                    {publishedPosts.length === 1 ? 'artigo publicado' : 'artigos publicados'}
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Conteúdos disponíveis
                  </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {publishedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-white/15 bg-zinc-900/50 px-6 py-14 text-center">
                <BookOpen className="mx-auto size-8 text-[#D4AF37]" aria-hidden="true" />

                <h2 className="mt-5 text-2xl font-semibold text-white">
                  Biblioteca editorial em construção
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                  Os primeiros artigos estão sendo estruturados. Nenhum conteúdo será apresentado
                  como publicado antes da revisão editorial.
                </p>
              </div>
            )}

            {plannedPosts.length > 0 && (
              <div className="mt-16">
                <div className="mb-10">
                  <p className="text-sm font-medium text-[#D4AF37]">Planejamento editorial</p>

                  <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
                    Próximos conteúdos
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                    Temas atualmente em desenvolvimento para a biblioteca do Site Adrizio.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {plannedPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
