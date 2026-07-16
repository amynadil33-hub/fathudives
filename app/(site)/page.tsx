import { Hero } from '@/components/home/hero'
import { Intro } from '@/components/home/intro'
import { SignatureExperiences } from '@/components/home/signature-experiences'
import { FeaturedPackages } from '@/components/home/featured-packages'
import { AdventureSelector } from '@/components/home/adventure-selector'
import { IslandExperience } from '@/components/home/island-experience'
import { DiveSitesPreview } from '@/components/home/dive-sites-preview'
import { TrustSafety } from '@/components/home/trust-safety'
import { GalleryPreview } from '@/components/home/gallery-preview'
import { Testimonials } from '@/components/home/testimonials'
import { FaqSection } from '@/components/home/faq-section'
import { FinalCta } from '@/components/home/final-cta'
import {
  getFeaturedPackages,
  getFeaturedDiveSites,
  getGalleryItems,
  getTestimonials,
  getFaqs,
} from '@/lib/data'
import { LocalBusinessJsonLd, FaqJsonLd } from '@/components/site/json-ld'

export default async function HomePage() {
  const [packages, sites, gallery, testimonials, faqs] = await Promise.all([
    getFeaturedPackages(),
    getFeaturedDiveSites(),
    getGalleryItems(),
    getTestimonials(),
    getFaqs(),
  ])

  return (
    <>
      <LocalBusinessJsonLd />
      <FaqJsonLd faqs={faqs} />
      <Hero />
      <Intro />
      <SignatureExperiences />
      <FeaturedPackages packages={packages} />
      <AdventureSelector />
      <IslandExperience />
      <DiveSitesPreview sites={sites} />
      <TrustSafety />
      <GalleryPreview items={gallery.slice(0, 9)} />
      <Testimonials testimonials={testimonials} />
      <FaqSection faqs={faqs} />
      <FinalCta />
    </>
  )
}
