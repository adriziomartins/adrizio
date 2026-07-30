import Link from 'next/link'
import { ArrowUpRight, BookOpen, Clock3 } from 'lucide-react'

import type { BlogPost } from '@/types/blog-post'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  const isPublished = post.status === 'published'

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/30">
      <div className="relative flex min-h-48 items-center justify-center overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_38%),linear-gradient(to_bottom_right,#27272a,#09090b)]">
        <BookOpen className="size-12 text-[#D4AF37]/70" aria-hidden="true" />

        <span className="absolute left-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur">
          {post.category}
        </span>

        {!isPublished && (
          <span className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-zinc-400 backdrop-blur">
            Em preparação
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold leading-8 text-white">{post.title}</h3>

        <p className="mt-4 flex-1 text-sm leading-7 text-zinc-400">{post.excerpt}</p>

        {post.readingTime && (
          <div className="mt-5 flex items-center gap-2 text-xs text-zinc-400">
            <Clock3 className="size-4" aria-hidden="true" />
            {post.readingTime}
          </div>
        )}

        <div className="mt-7 border-t border-white/10 pt-5">
          <Link
            href={`/blog/${post.slug}`}
            aria-label={`${isPublished ? 'Ler' : 'Ver prévia de'}: ${post.title}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            {isPublished ? 'Ler artigo' : 'Ver conteúdo em preparação'}

            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </article>
  )
}
