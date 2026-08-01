'use client'

import { useEffect, useRef } from 'react'

import { trackAnalyticsEvent } from '@/lib/analytics'
import { readConsentPreferences } from '@/lib/consent'
import type { ViewNeighborhoodEvent, ViewPropertyEvent } from '@/types/analytics'

type PageViewEvent = ViewPropertyEvent | ViewNeighborhoodEvent

interface TrackedPageViewProps {
  event: PageViewEvent
}

function createEventKey(event: PageViewEvent): string {
  if (event.event === 'view_property') {
    return [
      event.event,
      event.property_slug,
      event.property_status,
      event.property_purpose,
      event.neighborhood,
    ].join(':')
  }

  return [event.event, event.neighborhood_slug].join(':')
}

export function TrackedPageView({ event }: TrackedPageViewProps) {
  const hasTrackedRef = useRef(false)
  const eventKey = createEventKey(event)

  useEffect(() => {
    function tryTrackPageView() {
      if (hasTrackedRef.current) {
        return
      }

      const consentPreferences = readConsentPreferences()

      if (consentPreferences?.analytics !== 'granted') {
        return
      }

      trackAnalyticsEvent(event)
      hasTrackedRef.current = true
    }

    tryTrackPageView()

    window.addEventListener('adrizio:consent-updated', tryTrackPageView)

    return () => {
      window.removeEventListener('adrizio:consent-updated', tryTrackPageView)
    }
  }, [event, eventKey])

  return null
}
