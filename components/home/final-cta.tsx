import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { EditorialLabel } from '@/components/site/editorial'
import { media } from '@/lib/media'
import { whatsappHref } from '@/lib/site-config'

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src={media.ctaSunset || '/placeholder.svg'}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/60 to-deep/40" />

      <div className="relative mx-auto max-w-3xl px-5 py-28 text-center sm:px-6 md:py-36">
        <Reveal>
          <EditorialLabel onDark className="justify-center text-accent">
            Your Maldives awaits
          </EditorialLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif text-4xl leading-[1.1] text-background sm:text-5xl md:text-6xl">
            Your next great story begins
            <br />
            <span className="italic text-accent">below the surface.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaLink href="/contact" variant="coral" size="lg" className="w-full sm:w-auto">
              Start Planning
            </CtaLink>
            <CtaLink href={whatsappHref()} variant="ghost-light" size="lg" className="w-full sm:w-auto">
              <MessageCircle className="size-5" />
              Chat on WhatsApp
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
