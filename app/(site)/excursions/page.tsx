import type { Metadata } from 'next'
import {
  CalendarDays,
  CloudSun,
  Download,
  Fish,
  Leaf,
  ShieldCheck,
  Shirt,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { CtaLink } from '@/components/site/cta-button'
import { Container, EditorialLabel, Section } from '@/components/site/editorial'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { Reveal } from '@/components/site/reveal'
import { islandExcursions, snorkelingActivities, type ExcursionItem } from '@/lib/data/excursions'
import { media } from '@/lib/media'
import { siteConfig, whatsappHref } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Excursions & Snorkeling',
  description:
    'Snorkeling, sandbanks, sunset cruises, fishing and island experiences from Dhangethi in South Ari Atoll. View 2026 prices and plan your trip.',
  alternates: { canonical: '/excursions' },
  openGraph: {
    title: 'Excursions & Snorkeling · Fathu Dives',
    description: 'Ocean encounters and authentic island experiences from Dhangethi.',
    url: `${siteConfig.url}/excursions`,
    images: [{ url: media.experiences.whaleShark }],
  },
}

function ExperienceCard({ item, kind }: { item: ExcursionItem; kind: 'snorkeling' | 'island' }) {
  const Icon = kind === 'snorkeling' ? Fish : Sparkles

  return (
    <article className="flex h-full min-w-0 flex-col rounded-3xl border border-border bg-card p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 sm:p-6">
      <div className="flex min-w-0 items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-xl leading-tight text-foreground">{item.title}</h3>
          {item.duration && (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-blue">
              {item.duration}
            </p>
          )}
        </div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-t border-border pt-4">
        <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Per person</span>
        <span className="font-serif text-3xl font-semibold text-primary">{item.price}</span>
      </div>
    </article>
  )
}

const bookingNotes = [
  {
    icon: CalendarDays,
    title: 'Booking',
    text: 'Advance reservation is recommended, especially during peak season.',
  },
  {
    icon: ShieldCheck,
    title: 'Cancellation policy',
    text: 'Terms are confirmed when you book. Applicable charges may apply.',
  },
  {
    icon: Users,
    title: 'Age limits',
    text: 'Age restrictions may apply to certain activities. Please check before booking.',
  },
  {
    icon: Shirt,
    title: 'What to bring',
    text: 'Swimwear, towel, sunscreen, hat, sunglasses, drinking water and a change of clothes.',
  },
  {
    icon: CloudSun,
    title: 'Weather policy',
    text: 'Trips are subject to sea and weather conditions and may be changed for safety.',
  },
  {
    icon: Fish,
    title: 'Marine life',
    text: 'Wildlife sightings are natural encounters and cannot be guaranteed.',
  },
  {
    icon: Leaf,
    title: 'Responsible tourism',
    text: 'Please never touch, chase or disturb marine life, and help us protect the ocean.',
  },
]

export default function ExcursionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: 'Home', url: '/' }, { name: 'Excursions & Snorkeling', url: '/excursions' }]}
      />
      <PageHero
        image={media.experiences.whaleShark}
        label="Beyond the reef"
        title="Excursions & Snorkeling"
        intro="Hidden sandbanks, remarkable marine life, golden sunsets and authentic island experiences."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Excursions' }]}
      />

      <Section className="pb-12 md:pb-16">
        <Container>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <Reveal>
              <EditorialLabel>2026 experiences</EditorialLabel>
              <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Choose your next island story
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                Explore coral reefs, meet South Ari Atoll&apos;s marine life or slow down with a
                sandbank picnic and sunset cruise. All listed prices include 17% GST and 10% service
                charge.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <a
                href="/downloads/excursion-pricelist-2026.pdf"
                download
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-primary/30 px-6 text-sm font-medium text-primary transition-colors hover:bg-primary/5 sm:w-auto"
              >
                <Download className="size-4" aria-hidden />
                Download price list
              </a>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="seafoam" className="pt-12 md:pt-16">
        <Container>
          <Reveal>
            <div className="flex items-center gap-3">
              <Waves className="size-7 text-primary" aria-hidden />
              <EditorialLabel>Discover a world beneath the surface</EditorialLabel>
            </div>
            <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">Snorkeling activities</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Crystal-clear water, abundant marine life and unforgettable encounters.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {snorkelingActivities.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index * 0.03, 0.24)}>
                <ExperienceCard item={item} kind="snorkeling" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <EditorialLabel>Beyond the reef</EditorialLabel>
            <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">Island experiences</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Hidden sandbanks, local flavours and warm Maldivian evenings on the water.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {islandExcursions.map((item, index) => (
              <Reveal key={item.title} delay={Math.min(index * 0.04, 0.24)}>
                <ExperienceCard item={item} kind="island" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <Reveal>
            <EditorialLabel>Before you book</EditorialLabel>
            <h2 className="mt-4 font-serif text-4xl text-foreground sm:text-5xl">Important information</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookingNotes.map((note, index) => (
              <Reveal key={note.title} delay={Math.min(index * 0.04, 0.2)}>
                <div className="flex h-full gap-4 rounded-2xl bg-card p-5 sm:p-6">
                  <note.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg text-foreground">{note.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{note.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 rounded-2xl border border-primary/15 bg-secondary px-5 py-4 text-sm font-medium text-primary sm:px-6">
            Prices are per person unless otherwise stated and include all applicable taxes: 17% GST
            and 10% service charge.
          </p>
        </Container>
      </Section>

      <Section tone="primary">
        <Container className="text-center">
          <Reveal>
            <h2 className="font-serif text-4xl text-primary-foreground sm:text-5xl">
              Ready for an unforgettable day?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-primary-foreground/75">
              Tell us which experiences you love and when you will be on Dhangethi. We will confirm
              availability, conditions and everything you need to bring.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <CtaLink href="/contact#enquiry" variant="coral" size="lg" className="w-full sm:w-auto">
                Plan your excursion
              </CtaLink>
              <CtaLink
                href={whatsappHref('Hello Fathu Dives! I would like to ask about your excursions and snorkeling activities.')}
                external
                variant="ghost-light"
                size="lg"
                className="w-full sm:w-auto"
              >
                Ask on WhatsApp
              </CtaLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

