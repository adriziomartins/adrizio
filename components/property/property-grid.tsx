import { PropertyCard } from '@/components/property/property-card'

import type { Property } from '@/types/property'

interface PropertyGridProps {
  properties: Property[]
}

export function PropertyGrid({ properties }: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-white/15 bg-zinc-900/60 px-6 py-16 text-center">
        <h2 className="text-xl font-semibold text-white">Nenhum imóvel encontrado</h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400">
          Não encontramos imóveis com os filtros selecionados. Ajuste os critérios da busca para
          visualizar outras possibilidades.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
