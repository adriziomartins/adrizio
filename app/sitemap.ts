import type { MetadataRoute } from 'next'

import { regions } from '@/data/regions'

const siteUrl = 'https://www.adrizio.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const neighborhoodRoutes: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${siteUrl}/bairros/${region.slug}`,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

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
      url: `${siteUrl}/comprar`,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/investir`,
      changeFrequency: 'weekly',
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
    {
      url: `${siteUrl}/bairros`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/sobre`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contato`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...neighborhoodRoutes,
  ]
}
