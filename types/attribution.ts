export interface AttributionTouch {
  capturedAt: string
  landingPath: string
  referrerHost?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

export interface LeadAttribution {
  firstTouch: AttributionTouch
  lastTouch: AttributionTouch
}

export interface AttributionState extends LeadAttribution {
  version: 1
  expiresAt: string
}
