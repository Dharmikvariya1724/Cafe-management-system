'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { validateTableToken } from '@/lib/table-utils'
import { useCart } from '@/context/CartContext'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { QrCode, AlertTriangle, ArrowRight, UtensilsCrossed } from 'lucide-react'
import type { Table } from '@/lib/types'
import Link from 'next/link'

interface PageProps {
  params: Promise<{
    token: string
  }>
}

export default function TableQrRedirectPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const token = resolvedParams.token
  const router = useRouter()
  const { tableContext, setTableContext } = useCart()

  const [status, setStatus] = useState<'validating' | 'valid' | 'invalid' | 'inactive'>('validating')
  const [validatedTable, setValidatedTable] = useState<Table | null>(null)

  useEffect(() => {
    if (!token) {
      setStatus('invalid')
      return
    }

    const result = validateTableToken(token)

    if (result.isValid && result.table) {
      setValidatedTable(result.table)
      if (tableContext?.publicToken !== result.table.publicToken) {
        setTableContext(result.table)
      }
      setStatus('valid')

      // Smooth redirect to main menu after short delay
      const timer = setTimeout(() => {
        router.push('/menu')
      }, 1200)

      return () => clearTimeout(timer)
    } else if (result.error === 'inactive') {
      setValidatedTable(result.table)
      setStatus('inactive')
    } else {
      setStatus('invalid')
    }
  }, [token, router, setTableContext, tableContext?.publicToken])


  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Navigation />

      <div className="flex-1 flex items-center justify-center p-4 py-16">
        <div className="max-w-md w-full bg-card border border-border rounded-2xl shadow-xl p-8 text-center space-y-6">
          {/* STATE 1: VALIDATING */}
          {status === 'validating' && (
            <div className="space-y-4 py-8">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                Scanning Table QR Code...
              </h1>
              <p className="text-sm text-muted-foreground">
                Validating your table location and setting up your digital menu.
              </p>
            </div>
          )}

          {/* STATE 2: VALID & REDIRECTING */}
          {status === 'valid' && validatedTable && (
            <div className="space-y-4 py-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <UtensilsCrossed className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-extrabold text-xs rounded-full uppercase tracking-wider">
                Table Validated
              </div>
              <h1 className="text-2xl font-heading font-extrabold text-foreground">
                Welcome to {validatedTable.tableNumber}!
              </h1>
              {validatedTable.name && (
                <p className="text-xs text-muted-foreground font-medium">
                  {validatedTable.name}
                </p>
              )}
              <p className="text-sm text-foreground/80 leading-relaxed">
                Your table has been identified. Opening the menu so you can order directly from your phone...
              </p>

              <div className="pt-4">
                <Link
                  href="/menu"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md text-sm"
                >
                  <span>Go to Menu Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* STATE 3: INACTIVE TABLE */}
          {status === 'inactive' && (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                Table Currently Unavailable
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This table ({validatedTable?.tableNumber || 'Table'}) is currently inactive or disabled. Please contact café staff for assistance.
              </p>
              <div className="pt-2 space-y-2">
                <Link
                  href="/menu"
                  className="block w-full bg-secondary text-foreground py-2.5 rounded-xl font-semibold hover:bg-secondary/80 transition-colors text-sm"
                >
                  Browse Menu (Takeaway / Standard)
                </Link>
              </div>
            </div>
          )}

          {/* STATE 4: INVALID QR CODE */}
          {status === 'invalid' && (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h1 className="text-xl font-heading font-bold text-foreground">
                Invalid Table QR Code
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Invalid or unavailable table QR Code. Please scan a valid table QR Code to place an in-cafe order.
              </p>
              <div className="pt-2 space-y-2">
                <Link
                  href="/menu"
                  className="block w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors text-sm"
                >
                  Browse General Menu
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
