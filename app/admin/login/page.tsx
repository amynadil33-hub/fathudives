import type { Metadata } from 'next'
import { getAdminUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Admin Login',
  robots: { index: false, follow: false },
}

export default async function AdminLoginPage() {
  const user = await getAdminUser()
  if (user) redirect('/admin')

  return (
    <div className="flex min-h-dvh items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-serif text-4xl text-deep">Fathu Dives</p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Admin Portal
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
