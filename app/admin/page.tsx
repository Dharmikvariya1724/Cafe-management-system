'use client'

import { useEffect, useState } from 'react'
import type { Reservation, ContactMessage, Order } from '@/lib/types'
import { initialOrders } from '@/lib/data'
import { BarChart3, CalendarDays, MessageSquare, ShoppingBag, DollarSign, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { api } from '@/lib/api-client'

export default function AdminDashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalReservations: 0,
    totalMessages: 0
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Fetch Orders from DB
      let ordersData: Order[] = []
      const apiOrders = await api.getOrders()
      if (apiOrders && Array.isArray(apiOrders) && apiOrders.length > 0) {
        ordersData = apiOrders
        localStorage.setItem('coffee_orders', JSON.stringify(apiOrders))
      } else {
        const stored = localStorage.getItem('coffee_orders')
        if (stored) {
          try { ordersData = JSON.parse(stored) } catch { ordersData = initialOrders }
        } else {
          ordersData = initialOrders
        }
      }

      // 2. Fetch Reservations from DB
      let reservationsData: Reservation[] = []
      const apiReservations = await api.getReservations()
      if (apiReservations && Array.isArray(apiReservations)) {
        reservationsData = apiReservations
        localStorage.setItem('reservations', JSON.stringify(apiReservations))
      } else {
        reservationsData = JSON.parse(localStorage.getItem('reservations') || '[]')
      }

      // 3. Fetch Contact Messages from DB
      let messagesData: ContactMessage[] = []
      const apiMessages = await api.getMessages()
      if (apiMessages && Array.isArray(apiMessages)) {
        messagesData = apiMessages
        localStorage.setItem('contact-messages', JSON.stringify(apiMessages))
      } else {
        messagesData = JSON.parse(localStorage.getItem('contact-messages') || '[]')
      }

      setReservations(reservationsData)
      setMessages(messagesData)
      setOrders(ordersData)

      // Calculate stats
      const pendingOrd = ordersData.filter((o: Order) => o.status === 'pending')
      const totalRev = ordersData
        .filter((o: Order) => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.total, 0)

      setStats({
        totalOrders: ordersData.length,
        pendingOrders: pendingOrd.length,
        totalRevenue: Number(totalRev.toFixed(2)),
        totalReservations: reservationsData.length,
        totalMessages: messagesData.length
      })
    }

    fetchDashboardData()
  }, [])

  const statCards = [
    {
      label: 'Pending Orders',
      value: stats.pendingOrders,
      icon: Clock,
      color: 'text-amber-600',
      badge: stats.pendingOrders > 0 ? 'Action Needed' : undefined,
      href: '/admin/orders'
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'text-blue-600',
      href: '/admin/orders'
    },
    {
      label: 'Estimated Revenue',
      value: `₹${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      href: '/admin/orders'
    },
    {
      label: 'Reservations',
      value: stats.totalReservations,
      icon: CalendarDays,
      color: 'text-purple-600',
      href: '/admin/reservations'
    },
  ]

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-foreground/70">
          Welcome back! Here&apos;s an overview of your business activity and incoming orders.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={index} href={stat.href} className="block group">
              <div className="bg-card rounded-xl border border-border p-6 shadow-sm group-hover:border-primary transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-foreground/70 text-sm font-medium">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-secondary group-hover:bg-primary/10 transition-colors">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                {stat.badge && (
                  <span className="inline-block mt-3 px-2 py-0.5 bg-amber-100 text-amber-800 font-bold text-[10px] rounded-full uppercase tracking-wider">
                    {stat.badge}
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-foreground">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-muted-foreground">Manage and accept incoming item orders</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            View All Orders ({orders.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border text-muted-foreground text-xs uppercase font-bold">
                <tr>
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/40 transition">
                    <td className="py-3 px-4 font-bold text-primary">{order.orderNumber}</td>
                    <td className="py-3 px-4 text-foreground font-medium">
                      {order.customerName}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {order.customerPhone}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-foreground/80 capitalize">{order.orderType}</td>
                    <td className="py-3 px-4 text-foreground/80">{order.items.length} items</td>
                    <td className="py-3 px-4 font-bold text-foreground">
                      ₹{order.total.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          order.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                            : order.status === 'preparing'
                            ? 'bg-purple-100 text-purple-800'
                            : order.status === 'ready'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {order.status === 'pending' ? 'Pending Accept' : order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1 text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        {order.status === 'pending' ? 'Accept Order' : 'Manage'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-foreground/70 text-center py-8">No orders placed yet</p>
        )}
      </div>

      {/* Recent Reservations */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          Recent Reservations
        </h2>
        {reservations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Guest Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Time</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Guests</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(0, 5).map((reservation) => (
                  <tr key={reservation.id} className="border-b border-border hover:bg-secondary/50 transition">
                    <td className="py-3 px-4 text-foreground">{reservation.name}</td>
                    <td className="py-3 px-4 text-foreground/70">{reservation.date}</td>
                    <td className="py-3 px-4 text-foreground/70">{reservation.time}</td>
                    <td className="py-3 px-4 text-foreground/70">{reservation.guests}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reservation.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : reservation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-foreground/70 text-center py-8">No reservations yet</p>
        )}
      </div>
    </div>
  )
}
