import { requireAdmin } from '@/lib/auth'
import { getEnquiries } from '@/lib/data/enquiries'
import { AdminHeader } from '@/components/admin/admin-ui'
import { EnquiriesTable } from '@/components/admin/enquiries-table'

export default async function AdminEnquiriesPage() {
  await requireAdmin()
  const enquiries = await getEnquiries()

  return (
    <div>
      <AdminHeader
        title="Enquiries"
        description="Review booking enquiries and move each one through your workflow."
      />
      <EnquiriesTable enquiries={enquiries} />
    </div>
  )
}
