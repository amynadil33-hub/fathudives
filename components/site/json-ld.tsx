import { siteConfig } from '@/lib/site-config'
import type { Faq, Package } from '@/lib/types'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'SportsActivityLocation',
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        email: siteConfig.email,
        image: `${siteConfig.url}${siteConfig.url.endsWith('/') ? '' : ''}/images/hero-ocean.png`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dhangethi',
          addressRegion: 'South Ari Atoll',
          addressCountry: 'MV',
        },
        areaServed: 'South Ari Atoll, Maldives',
        sport: 'Scuba diving',
      }}
    />
  )
}

export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }}
    />
  )
}

export function ProductJsonLd({ pkg }: { pkg: Package }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: pkg.title,
        description: pkg.shortDescription,
        image: `${siteConfig.url}${pkg.featuredImage}`,
        offers: {
          '@type': 'Offer',
          priceCurrency: pkg.currency,
          price: pkg.basePrice,
          availability: 'https://schema.org/InStock',
          url: `${siteConfig.url}/dive-packages/${pkg.slug}`,
        },
      }}
    />
  )
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: `${siteConfig.url}${item.url}`,
        })),
      }}
    />
  )
}
