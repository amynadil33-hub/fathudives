'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { HeroVideo } from '@/components/site/hero-video'
import { CtaLink } from '@/components/site/cta-button'
import { EditorialLabel } from '@/components/site/editorial'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export function Hero() {
  const reduce = useReducedMotion()

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <HeroVideo poster={media.hero.poster} posterMobile={media.hero.posterMobile} src={media.hero.videoSrc} />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep/55 via-deep/40 to-deep/75" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 50% 46%, rgba(23,49,61,0.55) 0%, rgba(23,49,61,0) 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-28 text-center sm:px-6">
        <motion.div {...rise(0.1)}>
          <EditorialLabel onDark className="justify-center text-background/90">
            {siteConfig.atoll}
          </EditorialLabel>
        </motion.div>

        <motion.h1
          {...rise(0.25)}
          className="mt-6 font-serif text-[2.75rem] leading-[1.02] text-background sm:text-6xl md:text-7xl"
        >
          Dive the <span className="italic text-accent">Wild Heart</span>
          <br />
          of Dhangethi
        </motion.h1>

        <motion.p
          {...rise(0.45)}
          className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-background/90 md:text-xl"
        >
          Whale shark encounters, unforgettable reefs and the warmth of a true Maldivian island escape.
        </motion.p>

        <motion.div
          {...rise(0.6)}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <CtaLink href="/dive-packages" variant="coral" size="lg" className="w-full sm:w-auto">
            Explore Dive Packages
          </CtaLink>
          <CtaLink href="/contact" variant="ghost-light" size="lg" className="w-full sm:w-auto">
            Plan Your Dive
          </CtaLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-background/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="tracking-label text-[0.6rem]">Scroll</span>
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
