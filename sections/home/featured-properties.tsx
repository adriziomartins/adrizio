import { PropertyCard } from '@/components/property/property-card'
import { featuredProperties } from '@/data/featured-properties'

export async function FeaturedProperties() {
  const useDatabase =
    process.env.NODE_ENV === 'development' && process.env.CATALOG_SOURCE === 'database'

  const properties = useDatabase
    ? (await (await import('@/lib/property-repository')).listPublishedProperties()).filter(
        (property) => property.featured,
      )
    : featuredProperties

  const hasDemonstratives = properties.some((property) => property.demonstrative)

  return (
    <section
      id="imoveis-destaque"
      className="bg-zinc-950 px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Seleção ADRIZIO
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Imóveis em destaque
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Uma seleção de oportunidades para morar, investir ou construir patrimônio nas regiões
              mais valorizadas da Orla de Fortaleza.
            </p>
          </div>

          <p className="text-sm font-medium text-zinc-400">
            {useDatabase ? 'Imóveis reais publicados' : 'Catálogo em expansão'}
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-sm leading-7 text-zinc-400">
            Nenhum imóvel selecionado para destaque no momento.
          </p>
        )}

        {hasDemonstratives ? (
          <p className="mt-8 text-xs leading-5 text-zinc-400">
            O Beach Class Fortaleza já representa uma hospedagem real. Os demais imóveis marcados
            como “Demonstrativo” permanecem apenas durante a expansão do catálogo.
          </p>
        ) : null}
      </div>
    </section>
  )
}
