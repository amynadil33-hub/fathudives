import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { EditorialLabel } from './editorial'
import { cn } from '@/lib/utils'

type Crumb = { label: string; href?: string }

// Reusable cinematic hero for interior pages.
export function PageHero({
  image,
  label,
  title,
  intro,
  crumbs,
  align = 'center',
  className,
}: {
  image: string
  label?: string
  title: string
  intro?: string
  crumbs?: Crumb[]
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <section className={cn('relative flex min-h-[62vh] items-end overflow-hidden', className)}>
      <Image
        src={image || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/40 to-deep/20" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
          {crumbs && crumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                'mb-5 flex flex-wrap items-center gap-1 text-xs text-background/70',
                align === 'center' && 'justify-center',
              )}
            >
              {crumbs.map((c, i) => (
                <span key={c.label} className="inline-flex items-center gap-1">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-background">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-background/90">{c.label}</span>
                  )}
                  {i < crumbs.length - 1 && <ChevronRight className="size-3" aria-hidden />}
                </span>
              ))}
            </nav>
          )}

          {label && (
            <EditorialLabel onDark className={cn(align === 'center' && 'justify-center')}>
              {label}
            </EditorialLabel>
          )}
          <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-background sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p
              className={cn(
                'mt-5 text-lg leading-relaxed text-background/85',
                align === 'center' && 'mx-auto max-w-xl',
              )}
            >
              {intro}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
