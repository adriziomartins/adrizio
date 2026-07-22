import { Navbar } from '@/components/layout/navbar'
import { FeaturedProperties } from '@/sections/home/featured-properties'
import { Hero } from '@/sections/home/hero'
import { PropertyJourneys } from '@/sections/home/property-journeys'
import { PropertySearch } from '@/sections/home/property-search'
import { Regions } from '@/sections/home/regions'
import { PropertyValuation } from '@/sections/home/property-valuation'
import { Testimonials } from '@/sections/home/testimonials'
import { BlogPreview } from '@/sections/home/blog-preview'
import { Footer } from '@/components/layout/footer'
import { FinalCta } from '@/sections/home/final-cta'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950">
        <Hero />

        <PropertySearch />

        <FeaturedProperties />

        <PropertyJourneys />

        <Regions />

        <PropertyValuation />
        <Testimonials />
        <BlogPreview />

        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
