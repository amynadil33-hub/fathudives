'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'

export type CmsEntity = 'packages'|'courses'|'dive_sites'|'gallery_items'|'testimonials'|'faqs'|'experiences'|'adventure_options'
const publicPaths:Record<CmsEntity,string[]>={packages:['/','/dive-packages'],courses:['/','/dive-courses'],dive_sites:['/','/dive-sites'],gallery_items:['/','/gallery'],testimonials:['/'],faqs:['/'],experiences:['/'],adventure_options:['/']}
const adminPaths:Record<CmsEntity,string>={packages:'/admin/packages',courses:'/admin/courses',dive_sites:'/admin/dive-sites',gallery_items:'/admin/gallery',testimonials:'/admin/testimonials',faqs:'/admin/faqs',experiences:'/admin/experiences',adventure_options:'/admin/adventure-options'}
const fields:Record<CmsEntity,string[]>={
 packages:['title','slug','short_description','full_description','featured_image','gallery','nights','dives','experience_level','audiences','accommodation_included','meals_included','transfers_included','whale_shark','manta','base_price','currency','featured','active','sort_order','highlights','accommodation_info','equipment_info','transfer_info','important_notes','cancellation_policy'],
 courses:['title','slug','category','description','long_description','duration','minimum_age','required_certification','number_of_dives','price','currency','featured_image','highlights','what_you_learn','featured','active','sort_order'],
 dive_sites:['name','slug','description','long_description','site_type','depth_min','depth_max','difficulty','current_level','marine_life','journey_time','featured_image','gallery','latitude','longitude','featured','active','sort_order'],
 gallery_items:['title','media_type','image_url','video_url','poster_url','category','caption','featured','active','sort_order'],
 testimonials:['guest_name','country','trip_type','review','guest_image','source','source_url','featured','active','sort_order'],
 faqs:['question','answer','active','sort_order'],experiences:['title','description','level','image','href','size','featured','active','sort_order'],
 adventure_options:['label','description','recommendation_type','recommendation_slug','recommendation_label','featured','active','sort_order']}
const arrays=new Set(['gallery','audiences','highlights','important_notes','what_you_learn','marine_life'])
const booleans=new Set(['accommodation_included','meals_included','transfers_included','whale_shark','manta','featured','active'])
const numbers=new Set(['nights','dives','base_price','sort_order','number_of_dives','price','depth_min','depth_max','latitude','longitude'])
const uploadField:Partial<Record<CmsEntity,string>>={packages:'featured_image',courses:'featured_image',dive_sites:'featured_image',gallery_items:'image_url',testimonials:'guest_image',experiences:'image'}
const folders:Partial<Record<CmsEntity,string>>={packages:'packages',courses:'courses',dive_sites:'dive-sites',gallery_items:'gallery',testimonials:'testimonials',experiences:'experiences'}
function revalidate(entity:CmsEntity){for(const p of publicPaths[entity])revalidatePath(p);revalidatePath(adminPaths[entity]);revalidatePath('/admin')}
export async function saveContent(entity:CmsEntity,id:string|undefined,form:FormData){
 await requireAdmin(); const supabase=await createClient(); if(!supabase) throw new Error('Supabase is not configured.')
 const values:Record<string,unknown>={}
 for(const key of fields[entity]){if(booleans.has(key)){values[key]=form.get(key)==='on';continue}const raw=String(form.get(key)??'').trim();values[key]=arrays.has(key)?raw.split(/\n|,/).map(x=>x.trim()).filter(Boolean):numbers.has(key)?(raw===''?(key==='latitude'||key==='longitude'?null:0):Number(raw)):(raw||null)}
 const file=form.get('media_file'); if(file instanceof File&&file.size){if(file.size>15*1024*1024)throw new Error('Media files must be 15 MB or smaller.');const allowed=['image/jpeg','image/png','image/webp','image/gif','video/mp4','video/webm','video/quicktime'];if(!allowed.includes(file.type))throw new Error('Unsupported media file type.');const ext=file.name.split('.').pop()?.replace(/[^a-z0-9]/gi,'').toLowerCase()||'bin';const path=`${folders[entity]}/${crypto.randomUUID()}.${ext}`;const{error}=await supabase.storage.from('media').upload(path,file,{contentType:file.type,upsert:false});if(error)throw new Error(`Upload failed: ${error.message}`);const{data}=supabase.storage.from('media').getPublicUrl(path);values[entity==='gallery_items'&&file.type.startsWith('video/')?'video_url':uploadField[entity]!]=data.publicUrl}
 let result;if(id)result=await supabase.from(entity).update(values).eq('id',id);else result=await supabase.from(entity).insert(values);if(result.error)throw new Error(`Could not save content: ${result.error.message}`)
 revalidate(entity);redirect(adminPaths[entity])
}
export async function deleteContent(entity:CmsEntity,id:string){await requireAdmin();const supabase=await createClient();if(!supabase)throw new Error('Supabase is not configured.');const{error}=await supabase.from(entity).delete().eq('id',id);if(error)throw new Error(`Could not delete content: ${error.message}`);revalidate(entity)}

export async function savePackageRelations(id:string,form:FormData){await requireAdmin();const supabase=await createClient();if(!supabase)throw new Error('Supabase is not configured.');const inclusions=String(form.get('inclusions')??'').split('\n').filter(Boolean).map((line,i)=>{const excluded=line.trim().startsWith('-');return{package_id:id,label:line.replace(/^[-+]\s*/,''),inclusion_type:excluded?'excluded':'included',sort_order:i}});const itinerary=String(form.get('itinerary')??'').split('\n').filter(Boolean).map((line,i)=>{const [title,...description]=line.split('|');return{package_id:id,day_number:i+1,title:title.trim(),description:description.join('|').trim()}});let e=(await supabase.from('package_inclusions').delete().eq('package_id',id)).error;if(!e)e=(await supabase.from('package_itinerary').delete().eq('package_id',id)).error;if(!e&&inclusions.length)e=(await supabase.from('package_inclusions').insert(inclusions)).error;if(!e&&itinerary.length)e=(await supabase.from('package_itinerary').insert(itinerary)).error;if(e)throw new Error(`Could not save package details: ${e.message}`);revalidate('packages')}

export async function saveSettings(form:FormData){await requireAdmin();const supabase=await createClient();if(!supabase)throw new Error('Supabase is not configured.');const keys=['contact_email','whatsapp','phone','instagram_url','facebook_url','youtube_url','tripadvisor_url','hero_headline','hero_subheadline','announcement','seo_title','seo_description'];const values=Object.fromEntries(keys.map(k=>[k,String(form.get(k)??'').trim()||null]));const{error}=await supabase.from('site_settings').update(values).eq('id',1);if(error)throw new Error(`Could not save settings: ${error.message}`);revalidatePath('/', 'layout');revalidatePath('/admin/settings')}
