import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, Waves, GraduationCap, CalendarClock, Check, ArrowRight } from 'lucide-react'
import { Section, Container, EditorialLabel, OceanDivider } from '@/components/site/editorial'
import { PageHero } from '@/components/site/page-hero'
import { Reveal } from '@/components/site/reveal'
import { CtaLink } from '@/components/site/cta-button'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getCourses, getCourseBySlug } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { siteConfig, whatsappHref } from '@/lib/site-config'

export async function generateStaticParams() {
  const courses = await getCourses()
  return courses.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) return { title: 'Course not found' }
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/dive-courses/${course.slug}` },
    openGraph: {
      title: `${course.title} · Fathu Dives`,
      description: course.description,
      url: `${siteConfig.url}/dive-courses/${course.slug}`,
      images: [{ url: course.featuredImage }],
    },
  }
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = await getCourseBySlug(slug)
  if (!course) notFound()

  const facts = [
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: Waves, label: 'Dives', value: `${course.numberOfDives}` },
    { icon: GraduationCap, label: 'Prior certification', value: course.requiredCertification },
    { icon: CalendarClock, label: 'Minimum age', value: course.minimumAge },
  ]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Courses', url: '/dive-courses' },
          { name: course.title, url: `/dive-courses/${course.slug}` },
        ]}
      />

      <PageHero
        image={course.featuredImage}
        label={course.category}
        title={course.title}
        intro={course.description}
        align="left"
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Dive Courses', href: '/dive-courses' },
          { label: course.title },
        ]}
      />

      <Section tone="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
            <div className="min-w-0">
              <Reveal>
                <p className="text-lg leading-relaxed text-foreground">{course.longDescription}</p>
              </Reveal>

              <OceanDivider className="my-12" />

              <EditorialLabel>What you will learn</EditorialLabel>
              <h2 className="mt-4 font-serif text-3xl text-foreground">Skills &amp; knowledge</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-foreground">
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <OceanDivider className="my-12" />

              <div className="grid gap-4 sm:grid-cols-3">
                {course.highlights.map((h) => (
                  <div key={h} className="rounded-2xl bg-muted p-6">
                    <p className="font-serif text-lg leading-snug text-foreground">{h}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Please note:</strong> Course details, minimum
                ages, prerequisites and the training agency shown here are placeholders. Client
                certification information will be added once confirmed. Certified divers should be
                ready to share their certification card and recent dive experience.
              </div>
            </div>

            {/* Sticky enrol card */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  From (placeholder)
                </p>
                <p className="font-serif text-3xl text-primary">
                  {formatPrice(course.price, course.currency)}
                </p>

                <dl className="mt-6 space-y-4 border-t border-border pt-6">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start gap-3">
                      <f.icon className="mt-0.5 size-4 shrink-0 text-slate-blue" />
                      <div>
                        <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                          {f.label}
                        </dt>
                        <dd className="text-sm text-foreground">{f.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>

                <CtaLink
                  href={`/contact?course=${course.slug}`}
                  variant="coral"
                  size="lg"
                  className="mt-6 w-full"
                >
                  Enquire about this course
                </CtaLink>
                <Link
                  href={whatsappHref(`Hello Fathu Dives! I'd like to know more about the ${course.title} course.`)}
                  className="mt-3 flex w-full items-center justify-center rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                >
                  Chat on WhatsApp
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <EditorialLabel>Not sure where to start?</EditorialLabel>
              <h2 className="mt-3 font-serif text-3xl text-foreground">
                Tell us your experience and we&apos;ll guide you
              </h2>
            </div>
            <CtaLink href="/dive-courses" variant="outline" size="md">
              All courses <ArrowRight className="size-4" />
            </CtaLink>
          </div>
        </Container>
      </Section>
    </>
  )
}
