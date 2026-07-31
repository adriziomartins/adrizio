'use client'

import type { FormEvent, ReactNode } from 'react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import type { SourcePage } from '@/types/analytics'

interface TrackedPropertyFormProps {
  action: string
  eventName: 'property_search' | 'property_filter'
  sourcePage: SourcePage
  children: ReactNode
  className?: string
  id?: string
}

function getFormValue(formData: FormData, name: string): string | undefined {
  const value = formData.get(name)

  return typeof value === 'string' && value ? value : undefined
}

export function TrackedPropertyForm({
  action,
  eventName,
  sourcePage,
  children,
  className,
  id,
}: TrackedPropertyFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget)

    trackAnalyticsEvent({
      event: eventName,
      source_page: sourcePage,
      purpose: getFormValue(formData, 'finalidade') ?? 'not_defined',
      modality: getFormValue(formData, 'modalidade'),
      neighborhood: getFormValue(formData, 'bairro'),
      property_type: getFormValue(formData, 'tipo'),
      price_range: getFormValue(formData, 'preco'),
      bedrooms: getFormValue(formData, 'quartos'),
    })
  }

  return (
    <form id={id} action={action} method="get" className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
