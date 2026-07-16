import type { Metadata } from 'next'
import Image from 'next/image'
import { Anchor, ShieldCheck, HeartHandshake, Wrench, Ship, Leaf } from 'lucide-react'
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
  title: 'About Us',
  description:
    'Fathu Dives is a locally operated dive centre on Dhangethi Island, South Ari Atoll. Our story, our philosophy, our care for guests and the ocean. Placeholder content until confirmed by the client.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Fathu Dives',
    description: 'Born in Dhangethi. Guided by the ocean.',
    url: `${siteConfig.url}/about`,
    images: [{ url: media.about }],
  },
}

const values = [
  {
    icon: HeartHandshake,
    title: 'Guest care',
    text: 'Small groups and genuine attention. We want every guest to feel looked after, from the first message to the last dive.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety first',
    text: 'Thorough briefings, sensible dive planning and local knowledge of conditions. Adventure is always supported by care.',
  },
  {
    icon: Wrench,
    title: 'Well-kept equipment',
    text: 'Quality-maintained rental gear, checked and cared for. Specific brands and details will be confirmed by the client.',
  },
  {
    icon: Ship,
    title: 'Our boats',
    text: 'Comfortable local dive boats reach South Ari sites quickly. Boat details and capacity will be confirmed by the client.',
  },
  {
    icon: Leaf,
    title: 'Ocean respect',
    text: 'We dive gently and encourage reef-safe habits. We avoid unsupported environmental claims and simply try to do right by the reef.',
  },
  {
    icon: Anchor,
    title: 'Truly local',
    text: 'Fathu Dives is rooted in Dhangethi. Diving here means being welcomed by the people who call this island home.',
  },
]

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'About Us', url: '/about' },
        ]}
      />
      <PageHero
        image={media.about}
        label="Our story"
        title="Born in Dhangethi. Guided by the ocean."
        intro="A locally operated dive centre sharing the reefs, giants and island life we love."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      {/* Story */}
      <Section tone="default">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <HandwrittenLabel>our story</HandwrittenLabel>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                  A dive centre with island roots
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Fathu Dives was born from a simple love of the water around Dhangethi. This is a
                    placeholder story, written to show tone and structure — the client&apos;s real
                    history, founding year and milestones will be added here.
                  </p>
                  <p>
                    What won&apos;t change is the heart of it: sharing South Ari&apos;s reefs and
                    gentle giants with visitors, and doing it with the warmth of a true Maldivian
                    local island.
                  </p>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} direction="left">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                <Image
                  src={media.about || '/placeholder.svg'}
                  alt="The Fathu Dives team on the island"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Philosophy band */}
      <Section tone="primary">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <EditorialLabel onDark className="justify-center">
                Our philosophy
              </EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-balance font-serif text-3xl italic leading-snug text-primary-foreground sm:text-4xl">
                Dive with curiosity, care for the reef, and treat every guest like a friend
                visiting our island.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="default">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <EditorialLabel>What we stand for</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                How we look after you and the ocean
              </h2>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="flex h-full flex-col rounded-3xl border border-border bg-card p-7">
                  <v.icon className="size-7 text-primary" />
                  <h3 className="mt-4 font-serif text-xl text-foreground">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section tone="sand">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <EditorialLabel className="justify-center">The people</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Meet the team
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 text-sm italic leading-relaxed text-muted-foreground">
                Team profiles are placeholders. Real names, roles, certifications and photos will be
                added once confirmed by the client — we don&apos;t invent staff details.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <Reveal key={n} delay={Math.min(n * 0.06, 0.3)}>
                <div className="overflow-hidden rounded-3xl border border-border bg-card">
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={media.avatar || '/placeholder.svg'}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover opacity-90"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <p className="font-serif text-lg text-foreground">Team member</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      Role to be confirmed
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="default">
        <Container>
          <OceanDivider className="mb-14" />
          <div className="flex flex-col items-center gap-6 text-center">
            <Reveal>
              <h2 className="font-serif text-3xl text-foreground sm:text-4xl">
                Come dive with us
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flex flex-wrap justify-center gap-3">
                <CtaLink href="/contact" variant="coral" size="lg">
                  Plan your dive
                </CtaLink>
                <CtaLink href="/dive-packages" variant="outline" size="lg">
                  View packages
                </CtaLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}
