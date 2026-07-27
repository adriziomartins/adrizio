'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const SEARCH_FIELDS = ['finalidade', 'bairro', 'tipo', 'preco', 'quartos'] as const

type SearchField = (typeof SEARCH_FIELDS)[number]

const ALLOWED_VALUES: Record<SearchField, readonly string[]> = {
  finalidade: ['comprar', 'alugar', 'investir'],
  bairro: ['beira-mar', 'meireles', 'mucuripe', 'praia-de-iracema', 'praia-do-futuro', 'cumbuco'],
  tipo: ['apartamento', 'cobertura', 'flat', 'casa', 'terreno'],
  preco: ['ate-500000', 'ate-1000000', 'ate-2000000', 'ate-5000000', 'acima-5000000'],
  quartos: ['1', '2', '3', '4'],
}

const DEFAULT_VALUES: Record<SearchField, string> = {
  finalidade: 'comprar',
  bairro: '',
  tipo: '',
  preco: '',
  quartos: '',
}

function isAllowedValue(field: SearchField, value: string) {
  return ALLOWED_VALUES[field].includes(value)
}

export function PropertySearchEnhancer() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#property-search-form')
    const status = document.querySelector<HTMLElement>('#property-search-status')

    if (!form) {
      return
    }

    SEARCH_FIELDS.forEach((field) => {
      const value = searchParams.get(field)
      const control = form.elements.namedItem(field)

      if (!(control instanceof HTMLSelectElement)) {
        return
      }

      control.value = value && isAllowedValue(field, value) ? value : DEFAULT_VALUES[field]
    })

    const hasAppliedSearch = SEARCH_FIELDS.some((field) => {
      const value = searchParams.get(field)

      return Boolean(value && isAllowedValue(field, value))
    })

    if (status) {
      status.textContent = hasAppliedSearch ? 'Preferências registradas nesta busca.' : ''
    }
  }, [searchParams])

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#property-search-form')
    const status = document.querySelector<HTMLElement>('#property-search-status')

    if (!form) {
      return
    }

    const formElement = form

    function handleSubmit(event: SubmitEvent) {
      event.preventDefault()

      const formData = new FormData(formElement)
      const params = new URLSearchParams()

      SEARCH_FIELDS.forEach((field) => {
        const value = formData.get(field)

        if (typeof value === 'string' && value.length > 0 && isAllowedValue(field, value)) {
          params.set(field, value)
        }
      })

      const query = params.toString()
      const nextUrl = `${window.location.pathname}${query ? `?${query}` : ''}#busca`

      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`

      if (nextUrl !== currentUrl) {
        window.history.pushState(null, '', nextUrl)
      }

      if (status) {
        status.textContent = 'Preferências registradas nesta busca.'
      }
    }

    formElement.addEventListener('submit', handleSubmit)

    return () => {
      formElement.removeEventListener('submit', handleSubmit)
    }
  }, [])

  return null
}
