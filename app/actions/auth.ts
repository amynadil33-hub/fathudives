'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DEV_SESSION_COOKIE } from '@/lib/auth'

export type LoginState = { error?: string } | null

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Please enter your email and password.' }
  }

  const supabase = await createClient()

  if (supabase) {
    let supabaseSignedIn = false
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      supabaseSignedIn = !error
      // Invalid Supabase credentials — still allow the demo login below so the
      // admin can be reviewed when the Supabase project has no admin user yet.
    } catch {
      // Supabase configured but unreachable (stale project URL / offline).
      // Fall through to the dev credential path below.
    }
    // redirect() throws internally, so it must run OUTSIDE the try/catch.
    if (supabaseSignedIn) redirect('/admin')
  }

  // Dev fallback used when Supabase is not configured OR is unreachable.
  // Accepts a demo credential so the protected admin structure can be reviewed.
  if (email === 'admin@fathudives.com' && password === 'demo') {
    const store = await cookies()
    store.set(DEV_SESSION_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    redirect('/admin')
  }

  return { error: 'Invalid credentials. While Supabase is not connected, use the demo login shown below.' }
}

export async function logout() {
  const supabase = await createClient()
  if (supabase) {
    await supabase.auth.signOut()
  }
  const store = await cookies()
  store.delete(DEV_SESSION_COOKIE)
  redirect('/admin/login')
}
