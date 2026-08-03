export type ConsentStatus = 'granted' | 'denied'

export interface ConsentPreferences {
  necessary: 'granted'
  analytics: ConsentStatus
  marketing: ConsentStatus
  updatedAt: string
  version: number
}

export interface GoogleConsentState {
  analytics_storage: ConsentStatus
  ad_storage: ConsentStatus
  ad_user_data: ConsentStatus
  ad_personalization: ConsentStatus
}
