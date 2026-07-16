import { requireAdmin } from '@/lib/auth'
import { siteConfig } from '@/lib/site-config'
import { AdminHeader, ContentNotice } from '@/components/admin/admin-ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default async function AdminSettingsPage() {
  await requireAdmin()

  const fields: { label: string; value: string; name: string }[] = [
    { label: 'Contact email', value: siteConfig.email, name: 'email' },
    { label: 'Phone (display)', value: siteConfig.phoneDisplay, name: 'phone' },
    { label: 'WhatsApp number', value: siteConfig.whatsapp, name: 'whatsapp' },
    { label: 'Instagram URL', value: siteConfig.socials.instagram, name: 'instagram' },
    { label: 'Facebook URL', value: siteConfig.socials.facebook, name: 'facebook' },
    { label: 'YouTube URL', value: siteConfig.socials.youtube, name: 'youtube' },
  ]

  return (
    <div className="max-w-2xl">
      <AdminHeader
        title="Site Settings"
        description="Contact details, social links and site-wide content."
      />
      <div className="mb-6">
        <ContentNotice />
      </div>

      <form className="space-y-5 rounded-xl border border-border bg-card p-6">
        {fields.map((f) => (
          <div key={f.name} className="space-y-2">
            <Label htmlFor={f.name}>{f.label}</Label>
            <Input id={f.name} name={f.name} defaultValue={f.value} disabled />
          </div>
        ))}
        <div className="space-y-2">
          <Label htmlFor="announcement">Announcement banner</Label>
          <Input
            id="announcement"
            name="announcement"
            placeholder="Optional site-wide announcement text"
            disabled
          />
        </div>
        <Button type="submit" disabled>
          Save changes
        </Button>
        <p className="text-xs text-muted-foreground">
          Saving is disabled until Supabase is connected. These values currently come from{' '}
          <code className="rounded bg-muted px-1">lib/site-config.ts</code>.
        </p>
      </form>
    </div>
  )
}
