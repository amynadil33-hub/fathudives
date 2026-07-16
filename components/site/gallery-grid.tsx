'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react'
import type { GalleryItem } from '@/lib/types'
import { cn } from '@/lib/utils'

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const close = useCallback(() => setOpenIndex(null), [])
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  )
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [openIndex, close, next, prev])

  const active = openIndex === null ? null : items[openIndex]

  return (
    <>
      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setOpenIndex(i)}
            className="group relative block w-full overflow-hidden rounded-2xl break-inside-avoid focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={`Open ${item.title}`}
          >
            <Image
              src={item.posterUrl || item.imageUrl || '/placeholder.svg'}
              alt={item.caption || item.title}
              width={800}
              height={i % 3 === 0 ? 1000 : 600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {item.mediaType === 'video' && (
              <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-primary">
                <Play className="size-6 translate-x-0.5" />
              </span>
            )}
            <span className="absolute bottom-3 left-3 right-3 translate-y-2 text-left text-sm text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-deep/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return
              const dx = e.changedTouches[0].clientX - touchStartX.current
              if (dx > 60) prev()
              if (dx < -60) next()
              touchStartX.current = null
            }}
          >
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X className="size-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.figure
              key={active.id}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] w-full max-w-4xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-2xl">
                {active.mediaType === 'video' && active.videoUrl ? (
                  <video src={active.videoUrl} poster={active.posterUrl} controls className="h-full w-full object-cover">
                    <track kind="captions" />
                  </video>
                ) : (
                  <Image
                    src={active.imageUrl || active.posterUrl || '/placeholder.svg'}
                    alt={active.caption || active.title}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                )}
                {active.mediaType === 'video' && !active.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center bg-deep/40 text-center text-background">
                    <p className="max-w-xs text-sm">Video placeholder — client footage will be added here.</p>
                  </div>
                )}
              </div>
              <figcaption className={cn('mt-4 text-center text-sm text-background/80')}>
                {active.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
