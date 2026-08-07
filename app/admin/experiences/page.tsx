import { requireAdmin } from '@/lib/auth'
import { getAdminExperiences } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-ui'
import { CmsManager, type CmsField } from '@/components/admin/cms-manager'
const fields:CmsField[]=[{name:'title',label:'Title',required:true},{name:'description',label:'Description',kind:'textarea'},{name:'level',label:'Level'},{name:'media_file',label:'Image upload',kind:'file'},{name:'image',label:'Image URL'},{name:'href',label:'Link'},{name:'size',label:'Tile size'},{name:'featured',label:'Featured',kind:'checkbox'},{name:'active',label:'Active',kind:'checkbox'},{name:'sort_order',label:'Sort order',kind:'number'}]
export default async function Page(){await requireAdmin();const items=await getAdminExperiences();return <div><AdminHeader title="Experiences" description="Manage signature experiences shown on the home page."/><CmsManager entity="experiences" items={items as unknown as (Record<string,unknown>&{id:string})[]} fields={fields} titleKey="title"/></div>}
