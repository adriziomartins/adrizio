'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { MouseEventHandler, ReactNode } from 'react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import type { ContactIntent, SourcePage } from '@/types/analytics'

type InternalJourneyEvent =
  | {
      eventName: 'contact_start'
      contactIntent: ContactIntent
    }
  | {
      eventName: 'valuation_start'
      contactIntent?: never
    }
  | {
      eventName: 'buy_lead'
      contactIntent: 'buy'
    }
  | {
      eventName: 'rent_lead'
      contactIntent: 'rent'
    }
  | {
      eventName: 'investment_lead'
      contactIntent: 'investment'
    }

type TrackedInternalLinkProps = InternalJourneyEvent & {
  href: string
  children: ReactNode
  className?: string
  ariaLabel?: string
  sourcePage?: SourcePage
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

function resolveSourcePage(pathname: string): SourcePage {
  if (pathname === '/') return 'home'
  if (pathname === '/imoveis') return 'properties'
  if (pathname.startsWith('/imoveis/')) return 'property-details'
  if (pathname === '/comprar') return 'buy'
  if (pathname === '/alugar') return 'rent'
  if (pathname === '/alugar/longa-temporada') return 'long-term-rent'
  if (pathname === '/alugar/curta-temporada') return 'short-term-rent'
  if (pathname === '/investir') return 'investment'
  if (pathname === '/contato') return 'contact'
  if (pathname === '/sobre') return 'about'
  if (pathname === '/blog') return 'blog'
  if (pathname.startsWith('/blog/')) return 'blog-post'
  if (pathname.startsWith('/bairros/')) return 'neighborhood'

  return 'home'
}

export function TrackedInternalLink({
  href,
  children,
  className,
  ariaLabel,
  sourcePage,
  eventName,
  contactIntent,
  onClick,
}: TrackedInternalLinkProps) {
  const pathname = usePathname()

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    const resolvedSourcePage = sourcePage ?? resolveSourcePage(pathname)

    if (eventName === 'contact_start') {
      trackAnalyticsEvent({
        event: 'contact_start',
        source_page: resolvedSourcePage,
        contact_intent: contactIntent,
      })

      onClick?.(event)
      return
    }

    if (eventName === 'valuation_start') {
      trackAnalyticsEvent({
        event: 'valuation_start',
        source_page: resolvedSourcePage,
      })

      onClick?.(event)
      return
    }

    trackAnalyticsEvent({
      event: eventName,
      source_page: resolvedSourcePage,
      contact_intent: contactIntent,
    })

    onClick?.(event)
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  )
}
