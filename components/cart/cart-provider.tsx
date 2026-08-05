'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  packageId: string
  slug: string
  title: string
  image: string
  price: number
  currency: string
  guests: number
}

type CartContextValue = {
  items: CartItem[]
  itemCount: number
  subtotal: number
  hydrated: boolean
  addItem: (item: Omit<CartItem, 'guests'>, guests?: number) => void
  removeItem: (packageId: string) => void
  updateGuests: (packageId: string, guests: number) => void
  clearCart: () => void
}

const STORAGE_KEY = 'fathu-dives-cart-v1'
const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) setItems(JSON.parse(stored) as CartItem[])
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<CartItem, 'guests'>, guests = 1) => {
    setItems((current) => {
      const existing = current.find((entry) => entry.packageId === item.packageId)
      if (existing) {
        return current.map((entry) =>
          entry.packageId === item.packageId
            ? { ...entry, guests: Math.min(20, entry.guests + Math.max(1, guests)) }
            : entry,
        )
      }
      return [...current, { ...item, guests: Math.max(1, Math.min(20, guests)) }]
    })
  }, [])

  const removeItem = useCallback((packageId: string) => {
    setItems((current) => current.filter((item) => item.packageId !== packageId))
  }, [])

  const updateGuests = useCallback((packageId: string, guests: number) => {
    setItems((current) =>
      current.map((item) =>
        item.packageId === packageId ? { ...item, guests: Math.max(1, Math.min(20, guests)) } : item,
      ),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const value = useMemo(
    () => ({
      items,
      itemCount: items.length,
      subtotal: items.reduce((total, item) => total + item.price * item.guests, 0),
      hydrated,
      addItem,
      removeItem,
      updateGuests,
      clearCart,
    }),
    [items, hydrated, addItem, removeItem, updateGuests, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
