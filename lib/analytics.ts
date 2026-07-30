import type { AnalyticsEvent } from '@/types/analytics'

const MAX_STRING_LENGTH = 120

function normalizeEventValue(value: unknown): unknown {
  if (typeof value === 'string') {
    return value.trim().slice(0, MAX_STRING_LENGTH)
  }

  return value
}

function normalizeEvent(event: AnalyticsEvent): AnalyticsEvent {
  return Object.fromEntries(
    Object.entries(event)
      .filter(([, value]) => value !== undefined && value !== '')
      .map(([key, value]) => [key, normalizeEventValue(value)]),
  ) as unknown as AnalyticsEvent
}

export function trackAnalyticsEvent(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') {
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(normalizeEvent(event))
}
