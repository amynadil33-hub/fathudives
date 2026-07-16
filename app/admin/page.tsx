import Link from 'next/link'
import { Inbox, Package, GraduationCap, Images, CheckCircle2, ArrowRight } from 'lucide-react'
import { requireAdmin } from '@/lib/auth'
import { getEnquiries } from '@/lib/data/enquiries'
import { getPackages, getCourses, getGalleryItems } from '@/lib/data'
import { AdminHeader, StatCard } from '@/components/admin/admin-ui'
import { EnquiryStatusBadge } from '@/components/admin/enquiry-status-badge'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  await requireAdmin()

  const [enquiries, packages, courses, gallery] = await Promise.all([
    getEnquiries(),
    getPackages(),
    getCourses(),
    getGalleryItems(),
  ])

  const newEnquiries = enquiries.filter((e) => e.status === 'new')
  const confirmed = enquiries.filter((e) => e.status === 'confirmed')
  const recent = enquiries.slice(0, 6)

  return (
    <div>
      <AdminHeader title="Dashboard" description="An overview of enquiries and published content." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="New enquiries" value={newEnquiries.length} icon={Inbox} hint="Awaiting first reply" />
        <StatCard label="Confirmed bookings" value={confirmed.length} icon={CheckCircle2} hint="Marked confirmed" />
        <StatCard label="Active packages" value={packages.length} icon={Package} />
        <StatCard label="Published courses" value={courses.length} icon={GraduationCap} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Gallery items" value={gallery.length} icon={Images} />
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-serif text-xl text-deep">Recent enquiries</h2>
          <Link
            href="/admin/enquiries"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-coral"
          >
            View all <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="p-8 text-center text-sm text-muted-foreground">
            No enquiries yet. Submitted enquiries from the website will appear here.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-medium text-foreground">{e.fullName}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.email}
                    {e.nationality ? ` · ${e.nationality}` : ''}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-muted-foreground">{formatDate(e.createdAt)}</span>
                  <EnquiryStatusBadge status={e.status} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
