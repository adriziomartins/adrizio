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

export default function HomePage() {
  return (
    <>
      <Navbar />

      <a
        href="#conteudo-principal"
        className="sr-only fixed left-4 top-4 z-[100] rounded-md bg-[#D4AF37] px-4 py-3 font-semibold text-zinc-950 focus:not-sr-only"
      >
        Pular para o conteúdo principal
      </a>

      <main
        id="conteudo-principal"
        tabIndex={-1}
        className="min-h-screen bg-zinc-950 focus:outline-none"
      >
        <Hero />

        <PropertySearch />

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
