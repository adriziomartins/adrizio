import type { ConsentPreferences, GoogleConsentState } from '@/types/consent'

type GoogleConsentAction = 'default' | 'update'

const DEFAULT_GOOGLE_CONSENT_STATE: GoogleConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
}

function mapConsentPreferencesToGoogleConsentState(
  preferences: ConsentPreferences,
): GoogleConsentState {
  return {
    analytics_storage: preferences.analytics,
    ad_storage: preferences.marketing,
    ad_user_data: preferences.marketing,
    ad_personalization: preferences.marketing,
  }
}

function pushGoogleConsentCommand(action: GoogleConsentAction, state: GoogleConsentState): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer ?? []

  window.gtag =
    window.gtag ??
    function gtag() {
      // Mantém o formato oficial dos comandos da Google tag no dataLayer.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments)
    }

  window.gtag('consent', action, state)
}

export function initializeGoogleConsentMode(preferences: ConsentPreferences | null): void {
  if (typeof window === 'undefined' || window.__adrizioGoogleConsentInitialized) {
    return
  }

  window.__adrizioGoogleConsentInitialized = true

  pushGoogleConsentCommand('default', {
    ...DEFAULT_GOOGLE_CONSENT_STATE,
  })

  if (preferences) {
    pushGoogleConsentCommand('update', mapConsentPreferencesToGoogleConsentState(preferences))
  }
}

export function updateGoogleConsentMode(preferences: ConsentPreferences): void {
  if (typeof window === 'undefined') {
    return
  }

  if (!window.__adrizioGoogleConsentInitialized) {
    initializeGoogleConsentMode(null)
  }

  pushGoogleConsentCommand('update', mapConsentPreferencesToGoogleConsentState(preferences))
}
