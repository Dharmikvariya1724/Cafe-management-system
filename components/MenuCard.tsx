'use client'

import type { MenuItem } from '@/lib/types'
import { Star, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

interface MenuCardProps {
  item: MenuItem
}

export function MenuCard({ item }: MenuCardProps) {
  const { addToCart } = useCart()

  return (
    <div className="bg-card rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
      {/* Image */}
      <div className="relative w-full h-48 bg-secondary overflow-hidden">
        {item.image && item.image !== '/images/placeholder.png' ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
            <span className="text-4xl">☕</span>
          </div>
        )}
        {item.popular && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Popular
          </div>
        )}
        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">Currently Unavailable</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <h3 className="font-heading font-semibold text-lg text-foreground">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">
            {item.category}
          </p>
        </div>

        <p className="text-sm text-foreground/80 mb-4 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="font-heading font-bold text-lg text-primary">
            ₹{item.price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(item)}
            disabled={!item.available}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            {item.available ? 'Order' : 'N/A'}
          </button>
        </div>
      </div>
    </div>
  )
}

