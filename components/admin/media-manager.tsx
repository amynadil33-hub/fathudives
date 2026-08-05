'use client'

import Image from 'next/image'
import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Upload, RotateCcw, Loader2, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { replaceMediaImage, resetMediaImage } from '@/app/actions/media'
import type { MediaEntry, MediaGroup } from '@/lib/media'

export type ResolvedMediaEntry = MediaEntry & { src: string; overridden: boolean }

export function MediaManager({
  groups,
}: {
  groups: { group: MediaGroup; entries: ResolvedMediaEntry[] }[]
}) {
  return (
    <div className="space-y-10">
      {groups.map(({ group, entries }) => (
        <section key={group} aria-labelledby={`group-${group}`}>
          <h2
            id={`group-${group}`}
            className="mb-4 font-serif text-xl text-deep"
          >
            {group}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <MediaCard key={entry.key} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

function MediaCard({ entry }: { entry: ResolvedMediaEntry }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pending, startTransition] = useTransition()
  const [action, setAction] = useState<'upload' | 'reset' | null>(null)
  const router = useRouter()

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.set('file', file)
    setAction('upload')
    startTransition(async () => {
      const res = await replaceMediaImage(entry.key, formData)
      setAction(null)
      if ('error' in res) {
        toast.error(res.error)
      } else {
        toast.success(`${entry.label} updated`)
        router.refresh()
      }
      if (inputRef.current) inputRef.current.value = ''
    })
  }

  function onReset() {
    setAction('reset')
    startTransition(async () => {
      const res = await resetMediaImage(entry.key)
      setAction(null)
      if ('error' in res) {
        toast.error(res.error)
      } else {
        toast.success(`${entry.label} reset to default`)
        router.refresh()
      }
    })
  }

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-[4/3] bg-muted">
        {entry.src ? (
          <Image
            src={entry.src || '/placeholder.svg'}
            alt={entry.label}
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <ImageIcon className="size-8" aria-hidden />
          </div>
        )}
        {entry.overridden ? (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white">
            Custom
          </span>
        ) : null}
        {pending ? (
          <div className="absolute inset-0 grid place-items-center bg-deep/40">
            <Loader2 className="size-6 animate-spin text-white" aria-hidden />
          </div>
        ) : null}
      </div>

      <figcaption className="p-4">
        <p className="font-medium text-foreground">{entry.label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{entry.usedOn}</p>

        <div className="mt-3 flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onFile}
            aria-label={`Upload a new image for ${entry.label}`}
          />
          <Button
            size="sm"
            className="gap-2"
            disabled={pending}
            onClick={() => inputRef.current?.click()}
          >
            {pending && action === 'upload' ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Upload className="size-4" aria-hidden />
            )}
            Replace
          </Button>
          {entry.overridden ? (
            <Button
              size="sm"
              variant="ghost"
              className="gap-2"
              disabled={pending}
              onClick={onReset}
            >
              {pending && action === 'reset' ? (
                <Loader2 className="size-4 animate-spin" aria-hidden />
              ) : (
                <RotateCcw className="size-4" aria-hidden />
              )}
              Reset
            </Button>
          ) : null}
        </div>
      </figcaption>
    </figure>
  )
}
