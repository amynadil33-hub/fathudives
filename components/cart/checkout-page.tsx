'use client'

import { useActionState, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Loader2, LockKeyhole, Send } from 'lucide-react'
import { submitEnquiry, type EnquiryFormState } from '@/app/actions/enquiry'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { formatPrice } from '@/lib/utils'
import { useCart } from './cart-provider'

const initialState: EnquiryFormState = { status: 'idle' }

export function CheckoutPage() {
  const { items, subtotal, hydrated, clearCart } = useCart()
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState)
  const [divers, setDivers] = useState(items.reduce((sum, item) => sum + item.guests, 0) || 1)
  const guests = items.reduce((sum, item) => sum + item.guests, 0)
  const summary = useMemo(() => items.map((item) => `${item.title} x ${item.guests} guest(s)`).join('; '), [items])

  useEffect(() => {
    if (state.status === 'success') clearCart()
  }, [state.status, clearCart])

  if (!hydrated) return <div className="min-h-72 animate-pulse rounded-3xl bg-muted" />
  if (state.status === 'success') {
    return <div className="rounded-3xl bg-seafoam/60 p-10 text-center"><CheckCircle2 className="mx-auto size-12 text-primary" /><h2 className="mt-5 font-serif text-3xl text-foreground">Booking request received</h2><p className="mx-auto mt-3 max-w-lg text-muted-foreground">We’ll confirm availability, the final price and payment instructions with you personally.</p><Link href="/" className="mt-7 inline-block rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Return home</Link></div>
  }
  if (items.length === 0) {
    return <div className="rounded-3xl border border-border bg-card p-10 text-center"><h2 className="font-serif text-3xl">Nothing to check out yet</h2><Link href="/dive-packages" className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">Choose a package</Link></div>
  }

  const field = 'mt-1.5 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring'
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <form action={formAction} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <input type="hidden" name="children" value="0" />
        <input type="hidden" name="diverStatus" value="Certified beginner" />
        <input type="hidden" name="packageId" value={items[0].packageId} />
        <input type="hidden" name="adults" value={guests} />
        <input type="hidden" name="numberOfDivers" value={divers} />
        <input type="hidden" name="message" value={`Cart checkout request: ${summary}. Estimated subtotal: ${formatPrice(subtotal, items[0].currency)}.`} />
        <h2 className="font-serif text-3xl text-foreground">Guest details</h2>
        <p className="mt-2 text-sm text-muted-foreground">Send your request and we’ll verify dates and availability before payment.</p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <label><Label htmlFor="fullName">Full name *</Label><Input id="fullName" name="fullName" autoComplete="name" className={field} required /><Error text={state.errors?.fullName} /></label>
          <label><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" autoComplete="email" className={field} required /><Error text={state.errors?.email} /></label>
          <label><Label htmlFor="whatsapp">WhatsApp number</Label><Input id="whatsapp" name="whatsapp" autoComplete="tel" className={field} /></label>
          <label><Label htmlFor="nationality">Nationality</Label><Input id="nationality" name="nationality" autoComplete="country-name" className={field} /></label>
          <label><Label htmlFor="arrivalDate">Arrival date</Label><Input id="arrivalDate" name="arrivalDate" type="date" className={field} /></label>
          <label><Label htmlFor="departureDate">Departure date</Label><Input id="departureDate" name="departureDate" type="date" className={field} /></label>
          <label className="sm:col-span-2"><Label htmlFor="divers">Number of divers</Label><Input id="divers" type="number" min={0} max={guests} value={divers} onChange={(event) => setDivers(Number(event.target.value))} className={field} /></label>
        </div>
        <label className="mt-6 flex items-start gap-2.5 text-sm text-muted-foreground"><Checkbox name="consent" className="mt-0.5" /><span>I consent to Fathu Dives contacting me about this booking request. <Error text={state.errors?.consent} /></span></label>
        {state.status === 'error' && state.message ? <p role="alert" className="mt-4 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p> : null}
        <Button type="submit" disabled={pending} className="mt-6 h-12 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">{pending ? <><Loader2 className="animate-spin" /> Sending…</> : <><Send /> Request booking</>}</Button>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><LockKeyhole className="size-3.5" /> No payment is taken on this page.</p>
      </form>
      <aside className="h-fit rounded-3xl bg-primary p-6 text-primary-foreground lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl">Your packages</h2>
        <div className="mt-5 space-y-4">{items.map((item) => <div key={item.packageId} className="flex gap-3 border-b border-primary-foreground/15 pb-4"><div className="relative size-16 shrink-0 overflow-hidden rounded-xl"><Image src={item.image} alt="" fill sizes="64px" className="object-cover" /></div><div className="min-w-0 flex-1"><p className="font-medium">{item.title}</p><p className="text-xs text-primary-foreground/65">{item.guests} guest(s)</p></div><p className="text-sm">{formatPrice(item.price * item.guests, item.currency)}</p></div>)}</div>
        <div className="mt-5 flex items-end justify-between"><span>Estimate</span><span className="font-serif text-3xl text-accent">{formatPrice(subtotal, items[0].currency)}</span></div>
        <Link href="/cart" className="mt-5 block text-center text-sm text-primary-foreground/70 hover:text-background">Edit cart</Link>
      </aside>
    </div>
  )
}

function Error({ text }: { text?: string }) { return text ? <span className="mt-1 block text-xs text-destructive">{text}</span> : null }
