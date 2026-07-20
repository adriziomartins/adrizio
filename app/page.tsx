import { Navbar } from '@/components/layout/navbar'

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium tracking-[0.2em] text-[#D4AF37]">ADRIZIO</p>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Landing Page V2</h1>

            <p className="mt-4 text-zinc-400">Próxima etapa: Hero + Busca Inteligente</p>
          </div>
        </section>
      </main>
    </>
  )
}
