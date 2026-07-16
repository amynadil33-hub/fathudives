import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container } from '@/components/site/editorial'
import { GalleryFilter } from '@/components/gallery/gallery-filter'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getGalleryItems } from '@/lib/data'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A visual journey through Dhangethi and South Ari Atoll — underwater life, whale sharks, mantas, island days and boat life. Placeholder imagery until the client media library is added.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery · Fathu Dives',
    description: 'Above and below the surface around Dhangethi Island, Maldives.',
    url: `${siteConfig.url}/gallery`,
    images: [{ url: media.experiences.whaleShark }],
  },
}

export default async function GalleryPage() {
  const items = await getGalleryItems()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Gallery', url: '/gallery' },
        ]}
      />
      <PageHero
        image={media.experiences.whaleShark}
        label="Above &amp; below"
        title="Gallery"
        intro="A glimpse of what awaits — reefs and giants below, sand and sunsets above. Real Fathu Dives photography and video will replace these placeholders."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <Section tone="default">
        <Container>
          <GalleryFilter items={items} />
          <p className="mt-12 text-center text-sm italic text-muted-foreground">
            Videos will be supplied by the client and hosted externally (Supabase Storage or a video
            host). Poster placeholders are shown for now.
          </p>
        </Container>
      </Section>
    </>
  )
}
