import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { PackagesExplorer } from '@/components/packages/packages-explorer'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getPackages } from '@/lib/data'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Dive Packages',
  description:
    'Explore Fathu Dives packages in South Ari Atoll — from beginner discovery trips to whale shark weeks and dive-and-island escapes on Dhangethi. Placeholder pricing shown until confirmed.',
  alternates: { canonical: '/dive-packages' },
  openGraph: {
    title: 'Dive Packages · Fathu Dives',
    description:
      'Diving holidays on Dhangethi Island, South Ari Atoll — whale sharks, mantas, reefs and warm local hospitality.',
    url: `${siteConfig.url}/dive-packages`,
    images: [{ url: media.packages.explorer }],
  },
}

export default async function DivePackagesPage() {
  const packages = await getPackages()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Packages', url: '/dive-packages' },
        ]}
      />
      <PageHero
        image={media.packages.explorer}
        label="South Ari Atoll · Maldives"
        title="Dive Packages"
        intro="Complete diving holidays built around the wild heart of Dhangethi — reefs, big encounters and slow island days."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Dive Packages' }]}
      />

      <Section tone="default">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <EditorialLabel className="justify-center">Choose your adventure</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Find the trip that calls to you
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Every package blends guided diving with authentic life on a Maldivian local island.
                Filter by experience level, who you are travelling with, or the encounters you dream
                of. All prices are temporary placeholders and will be confirmed by our team.
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <PackagesExplorer packages={packages} />
          </div>
        </Container>
      </Section>
    </>
  )
}
