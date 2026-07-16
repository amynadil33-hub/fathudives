'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { AdminSidebar } from './admin-sidebar'
import type { AdminUser } from '@/lib/auth'

export function AdminShell({
  user,
  children,
}: {
  user: AdminUser | null
  children: ReactNode
}) {
  const pathname = usePathname()

  // The login route renders standalone (no sidebar), regardless of auth state.
  if (pathname === '/admin/login') {
    return <div className="min-h-dvh bg-sand">{children}</div>
  }

  // Guarded routes: the server layout already resolved the user. If there is no
  // user, the individual pages call redirect(); this is a defensive fallback.
  if (!user) {
    return <div className="min-h-dvh bg-sand">{children}</div>
  }

  return (
    <div className="min-h-dvh bg-sand lg:grid lg:grid-cols-[260px_1fr]">
      <div className="sticky top-0 hidden h-dvh lg:block">
        <AdminSidebar email={user.email} />
      </div>
      <main className="min-w-0 p-5 sm:p-8">{children}</main>
    </div>
  )
}
