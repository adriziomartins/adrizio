import { Navbar } from '@/components/layout/navbar'
import { FeaturedProperties } from '@/sections/home/featured-properties'
import { Hero } from '@/sections/home/hero'
import { PropertyJourneys } from '@/sections/home/property-journeys'
import { PropertySearch } from '@/sections/home/property-search'
import { Regions } from '@/sections/home/regions'
import { About } from '@/sections/home/about'
import { PropertyValuation } from '@/sections/home/property-valuation'
import { Testimonials } from '@/sections/home/testimonials'
import { BlogPreview } from '@/sections/home/blog-preview'
import { Footer } from '@/components/layout/footer'
import { FinalCta } from '@/sections/home/final-cta'
import { getPropertySearchValues, hasAppliedPropertySearchParams } from '@/lib/property-search'

import type { PropertySearchParams } from '@/lib/property-search'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.adrizio.com.br/#website',
      url: 'https://www.adrizio.com.br/',
      name: 'ADRIZIO',
      description:
        'Imóveis para comprar, alugar e investir na Orla de Fortaleza com Adrizio Martins, corretor de imóveis CRECI 25015F.',
      inLanguage: 'pt-BR',
      spatialCoverage: [
        {
          '@type': 'Place',
          name: 'Fortaleza',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Fortaleza',
            addressRegion: 'CE',
            addressCountry: 'BR',
          },
        },
        {
          '@type': 'Place',
          name: 'Meireles',
          containedInPlace: {
            '@type': 'City',
            name: 'Fortaleza',
          },
        },
        {
          '@type': 'Place',
          name: 'Mucuripe',
          containedInPlace: {
            '@type': 'City',
            name: 'Fortaleza',
          },
        },
        {
          '@type': 'Place',
          name: 'Praia de Iracema',
          containedInPlace: {
            '@type': 'City',
            name: 'Fortaleza',
          },
        },
        {
          '@type': 'Place',
          name: 'Praia do Futuro',
          containedInPlace: {
            '@type': 'City',
            name: 'Fortaleza',
          },
        },
        {
          '@type': 'Place',
          name: 'Beira-Mar de Fortaleza',
          containedInPlace: {
            '@type': 'City',
            name: 'Fortaleza',
          },
        },
        {
          '@type': 'Place',
          name: 'Cumbuco',
          containedInPlace: {
            '@type': 'City',
            name: 'Caucaia',
          },
        },
      ],
      publisher: {
        '@id': 'https://www.adrizio.com.br/#adrizio-martins',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.adrizio.com.br/#adrizio-martins',
      name: 'Adrizio Martins',
      url: 'https://www.adrizio.com.br/',
      jobTitle: 'Corretor de Imóveis',
      description: 'Corretor de imóveis com atuação focada na Orla de Fortaleza.',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'CRECI-CE',
        value: '25015F',
      },
      knowsAbout: [
        'Mercado imobiliário',
        'Imóveis na Orla de Fortaleza',
        'Compra de imóveis',
        'Locação de imóveis',
        'Investimento imobiliário',
      ],
    },
  ],
}

interface HomePageProps {
  searchParams: Promise<PropertySearchParams>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams

  const initialSearchValues = getPropertySearchValues(resolvedSearchParams)

  const hasAppliedSearch = hasAppliedPropertySearchParams(resolvedSearchParams)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, '\\u003c'),
        }}
      />

      <a
        href="#conteudo-principal"
        className="fixed -top-20 left-4 z-[100] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-zinc-950 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-950"
      >
        Pular para o conteúdo principal
      </a>

      <Navbar />

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="min-h-screen bg-zinc-950 focus:outline-none"
      >
        <Hero />

        <PropertySearch initialValues={initialSearchValues} hasAppliedSearch={hasAppliedSearch} />

        <FeaturedProperties />

        <PropertyJourneys />

        <Regions />

        <About />
        <PropertyValuation />
        <Testimonials />
        <BlogPreview />

        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
