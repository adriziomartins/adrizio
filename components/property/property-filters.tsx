import Link from 'next/link'
import { BedDouble, Building2, MapPin, Search, SlidersHorizontal, Wallet } from 'lucide-react'

import type { PropertySearchValues } from '@/lib/property-search'

const inputClassName =
  'h-12 w-full appearance-none rounded-xl border border-zinc-700 bg-zinc-900 px-4 text-sm text-zinc-100 outline-none transition focus:border-[#D4AF37]/70 focus:ring-2 focus:ring-[#D4AF37]/15'

interface PropertyFiltersProps {
  values: PropertySearchValues
  action?: string
  showPurpose?: boolean
  showRentalModality?: boolean
  fixedPurpose?: 'comprar' | 'alugar' | 'investir'
  fixedRentalModality?: 'longa-temporada' | 'curta-temporada'
}

export function PropertyFilters({
  values,
  action = '/imoveis',
  showPurpose = true,
  showRentalModality = false,
  fixedPurpose,
  fixedRentalModality,
}: PropertyFiltersProps) {
  return (
    <form
      action={action}
      method="get"
      className="rounded-3xl border border-white/10 bg-zinc-900/70 p-5 sm:p-7"
    >
      <div className="mb-6 flex items-center gap-2 text-[#D4AF37]">
        <SlidersHorizontal className="size-4" aria-hidden="true" />

        <h2 className="text-xs font-semibold uppercase tracking-[0.18em]">Filtrar imóveis</h2>
      </div>

      {fixedPurpose ? <input type="hidden" name="finalidade" value={fixedPurpose} /> : null}

      {fixedRentalModality ? (
        <input type="hidden" name="modalidade" value={fixedRentalModality} />
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {showPurpose ? (
          <label className="space-y-2">
            <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
              <Search className="size-3.5" aria-hidden="true" />
              Finalidade
            </span>

            <select name="finalidade" defaultValue={values.finalidade} className={inputClassName}>
              <option value="comprar">Comprar</option>
              <option value="alugar">Alugar</option>
              <option value="investir">Investir</option>
            </select>
          </label>
        ) : null}

        {showRentalModality ? (
          <label className="space-y-2">
            <span className="text-xs font-medium text-zinc-400">Modalidade</span>

            <select name="modalidade" defaultValue={values.modalidade} className={inputClassName}>
              <option value="">Todas as modalidades</option>
              <option value="longa-temporada">Longa temporada</option>
              <option value="curta-temporada">Curta temporada</option>
            </select>
          </label>
        ) : null}

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <MapPin className="size-3.5" aria-hidden="true" />
            Região
          </span>

          <select name="bairro" defaultValue={values.bairro} className={inputClassName}>
            <option value="">Todas as regiões</option>
            <option value="beira-mar">Beira-Mar</option>
            <option value="meireles">Meireles</option>
            <option value="mucuripe">Mucuripe</option>
            <option value="praia-de-iracema">Praia de Iracema</option>
            <option value="praia-do-futuro">Praia do Futuro</option>
            <option value="cumbuco">Cumbuco</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <Building2 className="size-3.5" aria-hidden="true" />
            Tipo
          </span>

          <select name="tipo" defaultValue={values.tipo} className={inputClassName}>
            <option value="">Todos os tipos</option>
            <option value="apartamento">Apartamento</option>
            <option value="cobertura">Cobertura</option>
            <option value="flat">Flat</option>
            <option value="casa">Casa</option>
            <option value="terreno">Terreno</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <Wallet className="size-3.5" aria-hidden="true" />
            Faixa de preço
          </span>

          <select name="preco" defaultValue={values.preco} className={inputClassName}>
            <option value="">Qualquer valor</option>
            <option value="ate-500000">Até R$ 500 mil</option>
            <option value="ate-1000000">Até R$ 1 milhão</option>
            <option value="ate-2000000">Até R$ 2 milhões</option>
            <option value="ate-5000000">Até R$ 5 milhões</option>
            <option value="acima-5000000">Acima de R$ 5 milhões</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="flex items-center gap-2 text-xs font-medium text-zinc-400">
            <BedDouble className="size-3.5" aria-hidden="true" />
            Quartos
          </span>

          <select name="quartos" defaultValue={values.quartos} className={inputClassName}>
            <option value="">Qualquer</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </label>

        <div className="flex items-end">
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-5 text-sm font-semibold text-zinc-950 transition-all hover:-translate-y-0.5 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <Search className="size-4" aria-hidden="true" />
            Aplicar filtros
          </button>
        </div>
      </div>

      <div className="mt-5">
        <Link
          href={action}
          className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#D4AF37]"
        >
          Limpar filtros
        </Link>
      </div>
    </form>
  )
}
