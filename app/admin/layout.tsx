import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getAdminUser } from '@/lib/auth'
import { AdminShell } from '@/components/admin/admin-shell'

export const metadata: Metadata = {
  title: 'Admin Portal',
  robots: { index: false, follow: false },
}

// The login page renders itself; all other admin routes are guarded here.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getAdminUser()
  return <AdminShell user={user}>{children}</AdminShell>
}
