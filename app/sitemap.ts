import type { MetadataRoute } from 'next'

const siteUrl = 'https://www.adrizio.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/imoveis`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/alugar`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/alugar/longa-temporada`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/alugar/curta-temporada`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]
}
