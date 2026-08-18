'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { MenuItem, OrderItem } from '@/lib/types'
import { getStoredTableContext, setStoredTableContext, clearStoredTableContext, type TableContextData } from '@/lib/table-utils'


interface CartContextType {
  cart: OrderItem[]
  addToCart: (item: MenuItem, quantity?: number, notes?: string) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, delta: number) => void
  clearCart: () => void
  totalItems: number
  subtotalPrice: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  toastMessage: string | null
  setToastMessage: (msg: string | null) => void
  tableContext: TableContextData | null
  setTableContext: (table: import('@/lib/types').Table) => void
  clearTableContext: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<OrderItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [tableContext, setTableContextState] = useState<TableContextData | null>(null)

  // Load cart and table context from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('coffee_cart')
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
    } catch (err) {
      console.error('Failed to parse cart from localStorage:', err)
    }

    const currentContext = getStoredTableContext()
    if (currentContext) {
      setTableContextState(currentContext)
    }

    const handleTableContextUpdate = () => {
      setTableContextState(getStoredTableContext())
    }

    window.addEventListener('tableContextUpdated', handleTableContextUpdate)
    return () => window.removeEventListener('tableContextUpdated', handleTableContextUpdate)
  }, [])

  // Sync cart with localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('coffee_cart', JSON.stringify(cart))
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err)
    }
  }, [cart])

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  const addToCart = (menuItem: MenuItem, quantity: number = 1, notes: string = '') => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.menuItemId === menuItem.id && (item.notes || '') === notes
      )

      if (existingIndex > -1) {
        const updated = [...prevCart]
        updated[existingIndex].quantity += quantity
        return updated
      } else {
        const newItem: OrderItem = {
          id: `${menuItem.id}-${Date.now()}`,
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
          notes,
          image: menuItem.image
        }
        return [...prevCart, newItem]
      }
    })

    showToast(`Added "${menuItem.name}" to cart!`)
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as OrderItem[]
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const setTableContext = useCallback((table: import('@/lib/types').Table) => {
    const current = getStoredTableContext()
    if (current && current.publicToken === table.publicToken && current.tableNumber === table.tableNumber) {
      return
    }
    setStoredTableContext(table)
    setTableContextState(getStoredTableContext())
  }, [])

  const clearTableContext = useCallback(() => {
    clearStoredTableContext()
    setTableContextState(null)
  }, [])


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalPrice,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        setToastMessage,
        tableContext,
        setTableContext,
        clearTableContext,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

