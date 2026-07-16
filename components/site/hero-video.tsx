'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Responsive hero background.
 * - Shows the poster image immediately (and as the mobile / reduced-motion fallback).
 * - Only loads + autoplays the video when a `src` is provided AND motion is allowed.
 * The client can enable video simply by setting `media.hero.videoSrc` in lib/media.ts.
 */
export function HeroVideo({
  poster,
  posterMobile,
  src,
}: {
  poster: string
  posterMobile?: string
  src?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    if (!src) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smallScreen = window.matchMedia('(max-width: 640px)').matches
    if (reduce || smallScreen) return
    setCanPlay(true)
  }, [src])

  useEffect(() => {
    if (canPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        /* autoplay blocked — poster remains visible */
      })
    }
  }, [canPlay])

  return (
    <div className="absolute inset-0">
      {/* Poster / fallback image (always rendered underneath) */}
      <Image
        src={poster || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover sm:hidden"
        // mobile poster
        style={posterMobile ? undefined : undefined}
      />
      <Image
        src={poster || '/placeholder.svg'}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover sm:block"
      />

      {src && canPlay && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
