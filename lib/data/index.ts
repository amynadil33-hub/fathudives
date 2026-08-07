/** Supabase-backed content access. Local files in this directory are seed/reference data only. */
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import type { AdventureOption, Course, DiveSite, Experience, Faq, GalleryItem, Package, SiteSettings, Testimonial } from '@/lib/types'

type Row = Record<string, unknown>
const strings = (value: unknown) => Array.isArray(value) ? value.map(String) : []
const text = (value: unknown) => value == null ? '' : String(value)
const number = (value: unknown) => Number(value ?? 0)
const bool = (value: unknown) => Boolean(value)

async function client() {
  const supabase = await createClient()
  if (!supabase) throw new Error('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  return supabase
}
function fail(context: string, error: { message: string } | null) {
  if (error) throw new Error(`${context}: ${error.message}`)
}

const mapPackage = (r: Row): Package => ({
  id:text(r.id), slug:text(r.slug), title:text(r.title), shortDescription:text(r.short_description), fullDescription:text(r.full_description),
  featuredImage:text(r.featured_image), gallery:strings(r.gallery), nights:number(r.nights), dives:number(r.dives), experienceLevel:text(r.experience_level) as Package['experienceLevel'],
  audiences:strings(r.audiences) as Package['audiences'], accommodationIncluded:bool(r.accommodation_included), mealsIncluded:bool(r.meals_included), transfersIncluded:bool(r.transfers_included),
  whaleShark:bool(r.whale_shark), manta:bool(r.manta), basePrice:number(r.base_price), currency:text(r.currency), featured:bool(r.featured), highlights:strings(r.highlights),
  inclusions:Array.isArray(r.package_inclusions) ? (r.package_inclusions as Row[]).map(x=>({label:text(x.label),type:text(x.inclusion_type) as 'included'|'excluded'})) : [],
  itinerary:Array.isArray(r.package_itinerary) ? (r.package_itinerary as Row[]).map(x=>({day:number(x.day_number),title:text(x.title),description:text(x.description)})) : [],
  accommodationInfo:text(r.accommodation_info), equipmentInfo:text(r.equipment_info), transferInfo:text(r.transfer_info), importantNotes:strings(r.important_notes), cancellationPolicy:text(r.cancellation_policy),
  active:bool(r.active), sortOrder:number(r.sort_order),
})
const packageSelect = '*,package_inclusions(label,inclusion_type,sort_order),package_itinerary(day_number,title,description)'
export async function getPackages(admin=false) { const s=await client(); let q=s.from('packages').select(packageSelect).order('base_price'); if(!admin) q=q.eq('active',true); const {data,error}=await q; fail('Could not load packages',error); return (data??[]).map(mapPackage) }
export const getAdminPackages = () => getPackages(true)
export async function getFeaturedPackages(){ return (await getPackages()).filter(x=>x.featured) }
export async function getPackageBySlug(slug:string, admin=false){ const s=await client(); let q=s.from('packages').select(packageSelect).eq('slug',slug); if(!admin) q=q.eq('active',true); const {data,error}=await q.maybeSingle(); fail('Could not load package',error); return data ? mapPackage(data as Row) : undefined }
export async function getRelatedPackages(slug:string,limit=3){ return (await getPackages()).filter(x=>x.slug!==slug).slice(0,limit) }

const mapCourse=(r:Row):Course=>({id:text(r.id),slug:text(r.slug),title:text(r.title),category:text(r.category) as Course['category'],description:text(r.description),longDescription:text(r.long_description),duration:text(r.duration),minimumAge:text(r.minimum_age),requiredCertification:text(r.required_certification),numberOfDives:number(r.number_of_dives),price:number(r.price),currency:text(r.currency),featuredImage:text(r.featured_image),highlights:strings(r.highlights),whatYouLearn:strings(r.what_you_learn),featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getCourses(admin=false){const s=await client();let q=s.from('courses').select('*').order('sort_order');if(!admin)q=q.eq('active',true);const {data,error}=await q;fail('Could not load courses',error);return(data??[]).map(mapCourse)}
export const getAdminCourses=()=>getCourses(true)
export async function getCourseBySlug(slug:string,admin=false){const s=await client();let q=s.from('courses').select('*').eq('slug',slug);if(!admin)q=q.eq('active',true);const{data,error}=await q.maybeSingle();fail('Could not load course',error);return data?mapCourse(data as Row):undefined}

const mapSite=(r:Row):DiveSite=>({id:text(r.id),slug:text(r.slug),name:text(r.name),description:text(r.description),longDescription:text(r.long_description),siteType:text(r.site_type) as DiveSite['siteType'],depthMin:number(r.depth_min),depthMax:number(r.depth_max),difficulty:text(r.difficulty) as DiveSite['difficulty'],currentLevel:text(r.current_level) as DiveSite['currentLevel'],marineLife:strings(r.marine_life),journeyTime:text(r.journey_time),featuredImage:text(r.featured_image),gallery:strings(r.gallery),latitude:r.latitude==null?null:number(r.latitude),longitude:r.longitude==null?null:number(r.longitude),featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getDiveSites(admin=false){const s=await client();let q=s.from('dive_sites').select('*').order('sort_order');if(!admin)q=q.eq('active',true);const{data,error}=await q;fail('Could not load dive sites',error);return(data??[]).map(mapSite)}
export const getAdminDiveSites=()=>getDiveSites(true)
export async function getFeaturedDiveSites(){return(await getDiveSites()).filter(x=>x.featured)}
export async function getDiveSiteBySlug(slug:string,admin=false){const s=await client();let q=s.from('dive_sites').select('*').eq('slug',slug);if(!admin)q=q.eq('active',true);const{data,error}=await q.maybeSingle();fail('Could not load dive site',error);return data?mapSite(data as Row):undefined}

const mapGallery=(r:Row):GalleryItem=>({id:text(r.id),title:text(r.title),mediaType:text(r.media_type) as GalleryItem['mediaType'],imageUrl:text(r.image_url),videoUrl:r.video_url?text(r.video_url):undefined,posterUrl:r.poster_url?text(r.poster_url):undefined,category:text(r.category) as GalleryItem['category'],caption:text(r.caption),featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
async function gallery(admin=false){const s=await client();let q=s.from('gallery_items').select('*').order('sort_order');if(!admin)q=q.eq('active',true);const{data,error}=await q;fail('Could not load gallery',error);return(data??[]).map(mapGallery)}
export const getGalleryItems=()=>gallery(false); export const getAdminGalleryItems=()=>gallery(true)
const mapTestimonial=(r:Row):Testimonial=>({id:text(r.id),guestName:text(r.guest_name),country:text(r.country),tripType:text(r.trip_type),review:text(r.review),guestImage:text(r.guest_image),source:text(r.source),sourceUrl:r.source_url?text(r.source_url):undefined,featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getTestimonials(admin=false){const s=await client();let q=s.from('testimonials').select('*').order('sort_order');if(!admin)q=q.eq('active',true);const{data,error}=await q;fail('Could not load testimonials',error);return(data??[]).map(mapTestimonial)}
export const getAdminTestimonials=()=>getTestimonials(true)
async function simple(table:'faqs'|'experiences'|'adventure_options',admin=false){const s=await client();let q=s.from(table).select('*').order('sort_order');if(!admin)q=q.eq('active',true);const{data,error}=await q;fail(`Could not load ${table}`,error);return (data??[]) as Row[]}
const mapFaq=(r:Row):Faq=>({id:text(r.id),question:text(r.question),answer:text(r.answer),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getFaqs(admin=false){return(await simple('faqs',admin)).map(mapFaq)} export const getAdminFaqs=()=>getFaqs(true)
const mapExperience=(r:Row):Experience=>({id:text(r.id),title:text(r.title),description:text(r.description),level:text(r.level),image:text(r.image),href:text(r.href),size:text(r.size) as Experience['size'],featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getExperiences(admin=false){return(await simple('experiences',admin)).map(mapExperience)} export const getAdminExperiences=()=>getExperiences(true)
const mapAdventure=(r:Row):AdventureOption=>({id:text(r.id),label:text(r.label),description:text(r.description),recommendationType:text(r.recommendation_type) as AdventureOption['recommendationType'],recommendationSlug:text(r.recommendation_slug),recommendationLabel:text(r.recommendation_label),featured:bool(r.featured),active:bool(r.active),sortOrder:number(r.sort_order)})
export async function getAdventureOptions(admin=false){return(await simple('adventure_options',admin)).map(mapAdventure)} export const getAdminAdventureOptions=()=>getAdventureOptions(true)
export async function getSiteSettings():Promise<SiteSettings>{const s=await client();const{data,error}=await s.from('site_settings').select('*').eq('id',1).single();fail('Could not load site settings',error);const r=data as Row;return{id:1,contactEmail:text(r.contact_email),whatsapp:text(r.whatsapp),phone:text(r.phone),instagramUrl:text(r.instagram_url),facebookUrl:text(r.facebook_url),youtubeUrl:text(r.youtube_url),tripadvisorUrl:text(r.tripadvisor_url),heroHeadline:text(r.hero_headline),heroSubheadline:text(r.hero_subheadline),announcement:text(r.announcement),seoTitle:text(r.seo_title),seoDescription:text(r.seo_description)}}
