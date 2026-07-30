import type { AnalyticsEvent } from '@/types/analytics'

declare global {
  interface Window {
    dataLayer?: AnalyticsEvent[]
  }
}

export {}
