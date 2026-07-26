'use client'

import { useEffect } from 'react'

const SEARCH_FIELDS = ['finalidade', 'bairro', 'tipo', 'preco', 'quartos'] as const

type SearchField = (typeof SEARCH_FIELDS)[number]

const ALLOWED_VALUES: Record<SearchField, readonly string[]> = {
  finalidade: ['comprar', 'alugar', 'investir'],
  bairro: ['beira-mar', 'meireles', 'mucuripe', 'praia-de-iracema', 'praia-do-futuro', 'cumbuco'],
  tipo: ['apartamento', 'cobertura', 'flat', 'casa', 'terreno'],
  preco: ['ate-500000', 'ate-1000000', 'ate-2000000', 'ate-5000000', 'acima-5000000'],
  quartos: ['1', '2', '3', '4'],
}

function isAllowedValue(field: SearchField, value: string) {
  return ALLOWED_VALUES[field].includes(value)
}

export function PropertySearchEnhancer() {
  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#property-search-form')

    const status = document.querySelector<HTMLElement>('#property-search-status')

    if (!form) {
      return
    }

    const formElement = form

    const currentParams = new URLSearchParams(window.location.search)

    SEARCH_FIELDS.forEach((field) => {
      const value = currentParams.get(field)
      const control = form.elements.namedItem(field)

      if (value && isAllowedValue(field, value) && control instanceof HTMLSelectElement) {
        control.value = value
      }
    })

    const hasAppliedSearch = SEARCH_FIELDS.some((field) => {
      const value = currentParams.get(field)
      return typeof value === 'string' && value.length > 0
    })

    if (hasAppliedSearch && status) {
      status.textContent = 'Preferências registradas nesta busca.'
    }

    function handleSubmit(event: SubmitEvent) {
      event.preventDefault()

      const formData = new FormData(formElement)
      const params = new URLSearchParams()

      SEARCH_FIELDS.forEach((field) => {
        const value = formData.get(field)

        if (typeof value === 'string' && value.length > 0) {
          params.set(field, value)
        }
      })

      const query = params.toString()

      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${query ? `?${query}` : ''}#busca`,
      )

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
