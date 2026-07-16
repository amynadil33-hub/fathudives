import { requireAdmin } from '@/lib/auth'
import { getTestimonials } from '@/lib/data'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminTestimonialsPage() {
  await requireAdmin()
  const testimonials = await getTestimonials()

  return (
    <div>
      <AdminHeader
        title="Testimonials"
        description="Guest reviews. All entries are clearly marked as placeholders until the client supplies verified reviews."
        action={
          <Button disabled className="gap-2">
            <Plus className="size-4" aria-hidden /> New testimonial
          </Button>
        }
      />
      <div className="mb-4">
        <ContentNotice />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <blockquote key={t.id} className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm leading-relaxed text-foreground">“{t.review}”</p>
            <footer className="mt-4 text-sm">
              <span className="font-medium text-foreground">{t.guestName}</span>
              <span className="text-muted-foreground">
                {t.country ? ` · ${t.country}` : ''}
                {t.tripType ? ` · ${t.tripType}` : ''}
              </span>
              {t.source ? (
                <span className="mt-1 block text-xs text-muted-foreground">Source: {t.source}</span>
              ) : null}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  )
}
