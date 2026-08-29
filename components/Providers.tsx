'use client'

import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { SettingsProvider } from '@/context/SettingsContext'
import { CartDrawer } from '@/components/CartDrawer'
import { ToastContainer } from '@/components/ToastContainer'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SettingsProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <ToastContainer />
      </CartProvider>
    </SettingsProvider>
  )
}
