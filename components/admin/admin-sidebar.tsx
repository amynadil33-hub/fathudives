'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Inbox,
  Package,
  GraduationCap,
  Anchor,
  Images,
  Quote,
  Settings,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { logout } from '@/app/actions/auth'

const nav = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
  { label: 'Packages', href: '/admin/packages', icon: Package },
  { label: 'Courses', href: '/admin/courses', icon: GraduationCap },
  { label: 'Dive Sites', href: '/admin/dive-sites', icon: Anchor },
  { label: 'Gallery', href: '/admin/gallery', icon: Images },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Quote },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-full flex-col bg-primary text-primary-foreground">
      <div className="border-b border-white/10 p-6">
        <p className="font-serif text-2xl leading-none">Fathu Dives</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-aqua">Admin Portal</p>
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Admin navigation">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-white/15 text-white'
                  : 'text-primary-foreground/70 hover:bg-white/10 hover:text-white',
              )}
            >
              <Icon className="size-4.5 shrink-0" aria-hidden />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <p className="mb-3 truncate px-2 text-xs text-primary-foreground/60">{email}</p>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-primary-foreground/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="size-4.5" aria-hidden />
            Log out
          </button>
        </form>
      </div>
    </aside>
  )
}
