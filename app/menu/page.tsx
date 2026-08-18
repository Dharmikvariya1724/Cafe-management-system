import type { Metadata } from 'next'
import MenuPageContent from './menu-content'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'Menu | The Coffee Corner',
  description: 'Explore our specialty coffee menu including espresso, cappuccino, latte, pastries, and more.',
  keywords: 'coffee menu, espresso, cappuccino, pastries, beverages',
}

export default function MenuPage() {
  return <MenuPageContent />
}
