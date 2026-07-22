export interface Testimonial {
  id: string
  name: string
  quote: string
  rating: number
  source: 'Google'
  context?: string
  sourceUrl?: string
}
