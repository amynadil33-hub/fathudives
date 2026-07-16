import { requireAdmin } from '@/lib/auth'
import { getCourses } from '@/lib/data'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminCoursesPage() {
  await requireAdmin()
  const courses = await getCourses()

  return (
    <div>
      <AdminHeader
        title="Courses"
        description="Diving courses offered by the centre."
        action={
          <Button disabled className="gap-2">
            <Plus className="size-4" aria-hidden /> New course
          </Button>
        }
      />
      <div className="mb-4">
        <ContentNotice />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="hidden p-4 font-medium sm:table-cell">Category</th>
              <th className="hidden p-4 font-medium md:table-cell">Duration</th>
              <th className="p-4 font-medium">From</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {courses.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-medium text-foreground">{c.title}</td>
                <td className="hidden p-4 text-muted-foreground sm:table-cell">{c.category}</td>
                <td className="hidden p-4 text-muted-foreground md:table-cell">{c.duration}</td>
                <td className="p-4 text-muted-foreground">{formatPrice(c.price, c.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
