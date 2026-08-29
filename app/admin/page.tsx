'use client'

import { useEffect, useState, useMemo } from 'react'
import type { Reservation, ContactMessage, Order, MenuItem, Table, Review } from '@/lib/types'
import { initialOrders, initialTables, menuItems as initialMenuItems, reviews as initialReviews } from '@/lib/data'
import { api } from '@/lib/api-client'
import {
  getDateRangeBounds,
  calculateDashboardMetrics,
  calculateRevenueOverview,
  calculateOrderStatusDistribution,
  calculateTopSellingItems,
  calculateCategoryPerformance,
  calculatePeakHours,
  calculatePaymentBreakdown,
  calculateTableStatusSummary,
  calculateCustomerAnalytics,
  calculateReviewAnalytics,
  calculateSystemActivityFeed,
  generateBusinessInsights,
  type DateFilter
} from '@/lib/dashboard-analytics'

import DashboardDateFilter from '@/components/admin/DashboardDateFilter'
import RevenueChart from '@/components/admin/RevenueChart'
import OrdersChart from '@/components/admin/OrdersChart'
import OrderStatusDonut from '@/components/admin/OrderStatusDonut'
import CategoryBarChart from '@/components/admin/CategoryBarChart'
import PeakHoursChart from '@/components/admin/PeakHoursChart'
import TableStatusGrid from '@/components/admin/TableStatusGrid'
import SalesInsightsCard from '@/components/admin/SalesInsightsCard'
import RecentActivityFeed from '@/components/admin/RecentActivityFeed'

import {
  DollarSign,
  ShoppingBag,
  Users,
  CalendarDays,
  Clock,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  PlusCircle,
  QrCode,
  Utensils,
  Star,
  MessageSquare,
  ChevronRight,
  CreditCard,
  Building2,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [menuItemsList, setMenuItemsList] = useState<MenuItem[]>([])
  const [tablesList, setTablesList] = useState<Table[]>([])
  const [reviewsList, setReviewsList] = useState<Review[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateFilter, setDateFilter] = useState<DateFilter>({ preset: '30days' })

  // Fetch all dashboard data from DB / API with localStorage fallback
  const fetchDashboardData = async () => {
    try {
      const [
        apiOrders,
        apiReservations,
        apiMessages,
        apiMenu,
        apiTables,
        apiReviews
      ] = await Promise.all([
        api.getOrders().catch(() => null),
        api.getReservations().catch(() => null),
        api.getMessages().catch(() => null),
        api.getMenuItems().catch(() => null),
        api.getTables().catch(() => null),
        api.getReviews().catch(() => null)
      ])

      // 1. Orders
      if (apiOrders && Array.isArray(apiOrders) && apiOrders.length > 0) {
        setOrders(apiOrders)
        localStorage.setItem('coffee_orders', JSON.stringify(apiOrders))
      } else {
        const stored = localStorage.getItem('coffee_orders')
        if (stored) {
          try { setOrders(JSON.parse(stored)) } catch { setOrders(initialOrders) }
        } else {
          setOrders(initialOrders)
        }
      }

      // 2. Reservations
      if (apiReservations && Array.isArray(apiReservations)) {
        setReservations(apiReservations)
        localStorage.setItem('reservations', JSON.stringify(apiReservations))
      } else {
        setReservations(JSON.parse(localStorage.getItem('reservations') || '[]'))
      }

      // 3. Contact Messages
      if (apiMessages && Array.isArray(apiMessages)) {
        setMessages(apiMessages)
        localStorage.setItem('contact-messages', JSON.stringify(apiMessages))
      } else {
        setMessages(JSON.parse(localStorage.getItem('contact-messages') || '[]'))
      }

      // 4. Menu Items
      if (apiMenu && Array.isArray(apiMenu) && apiMenu.length > 0) {
        setMenuItemsList(apiMenu)
      } else {
        setMenuItemsList(initialMenuItems)
      }

      // 5. Tables
      if (apiTables && Array.isArray(apiTables) && apiTables.length > 0) {
        setTablesList(apiTables)
      } else {
        setTablesList(initialTables)
      }

      // 6. Reviews
      if (apiReviews && Array.isArray(apiReviews) && apiReviews.length > 0) {
        setReviewsList(apiReviews)
      } else {
        setReviewsList(initialReviews)
      }
    } catch (err) {
      console.warn('[Dashboard Warning] Error fetching live data:', err)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    fetchDashboardData()
  }

  // Pure memoized calculations
  const metrics = useMemo(
    () => calculateDashboardMetrics(orders, reservations, dateFilter),
    [orders, reservations, dateFilter]
  )

  const revenuePoints = useMemo(
    () => calculateRevenueOverview(orders, dateFilter),
    [orders, dateFilter]
  )

  const orderStatusDist = useMemo(
    () => calculateOrderStatusDistribution(orders, dateFilter),
    [orders, dateFilter]
  )

  const topItems = useMemo(
    () => calculateTopSellingItems(orders, menuItemsList, dateFilter, 5),
    [orders, menuItemsList, dateFilter]
  )

  const categoryPerf = useMemo(
    () => calculateCategoryPerformance(orders, menuItemsList, dateFilter),
    [orders, menuItemsList, dateFilter]
  )

  const peakHours = useMemo(
    () => calculatePeakHours(orders, dateFilter),
    [orders, dateFilter]
  )

  const paymentBreakdown = useMemo(
    () => calculatePaymentBreakdown(orders, dateFilter),
    [orders, dateFilter]
  )

  const tableSummary = useMemo(
    () => calculateTableStatusSummary(tablesList, orders),
    [tablesList, orders]
  )

  const customerAnalytics = useMemo(
    () => calculateCustomerAnalytics(orders, dateFilter),
    [orders, dateFilter]
  )

  const reviewAnalytics = useMemo(
    () => calculateReviewAnalytics(reviewsList),
    [reviewsList]
  )

  const activityFeed = useMemo(
    () => calculateSystemActivityFeed(orders, reservations, reviewsList, messages),
    [orders, reservations, reviewsList, messages]
  )

  const businessInsights = useMemo(
    () => generateBusinessInsights(metrics, topItems, peakHours, customerAnalytics),
    [metrics, topItems, peakHours, customerAnalytics]
  )

  // Primary KPI Cards configuration
  const kpiCards = [
    {
      label: 'Period Revenue',
      value: `₹${metrics.periodRevenue.toLocaleString('en-IN')}`,
      subtext: `Total: ₹${metrics.totalRevenue.toLocaleString('en-IN')}`,
      changePct: metrics.revenueChangePct,
      icon: DollarSign,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      href: '/admin/orders'
    },
    {
      label: 'Period Orders',
      value: metrics.periodOrdersCount,
      subtext: `Total lifetime: ${metrics.totalOrdersCount}`,
      changePct: metrics.ordersChangePct,
      icon: ShoppingBag,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-500/10',
      href: '/admin/orders'
    },
    {
      label: 'Customer Base',
      value: metrics.totalCustomersCount,
      subtext: `${metrics.newCustomersCount} new customers`,
      changePct: null,
      icon: Users,
      color: 'text-amber-600 dark:text-amber-400',
      bgColor: 'bg-amber-500/10',
      href: '/admin/orders'
    },
    {
      label: 'Reservations',
      value: metrics.totalReservationsCount,
      subtext: `${metrics.pendingReservationsCount} pending review`,
      badge: metrics.pendingReservationsCount > 0 ? 'Action Needed' : undefined,
      icon: CalendarDays,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-500/10',
      href: '/admin/reservations'
    }
  ]

  // Secondary metrics strip
  const secondaryStats = [
    { label: 'Avg Order Value (AOV)', value: `₹${metrics.averageOrderValue}` },
    { label: 'Completed Orders', value: metrics.completedOrdersCount },
    { label: 'Pending / Preparing', value: metrics.pendingOrdersCount + metrics.preparingOrdersCount },
    { label: 'Cancelled Orders', value: metrics.cancelledOrdersCount },
  ]

  if (isLoading) {
    return (
      <div className="p-6 md:p-8 space-y-8 animate-pulse">
        <div className="h-10 bg-secondary/80 rounded-xl w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-secondary/60 rounded-2xl border border-border" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-secondary/60 rounded-2xl border border-border" />
          <div className="h-80 bg-secondary/60 rounded-2xl border border-border" />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card border border-border p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-heading font-extrabold text-foreground tracking-tight">
              Management Dashboard
            </h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">
              Coffee King v2.0
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Real-time analytics, revenue overview, live table status & store performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="p-2.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-xl border border-border transition-colors disabled:opacity-50"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
          </button>

          <DashboardDateFilter value={dateFilter} onChange={setDateFilter} />
        </div>
      </div>

      {/* Primary KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon
          return (
            <Link key={idx} href={kpi.href} className="block group">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-xs group-hover:border-primary/50 group-hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {kpi.label}
                    </span>
                    <p className="text-2xl font-extrabold font-heading text-foreground mt-1.5">
                      {kpi.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${kpi.bgColor} transition-colors`}>
                    <Icon className={`w-5 h-5 ${kpi.color}`} />
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">{kpi.subtext}</span>
                  {typeof kpi.changePct === 'number' && (
                    <span
                      className={`inline-flex items-center gap-0.5 font-bold text-[11px] ${
                        kpi.changePct >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {kpi.changePct >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {kpi.changePct > 0 ? `+${kpi.changePct}%` : `${kpi.changePct}%`}
                    </span>
                  )}
                  {kpi.badge && (
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded-full">
                      {kpi.badge}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Secondary Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-card border border-border rounded-2xl p-4 shadow-xs">
        {secondaryStats.map((st, i) => (
          <div key={i} className="p-3 bg-secondary/30 rounded-xl border border-border/50 text-center">
            <span className="block text-[11px] font-semibold text-muted-foreground uppercase">
              {st.label}
            </span>
            <span className="block text-lg font-bold text-foreground mt-0.5">
              {st.value}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Actions Shortcuts Bar */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Quick Management Actions
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-colors"
          >
            <PlusCircle className="w-4 h-4" /> Create Order
          </Link>
          <Link
            href="/admin/menu"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold rounded-xl transition-colors"
          >
            <Utensils className="w-4 h-4 text-amber-500" /> Manage Menu
          </Link>
          <Link
            href="/admin/reservations"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold rounded-xl transition-colors"
          >
            <CalendarDays className="w-4 h-4 text-purple-500" /> View Reservations
          </Link>
          <Link
            href="/admin/tables"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold rounded-xl transition-colors"
          >
            <QrCode className="w-4 h-4 text-emerald-500" /> Tables & QR
          </Link>
          <Link
            href="/admin/reviews"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold rounded-xl transition-colors"
          >
            <Star className="w-4 h-4 text-yellow-500" /> Moderate Reviews
          </Link>
          <Link
            href="/admin/messages"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-bold rounded-xl transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" /> Customer Messages
          </Link>
        </div>
      </div>

      {/* Analytics Section: Revenue & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenuePoints} />
        </div>
        <div>
          <OrderStatusDonut data={orderStatusDist} />
        </div>
      </div>

      {/* Performance & Operations: Top Items & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items Table */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground">
                  Top Selling Menu Items
                </h2>
                <p className="text-xs text-muted-foreground">Most popular products in selected period</p>
              </div>
              <Link href="/admin/menu" className="text-xs font-bold text-primary hover:underline">
                View All Menu
              </Link>
            </div>

            {topItems.length > 0 ? (
              <div className="space-y-3">
                {topItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-secondary/40 border border-border/60 rounded-xl hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-foreground">{item.name}</h4>
                        <span className="text-[10px] text-muted-foreground capitalize">
                          {item.category} • {item.quantitySold} units sold
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-xs text-foreground block">
                        ₹{item.revenue.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {item.orderCount} orders
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-12">
                No menu items sold yet in this period
              </p>
            )}
          </div>
        </div>

        {/* Category Performance */}
        <div>
          <CategoryBarChart data={categoryPerf} />
        </div>
      </div>

      {/* Operations Strip: Peak Hours & Payment Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PeakHoursChart data={peakHours} />
        </div>

        {/* Payment Methods Breakdown */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              <h2 className="text-lg font-heading font-bold text-foreground">
                Payment Analytics
              </h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Breakdown by payment method used by customers
            </p>

            <div className="space-y-4">
              {paymentBreakdown.map((pm, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-foreground">{pm.label}</span>
                    <span className="text-foreground font-bold">
                      ₹{pm.amount.toLocaleString('en-IN')} ({pm.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                      style={{ width: `${pm.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Smart Business Insights Card */}
      <SalesInsightsCard insights={businessInsights} />

      {/* Tables & Floor Status + Upcoming Reservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TableStatusGrid summary={tableSummary} />

        {/* Upcoming Reservations List */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-heading font-bold text-foreground">
                  Upcoming & Pending Reservations
                </h2>
                <p className="text-xs text-muted-foreground">Guest table bookings</p>
              </div>
              <Link href="/admin/reservations" className="text-xs font-bold text-primary hover:underline">
                Manage All
              </Link>
            </div>

            {reservations.length > 0 ? (
              <div className="space-y-3">
                {reservations.slice(0, 4).map(res => (
                  <div
                    key={res.id}
                    className="p-3.5 bg-secondary/40 border border-border/60 rounded-xl flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-foreground block">{res.name}</span>
                      <span className="text-muted-foreground block text-[11px] mt-0.5">
                        📅 {res.date} at {res.time} • 👥 {res.guests} Guests
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        res.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : res.status === 'pending'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {res.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-12">
                No table reservations recorded
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tables Section: Recent Customer Orders */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-muted-foreground">Live order stream with real-time status management</p>
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
            <table className="w-full text-xs text-left">
              <thead className="border-b border-border text-muted-foreground uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.slice(0, 6).map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary">{order.orderNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      {order.customerName}
                      <span className="block text-[10px] text-muted-foreground font-normal">
                        {order.customerPhone}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 capitalize font-semibold text-foreground/80">
                      {order.orderType}
                      {order.tableNumber && (
                        <span className="block text-[10px] font-normal text-muted-foreground">
                          {order.tableNumber}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-foreground/80">{order.items?.length || 0} items</td>
                    <td className="py-3.5 px-4 font-extrabold text-foreground">
                      ₹{(order.total || 0).toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 uppercase text-[10px] font-bold text-muted-foreground">
                      {order.paymentMethod || 'cash'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          order.status === 'confirmed'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse'
                            : order.status === 'preparing'
                            ? 'bg-purple-100 text-purple-800'
                            : order.status === 'ready'
                            ? 'bg-cyan-100 text-cyan-800'
                            : order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href="/admin/orders"
                        className="inline-flex items-center gap-1 text-[11px] bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-xs"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground text-center py-10">No orders recorded yet</p>
        )}
      </div>

      {/* Bottom Grid: Customers, Reviews Summary & System Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Spenders / Recent Customers */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground mb-1">
              Top Customer Analytics
            </h2>
            <p className="text-xs text-muted-foreground mb-4">
              Highest spending regular patrons
            </p>

            <div className="space-y-3">
              {customerAnalytics.topCustomers.map((cust, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-secondary/40 border border-border/60 rounded-xl"
                >
                  <div>
                    <h4 className="font-bold text-xs text-foreground">{cust.name}</h4>
                    <span className="text-[10px] text-muted-foreground">
                      {cust.orderCount} orders placed
                    </span>
                  </div>
                  <span className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Feedback Summary */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-heading font-bold text-foreground">
                Customer Feedback
              </h2>
              <Link href="/admin/reviews" className="text-xs font-bold text-primary hover:underline">
                View Reviews
              </Link>
            </div>

            <div className="flex items-center gap-4 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
              <span className="text-3xl font-extrabold font-heading text-amber-600 dark:text-amber-400">
                {reviewAnalytics.averageRating}
              </span>
              <div>
                <div className="flex items-center text-amber-500 gap-0.5 text-xs">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(reviewAnalytics.averageRating) ? 'fill-current' : 'opacity-30'}`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground mt-0.5 block font-medium">
                  Based on {reviewAnalytics.totalReviews} customer reviews
                </span>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const item = reviewAnalytics.ratingDistribution[star] || { percentage: 0, count: 0 }
                return (
                  <div key={star} className="flex items-center gap-3 text-xs font-semibold">
                    <span className="w-8 text-foreground shrink-0">{star} ★</span>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-muted-foreground text-[11px]">
                      {item.percentage}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* System Activity Feed */}
        <RecentActivityFeed activities={activityFeed} />
      </div>
    </div>
  )
}
