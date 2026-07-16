import Image from 'next/image'
import { CtaLink } from '@/components/site/cta-button'
import { EditorialLabel } from '@/components/site/editorial'
import { media } from '@/lib/media'

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Image
        src={media.hero.poster || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/55 to-deep/80" />

      <div className="relative mx-auto max-w-xl px-6 text-center">
        <EditorialLabel onDark className="justify-center">
          Lost at sea
        </EditorialLabel>
        <p className="mt-6 font-serif text-7xl text-background sm:text-8xl">404</p>
        <h1 className="mt-2 font-serif text-3xl text-background sm:text-4xl">
          This page drifted with the current
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-background/80">
          The page you were looking for can&apos;t be found. Let&apos;s get you back to dry land — or straight back
          into the water.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CtaLink href="/" variant="coral" size="lg">
            Back to home
          </CtaLink>
          <CtaLink href="/dive-packages" variant="ghost-light" size="lg">
            Explore dive packages
          </CtaLink>
        </div>
      </div>
    </main>
  )
}
