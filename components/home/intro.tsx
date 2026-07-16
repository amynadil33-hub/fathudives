import { Section, Container, EditorialLabel, HandwrittenLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { WaveLine } from '@/components/site/wave'

export function Intro() {
  return (
    <Section tone="default" className="relative overflow-hidden">
      <Container className="max-w-4xl text-center">
        <Reveal>
          <EditorialLabel className="justify-center">A welcome from the island</EditorialLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            Come for the diving.
            <br />
            <span className="italic text-primary">Fall in love</span> with the island.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Fathu Dives is a locally run dive centre on Dhangethi, a small inhabited island in South Ari Atoll.
            We pair memorable diving with genuine local knowledge, personal service and the unhurried rhythm of
            Maldivian island life. Days begin on the reef and end with sand between your toes.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mt-6 text-sm text-muted-foreground/70">
            <em>Placeholder introduction — final wording to be provided by the client.</em>
          </p>
        </Reveal>
        <Reveal delay={0.35} className="mt-10 flex flex-col items-center gap-2">
          <HandwrittenLabel>see you in the blue</HandwrittenLabel>
          <WaveLine className="max-w-xs text-accent" />
        </Reveal>
      </Container>
    </Section>
  )
}
