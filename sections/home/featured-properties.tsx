import { PropertyCard } from '@/components/property/property-card'
import { featuredProperties } from '@/data/featured-properties'

export function FeaturedProperties() {
  return (
    <section
      id="imoveis-destaque"
      className="bg-zinc-950 px-4 pb-24 pt-24 sm:px-6 lg:px-8 lg:pb-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
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

          <p className="text-sm font-medium text-zinc-400">Catálogo completo em breve</p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Aviso de desenvolvimento */}
        <p className="mt-8 text-xs leading-5 text-zinc-400">
          Os imóveis exibidos nesta versão são dados demonstrativos utilizados durante o
          desenvolvimento do Site Adrizio.
        </p>
      </div>
    </section>
  )
}
