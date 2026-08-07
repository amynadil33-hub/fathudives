import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import type { Experience } from '@/lib/types'

export function SignatureExperiences({ experiences }: { experiences: Experience[] }) {
  if (!experiences.length) return null
  return (
    <Section tone="seafoam" className="relative">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <EditorialLabel>Signature experiences</EditorialLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
              Encounters that stay with you
            </h2>
          </Reveal>
        </div>

        {/* Asymmetric editorial grid — varied proportions, not identical cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* Large feature (whale shark) */}
          <Reveal className="md:col-span-7" direction="up">
            {experiences[0] ? <ExperienceTile experience={experiences[0]} tall /> : null}
          </Reveal>

          {/* Two stacked on the right */}
          <div className="grid gap-6 md:col-span-5 md:gap-8">
            <Reveal delay={0.1}>
              {experiences[1] ? <ExperienceTile experience={experiences[1]} /> : null}
            </Reveal>
            <Reveal delay={0.2}>
              {experiences[3] ? <ExperienceTile experience={experiences[3]} /> : null}
            </Reveal>
          </div>

          {/* Wide reef band */}
          <Reveal className="md:col-span-12" delay={0.1}>
            {experiences[2] ? <ExperienceTile experience={experiences[2]} wide /> : null}
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}

function ExperienceTile({
  experience,
  tall,
  wide,
}: {
  experience: Experience
  tall?: boolean
  wide?: boolean
}) {
  return (
    <Link
      href={experience.href}
      className="group relative block h-full overflow-hidden rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className={wide ? 'relative aspect-[16/7]' : tall ? 'relative aspect-[4/5] md:h-full' : 'relative aspect-[4/3]'}>
        <Image
          src={experience.image || '/placeholder.svg'}
          alt={experience.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/20 to-transparent" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
        <span className="tracking-label text-[0.65rem] text-accent">{experience.level}</span>
        <h3 className="mt-2 flex items-center gap-2 font-serif text-2xl text-background md:text-3xl">
          {experience.title}
          <ArrowUpRight className="size-5 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-background/85">{experience.description}</p>
      </div>
    </Link>
  )
}
