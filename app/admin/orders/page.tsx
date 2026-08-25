'use client'

import { useEffect, useState } from 'react'
import type { Order, OrderStatus } from '@/lib/types'
import { initialOrders } from '@/lib/data'
import { Check, X, Eye, Trash2, Clock, CookingPot, PackageCheck, CheckCircle2, Search, Filter, Phone, Mail, MapPin, RefreshCw } from 'lucide-react'
import Image from 'next/image'

import { api } from '@/lib/api-client'

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | OrderStatus>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadOrdersFromStorage = async () => {
    setIsRefreshing(true)
    try {
      const data = await api.getOrders()
      if (data && Array.isArray(data) && data.length > 0) {
        setOrders(data)
        localStorage.setItem('coffee_orders', JSON.stringify(data))
      } else {
        const stored = localStorage.getItem('coffee_orders')
        if (stored) {
          setOrders(JSON.parse(stored))
        } else {
          setOrders(initialOrders)
          localStorage.setItem('coffee_orders', JSON.stringify(initialOrders))
        }
      }
    } catch (err) {
      console.error('Failed to load orders:', err)
      setOrders(initialOrders)
    }
    setTimeout(() => setIsRefreshing(false), 400)
  }

  useEffect(() => {
    loadOrdersFromStorage()

    const handleUpdate = () => loadOrdersFromStorage()
    window.addEventListener('ordersUpdated', handleUpdate)
    return () => window.removeEventListener('ordersUpdated', handleUpdate)
  }, [])

  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders)
    try {
      localStorage.setItem('coffee_orders', JSON.stringify(newOrders))
      window.dispatchEvent(new Event('ordersUpdated'))
    } catch (err) {
      console.error('Failed to save orders:', err)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const now = new Date().toISOString()
    await api.updateOrderStatus(orderId, newStatus)

    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus, updatedAt: now } : o
    )
    saveOrders(updated)

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, updatedAt: now })
    }
  }

  const deleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      await api.deleteOrder(orderId)
      const updated = orders.filter((o) => o.id !== orderId)
      saveOrders(updated)
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(null)
      }
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === 'all' ? true : order.status === filterStatus
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !query ||
      order.orderNumber.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.toLowerCase().includes(query) ||
      (order.tableNumber && order.tableNumber.toLowerCase().includes(query))


    return matchesStatus && matchesSearch
  })

  const pendingCount = orders.filter((o) => o.status === 'pending').length

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3 h-3 animate-spin" />
            Pending Accept
          </span>
        )
      case 'confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Accepted / Confirmed
          </span>
        )
      case 'preparing':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1">
            <CookingPot className="w-3 h-3" />
            Preparing
          </span>
        )
      case 'ready':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <PackageCheck className="w-3 h-3" />
            Ready
          </span>
        )
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        )
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
            <X className="w-3 h-3" />
            Cancelled
          </span>
        )
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Top Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
              Order Management
            </h1>
            {pendingCount > 0 && (
              <span className="px-3 py-1 bg-amber-500 text-white font-bold text-xs rounded-full animate-bounce">
                {pendingCount} Pending Action
              </span>
            )}
          </div>
          <p className="text-foreground/70 text-sm mt-1">
            Review incoming customer orders, accept/confirm them, and manage kitchen workflow.
          </p>
        </div>

        <button
          onClick={loadOrdersFromStorage}
          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors shadow-sm self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Orders
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Filter buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'] as const).map(
            (status) => {
              const count =
                status === 'all'
                  ? orders.length
                  : orders.filter((o) => o.status === status).length

              return (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    filterStatus === status
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span className="capitalize">{status}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      filterStatus === status
                        ? 'bg-white/20 text-white'
                        : 'bg-background text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            }
          )}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Order #, Name, Phone..."
            className="w-full pl-9 pr-3 py-1.5 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Main Grid: Orders Table & Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden shadow-sm">
          {filteredOrders.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 cursor-pointer hover:bg-secondary/40 transition-colors ${
                    selectedOrder?.id === order.id ? 'bg-secondary/70 border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-bold text-primary text-base">
                        {order.orderNumber}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-secondary text-foreground font-semibold uppercase">
                        {order.orderType}
                      </span>
                      {order.tableNumber && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-extrabold border border-primary/20 flex items-center gap-1">
                          📍 {order.tableNumber}
                        </span>
                      )}
                    </div>

                    <div>{getStatusBadge(order.status)}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-1">
                    <div>
                      <span className="font-semibold text-foreground">{order.customerName}</span> •{' '}
                      {order.customerPhone}
                    </div>
                    <div className="flex items-center gap-3">
                      <span>{order.items.length} items</span>
                      <span className="font-bold text-foreground text-sm">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Accept Order Quick Action if Pending */}
                  {order.status === 'pending' && (
                    <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                      <span className="text-xs text-amber-700 font-medium animate-pulse">
                        ⚠️ New Order requires confirmation!
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          updateOrderStatus(order.id, 'confirmed')
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1 transition-transform active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept Order
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-muted-foreground">
              <Eye className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="font-medium text-sm">No orders found matching criteria</p>
            </div>
          )}
        </div>

        {/* Selected Order Details Panel */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-sm flex flex-col justify-between">
          {selectedOrder ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-border pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary">
                    {selectedOrder.orderNumber}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Placed: {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>{getStatusBadge(selectedOrder.status)}</div>
              </div>

              {/* ACTION BUTTONS (ACCEPT / WORKFLOW) */}
              <div className="space-y-2 bg-secondary/30 p-3 rounded-xl border border-border">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                  Admin Action / Order Status Update
                </h3>

                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'confirmed')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    ACCEPT & CONFIRM ORDER
                  </button>
                )}

                {selectedOrder.status === 'confirmed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'preparing')}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <CookingPot className="w-4 h-4" />
                    Start Preparing Food
                  </button>
                )}

                {selectedOrder.status === 'preparing' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'ready')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <PackageCheck className="w-4 h-4" />
                    Mark Order Ready
                  </button>
                )}

                {selectedOrder.status === 'ready' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Completed
                  </button>
                )}

                <div className="flex gap-2 pt-1">
                  {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'completed' && (
                    <button
                      onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel Order
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(selectedOrder.id)}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground py-1.5 rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-foreground uppercase tracking-wider">
                  Customer Details
                </h3>
                <div className="space-y-1 text-muted-foreground bg-secondary/20 p-3 rounded-lg">
                  <p className="flex items-center gap-2 text-foreground font-semibold text-sm">
                    {selectedOrder.customerName}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {selectedOrder.customerPhone}
                  </p>
                  {selectedOrder.customerEmail && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-primary" />
                      {selectedOrder.customerEmail}
                    </p>
                  )}
                  <div className="pt-2 border-t border-border/60">
                    <p>
                      <span className="font-semibold text-foreground">Order Type:</span>{' '}
                      <span className="capitalize font-bold text-foreground">{selectedOrder.orderType}</span>
                    </p>
                    {selectedOrder.tableNumber && (
                      <div className="mt-2 p-2.5 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block leading-none">
                            Table Location
                          </span>
                          <span className="text-sm font-extrabold text-primary">
                            📍 {selectedOrder.tableNumber}
                          </span>
                        </div>
                        {selectedOrder.tableToken && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full border border-green-300">
                            QR Validated
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {selectedOrder.address && (
                    <p className="flex items-start gap-2 pt-1 text-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {selectedOrder.address}
                    </p>
                  )}
                  {selectedOrder.specialInstructions && (
                    <p className="bg-amber-50 text-amber-900 border border-amber-200 p-2 rounded mt-2">
                      <span className="font-bold">Instructions:</span> {selectedOrder.specialInstructions}
                    </p>
                  )}
                </div>
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Ordered Items ({selectedOrder.items.length})
                </h3>
                <div className="divide-y divide-border border border-border rounded-lg p-2 max-h-48 overflow-y-auto">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {item.image && (
                          <div className="relative w-8 h-8 rounded bg-secondary overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-foreground">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            ₹{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-foreground">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="border-t border-border pt-3 space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-foreground pt-1 border-t border-border">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span>Payment Method</span>
                  <span className="uppercase font-semibold text-foreground">
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16">
              <Eye className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Select an order from the list to view details and accept it.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
