'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import {
  DEMO_ADMIN_EMAIL,
  DEMO_ADMIN_PASSWORD,
  DEV_SESSION_COOKIE,
} from '@/lib/auth'

export type LoginState = { error?: string } | null

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { error: 'Please enter your email and password.' }
  }

  // The preview login must remain available while the database is connected
  // with an anon key but no Supabase Auth admin user has been provisioned.
  if (email.toLowerCase() === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
    const store = await cookies()
    store.set(DEV_SESSION_COOKIE, '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 8,
    })
    redirect('/admin')
  }

  const supabase = await createClient()

  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error: 'Invalid credentials. Please try again.' }
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
