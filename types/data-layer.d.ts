import type { AnalyticsEvent } from '@/types/analytics'

type GoogleTagManagerDataLayerEntry = Record<string, unknown> | IArguments

declare global {
  interface Window {
    dataLayer?: Array<AnalyticsEvent | GoogleTagManagerDataLayerEntry>
    gtag?: (...args: unknown[]) => void
    __adrizioGoogleConsentInitialized?: boolean
  }
}

export {}
