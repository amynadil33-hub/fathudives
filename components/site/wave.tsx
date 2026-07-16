import { cn } from '@/lib/utils'

// Subtle animated underwater line detail — a thin wave that gently drifts.
export function WaveLine({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      className={cn('h-8 w-full', className)}
    >
      <path
        d="M0 20 C 150 4, 300 36, 450 20 S 750 4, 900 20 S 1200 36, 1200 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-60"
      >
        <animate
          attributeName="d"
          dur="8s"
          repeatCount="indefinite"
          values="
            M0 20 C 150 4, 300 36, 450 20 S 750 4, 900 20 S 1200 36, 1200 20;
            M0 20 C 150 36, 300 4, 450 20 S 750 36, 900 20 S 1200 4, 1200 20;
            M0 20 C 150 4, 300 36, 450 20 S 750 4, 900 20 S 1200 36, 1200 20"
        />
      </path>
    </svg>
  )
}

// Solid wave shape used as a section-bottom transition. `fill` uses currentColor.
export function WaveDivider({
  className,
  flip = false,
}: {
  className?: string
  flip?: boolean
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn('block h-[60px] w-full md:h-[90px]', flip && 'rotate-180', className)}
    >
      <path
        fill="currentColor"
        d="M0,64 C240,120 480,8 720,40 C960,72 1200,120 1440,72 L1440,120 L0,120 Z"
      />
    </svg>
  )
}

// Very subtle contour/topographic texture for section backgrounds.
export function ContourPattern({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="contour" width="240" height="240" patternUnits="userSpaceOnUse">
          <path
            d="M-20 120 Q 60 60 140 120 T 300 120 M-20 180 Q 60 120 140 180 T 300 180 M-20 60 Q 60 0 140 60 T 300 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contour)" />
    </svg>
  )
}
