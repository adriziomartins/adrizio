'use client'

import { useEffect, useRef } from 'react'

import { applyAttributionVisit } from '@/lib/attribution/capture'
import {
  clearAttributionState,
  readAttributionState,
  saveAttributionState,
} from '@/lib/attribution/storage'
import { readConsentPreferences } from '@/lib/consent'

type AnalyticsConsentStatus = 'granted' | 'denied'

function readAnalyticsConsentStatus(): AnalyticsConsentStatus {
  return readConsentPreferences()?.analytics === 'granted' ? 'granted' : 'denied'
}

function captureCurrentVisit(): void {
  const previousState = readAttributionState()

  const nextState = applyAttributionVisit(previousState, {
    url: new URL(window.location.href),
    referrer: document.referrer || undefined,
  })

  // applyAttributionVisit devolve o mesmo objeto quando a visita atual
  // não deve alterar a atribuição existente.
  if (nextState !== previousState) {
    saveAttributionState(nextState)
  }
}

export function AttributionCollector() {
  const analyticsConsentRef = useRef<AnalyticsConsentStatus>('denied')

  useEffect(() => {
    const initialStatus = readAnalyticsConsentStatus()

    analyticsConsentRef.current = initialStatus

    if (initialStatus === 'granted') {
      captureCurrentVisit()
    } else {
      clearAttributionState()
    }

    function handleConsentUpdated() {
      const previousStatus = analyticsConsentRef.current
      const currentStatus = readAnalyticsConsentStatus()

      analyticsConsentRef.current = currentStatus

      if (currentStatus === 'denied') {
        clearAttributionState()

        return
      }

      // Captura a página atual somente quando Analytics passa
      // de não autorizado para autorizado.
      if (previousStatus !== 'granted' && currentStatus === 'granted') {
        captureCurrentVisit()
      }
    }

    window.addEventListener('adrizio:consent-updated', handleConsentUpdated)

    return () => {
      window.removeEventListener('adrizio:consent-updated', handleConsentUpdated)
    }
  }, [])

  return null
}
