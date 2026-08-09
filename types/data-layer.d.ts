import type { AnalyticsEvent } from '@/types/analytics'

interface GoogleTagManagerDataModel {
  reset(): void
}

type GoogleTagManagerDataLayerCallback = (this: GoogleTagManagerDataModel) => void

type GoogleTagManagerDataLayerEntry =
  Record<string, unknown> | IArguments | GoogleTagManagerDataLayerCallback

declare global {
  interface Window {
    dataLayer?: Array<AnalyticsEvent | GoogleTagManagerDataLayerEntry>
    gtag?: (...args: unknown[]) => void
    __adrizioGoogleConsentInitialized?: boolean
  }
}

export {}
