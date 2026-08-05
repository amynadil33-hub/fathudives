import { requireAdmin } from '@/lib/auth'
import { mediaRegistry, mediaGroups } from '@/lib/media'
import { getMediaOverrides } from '@/lib/data/media-store'
import { AdminHeader } from '@/components/admin/admin-ui'
import { MediaManager, type ResolvedMediaEntry } from '@/components/admin/media-manager'

export const metadata = { title: 'Images' }

export default async function AdminImagesPage() {
  await requireAdmin()
  const overrides = await getMediaOverrides()

  const resolved: ResolvedMediaEntry[] = mediaRegistry.map((entry) => ({
    ...entry,
    src: overrides[entry.key] ?? entry.defaultSrc,
    overridden: Boolean(overrides[entry.key]),
  }))

  const groups = mediaGroups
    .map((group) => ({
      group,
      entries: resolved.filter((e) => e.group === group),
    }))
    .filter((g) => g.entries.length > 0)

  const customCount = resolved.filter((e) => e.overridden).length

  return (
    <div>
      <AdminHeader
        title="Images"
        description="Replace any image used across the public website. Uploads apply instantly."
      />
      <div className="mb-6 rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
        {customCount > 0
          ? `${customCount} image${customCount === 1 ? '' : 's'} currently using a custom upload. Use “Reset” on any card to restore the original.`
          : 'Every image below is using its default. Upload a replacement on any card to swap it site-wide.'}
      </div>
      <MediaManager groups={groups} />
    </div>
  )
}
