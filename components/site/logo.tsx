import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Fathu Dives logo lockup.
 *
 * Pairs the brand dive-mask mark (/public/images/fathu-dives-mark.png, a clean
 * transparent crop of the supplied logo) with a typeset wordmark so it stays
 * crisp and legible at every size, on both the light solid header and the
 * darker transparent-over-hero / footer backgrounds.
 *
 * To swap in the client's final logo later, replace the mark image (or point
 * `src` at a new file) — no other components need to change.
 */
export function Logo({
  className,
  onDark = false,
  priority = false,
}: {
  className?: string
  onDark?: boolean
  priority?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Fathu Dives — Scuba Diving and Excursion Center, Dhangethi, home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <Image
        src="/images/fathu-dives-mark.png"
        alt=""
        aria-hidden="true"
        width={185}
        height={225}
        priority={priority}
        className={cn(
          'h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04] md:h-11',
          onDark && 'brightness-0 invert drop-shadow-[0_1px_5px_rgba(0,0,0,0.35)]',
        )}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif text-xl font-medium tracking-[0.14em] md:text-2xl',
            onDark ? 'text-primary-foreground' : 'text-foreground',
          )}
        >
          Fathu Dives
        </span>
        <span
          className={cn(
            'mt-1 text-[9px] font-medium uppercase tracking-[0.24em] md:text-[10px]',
            onDark ? 'text-primary-foreground/70' : 'text-muted-foreground',
          )}
        >
          Scuba Diving &amp; Excursion Centre
        </span>
      </span>
    </Link>
  )
}
