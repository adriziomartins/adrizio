'use client'

import { GoogleTagManager } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

import { readConsentPreferences } from '@/lib/consent'

interface GoogleTagManagerLoaderProps {
  containerId?: string
}

function hasOptionalConsent(): boolean {
  const preferences = readConsentPreferences()

  return Boolean(
    preferences && (preferences.analytics === 'granted' || preferences.marketing === 'granted'),
  )
}

export function GoogleTagManagerLoader({ containerId }: GoogleTagManagerLoaderProps) {
  const [canLoad, setCanLoad] = useState(false)

  useEffect(() => {
    const initializeTimeoutId = window.setTimeout(() => {
      setCanLoad(hasOptionalConsent())
    }, 0)

    function handleConsentUpdate() {
      setCanLoad(hasOptionalConsent())
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
