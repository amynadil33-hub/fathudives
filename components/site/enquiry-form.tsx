'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { submitEnquiry, type EnquiryFormState } from '@/app/actions/enquiry'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { CtaLink } from '@/components/site/cta-button'
import { siteConfig, whatsappHref } from '@/lib/site-config'
import { DIVER_STATUSES } from '@/lib/constants'
import { cn } from '@/lib/utils'

const initialState: EnquiryFormState = { status: 'idle' }

function Field({
  label,
  htmlFor,
  error,
  children,
  required,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
  required?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label htmlFor={htmlFor} className="text-sm font-medium text-deep">
        {label}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export function EnquiryForm({
  packages,
  defaultPackageId,
  compact = false,
}: {
  packages: { id: string; title: string }[]
  defaultPackageId?: string
  compact?: boolean
}) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const [diverStatus, setDiverStatus] = useState<string>(DIVER_STATUSES[0])

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
      successRef.current?.focus()
    }
  }, [state.status])

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="flex flex-col items-center gap-4 rounded-3xl bg-seafoam/60 p-8 text-center outline-none sm:p-12"
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-aqua/40 text-primary">
          <CheckCircle2 className="size-7" />
        </span>
        <h3 className="font-serif text-3xl text-deep">Enquiry received</h3>
        <p className="max-w-md text-pretty leading-relaxed text-deep/70">
          {state.message} Our team will reply personally, usually within {siteConfig.responseTime}. For a faster
          answer you can also reach us on WhatsApp.
        </p>
        <CtaLink href={whatsappHref('Hi Fathu Dives, I just sent an enquiry.')} variant="coral" external>
          Chat on WhatsApp
        </CtaLink>
      </div>
    )
  }

  const err = state.errors ?? {}

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="diverStatus" value={diverStatus} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="fullName" required error={err.fullName}>
          <Input id="fullName" name="fullName" autoComplete="name" placeholder="Your name" />
        </Field>
        <Field label="Email" htmlFor="email" required error={err.email}>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@email.com" />
        </Field>
        <Field label="WhatsApp number" htmlFor="whatsapp" error={err.whatsapp}>
          <Input id="whatsapp" name="whatsapp" placeholder="+960 ..." autoComplete="tel" />
        </Field>
        <Field label="Nationality" htmlFor="nationality" error={err.nationality}>
          <Input id="nationality" name="nationality" placeholder="Country" autoComplete="country-name" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Arrival date" htmlFor="arrivalDate" error={err.arrivalDate}>
          <Input id="arrivalDate" name="arrivalDate" type="date" />
        </Field>
        <Field label="Departure date" htmlFor="departureDate" error={err.departureDate}>
          <Input id="departureDate" name="departureDate" type="date" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Adults" htmlFor="adults" error={err.adults}>
          <Input id="adults" name="adults" type="number" min={1} defaultValue={2} />
        </Field>
        <Field label="Children" htmlFor="children" error={err.children}>
          <Input id="children" name="children" type="number" min={0} defaultValue={0} />
        </Field>
        <Field label="Number of divers" htmlFor="numberOfDivers" error={err.numberOfDivers}>
          <Input id="numberOfDivers" name="numberOfDivers" type="number" min={0} defaultValue={2} />
        </Field>
      </div>

      <Field label="Diver status" htmlFor="diverStatusSelect" required error={err.diverStatus}>
        <select
          id="diverStatusSelect"
          value={diverStatus}
          onChange={(e) => setDiverStatus(e.target.value)}
          className="h-10 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          {DIVER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      {!compact ? (
        <div className="grid gap-5 sm:grid-cols-3">
          <Field label="Certification level" htmlFor="certificationLevel" error={err.certificationLevel}>
            <Input id="certificationLevel" name="certificationLevel" placeholder="e.g. Open Water" />
          </Field>
          <Field label="Certification agency" htmlFor="certificationAgency" error={err.certificationAgency}>
            <Input id="certificationAgency" name="certificationAgency" placeholder="Agency" />
          </Field>
          <Field label="Approx. logged dives" htmlFor="loggedDives" error={err.loggedDives}>
            <Input id="loggedDives" name="loggedDives" type="number" min={0} placeholder="0" />
          </Field>
        </div>
      ) : null}

      <Field label="Preferred package" htmlFor="packageId" error={err.packageId}>
        <select
          id="packageId"
          name="packageId"
          defaultValue={defaultPackageId ?? ''}
          className="h-10 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          <option value="">No preference yet</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </Field>

      <fieldset className="grid gap-3 rounded-2xl bg-sand/60 p-4 sm:grid-cols-3">
        <legend className="sr-only">Requirements</legend>
        <label className="flex items-center gap-2 text-sm text-deep">
          <Checkbox name="accommodationRequired" defaultChecked />
          Accommodation
        </label>
        <label className="flex items-center gap-2 text-sm text-deep">
          <Checkbox name="equipmentRequired" />
          Equipment rental
        </label>
        <label className="flex items-center gap-2 text-sm text-deep">
          <Checkbox name="transferRequired" defaultChecked />
          Airport transfer
        </label>
      </fieldset>

      {!compact ? (
        <Field label="Special requests" htmlFor="specialRequests" error={err.specialRequests}>
          <Textarea id="specialRequests" name="specialRequests" rows={2} placeholder="Dietary needs, celebrations, accessibility..." />
        </Field>
      ) : null}

      <Field label="Message" htmlFor="message" error={err.message}>
        <Textarea id="message" name="message" rows={compact ? 2 : 4} placeholder="Tell us about the trip you're dreaming of..." />
      </Field>

      <label className="flex items-start gap-2.5 text-sm text-deep/80">
        <Checkbox name="consent" className="mt-0.5" />
        <span>
          I consent to Fathu Dives contacting me about my enquiry. {' '}
          {err.consent ? <span className="text-destructive">{err.consent}</span> : null}
        </span>
      </label>

      {state.status === 'error' && state.message ? (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-accent text-base font-medium text-accent-foreground hover:bg-accent/90"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="size-4" /> Submit Enquiry
          </>
        )}
      </Button>
    </form>
  )
}
