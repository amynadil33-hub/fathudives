import { requireAdmin } from '@/lib/auth'
import { getGalleryItems } from '@/lib/data'
import { galleryCategories } from '@/lib/data/gallery'
import { AdminHeader } from '@/components/admin/admin-ui'
import { GalleryManager } from '@/components/admin/gallery-manager'

export const metadata = { title: 'Gallery' }

export default async function AdminGalleryPage() {
  await requireAdmin()
  const items = await getGalleryItems()

  return (
    <div>
      <AdminHeader
        title="Gallery"
        description="Add, edit, feature and remove the images and videos shown on the public gallery."
      />
      <GalleryManager items={items} categories={galleryCategories} />
    </div>
  )
}
