import { requireAdmin } from '@/lib/auth'
import { getDiveSites } from '@/lib/data'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminDiveSitesPage() {
  await requireAdmin()
  const sites = await getDiveSites()

  return (
    <div>
      <AdminHeader
        title="Dive Sites"
        description="South Ari Atoll dive sites shown on the website."
        action={
          <Button disabled className="gap-2">
            <Plus className="size-4" aria-hidden /> New dive site
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
              <th className="p-4 font-medium">Name</th>
              <th className="hidden p-4 font-medium sm:table-cell">Type</th>
              <th className="hidden p-4 font-medium md:table-cell">Depth</th>
              <th className="p-4 font-medium">Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sites.map((s) => (
              <tr key={s.id}>
                <td className="p-4 font-medium text-foreground">{s.name}</td>
                <td className="hidden p-4 text-muted-foreground sm:table-cell">{s.siteType}</td>
                <td className="hidden p-4 text-muted-foreground md:table-cell">
                  {s.depthMin}–{s.depthMax}m
                </td>
                <td className="p-4 text-muted-foreground">{s.difficulty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
