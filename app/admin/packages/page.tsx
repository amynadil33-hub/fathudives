import { requireAdmin } from '@/lib/auth'
import { getPackages } from '@/lib/data'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default async function AdminPackagesPage() {
  await requireAdmin()
  const packages = await getPackages()

  return (
    <div>
      <AdminHeader
        title="Packages"
        description="Dive and stay packages shown on the website."
        action={
          <Button disabled className="gap-2">
            <Plus className="size-4" aria-hidden /> New package
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
              <th className="hidden p-4 font-medium sm:table-cell">Nights</th>
              <th className="hidden p-4 font-medium sm:table-cell">Dives</th>
              <th className="hidden p-4 font-medium md:table-cell">Level</th>
              <th className="p-4 font-medium">From</th>
              <th className="p-4 font-medium">Featured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {packages.map((p) => (
              <tr key={p.id}>
                <td className="p-4 font-medium text-foreground">{p.title}</td>
                <td className="hidden p-4 text-muted-foreground sm:table-cell">{p.nights}</td>
                <td className="hidden p-4 text-muted-foreground sm:table-cell">{p.dives}</td>
                <td className="hidden p-4 text-muted-foreground md:table-cell">
                  {p.experienceLevel}
                </td>
                <td className="p-4 text-muted-foreground">
                  {formatPrice(p.basePrice, p.currency)}
                </td>
                <td className="p-4 text-muted-foreground">{p.featured ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
