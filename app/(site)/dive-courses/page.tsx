import type { Metadata } from 'next'
import { PageHero } from '@/components/site/page-hero'
import { Section, Container, EditorialLabel } from '@/components/site/editorial'
import { Reveal } from '@/components/site/reveal'
import { CoursesExplorer } from '@/components/courses/courses-explorer'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { getCourses } from '@/lib/data'
import { media } from '@/lib/media'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Dive Courses',
  description:
    'Learn to dive or advance your skills with Fathu Dives on Dhangethi Island. From first-time discovery to professional development. Placeholder pricing and certification details shown until confirmed.',
  alternates: { canonical: '/dive-courses' },
  openGraph: {
    title: 'Dive Courses · Fathu Dives',
    description: 'Beginner to professional diving courses in South Ari Atoll, Maldives.',
    url: `${siteConfig.url}/dive-courses`,
    images: [{ url: media.experiences.learn }],
  },
}

export default async function DiveCoursesPage() {
  const courses = await getCourses()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: 'Dive Courses', url: '/dive-courses' },
        ]}
      />
      <PageHero
        image={media.experiences.learn}
        label="Learn · Progress · Explore"
        title="Dive Courses"
        intro="Whether it is your first breath underwater or your next professional step, our instructors guide you at your own pace."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Dive Courses' }]}
      />

      <Section tone="default">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <EditorialLabel className="justify-center">A path for every diver</EditorialLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
                Start where you are
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Small groups, patient teaching and the warm reefs of South Ari make Dhangethi a
                wonderful place to learn. Course prices, minimum ages and certification requirements
                shown here are placeholders and will be confirmed by our team, along with the
                training agency we work with.
              </p>
            </Reveal>
          </div>

          <div className="mt-12">
            <CoursesExplorer courses={courses} />
          </div>
        </Container>
      </Section>
    </>
  )
}
