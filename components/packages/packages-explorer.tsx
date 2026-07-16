'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { SlidersHorizontal, X } from 'lucide-react'
import type { Package } from '@/lib/types'
import { PackageCard } from '@/components/site/package-card'
import { cn } from '@/lib/utils'

type Filters = {
  level: string
  minNights: number
  minDives: number
  accommodation: boolean
  solo: boolean
  couple: boolean
  group: boolean
  whaleShark: boolean
  manta: boolean
}

const defaultFilters: Filters = {
  level: 'All',
  minNights: 0,
  minDives: 0,
  accommodation: false,
  solo: false,
  couple: false,
  group: false,
  whaleShark: false,
  manta: false,
}

const levels = ['All', 'Beginner', 'Certified Diver', 'All Levels']

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-sm transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-background text-deep/70 hover:border-primary/50',
      )}
    >
      {children}
    </button>
  )
}

export function PackagesExplorer({ packages }: { packages: Package[] }) {
  const [filters, setFilters] = useState<Filters>(defaultFilters)

  const filtered = useMemo(() => {
    return packages.filter((p) => {
      if (filters.level !== 'All' && p.experienceLevel !== filters.level) return false
      if (p.nights < filters.minNights) return false
      if (p.dives < filters.minDives) return false
      if (filters.accommodation && !p.accommodationIncluded) return false
      if (filters.solo && !p.audiences.includes('Solo Traveller')) return false
      if (filters.couple && !p.audiences.includes('Couple')) return false
      if (filters.group && !p.audiences.includes('Group')) return false
      if (filters.whaleShark && !p.whaleShark) return false
      if (filters.manta && !p.manta) return false
      return true
    })
  }, [packages, filters])

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }))

  const activeCount =
    (filters.level !== 'All' ? 1 : 0) +
    (filters.minNights > 0 ? 1 : 0) +
    (filters.minDives > 0 ? 1 : 0) +
    [filters.accommodation, filters.solo, filters.couple, filters.group, filters.whaleShark, filters.manta].filter(
      Boolean,
    ).length

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      {/* Filters */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-serif text-2xl text-deep">
            <SlidersHorizontal className="size-5 text-primary" />
            Filter
          </h2>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <X className="size-3" /> Clear ({activeCount})
            </button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-6">
          <div>
            <p className="mb-2 text-sm font-medium text-deep">Experience level</p>
            <div className="flex flex-wrap gap-2">
              {levels.map((l) => (
                <Toggle key={l} active={filters.level === l} onClick={() => set('level', l)}>
                  {l}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-deep">Minimum nights</p>
            <div className="flex flex-wrap gap-2">
              {[0, 4, 7, 10].map((n) => (
                <Toggle key={n} active={filters.minNights === n} onClick={() => set('minNights', n)}>
                  {n === 0 ? 'Any' : `${n}+`}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-deep">Minimum dives</p>
            <div className="flex flex-wrap gap-2">
              {[0, 6, 10, 16].map((n) => (
                <Toggle key={n} active={filters.minDives === n} onClick={() => set('minDives', n)}>
                  {n === 0 ? 'Any' : `${n}+`}
                </Toggle>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-deep">Suited for</p>
            <div className="flex flex-col gap-2.5">
              {(
                [
                  ['accommodation', 'Accommodation included'],
                  ['solo', 'Solo travellers'],
                  ['couple', 'Couples'],
                  ['group', 'Groups'],
                  ['whaleShark', 'Whale shark experience'],
                  ['manta', 'Manta experience'],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2.5 text-sm text-deep/80">
                  <input
                    type="checkbox"
                    checked={filters[key]}
                    onChange={(e) => set(key, e.target.checked)}
                    className="size-4 rounded border-input accent-primary"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Grid */}
      <div>
        <p className="mb-6 text-sm text-deep/60">
          Showing <span className="font-medium text-deep">{filtered.length}</span> of {packages.length} packages
          <span className="ml-2 rounded-full bg-sand px-2 py-0.5 text-xs text-deep/70">Prices are placeholders</span>
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-seafoam/50 p-12 text-center">
            <p className="font-serif text-2xl text-deep">No packages match those filters</p>
            <p className="mt-2 text-deep/70">Try clearing a filter or two to see more of our island journeys.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4 }}
                >
                  <PackageCard pkg={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
