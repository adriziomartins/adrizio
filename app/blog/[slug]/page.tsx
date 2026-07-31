import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, Clock3, MessageCircle } from 'lucide-react'

import { TrackedInternalLink } from '@/components/analytics/tracked-internal-link'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { blogPosts } from '@/data/blog-posts'
import { createBreadcrumbList } from '@/lib/structured-data'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

function findBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = findBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Conteúdo não encontrado',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const isPublished = post.status === 'published'

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    robots: isPublished
      ? {
          index: true,
          follow: true,
        }
      : {
          index: false,
          follow: false,
        },
    openGraph: {
      type: 'article',
      title: `${post.title} | ADRIZIO`,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = findBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const isPublished = post.status === 'published'

  const breadcrumbStructuredData = createBreadcrumbList([
    {
      name: 'Início',
      path: '/',
    },
    {
      name: 'Blog',
      path: '/blog',
    },
    {
      name: post.title,
      path: `/blog/${post.slug}`,
    },
  ])

  const structuredData = isPublished
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          '@type': 'Person',
          name: 'Adrizio Martins',
          jobTitle: 'Corretor de Imóveis',
        },
        publisher: {
          '@type': 'Organization',
          name: 'ADRIZIO',
          url: 'https://www.adrizio.com.br/',
        },
        mainEntityOfPage: `https://www.adrizio.com.br/blog/${post.slug}`,
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData).replace(/</g, '\\u003c'),
        }}
      />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
          }}
        />
      )}

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
        <article>
          <header className="border-b border-white/10 px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/blog"
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#D4AF37]"
              >
                ← Voltar para o Blog
              </Link>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#D4AF37]">
                  {post.category}
                </span>

                {!isPublished && (
                  <span className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-400">
                    Conteúdo em preparação
                  </span>
                )}

                {post.readingTime && (
                  <span className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {post.readingTime}
                  </span>
                )}
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="mt-6 text-base leading-8 text-zinc-400 sm:text-lg">{post.excerpt}</p>

              <div className="mt-8 border-l-2 border-[#D4AF37] pl-5">
                <p className="font-semibold text-white">Corretor Adrizio</p>
                <p className="mt-1 text-sm text-zinc-400">Adrizio Martins · CRECI 25015F</p>
              </div>
            </div>
          </header>

          <div className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-4xl">
              {isPublished && post.sections?.length ? (
                <div className="space-y-14">
                  {post.sections.map((section) => (
                    <section key={section.title}>
                      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                        {section.title}
                      </h2>

                      <div className="mt-5 space-y-5">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph} className="text-base leading-8 text-zinc-300">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/15 bg-zinc-900/50 p-8 text-center sm:p-12">
                  <BookOpen className="mx-auto size-9 text-[#D4AF37]" aria-hidden="true" />

                  <h2 className="mt-6 text-2xl font-semibold text-white">
                    Artigo em desenvolvimento
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">
                    Este tema integra o planejamento editorial do Site Adrizio. O artigo somente
                    será publicado após pesquisa, redação e revisão.
                  </p>

                  <Link
                    href="/blog"
                    className="mt-7 inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition-colors hover:border-[#D4AF37]/60 hover:text-[#D4AF37]"
                  >
                    Consultar outros conteúdos
                  </Link>
                </div>
              )}

              <aside className="mt-16 rounded-3xl border border-[#D4AF37]/25 bg-[#D4AF37]/5 p-8">
                <MessageCircle className="size-6 text-[#D4AF37]" aria-hidden="true" />

                <h2 className="mt-5 text-2xl font-semibold text-white">
                  Precisa analisar uma situação específica?
                </h2>

                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  Os conteúdos são informativos. Para conversar sobre compra, locação, investimento
                  ou avaliação de imóvel, escolha o atendimento adequado.
                </p>

                <TrackedInternalLink
                  href="/contato"
                  eventName="contact_start"
                  contactIntent="general"
                  sourcePage="blog-post"
                  className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-[#E5C45A]"
                >
                  Falar com o corretor Adrizio
                </TrackedInternalLink>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
