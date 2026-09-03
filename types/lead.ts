export const LEAD_TYPES = ['general', 'buy', 'rent', 'investment', 'valuation'] as const

export type LeadType = (typeof LEAD_TYPES)[number]

export const LEAD_SOURCE_PAGES = [
  'contact',
  'property-details',
  'buy',
  'rent',
  'long-term-rent',
  'short-term-rent',
  'investment',
] as const

export type LeadSourcePage = (typeof LEAD_SOURCE_PAGES)[number]
