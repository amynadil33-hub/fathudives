import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container } from '@/components/site/editorial'
import { GalleryFilter } from '@/components/gallery/gallery-filter'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getGalleryItems } from '@/lib/data'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A visual journey through Dhangethi and South Ari Atoll — underwater life, mantas, island days, guests and boat life.',
  alternates: { canonical: '/gallery' },
  openGraph: {
    title: 'Gallery · Fathu Dives',
    description: 'Above and below the surface around Dhangethi Island, Maldives.',
    url: `${siteConfig.url}/gallery`,
    images: [{ url: '/images/gallery/manta-front.webp' }],
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
        image="/images/gallery/manta-front.webp"
        label="Above &amp; below"
        title="Gallery"
        intro="A glimpse of what awaits — coral gardens and mantas below, island life and sunsets above."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <Section tone="default">
        <Container>
          <GalleryFilter items={items} />
        </Container>
      </Section>
    </>
  )
}
