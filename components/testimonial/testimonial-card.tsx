import { Quote } from 'lucide-react'

import type { Testimonial } from '@/types/testimonial'

interface TestimonialCardProps {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-white/10 bg-zinc-900/60 p-7">
      <Quote className="size-8 text-[#D4AF37]" aria-hidden="true" />

      <blockquote className="mt-6 flex-1 text-base leading-8 text-zinc-300">
        “{testimonial.quote}”
      </blockquote>

      <footer className="mt-8 border-t border-white/10 pt-5">
        <p className="font-semibold text-white">{testimonial.name}</p>

        <p className="mt-1 text-sm text-zinc-500">{testimonial.context}</p>

        {testimonial.location ? (
          <p className="mt-1 text-xs text-zinc-600">{testimonial.location}</p>
        ) : null}
      </footer>
    </article>
  )
}
