'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCart } from './cart-provider'
import { formatPrice } from '@/lib/utils'

export function CartPage() {
  const { items, subtotal, hydrated, removeItem, updateGuests } = useCart()

  if (!hydrated) return <div className="min-h-64 animate-pulse rounded-3xl bg-muted" />

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm">
        <ShoppingBag className="mx-auto size-10 text-primary" />
        <h2 className="mt-5 font-serif text-3xl text-foreground">Your cart is empty</h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">Explore our packages and add the trip that feels right for you.</p>
        <Link href="/dive-packages" className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">
          Browse packages <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  const currency = items[0]?.currency ?? 'USD'
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        {items.map((item) => (
          <article key={item.packageId} className="flex gap-4 rounded-3xl border border-border bg-card p-4 shadow-sm sm:gap-6 sm:p-5">
            <Link href={`/dive-packages/${item.slug}`} className="relative hidden aspect-[4/3] w-44 shrink-0 overflow-hidden rounded-2xl sm:block">
              <Image src={item.image} alt="" fill sizes="176px" className="object-cover" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link href={`/dive-packages/${item.slug}`} className="font-serif text-2xl text-foreground hover:text-primary">{item.title}</Link>
              <p className="mt-1 text-sm text-muted-foreground">{formatPrice(item.price, item.currency)} per guest</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center rounded-full border border-border" aria-label="Number of guests">
                  <button type="button" onClick={() => updateGuests(item.packageId, item.guests - 1)} className="p-2" aria-label="Remove one guest"><Minus className="size-4" /></button>
                  <span className="min-w-20 text-center text-sm">{item.guests} {item.guests === 1 ? 'guest' : 'guests'}</span>
                  <button type="button" onClick={() => updateGuests(item.packageId, item.guests + 1)} className="p-2" aria-label="Add one guest"><Plus className="size-4" /></button>
                </div>
                <button type="button" onClick={() => removeItem(item.packageId)} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive"><Trash2 className="size-4" /> Remove</button>
              </div>
            </div>
            <p className="hidden font-serif text-xl text-primary sm:block">{formatPrice(item.price * item.guests, item.currency)}</p>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-3xl bg-primary p-6 text-primary-foreground lg:sticky lg:top-28">
        <h2 className="font-serif text-2xl">Order summary</h2>
        <div className="mt-5 flex justify-between border-b border-primary-foreground/20 pb-5 text-sm">
          <span>Package estimate</span><span>{formatPrice(subtotal, currency)}</span>
        </div>
        <div className="mt-5 flex items-end justify-between"><span>Total estimate</span><span className="font-serif text-3xl text-accent">{formatPrice(subtotal, currency)}</span></div>
        <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">Prices are placeholders. Your dates, availability and final price will be confirmed before any payment.</p>
        <Link href="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground">Continue to checkout <ArrowRight className="size-4" /></Link>
        <Link href="/dive-packages" className="mt-3 block text-center text-sm text-primary-foreground/75 hover:text-background">Continue browsing</Link>
      </aside>
    </div>
  )
}
