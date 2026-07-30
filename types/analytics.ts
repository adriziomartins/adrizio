export type ContactIntent =
  'general' | 'buy' | 'rent' | 'investment' | 'valuation' | 'real-properties'

export type SourcePage =
  | 'home'
  | 'properties'
  | 'property-details'
  | 'buy'
  | 'rent'
  | 'long-term-rent'
  | 'short-term-rent'
  | 'investment'
  | 'neighborhood'
  | 'contact'
  | 'about'
  | 'blog'
  | 'blog-post'

export type PropertyStatus = 'real' | 'demonstrative'

export interface PropertySearchEvent {
  event: 'property_search'
  source_page: SourcePage
  purpose: string
  modality?: string
  neighborhood?: string
  property_type?: string
  price_range?: string
  bedrooms?: string
}

export interface PropertyFilterEvent {
  event: 'property_filter'
  source_page: SourcePage
  purpose: string
  modality?: string
  neighborhood?: string
  property_type?: string
  price_range?: string
  bedrooms?: string
}

export interface ViewPropertyEvent {
  event: 'view_property'
  source_page: SourcePage
  property_slug: string
  property_status: PropertyStatus
  property_purpose: string
  neighborhood: string
}

export interface ViewNeighborhoodEvent {
  event: 'view_neighborhood'
  source_page: SourcePage
  neighborhood_slug: string
}

export interface ContactStartEvent {
  event: 'contact_start'
  source_page: SourcePage
  contact_intent: ContactIntent
}

export interface WhatsAppClickEvent {
  event: 'whatsapp_click'
  source_page: SourcePage
  contact_intent: ContactIntent
  destination: 'whatsapp'
  property_slug?: string
  property_status?: PropertyStatus
}

export interface ValuationStartEvent {
  event: 'valuation_start'
  source_page: SourcePage
}

export interface LeadIntentEvent {
  event: 'buy_lead' | 'rent_lead' | 'investment_lead'
  source_page: SourcePage
  contact_intent: 'buy' | 'rent' | 'investment'
}

export type AnalyticsEvent =
  | PropertySearchEvent
  | PropertyFilterEvent
  | ViewPropertyEvent
  | ViewNeighborhoodEvent
  | ContactStartEvent
  | WhatsAppClickEvent
  | ValuationStartEvent
  | LeadIntentEvent

export type AnalyticsEventName = AnalyticsEvent['event']
