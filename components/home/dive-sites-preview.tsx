import { MapPin } from 'lucide-react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { DiveSiteCard } from '@/components/site/dive-site-card'
import { CtaLink } from '@/components/site/cta-button'
import { ContourPattern } from '@/components/site/wave'
import type { DiveSite } from '@/lib/types'

export function DiveSitesPreview({ sites }: { sites: DiveSite[] }) {
  return (
    <Section tone="default">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <EditorialLabel>Dive sites</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                The reefs on our doorstep
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <CtaLink href="/dive-sites" variant="outline" size="md">
              Explore all sites
            </CtaLink>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site, i) => (
            <Reveal key={site.id} delay={0.05 * i}>
              <DiveSiteCard site={site} />
            </Reveal>
          ))}
        </div>

        {/* Map placeholder — prepared for a future illustrated South Ari Atoll map */}
        <Reveal delay={0.1}>
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
            <ContourPattern className="text-accent/25" />
            <div className="relative flex flex-col items-center gap-3 px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <MapPin className="size-6" />
              </span>
              <h3 className="font-serif text-2xl">Illustrated South Ari Atoll map</h3>
              <p className="max-w-md text-sm text-primary-foreground/75">
                A custom illustrated map of our dive sites across South Ari Atoll will live here. Placeholder for the
                client&apos;s final map artwork.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
