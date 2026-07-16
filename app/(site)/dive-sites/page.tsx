import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { DiveSitesExplorer } from '@/components/dive-sites/dive-sites-explorer'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getDiveSites } from '@/lib/data'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Dive Sites',
  description:
    'Explore the dive sites of South Ari Atoll with Fathu Dives — channels, thilas, reefs, whale shark and manta areas around Dhangethi Island. Sample sites shown as placeholders.',
  alternates: { canonical: '/dive-sites' },
  openGraph: {
    title: 'Dive Sites · Fathu Dives',
    description: 'Channels, thilas, reefs and big-encounter zones across South Ari Atoll.',
    url: `${siteConfig.url}/dive-sites`,
    images: [{ url: media.sites.channel }],
  },
}

export default async function DiveSitesPage() {
  const sites = await getDiveSites()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Sites', url: '/dive-sites' },
        ]}
      />
      <PageHero
        image={media.sites.channel}
        label="South Ari Atoll · Maldives"
        title="Dive Sites"
        intro="Drift channels, coral thilas, gentle house reefs and the famous whale shark and manta zones — all within easy reach of Dhangethi."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Dive Sites' }]}
      />

      <Section tone="default">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <EditorialLabel className="justify-center">The playground</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Where we&apos;ll take you
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Filter by experience level or the kind of dive you love. Site names, depths and
                journey times below are illustrative placeholders and will be replaced with our
                confirmed sites.
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <DiveSitesExplorer sites={sites} />
          </div>
        </Container>
      </Section>

      {/* Atoll map placeholder */}
      <Section tone="seafoam">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <EditorialLabel>Find your bearings</EditorialLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  An illustrated South Ari Atoll map is on its way
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  We&apos;re preparing a hand-illustrated map showing Dhangethi and each dive site,
                  with journey times and marine-life highlights. This space is reserved for it.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/30 bg-card">
                <div className="flex flex-col items-center text-center text-muted-foreground">
                  <MapPin className="size-10 text-primary" />
                  <p className="mt-3 max-w-xs px-6 text-sm leading-relaxed">
                    Illustrated atoll map placeholder — the interactive/illustrated map will render
                    here.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
