import { requireAdmin } from '@/lib/auth'
import { getAdminGalleryItems } from '@/lib/data'
import { AdminHeader } from '@/components/admin/admin-ui'
import { CmsManager, type CmsField } from '@/components/admin/cms-manager'
const fields:CmsField[]=[{name:'title',label:'Title'},{name:'media_type',label:'Media type',required:true},{name:'media_file',label:'Image or video upload',kind:'file'},{name:'image_url',label:'Image URL'},{name:'video_url',label:'Video URL'},{name:'poster_url',label:'Poster URL'},{name:'category',label:'Category'},{name:'caption',label:'Caption',kind:'textarea'},{name:'featured',label:'Featured',kind:'checkbox'},{name:'active',label:'Active',kind:'checkbox'},{name:'sort_order',label:'Sort order',kind:'number'}]
export default async function Page(){await requireAdmin();const items=await getAdminGalleryItems();return <div><AdminHeader title="Gallery" description="Upload and manage public gallery images and videos."/><CmsManager entity="gallery_items" items={items as unknown as (Record<string,unknown>&{id:string})[]} fields={fields} titleKey="title"/></div>}
