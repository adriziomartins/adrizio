import {
  ATTRIBUTION_LIMITS,
  ATTRIBUTION_STORAGE_KEY,
  ATTRIBUTION_VERSION,
} from '@/lib/attribution/constants'
import { readConsentPreferences } from '@/lib/consent'

import type { AttributionState, AttributionTouch } from '@/types/attribution'

function isOptionalBoundedString(value: unknown, maxLength: number): boolean {
  return value === undefined || (typeof value === 'string' && value.length <= maxLength)
}

function isValidIsoDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}

function isValidAttributionTouch(value: unknown): value is AttributionTouch {
  if (!value || typeof value !== 'object') {
    return false
  }

  const touch = value as Partial<AttributionTouch>

  return (
    isValidIsoDate(touch.capturedAt) &&
    typeof touch.landingPath === 'string' &&
    touch.landingPath.startsWith('/') &&
    touch.landingPath.length <= ATTRIBUTION_LIMITS.landingPath &&
    !touch.landingPath.includes('?') &&
    !touch.landingPath.includes('#') &&
    isOptionalBoundedString(touch.referrerHost, ATTRIBUTION_LIMITS.referrerHost) &&
    isOptionalBoundedString(touch.utmSource, ATTRIBUTION_LIMITS.utmSource) &&
    isOptionalBoundedString(touch.utmMedium, ATTRIBUTION_LIMITS.utmMedium) &&
    isOptionalBoundedString(touch.utmCampaign, ATTRIBUTION_LIMITS.utmCampaign) &&
    isOptionalBoundedString(touch.utmContent, ATTRIBUTION_LIMITS.utmContent) &&
    isOptionalBoundedString(touch.utmTerm, ATTRIBUTION_LIMITS.utmTerm)
  )
}

function isValidAttributionState(value: unknown): value is AttributionState {
  if (!value || typeof value !== 'object') {
    return false
  }

  const state = value as Partial<AttributionState>

  return (
    state.version === ATTRIBUTION_VERSION &&
    isValidIsoDate(state.expiresAt) &&
    isValidAttributionTouch(state.firstTouch) &&
    isValidAttributionTouch(state.lastTouch)
  )
}

function hasAnalyticsConsent(): boolean {
  return readConsentPreferences()?.analytics === 'granted'
}

export function clearAttributionState(): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.removeItem(ATTRIBUTION_STORAGE_KEY)
  } catch {
    // O site deve continuar funcional mesmo quando o storage estiver indisponível.
  }
}

export function readAttributionState(): AttributionState | null {
  if (typeof window === 'undefined') {
    return null
  }

  if (!hasAnalyticsConsent()) {
    clearAttributionState()

    return null
  }

  try {
    const storedValue = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)

    if (!storedValue) {
      return null
    }

    const parsedValue: unknown = JSON.parse(storedValue)

    if (!isValidAttributionState(parsedValue)) {
      clearAttributionState()

      return null
    }

    if (Date.parse(parsedValue.expiresAt) <= Date.now()) {
      clearAttributionState()

      return null
    }

    return parsedValue
  } catch {
    clearAttributionState()

    return null
  }
}

export function saveAttributionState(state: AttributionState): boolean {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) {
    return false
  }

  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(state))

    return true
  } catch {
    return false
  }
}
