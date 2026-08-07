import { requireAdmin } from '@/lib/auth'
import { getSiteSettings } from '@/lib/data'
import { saveSettings } from '@/app/actions/cms'
import { AdminHeader } from '@/components/admin/admin-ui'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const fields=[['contact_email','Contact email','contactEmail'],['phone','Phone','phone'],['whatsapp','WhatsApp','whatsapp'],['instagram_url','Instagram URL','instagramUrl'],['facebook_url','Facebook URL','facebookUrl'],['youtube_url','YouTube URL','youtubeUrl'],['tripadvisor_url','Tripadvisor URL','tripadvisorUrl'],['hero_headline','Hero headline','heroHeadline'],['hero_subheadline','Hero subheadline','heroSubheadline'],['announcement','Announcement','announcement'],['seo_title','SEO title','seoTitle']] as const
export default async function Page(){await requireAdmin();const settings=await getSiteSettings();return <div className="max-w-2xl"><AdminHeader title="Site Settings" description="Contact details, social links, hero and search metadata."/><form action={saveSettings} className="space-y-4 rounded-xl border border-border bg-card p-6">{fields.map(([name,label,key])=><div className="space-y-2" key={name}><Label htmlFor={name}>{label}</Label><Input id={name} name={name} defaultValue={settings[key]}/></div>)}<div className="space-y-2"><Label htmlFor="seo_description">SEO description</Label><Textarea id="seo_description" name="seo_description" defaultValue={settings.seoDescription}/></div><Button type="submit">Save settings</Button></form></div>}
