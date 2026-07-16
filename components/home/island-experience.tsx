import Image from 'next/image'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { media } from '@/lib/media'

const moments = [
  { label: 'White sandy beaches', image: media.island.beach },
  { label: 'Palm-lined island lanes', image: media.island.lane },
  { label: 'Sunset by the harbour', image: media.island.sunset },
  { label: 'Traditional boats', image: media.island.boats },
]

export function IslandExperience() {
  return (
    <Section tone="sand" className="relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Overlapping image composition */}
          <Reveal direction="right">
            <div className="relative">
              <div className="mask-leaf relative aspect-[4/5] overflow-hidden shadow-xl">
                <Image
                  src={media.island.beach || '/placeholder.svg'}
                  alt="A quiet white-sand beach on Dhangethi Island"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mask-blob absolute -bottom-8 -right-4 aspect-square w-40 overflow-hidden border-4 border-background shadow-lg sm:w-52 lg:-right-8">
                <Image
                  src={media.island.sunset || '/placeholder.svg'}
                  alt="Sunset over the Dhangethi harbour"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <EditorialLabel>Discover Dhangethi</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
                An Island Made
                <br />
                <span className="italic text-primary">for Ocean Days</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
                Dhangethi is more than a dive base. It is a small, welcoming local island where the day is measured
                in tides and sunsets — palm-shaded lanes, family-run cafés, fishermen mending nets by the harbour,
                and a soft-sand bikini beach to end the day. Come up from the reef and step straight into real
                Maldivian island life.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 grid grid-cols-2 gap-4">
                {moments.map((m) => (
                  <li key={m.label} className="group">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image
                        src={m.image || '/placeholder.svg'}
                        alt={m.label}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <CtaLink href="/discover-dhangethi" variant="outline" size="md" className="mt-8">
                Discover Dhangethi
              </CtaLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
