import { TestimonialCard } from '@/components/testimonial/testimonial-card'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section
      id="depoimentos"
      aria-labelledby="testimonials-title"
      className="bg-zinc-950 px-4 py-24 sm:px-6 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-10 bg-[#D4AF37]" />

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
              Experiências reais
            </p>
          </div>

          <h2
            id="testimonials-title"
            className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            A confiança construída em cada atendimento.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
            Experiências compartilhadas por pessoas que tiveram atendimento imobiliário com a
            ADRIZIO.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
