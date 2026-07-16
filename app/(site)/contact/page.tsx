import type { Metadata } from 'next'
import { Mail, MessageCircle, MapPin, Clock, Plane } from 'lucide-react'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { EnquiryForm } from '@/components/site/enquiry-form'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getPackages, getPackageBySlug } from '@/lib/data'
import { media } from '@/lib/media'
import { siteConfig, whatsappHref } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Contact & Enquiries',
  description:
    'Plan your diving trip to Dhangethi with Fathu Dives. Send an enquiry, message us on WhatsApp, or email our local team in South Ari Atoll. No payment taken — we reply personally.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Fathu Dives',
    description: 'Plan your Maldives diving trip with a locally operated dive centre on Dhangethi Island.',
    url: `${siteConfig.url}/contact`,
    images: [{ url: media.island.sunset }],
  },
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>
}) {
  const { package: packageSlug } = await searchParams
  const packages = await getPackages()
  const preselected = packageSlug ? await getPackageBySlug(packageSlug) : undefined

  const contactItems = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      body: 'The fastest way to reach us for quick questions and trip planning.',
      href: whatsappHref(),
      cta: 'Message on WhatsApp',
    },
    {
      icon: Mail,
      title: 'Email',
      body: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      cta: 'Send an email',
    },
    {
      icon: MapPin,
      title: 'Find us',
      body: siteConfig.location,
    },
    {
      icon: Clock,
      title: 'Response time',
      body: `We usually reply within ${siteConfig.responseTime}.`,
    },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' },
        ]}
      />
      <PageHero
        image={media.island.sunset}
        label="Plan your dive"
        title="Let's Plan Your Trip"
        intro="Tell us your dates and diving experience and our local team will craft a tailored quotation. No payment is taken now — just a friendly conversation."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section tone="default" id="enquiry">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            {/* Enquiry form */}
            <div className="order-2 lg:order-1">
              <Reveal>
                <EditorialLabel>Enquiry form</EditorialLabel>
                <h2 className="mt-4 font-serif text-3xl text-foreground sm:text-4xl">
                  Send us your details
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  The more you tell us, the better we can tailor your trip. Every field except your name and email is
                  optional.
                </p>
              </Reveal>
              <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
                <EnquiryForm
                  packages={packages.map((p) => ({ id: p.id, title: p.title }))}
                  defaultPackageId={preselected?.id}
                />
              </div>
            </div>

            {/* Contact info */}
            <aside className="order-1 flex flex-col gap-4 lg:order-2">
              {contactItems.map((item) => (
                <Reveal key={item.title}>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-9 items-center justify-center rounded-full bg-seafoam text-primary">
                        <item.icon className="size-4.5" />
                      </span>
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                    {item.href && (
                      <a
                        href={item.href}
                        className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
                      >
                        {item.cta}
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}

              <Reveal>
                <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
                  <Plane className="size-5 text-accent" />
                  <h3 className="mt-3 font-medium">Getting to Dhangethi</h3>
                  <p className="mt-2 text-sm leading-relaxed text-primary-foreground/80">
                    Dhangethi is reached by domestic flight and speedboat, or by public/scheduled ferry from Malé. Tell
                    us your arrival plans and we&apos;ll advise the smoothest route and arrange transfers.
                  </p>
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  )
}
