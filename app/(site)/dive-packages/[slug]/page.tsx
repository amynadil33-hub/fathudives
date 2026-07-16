import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Check, X, Moon, Waves, BedDouble, Wrench, Plane, AlertCircle } from 'lucide-react'
import { Section, Container, EditorialLabel, OceanDivider } from '@/components/site/editorial'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { PackageCard } from '@/components/site/package-card'
import { BookingCard } from '@/components/packages/booking-card'
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getPackages, getPackageBySlug, getRelatedPackages } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

export async function generateStaticParams() {
  const packages = await getPackages()
  return packages.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) return { title: 'Package not found' }
  return {
    title: pkg.title,
    description: pkg.shortDescription,
    alternates: { canonical: `/dive-packages/${pkg.slug}` },
    openGraph: {
      title: `${pkg.title} · Fathu Dives`,
      description: pkg.shortDescription,
      url: `${siteConfig.url}/dive-packages/${pkg.slug}`,
      images: [{ url: pkg.featuredImage }],
    },
  }
}

export default async function PackagePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const pkg = await getPackageBySlug(slug)
  if (!pkg) notFound()

  const related = await getRelatedPackages(slug, 3)
  const included = pkg.inclusions.filter((i) => i.type === 'included')
  const excluded = pkg.inclusions.filter((i) => i.type === 'excluded')

  const facts = [
    { icon: Moon, label: `${pkg.nights} nights` },
    { icon: Waves, label: `${pkg.dives} dives` },
    { icon: BedDouble, label: pkg.accommodationIncluded ? 'Stay included' : 'Stay optional' },
    { icon: Plane, label: pkg.transfersIncluded ? 'Transfers included' : 'Transfers optional' },
  ]

  return (
    <>
      <ProductJsonLd pkg={pkg} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Packages', url: '/dive-packages' },
          { name: pkg.title, url: `/dive-packages/${pkg.slug}` },
        ]}
      />

      <PageHero
        image={pkg.featuredImage}
        label={pkg.experienceLevel}
        title={pkg.title}
        intro={pkg.shortDescription}
        align="left"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dive Packages', href: '/dive-packages' },
          { label: pkg.title },
        ]}
      />

      <Section tone="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* Main content */}
            <div className="min-w-0">
              <div className="flex flex-wrap gap-3">
                {facts.map((f) => (
                  <span
                    key={f.label}
                    className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground"
                  >
                    <f.icon className="size-4 text-primary" /> {f.label}
                  </span>
                ))}
              </div>

              <Reveal className="mt-8">
                <p className="text-lg leading-relaxed text-foreground">{pkg.fullDescription}</p>
              </Reveal>

              <OceanDivider className="my-12" />

              {/* Highlights */}
              <EditorialLabel>Highlights</EditorialLabel>
              <h2 className="mt-4 font-serif text-3xl text-foreground">What makes this trip special</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              <OceanDivider className="my-12" />

              {/* Itinerary */}
              <EditorialLabel>Day by day</EditorialLabel>
              <h2 className="mt-4 font-serif text-3xl text-foreground">Your itinerary</h2>
              <ol className="mt-8 space-y-8">
                {pkg.itinerary.map((day) => (
                  <li key={day.day} className="relative flex gap-5">
                    <div className="flex flex-col items-center">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-lg text-primary-foreground">
                        {day.day}
                      </span>
                      {day.day < pkg.itinerary.length && (
                        <span aria-hidden className="mt-2 w-px flex-1 bg-border" />
                      )}
                    </div>
                    <div className="pb-2">
                      <h3 className="font-serif text-xl text-foreground">{day.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-foreground">
                        {day.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <OceanDivider className="my-12" />

              {/* Inclusions / exclusions */}
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-serif text-2xl text-foreground">What&apos;s included</h2>
                  <ul className="mt-5 space-y-2.5">
                    {included.map((item) => (
                      <li key={item.label} className="flex items-start gap-3 text-foreground">
                        <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-serif text-2xl text-foreground">Not included</h2>
                  <ul className="mt-5 space-y-2.5">
                    {excluded.map((item) => (
                      <li key={item.label} className="flex items-start gap-3 text-muted-foreground">
                        <X className="mt-0.5 size-5 shrink-0 text-coral" />
                        <span>{item.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <OceanDivider className="my-12" />

              {/* Info blocks */}
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  { icon: BedDouble, title: 'Accommodation', text: pkg.accommodationInfo },
                  { icon: Wrench, title: 'Equipment', text: pkg.equipmentInfo },
                  { icon: Plane, title: 'Transfers', text: pkg.transferInfo },
                ].map((b) => (
                  <div key={b.title} className="rounded-2xl bg-muted p-6">
                    <b.icon className="size-6 text-primary" />
                    <h3 className="mt-3 font-serif text-lg text-foreground">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* Important notes */}
              <div className="mt-8 rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-slate-blue" />
                  <h3 className="font-serif text-lg text-foreground">Good to know</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {pkg.importantNotes.map((n) => (
                    <li key={n} className="flex gap-2">
                      <span aria-hidden className="text-slate-blue">
                        &bull;
                      </span>
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Cancellation policy:</strong>{' '}
                  {pkg.cancellationPolicy}
                </p>
              </div>
            </div>

            {/* Sticky booking card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <BookingCard pkg={pkg} />
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section tone="sand">
          <Container>
            <Reveal>
              <EditorialLabel>Keep exploring</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
                Other ways to dive Dhangethi
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <PackageCard pkg={p} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}
