import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD

if (!url || !secretKey || !email || !password) {
  console.error('Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY), ADMIN_EMAIL, and ADMIN_PASSWORD.')
  process.exit(1)
}
if (password.length < 12) {
  console.error('ADMIN_PASSWORD must be at least 12 characters.')
  process.exit(1)
}

const supabase = createClient(url, secretKey, {
  auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
})
const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 })
if (listError) throw listError
let user = listed.users.find((candidate) => candidate.email?.toLowerCase() === email)

if (user) {
  const { data, error } = await supabase.auth.admin.updateUserById(user.id, {
    password,
    email_confirm: true,
    user_metadata: { ...user.user_metadata, full_name: 'Fathu Dives Admin' },
    app_metadata: { ...user.app_metadata, role: 'super_admin' },
  })
  if (error) throw error
  user = data.user
  console.log(`Updated existing Supabase Auth user: ${email}`)
} else {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: 'Fathu Dives Admin' },
    app_metadata: { role: 'super_admin' },
  })
  if (error) throw error
  user = data.user
  console.log(`Created Supabase Auth user: ${email}`)
}

if (!user) throw new Error('Supabase did not return a user')
const { error: profileError } = await supabase.from('profiles').upsert({
  id: user.id,
  email,
  full_name: user.user_metadata?.full_name || 'Fathu Dives Admin',
  role: 'super_admin',
})
if (profileError) {
  if (profileError.code === 'PGRST205') {
    console.warn('The public.profiles table is not installed; using protected Auth app_metadata for the admin role.')
    console.warn('Apply supabase/schema.sql to enable the full database-backed admin portal.')
  } else {
    throw profileError
  }
}
console.log(`Admin access is ready at /admin/login (${email}, role: super_admin).`)
