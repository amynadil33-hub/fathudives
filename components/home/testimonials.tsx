import Image from 'next/image'
import { Quote } from 'lucide-react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import type { Testimonial } from '@/lib/types'

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <Section tone="sand">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <EditorialLabel className="justify-center">In their words</EditorialLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Stories from our guests
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-sm text-muted-foreground">
              <em>Placeholder reviews shown for layout. Verified guest testimonials will be added by the client.</em>
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={0.08 * i}>
              <figure className="flex h-full flex-col rounded-3xl bg-card p-7 shadow-sm">
                <Quote className="size-8 text-accent" aria-hidden />
                <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground">
                  {t.review}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="relative size-11 overflow-hidden rounded-full">
                    <Image src={t.guestImage || '/placeholder.svg'} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                  <span className="text-sm">
                    <span className="block font-medium text-foreground">{t.guestName}</span>
                    <span className="block text-muted-foreground">
                      {t.country} · {t.tripType}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
