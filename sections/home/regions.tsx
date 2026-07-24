import { RegionCard } from '@/components/region/region-card'
import { regions } from '@/data/regions'

export function Regions() {
  return (
    <section
      id="bairros"
      aria-labelledby="regions-title"
      className="bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D4AF37]" />

              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                Explore a Orla
              </p>
            </div>

            <h2
              id="regions-title"
              className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Encontre seu lugar na Orla de Fortaleza
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Conheça regiões com diferentes estilos de vida, perfis imobiliários e oportunidades
              para morar, investir ou construir patrimônio.
            </p>
          </div>

          <p className="max-w-md text-sm leading-6 text-zinc-400">
            Cada região possui características próprias de localização, infraestrutura, mercado e
            potencial imobiliário.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {regions.map((region, index) => (
            <RegionCard key={region.id} region={region} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
