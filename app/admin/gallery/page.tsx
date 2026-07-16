import Image from 'next/image'
import { requireAdmin } from '@/lib/auth'
import { getGalleryItems } from '@/lib/data'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { Button } from '@/components/ui/button'
import { Upload, PlayCircle } from 'lucide-react'

export default async function AdminGalleryPage() {
  await requireAdmin()
  const items = await getGalleryItems()

  return (
    <div>
      <AdminHeader
        title="Gallery"
        description="Images and videos shown across the website."
        action={
          <Button disabled className="gap-2">
            <Upload className="size-4" aria-hidden /> Upload media
          </Button>
        }
      />
      <div className="mb-4">
        <ContentNotice />
      </div>

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
            </div>
            <figcaption className="p-2.5">
              <p className="truncate text-xs font-medium text-foreground">{item.title}</p>
              <p className="text-xs capitalize text-muted-foreground">{item.category}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
