import Link from 'next/link'
import { Bath, BedDouble, Building2, Car, MapPin, Maximize2 } from 'lucide-react'

import type { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-black/30">
      {/* Área visual */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%)]"
          aria-hidden="true"
        />

        <Building2
          className="relative size-16 text-[#D4AF37]/40 transition-transform duration-500 group-hover:scale-110"
          aria-hidden="true"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-950">
            {property.purpose}
          </span>

          {property.demonstrative && (
            <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md">
              Demonstrativo
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin className="size-4 text-[#D4AF37]" aria-hidden="true" />
          {property.neighborhood} · {property.city}
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{property.title}</h3>

        <p className="mt-4 text-2xl font-semibold text-[#D4AF37]">
          {currencyFormatter.format(property.price)}
        </p>

        {/* Características */}
        <dl className="mt-6 grid grid-cols-4 gap-2 border-y border-white/10 py-4">
          <div className="flex flex-col items-center gap-1">
            <BedDouble className="size-4 text-zinc-400" aria-hidden="true" />

            <dt className="sr-only">Quartos</dt>
            <dd className="text-xs text-zinc-300">{property.bedrooms} qtos</dd>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Bath className="size-4 text-zinc-400" aria-hidden="true" />

            <dt className="sr-only">Banheiros</dt>
            <dd className="text-xs text-zinc-300">{property.bathrooms} banh.</dd>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Car className="size-4 text-zinc-400" aria-hidden="true" />

            <dt className="sr-only">Vagas de garagem</dt>
            <dd className="text-xs text-zinc-300">{property.parkingSpaces} vagas</dd>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Maximize2 className="size-4 text-zinc-400" aria-hidden="true" />

            <dt className="sr-only">Área</dt>
            <dd className="text-xs text-zinc-300">{property.area} m²</dd>
          </div>
        </dl>
        {property.demonstrative ? (
          <div className="mt-5 inline-flex w-full cursor-default items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-400">
            Detalhes em breve
          </div>
        ) : (
          <Link
            href={`/imoveis/${property.slug}`}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Ver imóvel
          </Link>
        )}
      </div>
    </article>
  )
}
