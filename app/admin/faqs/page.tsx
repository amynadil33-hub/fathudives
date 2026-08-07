import { requireAdmin } from '@/lib/auth'
import { getAdminFaqs } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-ui'
import { CmsManager, type CmsField } from '@/components/admin/cms-manager'
const fields:CmsField[]=[{name:'question',label:'Question',required:true},{name:'answer',label:'Answer',kind:'textarea',required:true},{name:'active',label:'Active',kind:'checkbox'},{name:'sort_order',label:'Sort order',kind:'number'}]
export default async function Page(){await requireAdmin();const items=await getAdminFaqs();return <div><AdminHeader title="FAQs" description="Create and order frequently asked questions."/><CmsManager entity="faqs" items={items as unknown as (Record<string,unknown>&{id:string})[]} fields={fields} titleKey="question"/></div>}
