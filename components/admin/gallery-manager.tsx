'use client'

import Image from 'next/image'
import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Plus, Pencil, Trash2, Star, PlayCircle, Loader2, Upload } from 'lucide-react'
import type { GalleryItem, GalleryCategory, MediaType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EmptyState } from './admin-ui'
import { createGallery, updateGallery, removeGallery, toggleGalleryFeatured } from '@/app/actions/gallery'

export function GalleryManager({
  items,
  categories,
}: {
  items: GalleryItem[]
  categories: GalleryCategory[]
}) {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function openAdd() {
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(item: GalleryItem) {
    setEditing(item)
    setDialogOpen(true)
  }

  function onDelete(item: GalleryItem) {
    if (!confirm(`Delete “${item.title}”? This cannot be undone.`)) return
    setPendingId(item.id)
    startTransition(async () => {
      const res = await removeGallery(item.id)
      setPendingId(null)
      if ('error' in res) toast.error(res.error)
      else {
        toast.success('Item deleted')
        router.refresh()
      }
    })
  }

  function onToggleFeatured(item: GalleryItem) {
    setPendingId(item.id)
    startTransition(async () => {
      const res = await toggleGalleryFeatured(item.id, !item.featured)
      setPendingId(null)
      if ('error' in res) toast.error(res.error)
      else router.refresh()
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {items.length} item{items.length === 1 ? '' : 's'} in the gallery.
        </p>
        <Button className="gap-2" onClick={openAdd}>
          <Plus className="size-4" aria-hidden /> Add media
        </Button>
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={Upload}
          title="No gallery items yet"
          description="Add photos and videos to build the public gallery."
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.imageUrl || '/placeholder.svg'}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover"
                />
                {item.mediaType === 'video' ? (
                  <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-deep/70 text-white">
                    <PlayCircle className="size-4" aria-hidden />
                  </span>
                ) : null}
                {item.featured ? (
                  <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">
                    <Star className="size-3" aria-hidden /> Featured
                  </span>
                ) : null}
                {pendingId === item.id && pending ? (
                  <div className="absolute inset-0 grid place-items-center bg-deep/40">
                    <Loader2 className="size-5 animate-spin text-white" aria-hidden />
                  </div>
                ) : null}
              </div>
              <figcaption className="p-2.5">
                <p className="truncate text-xs font-medium text-foreground">{item.title}</p>
                <p className="text-xs capitalize text-muted-foreground">{item.category}</p>
              </figcaption>

              <div className="flex items-center justify-between gap-1 border-t border-border p-1.5">
                <button
                  type="button"
                  onClick={() => onToggleFeatured(item)}
                  className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-amber-600"
                  aria-label={item.featured ? 'Unfeature' : 'Feature'}
                  title={item.featured ? 'Remove from featured' : 'Mark as featured'}
                >
                  <Star className={item.featured ? 'size-4 fill-amber-500 text-amber-500' : 'size-4'} aria-hidden />
                </button>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-primary"
                    aria-label="Edit"
                  >
                    <Pencil className="size-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item)}
                    className="grid size-8 place-items-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Delete"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </div>
              </div>
            </figure>
          ))}
        </div>
      )}

      <GalleryDialog
        key={editing?.id ?? 'new'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={editing}
        categories={categories}
        onSaved={() => {
          setDialogOpen(false)
          router.refresh()
        }}
      />
    </div>
  )
}

function GalleryDialog({
  open,
  onOpenChange,
  item,
  categories,
  onSaved,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  item: GalleryItem | null
  categories: GalleryCategory[]
  onSaved: () => void
}) {
  const isEdit = Boolean(item)
  const [category, setCategory] = useState<GalleryCategory>(item?.category ?? categories[0])
  const [mediaType, setMediaType] = useState<MediaType>(item?.mediaType ?? 'image')
  const [featured, setFeatured] = useState<boolean>(item?.featured ?? false)
  const [pending, startTransition] = useTransition()
  const imageRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    fd.set('category', category)
    fd.set('mediaType', mediaType)
    fd.set('featured', featured ? 'true' : 'false')

    startTransition(async () => {
      const res = isEdit ? await updateGallery(item!.id, fd) : await createGallery(fd)
      if ('error' in res) {
        toast.error(res.error)
      } else {
        toast.success(isEdit ? 'Item updated' : 'Item added')
        onSaved()
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-deep">
            {isEdit ? 'Edit media' : 'Add media'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the details or replace the file. Leave the file empty to keep the current one.'
              : 'Upload an image (or a video with a poster image) to add to the gallery.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="g-title">Title</Label>
            <Input id="g-title" name="title" defaultValue={item?.title ?? ''} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as GalleryCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Type</Label>
              <Select value={mediaType} onValueChange={(v) => setMediaType(v as MediaType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-caption">Caption</Label>
            <Textarea id="g-caption" name="caption" rows={2} defaultValue={item?.caption ?? ''} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="g-image">
              {mediaType === 'video' ? 'Poster image (thumbnail)' : 'Image'}
              {isEdit ? ' — leave empty to keep current' : ''}
            </Label>
            <input
              ref={imageRef}
              id="g-image"
              type="file"
              name="image"
              accept="image/*"
              className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />
          </div>

          {mediaType === 'video' ? (
            <div className="space-y-1.5">
              <Label htmlFor="g-video">Video file{isEdit ? ' — leave empty to keep current' : ''}</Label>
              <input
                ref={videoRef}
                id="g-video"
                type="file"
                name="video"
                accept="video/*"
                className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
              />
            </div>
          ) : null}

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="size-4 rounded border-border"
            />
            Feature this item
          </label>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={pending}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={pending}>
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
              {isEdit ? 'Save changes' : 'Add to gallery'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
