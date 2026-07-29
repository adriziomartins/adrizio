import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

import type { Region } from '@/types/region'

interface RegionCardProps {
  region: Region
  index: number
}

export function RegionCard({ region, index }: RegionCardProps) {
  return (
    <article className="group relative min-h-[360px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900">
      {/* Fundo visual temporário */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%),linear-gradient(to_bottom_right,#27272a,#09090b)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        aria-hidden="true"
      />

      {/* Número */}
      <span
        className="absolute right-6 top-5 text-7xl font-semibold text-white/[0.04]"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Conteúdo */}
      <div className="relative flex min-h-[360px] flex-col justify-end p-6 sm:p-7">
        <div className="flex items-center gap-2 text-[#D4AF37]">
          <MapPin className="size-4" aria-hidden="true" />

          <span className="text-xs font-semibold uppercase tracking-[0.18em]">{region.city}</span>
        </div>

        <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-zinc-400">
          {region.highlight}
        </p>

        <h3 className="mt-2 text-3xl font-semibold text-white">{region.name}</h3>

        <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-400">{region.description}</p>

        <Link
          href={`/bairros/${region.slug}`}
          aria-label={`Ver imóveis em ${region.name}`}
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          Ver imóveis na região
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}
