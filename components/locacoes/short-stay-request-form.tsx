'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import { WHATSAPP_NUMBER } from '@/lib/contact'

function makeQuoteUrl(data: {
  checkIn: string
  checkOut: string
  adults: number
  children: number
  region: string
}) {
  const message = [
    'Olá, Adrizio. Vim da página Locações do site ADRIZIO e gostaria de solicitar uma cotação de curta temporada.',
    `Entrada: ${data.checkIn}`,
    `Saída: ${data.checkOut}`,
    `Adultos: ${data.adults}`,
    `Crianças: ${data.children}`,
    `Região de preferência: ${data.region || 'A definir'}`,
    'Por favor, informe as opções, valores e disponibilidade para este período.',
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function ShortStayRequestForm() {
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const values = new FormData(event.currentTarget)
    const checkIn = String(values.get('checkIn') ?? '')
    const checkOut = String(values.get('checkOut') ?? '')
    const adults = Number(values.get('adults'))
    const children = Number(values.get('children'))
    const region = String(values.get('region') ?? '')

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setError('A data de saída deve ser posterior à data de entrada.')
      return
    }

    if (!Number.isInteger(adults) || adults < 1 || !Number.isInteger(children) || children < 0) {
      setError('Informe corretamente a quantidade de adultos e crianças.')
      return
    }

    const url = makeQuoteUrl({ checkIn, checkOut, adults, children, region })

    trackAnalyticsEvent({
      event: 'whatsapp_click',
      source_page: 'short-term-rent',
      contact_intent: 'rent',
      destination: 'whatsapp',
    })

    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="rounded-3xl border border-[#D4AF37]/25 bg-zinc-950 p-6 sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D4AF37]">
        Solicitação de estadia
      </p>
      <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
        Consulte valores para as suas datas
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
        Preencha os dados básicos. A solicitação será aberta no WhatsApp para cotação manual.
        Este formulário não confirma reserva, disponibilidade nem preço.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
        <label className="block text-sm text-zinc-300">
          Entrada
          <input name="checkIn" type="date" required className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-zinc-100 focus:border-[#D4AF37]" />
        </label>
        <label className="block text-sm text-zinc-300">
          Saída
          <input name="checkOut" type="date" required className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-zinc-100 focus:border-[#D4AF37]" />
        </label>
        <label className="block text-sm text-zinc-300">
          Adultos
          <input name="adults" type="number" min="1" max="30" defaultValue="2" required className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-zinc-100 focus:border-[#D4AF37]" />
        </label>
        <label className="block text-sm text-zinc-300">
          Crianças
          <input name="children" type="number" min="0" max="30" defaultValue="0" required className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-zinc-100 focus:border-[#D4AF37]" />
        </label>
        <label className="block text-sm text-zinc-300">
          Região
          <select name="region" defaultValue="" className="mt-2 h-12 w-full rounded-xl border border-zinc-700 bg-zinc-900 px-3 text-zinc-100 focus:border-[#D4AF37]">
            <option value="">A definir</option>
            <option value="Beira-Mar">Beira-Mar</option>
            <option value="Meireles">Meireles</option>
            <option value="Mucuripe">Mucuripe</option>
            <option value="Praia de Iracema">Praia de Iracema</option>
            <option value="Praia do Futuro">Praia do Futuro</option>
            <option value="Outra região">Outra região</option>
          </select>
        </label>
        {error ? <p role="alert" className="text-sm text-red-300 md:col-span-2 lg:col-span-5">{error}</p> : null}
        <div className="flex flex-col gap-3 md:col-span-2 lg:col-span-5 sm:flex-row sm:items-center">
          <button type="submit" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D4AF37] px-6 text-sm font-semibold text-zinc-950 hover:bg-[#E5C45A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]">
            Solicitar cotação no WhatsApp
          </button>
          <p className="max-w-xl text-xs leading-5 text-zinc-400">
            A capacidade, a estadia mínima, a diária e as condições variam conforme o imóvel e o período.
          </p>
        </div>
      </form>
    </div>
  )
}
