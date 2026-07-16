import { PageHero } from '@/components/site/page-hero'
import { Section, Container } from '@/components/site/editorial'
import { BreadcrumbJsonLd } from '@/components/site/json-ld'
import { media } from '@/lib/media'

export type LegalSection = {
  heading: string
  paragraphs: string[]
}

// Shared editorial layout for policy / legal pages. All copy is placeholder
// text clearly written for Fathu Dives and intended to be replaced by the
// client's final, legally reviewed wording.
export function LegalPage({
  title,
  label,
  intro,
  path,
  sections,
}: {
  title: string
  label: string
  intro: string
  path: string
  sections: LegalSection[]
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: '/' },
          { name: title, url: path },
        ]}
      />
      <PageHero
        image={media.island.lane}
        label={label}
        title={title}
        intro={intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: title }]}
      />

      <Section tone="default">
        <Container className="max-w-3xl">
          <div className="rounded-2xl border border-accent/30 bg-secondary/40 p-5 text-sm leading-relaxed text-foreground/80">
            <strong className="font-semibold text-foreground">Placeholder policy.</strong> This wording is a
            temporary draft written for Fathu Dives. The client&apos;s final, legally reviewed policy will replace
            this content before launch.
          </div>

          <div className="mt-10 space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">Last updated: placeholder date.</p>
        </Container>
      </Section>
    </>
  )
}
