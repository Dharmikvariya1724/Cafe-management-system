'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Utensils, Clock, CalendarDays, ShoppingBag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export function MobileAppDock() {
  const pathname = usePathname()
  const { totalItems, setIsCartOpen } = useCart()

  // Hide dock on Admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  const tabs = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/menu', label: 'Menu', icon: Utensils },
    { href: '/orders', label: 'Orders', icon: Clock },
    { href: '/reservations', label: 'Book Table', icon: CalendarDays },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-2 py-1.5 pb-safe">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = pathname === tab.href

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center w-14 py-1 rounded-xl transition-all active:scale-90 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              <div className={`relative p-1 rounded-full ${isActive ? 'bg-primary/10' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </Link>
          )
        })}

        {/* Cart Tab (Opens Drawer) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center w-14 py-1 rounded-xl text-muted-foreground hover:text-foreground active:scale-90 transition-all focus:outline-none"
        >
          <div className="relative p-1">
            <ShoppingBag className="w-5 h-5 stroke-[1.8px]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border border-white animate-in zoom-in duration-150">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            Cart
          </span>
        </button>
      </div>
    </div>
  )
}
