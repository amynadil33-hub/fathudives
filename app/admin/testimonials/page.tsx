import { requireAdmin } from '@/lib/auth'
import { getAdminTestimonials } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-ui'
import { CmsManager, type CmsField } from '@/components/admin/cms-manager'
const fields:CmsField[]=[{name:'guest_name',label:'Guest name',required:true},{name:'country',label:'Country'},{name:'trip_type',label:'Trip type'},{name:'review',label:'Review',kind:'textarea',required:true},{name:'media_file',label:'Guest image upload',kind:'file'},{name:'guest_image',label:'Guest image URL'},{name:'source',label:'Source'},{name:'source_url',label:'Source URL'},{name:'featured',label:'Featured',kind:'checkbox'},{name:'active',label:'Active',kind:'checkbox'},{name:'sort_order',label:'Sort order',kind:'number'}]
export default async function Page(){await requireAdmin();const items=await getAdminTestimonials();return <div><AdminHeader title="Testimonials" description="Create and publish verified guest reviews."/><CmsManager entity="testimonials" items={items as unknown as (Record<string,unknown>&{id:string})[]} fields={fields} titleKey="guestName"/></div>}
