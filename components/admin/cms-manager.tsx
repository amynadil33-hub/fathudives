import { saveContent, deleteContent, savePackageRelations, type CmsEntity } from '@/app/actions/cms'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export type CmsField={name:string;label:string;kind?:'textarea'|'number'|'checkbox'|'file';required?:boolean}
type Item=Record<string, unknown>&{id:string}
export function CmsManager({entity,items,fields,titleKey='title'}:{entity:CmsEntity;items:Item[];fields:CmsField[];titleKey?:string}){
 return <div className="space-y-4">
  <details className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-medium">Create new</summary><Editor entity={entity} fields={fields}/></details>
  {items.length===0?<p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">No content yet. Create the first entry above.</p>:items.map(item=><details key={item.id} className="rounded-xl border border-border bg-card p-5"><summary className="cursor-pointer font-medium">{String(item[titleKey]||'Untitled')} <span className="ml-2 text-xs text-muted-foreground">{item.active===false?'Inactive':'Active'}</span></summary><Editor entity={entity} fields={fields} item={item}/></details>)}
 </div>
}
function Editor({entity,fields,item}:{entity:CmsEntity;fields:CmsField[];item?:Item}){const action=saveContent.bind(null,entity,item?.id);return <div className="mt-5"><form action={action} className="grid gap-4 md:grid-cols-2">{fields.map(f=>{const value=item?.[camel(f.name)]??item?.[f.name];return <div key={f.name} className={f.kind==='textarea'?'space-y-2 md:col-span-2':'space-y-2'}><Label htmlFor={`${item?.id??'new'}-${f.name}`}>{f.label}</Label>{f.kind==='textarea'?<Textarea id={`${item?.id??'new'}-${f.name}`} name={f.name} defaultValue={display(value)} required={f.required}/>:<Input id={`${item?.id??'new'}-${f.name}`} name={f.name} type={f.kind==='checkbox'?'checkbox':f.kind==='number'?'number':f.kind==='file'?'file':'text'} defaultChecked={f.kind==='checkbox'?Boolean(value??(f.name==='active')):undefined} defaultValue={f.kind==='checkbox'||f.kind==='file'?undefined:display(value)} required={f.required} accept={f.kind==='file'?'image/*,video/mp4,video/webm,video/quicktime':undefined}/>}</div>})}<div className="flex gap-2 md:col-span-2"><Button type="submit">{item?'Save changes':'Create'}</Button></div></form>{item&&entity==='packages'?<form action={savePackageRelations.bind(null,item.id)} className="mt-6 grid gap-4 border-t pt-5 md:grid-cols-2"><div><Label>Inclusions (+ included, - excluded)</Label><Textarea name="inclusions" defaultValue={relations(item.inclusions)}/></div><div><Label>Itinerary (title | description)</Label><Textarea name="itinerary" defaultValue={itinerary(item.itinerary)}/></div><Button type="submit">Save inclusions & itinerary</Button></form>:null}{item?<form action={deleteContent.bind(null,entity,item.id)} className="mt-3"><Button type="submit" variant="destructive">Delete</Button></form>:null}</div>}
const camel=(s:string)=>s.replace(/_([a-z])/g,(_,c:string)=>c.toUpperCase())
const display=(v:unknown)=>Array.isArray(v)?v.join('\n'):v==null?'':String(v)
const relations=(v:unknown)=>Array.isArray(v)?v.map((x:Record<string,unknown>)=>`${x.type==='excluded'?'-':'+'} ${x.label}`).join('\n'):''
const itinerary=(v:unknown)=>Array.isArray(v)?v.map((x:Record<string,unknown>)=>`${x.title} | ${x.description}`).join('\n'):''
