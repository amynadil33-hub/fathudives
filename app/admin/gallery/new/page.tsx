import Link from 'next/link'
import { requireAdmin } from '@/lib/auth'
import { createGalleryItem } from '../action'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'

const categories = [
  'Underwater',
  'Whale Sharks',
  'Mantas',
  'Dhangethi',
  'Guests',
  'Boat Life',
  'Island Sunsets',
]

export default async function NewGalleryItemPage() {
  await requireAdmin()

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/admin/gallery"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-4')}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to gallery
        </Link>

        <h1 className="text-2xl font-semibold">
          Add gallery media
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add an image or video to the website gallery.
        </p>
      </div>

      <form
        action={createGalleryItem}
        className="space-y-5 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="text-sm font-medium"
          >
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Manta encounter"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="mediaType"
            className="text-sm font-medium"
          >
            Media type
          </label>

          <select
            id="mediaType"
            name="mediaType"
            defaultValue="image"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="imageUrl"
            className="text-sm font-medium"
          >
            Image URL
          </label>

          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="/images/gallery/manta-front.webp"
          />

          <p className="text-xs text-muted-foreground">
            You can currently use an existing image path or a public image URL.
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="videoUrl"
            className="text-sm font-medium"
          >
            Video URL
          </label>

          <input
            id="videoUrl"
            name="videoUrl"
            type="text"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Optional video URL"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="text-sm font-medium"
          >
            Category
          </label>

          <select
            id="category"
            name="category"
            defaultValue="Underwater"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="caption"
            className="text-sm font-medium"
          >
            Caption
          </label>

          <textarea
            id="caption"
            name="caption"
            rows={4}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Describe this photo or video..."
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sortOrder"
            className="text-sm font-medium"
          >
            Sort order
          </label>

          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={0}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              name="featured"
              type="checkbox"
              className="size-4"
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              name="active"
              type="checkbox"
              defaultChecked
              className="size-4"
            />
            Active
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">
            Add media
          </Button>

          <Link
            href="/admin/gallery"
            className={buttonVariants({ variant: 'outline' })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
