import type { Metadata } from 'next'
import { CheckoutPage } from '@/components/cart/checkout-page'
import { Container, Section } from '@/components/site/editorial'

export const metadata: Metadata = { title: 'Checkout', robots: { index: false, follow: false } }

export default function CheckoutRoute() {
  return <Section className="min-h-[70vh] pt-28 sm:pt-36"><Container><p className="tracking-label text-xs text-slate-blue">Complete your request</p><h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Checkout</h1><div className="mt-10"><CheckoutPage /></div></Container></Section>
}
