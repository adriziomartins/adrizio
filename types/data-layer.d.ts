import type { AnalyticsEvent } from '@/types/analytics'

type GoogleTagManagerDataLayerEntry = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: Array<AnalyticsEvent | GoogleTagManagerDataLayerEntry>
  }
}

export {}
