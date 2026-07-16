import Image from 'next/image'
import Link from 'next/link'
import { Gauge, Clock, ArrowUpRight } from 'lucide-react'
import type { DiveSite } from '@/lib/types'

export function DiveSiteCard({ site }: { site: DiveSite }) {
  return (
    <Link
      href={`/dive-sites/${site.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={site.featuredImage || '/placeholder.svg'}
          alt={site.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-primary-foreground backdrop-blur-sm">
          {site.siteType}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
            {site.name}
          </h3>
          <ArrowUpRight className="size-5 shrink-0 text-slate-blue opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{site.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Gauge className="size-3.5 text-slate-blue" />
            <span>
              {site.depthMin}&ndash;{site.depthMax} m
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5 text-slate-blue" />
            <span>{site.journeyTime}</span>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-secondary px-2.5 py-1 text-[0.65rem] font-medium text-secondary-foreground">
            {site.difficulty}
          </span>
          {site.marineLife.slice(0, 2).map((m) => (
            <span
              key={m}
              className="rounded-full bg-muted px-2.5 py-1 text-[0.65rem] font-medium text-muted-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
