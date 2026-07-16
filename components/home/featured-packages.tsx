'use client'

import { useState } from 'react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { PackageCard } from '@/components/site/package-card'
import { CtaLink } from '@/components/site/cta-button'
import type { Package, PackageAudience } from '@/lib/types'
import { cn } from '@/lib/utils'

const filters: (PackageAudience | 'All')[] = [
  'All',
  'Beginner',
  'Certified Diver',
  'Solo Traveller',
  'Couple',
  'Group',
  'Diving and Stay',
]

export function FeaturedPackages({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>('All')

  const filtered =
    active === 'All' ? packages : packages.filter((p) => p.audiences.includes(active as PackageAudience))

  return (
    <Section tone="default">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <EditorialLabel>Featured dive packages</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Choose your Maldives story
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-muted-foreground">
                Every stay blends diving with authentic island life. All prices shown are temporary placeholders.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <CtaLink href="/dive-packages" variant="outline" size="md">
              All packages
            </CtaLink>
          </Reveal>
        </div>

        {/* Category filters */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter packages by audience">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  active === f
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((pkg, i) => (
            <Reveal key={pkg.id} delay={0.05 * i}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No packages match this filter yet. Try another category.
          </p>
        )}
      </Container>
    </Section>
  )
}
