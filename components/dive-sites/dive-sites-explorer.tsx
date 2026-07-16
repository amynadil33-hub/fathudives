'use client'

import { useMemo, useState } from 'react'
import { DiveSiteCard } from '@/components/site/dive-site-card'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'
import type { DiveSite } from '@/lib/types'

type Group = { label: string; group: 'level' | 'type' }

const FILTERS: (Group | { label: 'All'; group: 'all' })[] = [
  { label: 'All', group: 'all' },
  { label: 'Beginner', group: 'level' },
  { label: 'Intermediate', group: 'level' },
  { label: 'Advanced', group: 'level' },
  { label: 'Reef', group: 'type' },
  { label: 'Channel', group: 'type' },
  { label: 'Thila', group: 'type' },
  { label: 'Wreck', group: 'type' },
  { label: 'Whale Shark Area', group: 'type' },
  { label: 'Manta Area', group: 'type' },
]

export function DiveSitesExplorer({ sites }: { sites: DiveSite[] }) {
  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return sites
    return sites.filter((s) => s.difficulty === active || s.siteType === active)
  }, [active, sites])

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter dive sites"
        className="flex flex-wrap justify-center gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = active === f.label
          return (
            <button
              key={f.label}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.label)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          No dive sites match this filter yet.
        </p>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((site, i) => (
            <Reveal key={site.id} delay={Math.min(i * 0.06, 0.3)}>
              <DiveSiteCard site={site} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  )
}
