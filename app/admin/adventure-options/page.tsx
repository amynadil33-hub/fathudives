import { requireAdmin } from '@/lib/auth'
import { getAdminAdventureOptions } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-ui'
import { CmsManager, type CmsField } from '@/components/admin/cms-manager'
const fields:CmsField[]=[{name:'label',label:'Label',required:true},{name:'description',label:'Description',kind:'textarea'},{name:'recommendation_type',label:'Recommendation type',required:true},{name:'recommendation_slug',label:'Recommendation slug',required:true},{name:'recommendation_label',label:'Recommendation label',required:true},{name:'featured',label:'Featured',kind:'checkbox'},{name:'active',label:'Active',kind:'checkbox'},{name:'sort_order',label:'Sort order',kind:'number'}]
export default async function Page(){await requireAdmin();const items=await getAdminAdventureOptions();return <div><AdminHeader title="Adventure Options" description="Manage trip-finder options and recommendations."/><CmsManager entity="adventure_options" items={items as unknown as (Record<string,unknown>&{id:string})[]} fields={fields} titleKey="label"/></div>}
