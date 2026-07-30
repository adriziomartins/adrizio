import type { ConsentPreferences } from '@/types/consent'

export const CONSENT_STORAGE_KEY = 'adrizio-consent'

export const CONSENT_VERSION = 1

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = {
  necessary: 'granted',
  analytics: 'denied',
  marketing: 'denied',
  updatedAt: '',
  version: CONSENT_VERSION,
}

function isConsentStatus(value: unknown): value is 'granted' | 'denied' {
  return value === 'granted' || value === 'denied'
}

function isValidConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== 'object') {
    return false
  }

  const preferences = value as Partial<ConsentPreferences>

  return (
    preferences.necessary === 'granted' &&
    isConsentStatus(preferences.analytics) &&
    isConsentStatus(preferences.marketing) &&
    typeof preferences.updatedAt === 'string' &&
    preferences.version === CONSENT_VERSION
  )
}

export function readConsentPreferences(): ConsentPreferences | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedValue = window.localStorage.getItem(CONSENT_STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    const parsedValue: unknown = JSON.parse(storedValue)

    return isValidConsentPreferences(parsedValue) ? parsedValue : null
  } catch {
    return null
  }
}

export function saveConsentPreferences(
  preferences: Pick<ConsentPreferences, 'analytics' | 'marketing'>,
): ConsentPreferences {
  const consentPreferences: ConsentPreferences = {
    necessary: 'granted',
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString(),
    version: CONSENT_VERSION,
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentPreferences))

    window.dispatchEvent(
      new CustomEvent<ConsentPreferences>('adrizio:consent-updated', {
        detail: consentPreferences,
      }),
    )
  }

  return consentPreferences
}
