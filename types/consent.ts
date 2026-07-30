export type ConsentStatus = 'granted' | 'denied'

export interface ConsentPreferences {
  necessary: 'granted'
  analytics: ConsentStatus
  marketing: ConsentStatus
  updatedAt: string
  version: number
}
