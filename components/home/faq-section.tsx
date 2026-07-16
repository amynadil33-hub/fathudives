import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { FaqAccordion } from '@/components/site/faq-accordion'
import type { Faq } from '@/lib/types'

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <Section tone="default">
      <Container className="max-w-3xl">
        <div className="text-center">
          <Reveal>
            <EditorialLabel className="justify-center">Good to know</EditorialLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Questions, answered
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="mt-10">
          <FaqAccordion faqs={faqs} />
        </Reveal>
      </Container>
    </Section>
  )
}
