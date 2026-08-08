import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const DEV_SESSION_COOKIE = 'fathu_admin_session'
export const DEMO_ADMIN_EMAIL = 'admin@fathudives.com'
export const DEMO_ADMIN_PASSWORD = 'demo'

export type AdminUser = {
  id: string
  email: string
  role: 'super_admin' | 'admin' | 'editor'
}

export async function getAdminUser(): Promise<AdminUser | null> {
  if (process.env.NODE_ENV === 'development') {
    const store = await cookies()
    if (store.get(DEV_SESSION_COOKIE)?.value === '1') {
      return { id: 'dev-admin', email: DEMO_ADMIN_EMAIL, role: 'super_admin' }
    }
  }

  const supabase = await createClient()
  if (!supabase) return null

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const metadataRole = user.app_metadata?.role
  const validMetadataRole = ['super_admin', 'admin', 'editor'].includes(metadataRole)

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, email, role')
    .eq('id', user.id)
    .single()

  if (profile && ['super_admin', 'admin', 'editor'].includes(profile.role)) {
    return { id: profile.id, email: profile.email ?? user.email ?? '', role: profile.role }
  }
  if (validMetadataRole) {
    return { id: user.id, email: user.email ?? '', role: metadataRole as AdminUser['role'] }
  }
  return null
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  return user
}
