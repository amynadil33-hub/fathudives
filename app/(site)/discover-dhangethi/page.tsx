import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Waves,
  Utensils,
  Bike,
  Plane,
  Leaf,
  Luggage,
  Heart,
  Sun,
} from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import {
  Section,
  Container,
  EditorialLabel,
  HandwrittenLabel,
  OceanDivider,
} from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Discover Dhangethi',
  description:
    'A local-island travel guide to Dhangethi, South Ari Atoll — beaches, island life, dining, getting around, how to reach us, responsible travel and life between dives.',
  alternates: { canonical: '/discover-dhangethi' },
  openGraph: {
    title: 'Discover Dhangethi · Fathu Dives',
    description: 'More than a dive base — a warm Maldivian local island to fall in love with.',
    url: `${siteConfig.url}/discover-dhangethi`,
    images: [{ url: media.island.aerial }],
  },
}

const essentials = [
  {
    icon: Plane,
    title: 'How to reach Dhangethi',
    text: 'Most guests fly into Velana International Airport (Malé), then continue by domestic flight and speedboat or by public/private ferry across South Ari Atoll. We will share confirmed routes and timings with your booking.',
  },
  {
    icon: Bike,
    title: 'Getting around',
    text: 'The island is small and walkable, laced with soft sandy lanes. Most places are minutes apart on foot — bicycles are a lovely way to explore at your own pace.',
  },
  {
    icon: Utensils,
    title: 'Dining',
    text: 'Local cafés and guesthouse kitchens serve fresh Maldivian dishes, fresh fish and international favourites. Vegetarian and other dietary needs can usually be arranged.',
  },
  {
    icon: Leaf,
    title: 'Responsible travel',
    text: 'Dhangethi is a living local community and a fragile marine environment. We encourage reef-safe habits, minimal single-use plastic, and respect for local life and wildlife.',
  },
  {
    icon: Luggage,
    title: 'What to pack',
    text: 'Light tropical clothing, reef-safe sunscreen, a hat and sunglasses, modest wear for the local village, and any personal dive gear you prefer. We can advise further before you travel.',
  },
  {
    icon: Heart,
    title: 'Local customs',
    text: 'Dhangethi is an inhabited local island. Modest dress is appreciated in the village, while a designated bikini beach lets guests enjoy the sun and swim comfortably.',
  },
]

export default function DiscoverDhangethiPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Discover Dhangethi', url: '/discover-dhangethi' },
        ]}
      />
      <PageHero
        image={media.island.aerial}
        label="South Ari Atoll · Maldives"
        title="Discover Dhangethi"
        intro="An island made for ocean days — and slow, golden evenings between them."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Discover Dhangethi' }]}
      />

      {/* Intro editorial */}
      <Section tone="default">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <HandwrittenLabel>welcome to our island</HandwrittenLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  A real Maldivian local island, not a resort bubble
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Dhangethi sits on the edge of South Ari Atoll, one of the most celebrated
                    stretches of ocean in the Maldives. Life here moves gently — sandy lanes, palm
                    shade, the sound of the sea always close.
                  </p>
                  <p>
                    Staying on a local island means your holiday is woven into everyday island life.
                    You dive with people who grew up on these reefs, eat where locals eat, and watch
                    the sun set over the harbour with time to spare.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} direction="left">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
                <Image
                  src={media.island.lane || '/placeholder.svg'}
                  alt="A quiet sandy palm-lined lane on Dhangethi Island"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Beaches — overlapping composition */}
      <Section tone="seafoam">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right" className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                <Image
                  src={media.island.beach || '/placeholder.svg'}
                  alt="White sand beach with turquoise water on Dhangethi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <EditorialLabel>Beaches &amp; lagoon</EditorialLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  Powder sand and impossibly clear water
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  Spend your surface intervals with your toes in the sand. A designated bikini beach
                  gives guests space to swim and sunbathe, while the shallow lagoon is perfect for
                  snorkelling, floating and simply doing nothing at all.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Island life quote band */}
      <Section tone="primary">
        <Container>
          <Reveal>
            <p className="mx-auto max-w-3xl text-balance text-center font-serif text-3xl italic leading-snug text-primary-foreground sm:text-4xl">
              &ldquo;Come for the diving. Stay for the quiet mornings, the friendly faces and the
              sunsets you&apos;ll still be thinking about long after you&apos;ve gone home.&rdquo;
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Essentials grid */}
      <Section tone="default">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <EditorialLabel>Know before you go</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Island essentials
              </h2>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {essentials.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                  <item.icon className="size-7 text-primary" />
                  <h3 className="mt-4 font-serif text-xl text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Non-divers + itinerary */}
      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <EditorialLabel>For everyone</EditorialLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  Not diving? You&apos;ll still fall in love
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="mt-6 space-y-3 leading-relaxed text-muted-foreground">
                  {[
                    'Snorkelling trips and whale shark excursions by boat',
                    'Sandbank and picnic island escapes',
                    'Sunset fishing and dolphin cruises',
                    'Beach days, spa-style relaxation and island walks',
                    'Local culture, cafés and community life',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <Waves className="mt-0.5 size-5 shrink-0 text-primary" />
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <EditorialLabel>A day on Dhangethi</EditorialLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                  Diving &amp; island-life rhythm
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <ol className="mt-6 space-y-5">
                  {[
                    { time: 'Morning', text: 'Two-tank boat dive on the reefs and thilas of South Ari.' },
                    { time: 'Midday', text: 'Fresh lunch and slow time in the shade or the lagoon.' },
                    { time: 'Afternoon', text: 'Optional snorkel trip, whale shark search or beach time.' },
                    { time: 'Evening', text: 'Sunset by the harbour, dinner, and stories from the day.' },
                  ].map((row) => (
                    <li key={row.time} className="flex gap-4">
                      <span className="w-24 shrink-0 pt-0.5">
                        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                          <Sun className="size-4" /> {row.time}
                        </span>
                      </span>
                      <span className="leading-relaxed text-muted-foreground">{row.text}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>

          <OceanDivider className="my-14" />

          <div className="flex flex-col items-center gap-6 text-center">
            <Reveal>
              <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
                Ready to experience it for yourself?
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3">
                <CtaLink href="/dive-packages" variant="coral" size="lg">
                  Explore dive packages
                </CtaLink>
                <CtaLink href="/contact" variant="outline" size="lg">
                  Plan your dive
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
