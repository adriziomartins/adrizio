'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

import { readConsentPreferences } from '@/lib/consent'
import { initializeGoogleConsentMode } from '@/lib/google-consent'
import type { ConsentPreferences } from '@/types/consent'

interface GoogleTagManagerLoaderProps {
  containerId?: string
}

function hasOptionalConsent(preferences: ConsentPreferences | null): boolean {
  return Boolean(
    preferences && (preferences.analytics === 'granted' || preferences.marketing === 'granted'),
  )
}

export function GoogleTagManagerLoader({ containerId }: GoogleTagManagerLoaderProps) {
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    const preferences = readConsentPreferences()

    initializeGoogleConsentMode(preferences)

    const initializeTimeoutId = window.setTimeout(() => {
      setCanLoad(hasOptionalConsent(preferences))
    }, 0)

    function handleConsentUpdate() {
      setCanLoad(hasOptionalConsent(readConsentPreferences()))
    }

    window.addEventListener('adrizio:consent-updated', handleConsentUpdate)

    return () => {
      window.clearTimeout(initializeTimeoutId)
      window.removeEventListener('adrizio:consent-updated', handleConsentUpdate)
    }
  }, [])

  if (!containerId || !canLoad) {
    return null
  }

  return <GoogleTagManager gtmId={containerId} />
}
