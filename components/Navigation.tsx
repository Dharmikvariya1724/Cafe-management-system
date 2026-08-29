'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { BUSINESS_NAME, BUSINESS_TAGLINE } from '@/lib/constants'
import { Menu, X, ShoppingBag, Clock } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useSettings } from '@/context/SettingsContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/orders', label: 'My Orders' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reservations', label: 'Reservations' },
  { href: '/contact', label: 'Outlets & Contact' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()
  const { settings } = useSettings()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-border shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-lg overflow-hidden shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={settings.logo || settings.favicon || "/images/logo.png"}
                alt="Coffee King Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-primary text-xl tracking-tight leading-none">
                {settings.siteName || BUSINESS_NAME}
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                {settings.siteTagline || BUSINESS_TAGLINE}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors text-sm flex items-center gap-1.5 py-1 ${
                    isActive
                      ? 'text-primary font-extrabold border-b-2 border-primary'
                      : 'text-foreground hover:text-primary font-medium'
                  }`}
                >
                  {link.href === '/orders' && <Clock className="w-3.5 h-3.5 text-primary" />}
                  {link.label}
                </Link>
              )
            })}

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary text-primary-foreground p-2.5 rounded-full hover:bg-primary/90 transition-transform active:scale-95 shadow-sm flex items-center justify-center ml-2"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in-50">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-transform active:scale-95 shadow-sm flex items-center justify-center"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-border">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-foreground hover:bg-secondary font-medium'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
