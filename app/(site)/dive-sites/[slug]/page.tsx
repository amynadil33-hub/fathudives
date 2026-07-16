import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Gauge, Waves, Clock, Activity, Fish } from 'lucide-react'
import { Section, Container, EditorialLabel, OceanDivider } from '@/components/site/editorial'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getDiveSites, getDiveSiteBySlug } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

export async function generateStaticParams() {
  const sites = await getDiveSites()
  return sites.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const site = await getDiveSiteBySlug(slug)
  if (!site) return { title: 'Dive site not found' }
  return {
    title: site.name,
    description: site.description,
    alternates: { canonical: `/dive-sites/${site.slug}` },
    openGraph: {
      title: `${site.name} · Fathu Dives`,
      description: site.description,
      url: `${siteConfig.url}/dive-sites/${site.slug}`,
      images: [{ url: site.featuredImage }],
    },
  }
}

export default async function DiveSitePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const site = await getDiveSiteBySlug(slug)
  if (!site) notFound()

  const facts = [
    { icon: Gauge, label: 'Depth', value: `${site.depthMin}–${site.depthMax} m` },
    { icon: Activity, label: 'Current', value: site.currentLevel },
    { icon: Waves, label: 'Site type', value: site.siteType },
    { icon: Clock, label: 'Journey', value: site.journeyTime },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Sites', url: '/dive-sites' },
          { name: site.name, url: `/dive-sites/${site.slug}` },
        ]}
      />

      <PageHero
        image={site.featuredImage}
        label={`${site.siteType} · ${site.difficulty}`}
        title={site.name}
        intro={site.description}
        align="left"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dive Sites', href: '/dive-sites' },
          { label: site.name },
        ]}
      />

      <Section tone="default">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl bg-muted p-5">
                <f.icon className="size-5 text-primary" />
                <p className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {f.label}
                </p>
                <p className="font-serif text-xl text-foreground">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px]">
            <div className="min-w-0">
              <Reveal>
                <p className="text-lg leading-relaxed text-foreground">{site.longDescription}</p>
              </Reveal>

              <OceanDivider className="my-10" />

              <EditorialLabel>Who might you meet</EditorialLabel>
              <h2 className="mt-4 font-serif text-3xl text-foreground">Marine life</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {site.marineLife.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground"
                  >
                    <Fish className="size-4 text-primary" /> {m}
                  </span>
                ))}
              </div>

              {site.gallery.length > 0 && (
                <>
                  <OceanDivider className="my-10" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    {site.gallery.map((img, i) => (
                      <div
                        key={img + i}
                        className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                      >
                        <Image
                          src={img || '/placeholder.svg'}
                          alt={`${site.name} — image ${i + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <p className="mt-8 text-sm italic leading-relaxed text-muted-foreground">
                Wild encounters can never be guaranteed. Our guides read the conditions each day to
                give you the best possible experience while keeping every dive safe.
              </p>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="font-serif text-2xl text-foreground">Dive this site</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  This site features in several of our packages and guided dives. Tell us your
                  experience and we&apos;ll build the right trip around it.
                </p>
                <CtaLink href="/dive-packages" variant="primary" size="md" className="mt-5 w-full">
                  View dive packages
                </CtaLink>
                <CtaLink href="/contact" variant="coral" size="md" className="mt-3 w-full">
                  Plan your dive
                </CtaLink>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
