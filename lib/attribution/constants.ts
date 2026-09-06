export const ATTRIBUTION_VERSION = 1 as const

export const ATTRIBUTION_STORAGE_KEY = 'adrizio-attribution-v1'

export const ATTRIBUTION_RETENTION_DAYS = 90

export const ATTRIBUTION_RETENTION_MS = ATTRIBUTION_RETENTION_DAYS * 24 * 60 * 60 * 1000

export const ATTRIBUTION_LIMITS = {
  landingPath: 512,
  referrerHost: 253,
  utmSource: 120,
  utmMedium: 120,
  utmCampaign: 160,
  utmContent: 160,
  utmTerm: 160,
} as const
