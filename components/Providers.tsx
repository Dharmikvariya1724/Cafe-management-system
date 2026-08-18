'use client'

import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { CartDrawer } from '@/components/CartDrawer'
import { ToastContainer } from '@/components/ToastContainer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
      <ToastContainer />
    </CartProvider>
  )
}
