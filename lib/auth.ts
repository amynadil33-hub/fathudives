import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

// Name of the lightweight dev-session cookie used when Supabase auth is not yet
// configured. Once Supabase credentials are added, real Supabase Auth sessions
// take over and this fallback is ignored.
const DEV_SESSION_COOKIE = 'fathu_admin_session'

export type AdminUser = {
  id: string
  email: string
  role: 'super_admin' | 'admin' | 'editor'
}

// Returns the currently authenticated admin user, or null.
export async function getAdminUser(): Promise<AdminUser | null> {
  const supabase = await createClient()

  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return null

    // Look up the profile row to confirm an admin role.
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('id', user.id)
      .single()

    if (!profile || !['super_admin', 'admin', 'editor'].includes(profile.role)) {
      return null
    }
    return { id: profile.id, email: profile.email ?? '', role: profile.role }
  }

  // Dev fallback: presence of the session cookie means "logged in".
  const store = await cookies()
  if (store.get(DEV_SESSION_COOKIE)?.value === '1') {
    return { id: 'dev-admin', email: 'admin@fathudives.com', role: 'super_admin' }
  }
  return null
}

// Guards a server component. Redirects to the login page when not signed in.
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')
  return user
}

export { DEV_SESSION_COOKIE }
