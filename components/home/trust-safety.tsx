import Image from 'next/image'
import { Users, ShieldCheck, Wrench, ClipboardCheck, Anchor, HeartHandshake } from 'lucide-react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { media } from '@/lib/media'

const pillars = [
  {
    icon: Users,
    title: 'Experienced dive professionals',
    text: 'Guides who know these reefs intimately and dive them every week.',
  },
  {
    icon: Anchor,
    title: 'Small guided groups',
    text: 'We keep groups small so every diver gets attention and space.',
  },
  {
    icon: Wrench,
    title: 'Quality-maintained equipment',
    text: 'Well cared-for rental gear, checked and serviced regularly.',
  },
  {
    icon: ClipboardCheck,
    title: 'Safety-focused briefings',
    text: 'Clear, thorough briefings before every dive, whatever your level.',
  },
  {
    icon: HeartHandshake,
    title: 'Local knowledge',
    text: 'Born-and-raised islanders who read the ocean and the seasons.',
  },
  {
    icon: ShieldCheck,
    title: 'Beginner-friendly support',
    text: 'Patient, reassuring guidance for first-timers and nervous divers.',
  },
]

export function TrustSafety() {
  return (
    <Section tone="seafoam" className="relative overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal direction="right">
            <div className="mask-arch relative aspect-[4/5] overflow-hidden shadow-xl">
              <Image
                src={media.trust || '/placeholder.svg'}
                alt="A dive guide giving a safety briefing on the boat"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <EditorialLabel>Adventure, cared for</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl">
                Wild encounters, <span className="italic text-primary">professional care</span>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                The thrill of the Maldives is best enjoyed when you feel completely looked after. Here is how we keep
                diving safe, personal and welcoming.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-x-6 gap-y-7 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={0.05 * i}>
                  <div className="flex gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <p.icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <p className="mt-8 rounded-2xl bg-background/60 px-4 py-3 text-sm text-muted-foreground">
                <em>Client certification and training-agency information will be added here once confirmed.</em>
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  )
}
