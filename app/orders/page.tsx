'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import type { Order, OrderStatus } from '@/lib/types'
import { initialOrders } from '@/lib/data'
import { Search, Clock, CheckCircle2, PackageCheck, CookingPot, ShoppingBag, XCircle, AlertCircle, RefreshCw } from 'lucide-react'
import Image from 'next/image'

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadOrders = () => {
    setIsRefreshing(true)
    try {
      const stored = localStorage.getItem('coffee_orders')
      if (stored) {
        setOrders(JSON.parse(stored))
      } else {
        setOrders(initialOrders)
        localStorage.setItem('coffee_orders', JSON.stringify(initialOrders))
      }
    } catch (err) {
      console.error('Failed to load orders:', err)
      setOrders(initialOrders)
    }
    setTimeout(() => setIsRefreshing(false), 500)
  }

  useEffect(() => {
    loadOrders()
    const handleUpdate = () => loadOrders()
    window.addEventListener('ordersUpdated', handleUpdate)
    return () => window.removeEventListener('ordersUpdated', handleUpdate)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const query = searchQuery.toLowerCase().trim()
    if (!query) return true
    return (
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerPhone.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query)
    )
  })

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Pending Approval
          </span>
        )
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Accepted by Admin
          </span>
        )
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            <CookingPot className="w-3.5 h-3.5" />
            Preparing Food & Coffee
          </span>
        )
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <PackageCheck className="w-3.5 h-3.5" />
            Ready for Pickup / Delivery
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        )
    }
  }

  const getStatusStep = (status: OrderStatus) => {
    const steps: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'ready', 'completed']
    return steps.indexOf(status)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-1">
                Track Your Orders
              </h1>
              <p className="text-foreground/70 text-sm sm:text-base">
                Check real-time updates and status of your coffee orders
              </p>
            </div>
            <button
              onClick={loadOrders}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors self-start md:self-auto shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Status
            </button>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID (e.g. #CC-1001), Name, or Phone..."
              className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>

          {/* Orders List */}
          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => {
                const currentStepIdx = getStatusStep(order.status)

                return (
                  <div
                    key={order.id}
                    className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    {/* Order Top Bar */}
                    <div className="p-5 border-b border-border bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-heading font-bold text-lg text-primary">
                            {order.orderNumber}
                          </span>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary font-medium text-foreground capitalize border border-border">
                            {order.orderType} {order.tableNumber ? `(${order.tableNumber})` : ''}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div>{getStatusBadge(order.status)}</div>
                    </div>

                    {/* Order Tracker Timeline */}
                    {order.status !== 'cancelled' && (
                      <div className="p-5 bg-secondary/10 border-b border-border">
                        <div className="flex items-center justify-between max-w-xl mx-auto relative">
                          {['Placed', 'Accepted', 'Preparing', 'Ready', 'Done'].map((stepLabel, idx) => {
                            const isDone = currentStepIdx >= idx
                            const isCurrent = currentStepIdx === idx

                            return (
                              <div key={stepLabel} className="flex flex-col items-center relative z-10">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    isDone
                                      ? 'bg-primary text-primary-foreground shadow-md'
                                      : 'bg-secondary text-muted-foreground border border-border'
                                  } ${isCurrent ? 'ring-4 ring-primary/20 scale-110' : ''}`}
                                >
                                  {idx + 1}
                                </div>
                                <span
                                  className={`text-[11px] font-medium mt-1.5 ${
                                    isDone ? 'text-foreground font-semibold' : 'text-muted-foreground'
                                  }`}
                                >
                                  {stepLabel}
                                </span>
                              </div>
                            )
                          })}

                          {/* Connecting Line */}
                          <div className="absolute top-4 left-4 right-4 h-0.5 bg-border -z-0">
                            <div
                              className="h-full bg-primary transition-all duration-500"
                              style={{
                                width: `${Math.min(100, Math.max(0, (currentStepIdx / 4) * 100))}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Order Details & Items */}
                    <div className="p-5 space-y-4">
                      {/* Customer Summary */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-muted-foreground bg-secondary/30 p-3 rounded-xl">
                        <div>
                          <span className="font-semibold text-foreground">Customer:</span> {order.customerName}
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">Phone:</span> {order.customerPhone}
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">Payment:</span>{' '}
                          <span className="uppercase font-semibold">{order.paymentMethod}</span>
                        </div>
                        {order.address && (
                          <div className="sm:col-span-3">
                            <span className="font-semibold text-foreground">Address:</span> {order.address}
                          </div>
                        )}
                        {order.specialInstructions && (
                          <div className="sm:col-span-3 text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 mt-1">
                            <span className="font-semibold">Note:</span> {order.specialInstructions}
                          </div>
                        )}
                      </div>

                      {/* Items List */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
                          Ordered Items
                        </h4>
                        <div className="divide-y divide-border">
                          {order.items.map((item) => (
                            <div key={item.id} className="py-2 flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                {item.image && (
                                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-secondary">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                  </div>
                                )}
                                <div>
                                  <p className="font-medium text-foreground">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                              </div>
                              <span className="font-semibold text-foreground">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="pt-3 border-t border-border flex justify-between items-center text-base">
                        <span className="font-bold text-foreground">Total Paid / Amount Due</span>
                        <span className="font-heading font-bold text-lg text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
              <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-heading font-bold text-xl text-foreground mb-1">No Orders Found</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                You haven&apos;t placed any orders yet, or no orders match your search query.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
