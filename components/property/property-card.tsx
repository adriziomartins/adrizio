import Image from 'next/image'
import Link from 'next/link'
import { Bath, BedDouble, Building2, Car, MapPin, Maximize2 } from 'lucide-react'

import { getPropertyPriceLabel } from '@/lib/property-price'

import type { Property } from '@/types/property'

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  const priceLabel = getPropertyPriceLabel(property)

  return (
    <article className="group overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/40 hover:shadow-2xl hover:shadow-black/30">
      {/* Área visual */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_35%)]"
          aria-hidden="true"
        />

        {property.image ? (
          <Image
            src={property.image}
            alt={property.imageAlt ?? property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Building2
            className="relative size-16 text-[#D4AF37]/40 transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
        )}

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-950">
            {property.purpose}
          </span>

          {property.demonstrative && (
            <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-zinc-200 backdrop-blur-md">
              Demonstrativo
            </span>
          )}

          {property.rentalModality === 'curta-temporada' && !property.demonstrative ? (
            <span className="rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
              Curta temporada
            </span>
          ) : null}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <MapPin className="size-4 text-[#D4AF37]" aria-hidden="true" />
          {property.neighborhood} · {property.city}
        </div>

        <h3 className="mt-3 text-xl font-semibold leading-snug text-white">{property.title}</h3>

        <div className="mt-4">
          <p className="text-2xl font-semibold text-[#D4AF37]">{priceLabel}</p>

          {property.demonstrative ? (
            <p className="mt-1 text-xs text-zinc-500">Valor meramente ilustrativo</p>
          ) : null}
        </div>

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
            <dd className="text-xs text-zinc-300">
              {property.parkingSpaces} {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}
            </dd>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Maximize2 className="size-4 text-zinc-400" aria-hidden="true" />

            <dt className="sr-only">Área</dt>
            <dd className="text-xs text-zinc-300">{property.area} m²</dd>
          </div>
        </dl>
        {property.demonstrative ? (
          <p className="mt-5 text-xs leading-5 text-zinc-500">
            Prévia demonstrativa do catálogo. Este conteúdo não representa um anúncio publicado.
          </p>
        ) : null}

        <Link
          href={`/imoveis/${property.slug}`}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-all hover:border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          {property.demonstrative
            ? 'Ver página demonstrativa'
            : property.rentalModality === 'curta-temporada'
              ? 'Ver hospedagem'
              : 'Ver imóvel'}
        </Link>
      </div>
    </article>
  )
}
