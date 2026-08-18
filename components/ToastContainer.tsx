'use client'

import { useCart } from '@/context/CartContext'
import { CheckCircle } from 'lucide-react'

export function ToastContainer() {
  const { toastMessage } = useCart()

  if (!toastMessage) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-white/20">
        <CheckCircle className="w-5 h-5 text-accent shrink-0" />
        <span className="font-medium text-sm">{toastMessage}</span>
      </div>
    </div>
  )
}
