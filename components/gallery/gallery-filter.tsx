'use client'

import { useMemo, useState } from 'react'
import { GalleryGrid } from '@/components/site/gallery-grid'
import { cn } from '@/lib/utils'
import type { GalleryItem, GalleryCategory, MediaType } from '@/lib/types'

const CATEGORIES: (GalleryCategory | 'All')[] = [
  'All',
  'Underwater',
  'Whale Sharks',
  'Mantas',
  'Dhangethi',
  'Guests',
  'Boat Life',
  'Island Sunsets',
]

const MEDIA: { label: string; value: MediaType | 'all' }[] = [
  { label: 'All media', value: 'all' },
  { label: 'Photos', value: 'image' },
  { label: 'Videos', value: 'video' },
]

export function GalleryFilter({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<GalleryCategory | 'All'>('All')
  const [mediaType, setMediaType] = useState<MediaType | 'all'>('all')

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const catOk = category === 'All' || item.category === category
      const mediaOk = mediaType === 'all' || item.mediaType === mediaType
      return catOk && mediaOk
    })
  }, [items, category, mediaType])

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className="flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCategory(c)}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground',
                )}
              >
                {c}
              </button>
            )
          })}
        </div>

        <div className="flex justify-center gap-2" role="group" aria-label="Filter by media type">
          {MEDIA.map((m) => {
            const active = mediaType === m.value
            return (
              <button
                key={m.value}
                onClick={() => setMediaType(m.value)}
                aria-pressed={active}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  active
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground',
                )}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          Nothing here yet for this filter. More media will be added by the client.
        </p>
      ) : (
        <div className="mt-10">
          <GalleryGrid items={filtered} />
        </div>
      )}
    </div>
  )
}
