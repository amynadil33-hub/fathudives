'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Compass, ArrowRight } from 'lucide-react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { adventureOptions } from '@/lib/data/experiences'
import { cn } from '@/lib/utils'

export function AdventureSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = adventureOptions.find((o) => o.id === selectedId) ?? null

  return (
    <Section tone="primary" className="relative overflow-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <EditorialLabel onDark className="justify-center text-accent">
              <Compass className="size-4" /> Find your trip
            </EditorialLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-primary-foreground sm:text-5xl">
              What calls you to the Maldives?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-primary-foreground/75">
              Tell us what you are dreaming of and we will point you to a starting place.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {adventureOptions.map((option, i) => {
            const isActive = option.id === selectedId
            return (
              <Reveal key={option.id} delay={0.04 * i}>
                <button
                  onClick={() => setSelectedId(option.id)}
                  aria-pressed={isActive}
                  className={cn(
                    'h-full w-full rounded-2xl border p-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'border-accent bg-accent text-accent-foreground shadow-lg'
                      : 'border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground hover:border-accent/60 hover:bg-primary-foreground/10',
                  )}
                >
                  <span className="font-serif text-xl">{option.label}</span>
                  <span
                    className={cn(
                      'mt-2 block text-sm leading-relaxed',
                      isActive ? 'text-accent-foreground/80' : 'text-primary-foreground/70',
                    )}
                  >
                    {option.description}
                  </span>
                </button>
              </Reveal>
            )
          })}
        </div>

        <div className="mx-auto mt-8 max-w-2xl" aria-live="polite">
          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-4 rounded-3xl bg-background p-6 text-center sm:flex-row sm:text-left"
              >
                <div className="flex-1">
                  <p className="tracking-label text-[0.65rem] text-slate-blue">We recommend</p>
                  <p className="mt-1 font-serif text-2xl text-foreground">{selected.recommendationLabel}</p>
                </div>
                <CtaLink
                  href={
                    selected.recommendationType === 'package'
                      ? `/dive-packages/${selected.recommendationSlug}`
                      : `/dive-courses/${selected.recommendationSlug}`
                  }
                  variant="coral"
                  size="md"
                >
                  Explore
                  <ArrowRight className="size-4" />
                </CtaLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  )
}
