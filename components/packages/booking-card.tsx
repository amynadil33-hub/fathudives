'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CalendarDays, Users, Waves, ChevronRight } from 'lucide-react'
import { CtaLink } from '@/components/site/cta-button'
import { formatPrice } from '@/lib/utils'
import { siteConfig, whatsappHref } from '@/lib/site-config'
import type { Package } from '@/lib/types'

const DIVER_LEVELS = [
  'Not yet certified',
  'Certified beginner',
  'Advanced diver',
  'Snorkeller / non-diver',
]

export function BookingCard({ pkg }: { pkg: Package }) {
  const [arrival, setArrival] = useState('')
  const [departure, setDeparture] = useState('')
  const [guests, setGuests] = useState(2)
  const [divers, setDivers] = useState(2)
  const [level, setLevel] = useState(DIVER_LEVELS[1])
  const [accommodation, setAccommodation] = useState(true)

  // Build a prefilled enquiry link that carries the selection to the contact page.
  const params = new URLSearchParams({
    package: pkg.slug,
    arrival,
    departure,
    adults: String(guests),
    divers: String(divers),
    level,
    accommodation: accommodation ? 'yes' : 'no',
  })

  const fieldClass =
    'mt-1 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-end justify-between border-b border-border pb-5">
        <div>
          <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            From (placeholder)
          </p>
          <p className="font-serif text-3xl text-primary">
            {formatPrice(pkg.basePrice, pkg.currency)}
          </p>
        </div>
        <p className="text-right text-xs text-muted-foreground">
          {pkg.nights} nights · {pkg.dives} dives
        </p>
      </div>

      <div className="mt-5 grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-slate-blue" /> Arrival
            </span>
            <input
              type="date"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block text-xs font-medium text-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-slate-blue" /> Departure
            </span>
            <input
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className={fieldClass}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-foreground">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5 text-slate-blue" /> Guests
            </span>
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={fieldClass}
            />
          </label>
          <label className="block text-xs font-medium text-foreground">
            <span className="flex items-center gap-1.5">
              <Waves className="size-3.5 text-slate-blue" /> Divers
            </span>
            <input
              type="number"
              min={0}
              max={20}
              value={divers}
              onChange={(e) => setDivers(Number(e.target.value))}
              className={fieldClass}
            />
          </label>
        </div>

        <label className="block text-xs font-medium text-foreground">
          Diver level
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={fieldClass}
          >
            {DIVER_LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={accommodation}
            onChange={(e) => setAccommodation(e.target.checked)}
            className="size-4 rounded border-border text-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
          Accommodation needed
        </label>
      </div>

      <CtaLink
        href={`/contact?${params.toString()}`}
        variant="coral"
        size="lg"
        className="mt-6 w-full"
      >
        Submit Enquiry
        <ChevronRight className="size-4" />
      </CtaLink>

      <Link
        href={whatsappHref(`Hello Fathu Dives! I'm interested in the ${pkg.title} package.`)}
        className="mt-3 flex w-full items-center justify-center rounded-full border border-primary/30 px-6 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
      >
        Chat on WhatsApp
      </Link>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        No payment is taken now. We usually reply within {siteConfig.responseTime}. A deposit link can be added
        once your dates are confirmed.
      </p>
    </div>
  )
}
