import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.adrizio.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
