'use client'

import { useActionState } from 'react'
import { AlertCircle, Loader2 } from 'lucide-react'
import { login, type LoginState } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, null)

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@fathudives.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </div>

      {state?.error ? (
        <p className="flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {state.error}
        </p>
      ) : null}

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> Signing in…
          </>
        ) : (
          'Sign in'
        )}
      </Button>

      <p className="rounded-lg bg-muted p-3 text-center text-xs leading-relaxed text-muted-foreground">
        Supabase Auth is not connected yet. For a preview, sign in with{' '}
        <span className="font-medium text-foreground">admin@fathudives.com</span> /{' '}
        <span className="font-medium text-foreground">demo</span>.
      </p>
    </form>
  )
}
