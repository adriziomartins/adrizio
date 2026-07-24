import { BlogCard } from '@/components/blog/blog-card'
import { blogPosts } from '@/data/blog-posts'

export function BlogPreview() {
  return (
    <section
      id="blog"
      aria-labelledby="blog-preview-title"
      className="bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Conteúdo e inteligência imobiliária
              </p>
            </div>

            <h2
              id="blog-preview-title"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Conhecimento para tomar melhores decisões imobiliárias.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Guias sobre bairros, mercado, compra, locação e investimento com foco na Orla de
              Fortaleza.
            </p>
          </div>

          <p className="max-w-sm text-sm leading-6 text-zinc-500">
            Informação prática para compradores, proprietários e investidores que desejam tomar
            decisões imobiliárias com mais clareza.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
