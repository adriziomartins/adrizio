import { Navbar } from '@/components/layout/navbar'
import { Hero } from '@/sections/home/hero'
import { PropertySearch } from '@/sections/home/property-search'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950">
        <Hero />

        <PropertySearch />

        <div className="h-32" />
      </main>
    </>
  )
}
