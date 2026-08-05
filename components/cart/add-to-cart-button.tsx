'use client'

import { useState } from 'react'
import { Check, ShoppingBag } from 'lucide-react'
import type { Package } from '@/lib/types'
import { useCart } from './cart-provider'
import { cn } from '@/lib/utils'

export function AddToCartButton({ pkg, guests = 1, className }: { pkg: Package; guests?: number; className?: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const add = () => {
    addItem(
      {
        packageId: pkg.id,
        slug: pkg.slug,
        title: pkg.title,
        image: pkg.featuredImage,
        price: pkg.basePrice,
        currency: pkg.currency,
      },
      guests,
    )
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={add}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90',
        className,
      )}
    >
      {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
      {added ? 'Added to cart' : 'Add to cart'}
    </button>
  )
}
