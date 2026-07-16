import Image from 'next/image'
import Link from 'next/link'
import { Moon, Waves, BedDouble, Utensils, Plane, ArrowRight } from 'lucide-react'
import type { Package } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg">
      <Link href={`/dive-packages/${pkg.slug}`} className="relative block aspect-[3/2] overflow-hidden">
        <Image
          src={pkg.featuredImage || '/placeholder.svg'}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {pkg.experienceLevel}
        </div>
        {(pkg.whaleShark || pkg.manta) && (
          <div className="absolute right-4 top-4 rounded-full bg-accent/90 px-3 py-1 text-xs font-medium text-accent-foreground backdrop-blur-sm">
            {pkg.whaleShark ? 'Whale shark' : 'Manta'}
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl text-foreground">
          <Link href={`/dive-packages/${pkg.slug}`} className="transition-colors hover:text-primary">
            {pkg.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{pkg.shortDescription}</p>

        <ul className="mt-5 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <Moon className="size-3.5 text-slate-blue" /> {pkg.nights} nights
          </li>
          <li className="flex items-center gap-1.5">
            <Waves className="size-3.5 text-slate-blue" /> {pkg.dives} dives
          </li>
          {pkg.accommodationIncluded && (
            <li className="flex items-center gap-1.5">
              <BedDouble className="size-3.5 text-slate-blue" /> Stay included
            </li>
          )}
          {pkg.mealsIncluded && (
            <li className="flex items-center gap-1.5">
              <Utensils className="size-3.5 text-slate-blue" /> Breakfast
            </li>
          )}
          {pkg.transfersIncluded && (
            <li className="flex items-center gap-1.5">
              <Plane className="size-3.5 text-slate-blue" /> Transfers
            </li>
          )}
        </ul>

        <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
          <div>
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">From (placeholder)</p>
            <p className="font-serif text-2xl text-primary">{formatPrice(pkg.basePrice, pkg.currency)}</p>
          </div>
          <Link
            href={`/dive-packages/${pkg.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Package
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
