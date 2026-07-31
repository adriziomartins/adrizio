'use client'

import type { MouseEventHandler, ReactNode } from 'react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import type { ContactIntent, PropertyStatus, SourcePage } from '@/types/analytics'

interface TrackedWhatsAppLinkProps {
  href: string
  sourcePage: SourcePage
  contactIntent: ContactIntent
  children: ReactNode
  className?: string
  propertySlug?: string
  propertyStatus?: PropertyStatus
  ariaLabel?: string
}

export function TrackedWhatsAppLink({
  href,
  sourcePage,
  contactIntent,
  children,
  className,
  propertySlug,
  propertyStatus,
  ariaLabel,
}: TrackedWhatsAppLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackAnalyticsEvent({
      event: 'whatsapp_click',
      source_page: sourcePage,
      contact_intent: contactIntent,
      destination: 'whatsapp',
      property_slug: propertySlug,
      property_status: propertyStatus,
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
