import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { GalleryGrid } from '@/components/site/gallery-grid'
import { CtaLink } from '@/components/site/cta-button'
import type { GalleryItem } from '@/lib/types'

export function GalleryPreview({ items }: { items: GalleryItem[] }) {
  return (
    <Section tone="default">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <EditorialLabel>Above &amp; below</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Island &amp; underwater moments
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <CtaLink href="/gallery" variant="outline" size="md">
              View full gallery
            </CtaLink>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <GalleryGrid items={items} />
        </Reveal>
      </Container>
    </Section>
  )
}
