'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import {
  PROPERTY_SEARCH_DEFAULT_VALUES,
  PROPERTY_SEARCH_FIELDS,
  isAllowedPropertySearchValue,
} from '@/lib/property-search'

export function PropertySearchEnhancer() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const form = document.querySelector<HTMLFormElement>('#property-search-form')

    const status = document.querySelector<HTMLElement>('#property-search-status')

    if (!form) {
      return
    }

    PROPERTY_SEARCH_FIELDS.forEach((field) => {
      const value = searchParams.get(field)
      const control = form.elements.namedItem(field)

      if (!(control instanceof HTMLSelectElement)) {
        return
      }

      control.value =
        value && isAllowedPropertySearchValue(field, value)
          ? value
          : PROPERTY_SEARCH_DEFAULT_VALUES[field]
    })

    const hasAppliedSearch = PROPERTY_SEARCH_FIELDS.some((field) => {
      const value = searchParams.get(field)

      return Boolean(value && isAllowedPropertySearchValue(field, value))
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

      PROPERTY_SEARCH_FIELDS.forEach((field) => {
        const value = formData.get(field)

        if (
          typeof value === 'string' &&
          value.length > 0 &&
          isAllowedPropertySearchValue(field, value)
        ) {
          params.set(field, value)
        }
      })

      const query = params.toString()

      const nextUrl = `${window.location.pathname}` + `${query ? `?${query}` : ''}` + '#busca'

      const currentUrl =
        `${window.location.pathname}` + `${window.location.search}` + `${window.location.hash}`

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
