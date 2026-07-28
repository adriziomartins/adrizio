import { ExternalLink, Quote, Star } from 'lucide-react'
import type { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-900/60 p-7">
      <div className="flex items-center justify-between gap-4">
        <Quote className="size-8 text-[#D4AF37]" aria-hidden="true" />

        <div className="flex gap-1" role="img" aria-label={`${testimonial.rating} de 5 estrelas`}>
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <Star key={index} className="size-4 fill-[#D4AF37] text-[#D4AF37]" aria-hidden="true" />
          ))}
        </div>
      </div>

      <blockquote className="mt-7 flex-1 text-lg leading-8 text-zinc-200">
        “{testimonial.quote}”
      </blockquote>

      <footer className="mt-8 border-t border-white/10 pt-5">
        <p className="font-semibold text-white">{testimonial.name}</p>

        {testimonial.context ? (
          <p className="mt-1 text-sm text-zinc-400">{testimonial.context}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-zinc-400">
          <span>{testimonial.source}</span>

          {testimonial.sourceUrl ? (
            <a
              href={testimonial.sourceUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Ver avaliação de ${testimonial.name} no Google — abre em nova aba`}
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:text-[#E5C45A]"
            >
              Ver original
              <ExternalLink className="size-3" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </footer>
    </article>
  )
}
