import type { Order, Reservation, MenuItem, Table, Review, ContactMessage } from './types'

export type DateRangePreset =
  | 'today'
  | 'yesterday'
  | '7days'
  | '30days'
  | 'thisMonth'
  | 'lastMonth'
  | 'thisYear'
  | 'custom'

export interface DateFilter {
  preset: DateRangePreset
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
}

export interface DashboardMetrics {
  totalRevenue: number
  periodRevenue: number
  revenueChangePct: number | null

  totalOrdersCount: number
  periodOrdersCount: number
  ordersChangePct: number | null

  totalCustomersCount: number
  newCustomersCount: number
  customersChangePct: number | null

  totalReservationsCount: number
  periodReservationsCount: number
  pendingReservationsCount: number

  completedOrdersCount: number
  pendingOrdersCount: number
  preparingOrdersCount: number
  readyOrdersCount: number
  confirmedOrdersCount: number
  cancelledOrdersCount: number

  averageOrderValue: number
  aovChangePct: number | null
}

export interface RevenuePoint {
  date: string
  label: string
  revenue: number
  orders: number
}

export interface OrderStatusCount {
  status: string
  label: string
  count: number
  percentage: number
  color: string
}

export interface TopSellingItem {
  id: string
  name: string
  category: string
  image: string
  orderCount: number
  quantitySold: number
  revenue: number
}

export interface CategoryPerformance {
  category: string
  label: string
  orders: number
  revenue: number
  percentage: number
}

export interface PeakHourData {
  hour: number
  label: string
  orders: number
  revenue: number
}

export interface PaymentBreakdown {
  method: 'upi' | 'card' | 'cash'
  label: string
  count: number
  amount: number
  percentage: number
}

export interface TableStatusSummary {
  total: number
  available: number
  occupied: number
  inactive: number
  tableList: Array<{
    id: string
    tableNumber: string
    name: string
    status: 'available' | 'occupied' | 'inactive'
    activeOrderNumber?: string
  }>
}

export interface CustomerAnalytics {
  totalCustomers: number
  newCustomers: number
  returningCustomers: number
  repeatRate: number
  avgOrdersPerCustomer: number
  topCustomers: Array<{
    name: string
    email: string
    phone: string
    orderCount: number
    totalSpent: number
    lastOrderDate: string
  }>
}

export interface ReviewAnalytics {
  averageRating: number
  totalReviews: number
  verifiedCount: number
  ratingDistribution: { [stars: number]: { count: number; percentage: number } }
}

export interface SystemActivity {
  id: string
  type: 'order' | 'reservation' | 'review' | 'message' | 'customer'
  title: string
  description: string
  timestamp: string
  badgeColor: string
  link: string
}

export interface BusinessInsight {
  id: string
  type: 'positive' | 'warning' | 'info'
  title: string
  message: string
}

/**
 * Gets start and end Date objects corresponding to a given preset or custom dates.
 */
export function getDateRangeBounds(filter: DateFilter): { start: Date; end: Date; prevStart: Date; prevEnd: Date } {
  const now = new Date()
  let start = new Date(now)
  let end = new Date(now)

  switch (filter.preset) {
    case 'today': {
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    }
    case 'yesterday': {
      start.setDate(start.getDate() - 1)
      start.setHours(0, 0, 0, 0)
      end.setDate(end.getDate() - 1)
      end.setHours(23, 59, 59, 999)
      break
    }
    case '7days': {
      start.setDate(start.getDate() - 6)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    }
    case '30days': {
      start.setDate(start.getDate() - 29)
      start.setHours(0, 0, 0, 0)
      end.setHours(23, 59, 59, 999)
      break
    }
    case 'thisMonth': {
      start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      break
    }
    case 'lastMonth': {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      break
    }
    case 'thisYear': {
      start = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0)
      end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)
      break
    }
    case 'custom': {
      if (filter.startDate) {
        start = new Date(filter.startDate)
        start.setHours(0, 0, 0, 0)
      } else {
        start.setDate(start.getDate() - 29)
        start.setHours(0, 0, 0, 0)
      }
      if (filter.endDate) {
        end = new Date(filter.endDate)
        end.setHours(23, 59, 59, 999)
      } else {
        end.setHours(23, 59, 59, 999)
      }
      break
    }
  }

  // Calculate prior period bounds of exact equal duration
  const durationMs = end.getTime() - start.getTime()
  const prevEnd = new Date(start.getTime() - 1)
  const prevStart = new Date(prevEnd.getTime() - durationMs)

  return { start, end, prevStart, prevEnd }
}

/**
 * Filter orders within date bounds
 */
export function filterOrdersByDate(orders: Order[], start: Date, end: Date): Order[] {
  return orders.filter(o => {
    const d = new Date(o.createdAt || Date.now())
    return d >= start && d <= end
  })
}

/**
 * Compute primary KPI Metrics
 */
export function calculateDashboardMetrics(
  orders: Order[],
  reservations: Reservation[],
  filter: DateFilter
): DashboardMetrics {
  const { start, end, prevStart, prevEnd } = getDateRangeBounds(filter)

  const currentOrders = filterOrdersByDate(orders, start, end)
  const prevOrders = filterOrdersByDate(orders, prevStart, prevEnd)

  // Valid orders for revenue (non-cancelled)
  const validCurrentOrders = currentOrders.filter(o => o.status !== 'cancelled')
  const validPrevOrders = prevOrders.filter(o => o.status !== 'cancelled')
  const validAllOrders = orders.filter(o => o.status !== 'cancelled')

  const totalRevenue = validAllOrders.reduce((acc, o) => acc + (o.total || 0), 0)
  const periodRevenue = validCurrentOrders.reduce((acc, o) => acc + (o.total || 0), 0)
  const prevPeriodRevenue = validPrevOrders.reduce((acc, o) => acc + (o.total || 0), 0)

  let revenueChangePct: number | null = null
  if (prevPeriodRevenue > 0) {
    revenueChangePct = Number((((periodRevenue - prevPeriodRevenue) / prevPeriodRevenue) * 100).toFixed(1))
  } else if (periodRevenue > 0 && prevPeriodRevenue === 0) {
    revenueChangePct = 100
  }

  const periodOrdersCount = currentOrders.length
  const prevOrdersCount = prevOrders.length

  let ordersChangePct: number | null = null
  if (prevOrdersCount > 0) {
    ordersChangePct = Number((((periodOrdersCount - prevOrdersCount) / prevOrdersCount) * 100).toFixed(1))
  } else if (periodOrdersCount > 0) {
    ordersChangePct = 100
  }

  // Unique customers overall vs in date range
  const allCustomerKeys = new Set(orders.map(o => o.customerPhone || o.customerEmail || o.customerName))
  const currentCustomerKeys = new Set(currentOrders.map(o => o.customerPhone || o.customerEmail || o.customerName))

  // Determine new customers (customers whose earliest order fell into this period)
  const customerFirstOrderTimeMap = new Map<string, number>()
  orders.forEach(o => {
    const key = o.customerPhone || o.customerEmail || o.customerName
    const time = new Date(o.createdAt || Date.now()).getTime()
    if (!customerFirstOrderTimeMap.has(key) || time < customerFirstOrderTimeMap.get(key)!) {
      customerFirstOrderTimeMap.set(key, time)
    }
  })

  let newCustomersCount = 0
  customerFirstOrderTimeMap.forEach(firstTime => {
    if (firstTime >= start.getTime() && firstTime <= end.getTime()) {
      newCustomersCount++
    }
  })

  // Order status counts in current period
  const completedOrdersCount = currentOrders.filter(o => o.status === 'completed').length
  const pendingOrdersCount = currentOrders.filter(o => o.status === 'pending').length
  const preparingOrdersCount = currentOrders.filter(o => o.status === 'preparing').length
  const readyOrdersCount = currentOrders.filter(o => o.status === 'ready').length
  const confirmedOrdersCount = currentOrders.filter(o => o.status === 'confirmed').length
  const cancelledOrdersCount = currentOrders.filter(o => o.status === 'cancelled').length

  // Reservations
  const currentReservations = reservations.filter(r => {
    const d = new Date(r.date || r.createdAt || Date.now())
    return d >= start && d <= end
  })
  const pendingReservationsCount = reservations.filter(r => r.status === 'pending').length

  // Average Order Value (AOV)
  const averageOrderValue = validCurrentOrders.length > 0 ? periodRevenue / validCurrentOrders.length : 0
  const prevAOV = validPrevOrders.length > 0 ? prevPeriodRevenue / validPrevOrders.length : 0

  let aovChangePct: number | null = null
  if (prevAOV > 0) {
    aovChangePct = Number((((averageOrderValue - prevAOV) / prevAOV) * 100).toFixed(1))
  }

  return {
    totalRevenue: Number(totalRevenue.toFixed(2)),
    periodRevenue: Number(periodRevenue.toFixed(2)),
    revenueChangePct,
    totalOrdersCount: orders.length,
    periodOrdersCount,
    ordersChangePct,
    totalCustomersCount: allCustomerKeys.size,
    newCustomersCount,
    customersChangePct: null,
    totalReservationsCount: reservations.length,
    periodReservationsCount: currentReservations.length,
    pendingReservationsCount,
    completedOrdersCount,
    pendingOrdersCount,
    preparingOrdersCount,
    readyOrdersCount,
    confirmedOrdersCount,
    cancelledOrdersCount,
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    aovChangePct
  }
}

/**
 * Generate time-series data points for Revenue Chart
 */
export function calculateRevenueOverview(orders: Order[], filter: DateFilter): RevenuePoint[] {
  const { start, end } = getDateRangeBounds(filter)
  const periodOrders = filterOrdersByDate(orders, start, end).filter(o => o.status !== 'cancelled')

  const durationDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  // If 1-2 days, aggregate by Hour
  if (durationDays <= 2) {
    const map = new Map<number, { revenue: number; orders: number }>()
    for (let h = 8; h <= 22; h++) {
      map.set(h, { revenue: 0, orders: 0 })
    }

    periodOrders.forEach(o => {
      const d = new Date(o.createdAt || Date.now())
      const hour = d.getHours()
      if (map.has(hour)) {
        const item = map.get(hour)!
        item.revenue += o.total || 0
        item.orders += 1
      }
    })

    return Array.from(map.entries()).map(([hour, val]) => {
      const ampm = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour % 12 === 0 ? 12 : hour % 12
      return {
        date: `${hour}:00`,
        label: `${displayHour}:00 ${ampm}`,
        revenue: Number(val.revenue.toFixed(2)),
        orders: val.orders
      }
    })
  }

  // Aggregate by Day
  const map = new Map<string, { label: string; revenue: number; orders: number }>()
  const curr = new Date(start)
  while (curr <= end) {
    const key = curr.toISOString().split('T')[0]
    const label = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    map.set(key, { label, revenue: 0, orders: 0 })
    curr.setDate(curr.getDate() + 1)
  }

  periodOrders.forEach(o => {
    const d = new Date(o.createdAt || Date.now())
    const key = d.toISOString().split('T')[0]
    if (map.has(key)) {
      const item = map.get(key)!
      item.revenue += o.total || 0
      item.orders += 1
    }
  })

  return Array.from(map.entries()).map(([key, val]) => ({
    date: key,
    label: val.label,
    revenue: Number(val.revenue.toFixed(2)),
    orders: val.orders
  }))
}

/**
 * Order Status Breakdown
 */
export function calculateOrderStatusDistribution(orders: Order[], filter: DateFilter): OrderStatusCount[] {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end)
  const total = currentOrders.length || 1

  const statuses: Array<{ key: Order['status']; label: string; color: string }> = [
    { key: 'completed', label: 'Completed', color: '#10B981' }, // green
    { key: 'ready', label: 'Ready', color: '#06B6D4' }, // cyan
    { key: 'preparing', label: 'Preparing', color: '#8B5CF6' }, // purple
    { key: 'confirmed', label: 'Confirmed', color: '#3B82F6' }, // blue
    { key: 'pending', label: 'Pending', color: '#F59E0B' }, // amber
    { key: 'cancelled', label: 'Cancelled', color: '#EF4444' } // red
  ]

  return statuses
    .map(s => {
      const count = currentOrders.filter(o => o.status === s.key).length
      return {
        status: s.key,
        label: s.label,
        count,
        percentage: Number(((count / total) * 100).toFixed(1)),
        color: s.color
      }
    })
    .filter(s => s.count > 0 || currentOrders.length === 0)
}

/**
 * Top Selling Menu Items
 */
export function calculateTopSellingItems(
  orders: Order[],
  menuItems: MenuItem[],
  filter: DateFilter,
  limit = 5
): TopSellingItem[] {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end).filter(o => o.status !== 'cancelled')

  const itemMap = new Map<string, { name: string; category: string; image: string; orderCount: number; quantitySold: number; revenue: number }>()

  currentOrders.forEach(o => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach(item => {
        const id = item.menuItemId || item.id || item.name
        const existing = itemMap.get(id) || {
          name: item.name,
          category: 'coffee',
          image: item.image || '/images/cappuccino.png',
          orderCount: 0,
          quantitySold: 0,
          revenue: 0
        }

        // Try lookup in menuItems for accurate category & image
        const match = menuItems.find(m => m.id === id || m.name.toLowerCase() === item.name.toLowerCase())
        if (match) {
          existing.category = match.category
          if (!existing.image || existing.image === '/images/cappuccino.png') {
            existing.image = match.image
          }
        }

        existing.orderCount += 1
        existing.quantitySold += item.quantity || 1
        existing.revenue += (item.price || 0) * (item.quantity || 1)

        itemMap.set(id, existing)
      })
    }
  })

  return Array.from(itemMap.entries())
    .map(([id, val]) => ({
      id,
      name: val.name,
      category: val.category,
      image: val.image,
      orderCount: val.orderCount,
      quantitySold: val.quantitySold,
      revenue: Number(val.revenue.toFixed(2))
    }))
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, limit)
}

/**
 * Menu Category Performance
 */
export function calculateCategoryPerformance(
  orders: Order[],
  menuItems: MenuItem[],
  filter: DateFilter
): CategoryPerformance[] {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end).filter(o => o.status !== 'cancelled')

  const categoryLabels: Record<string, string> = {
    coffee: 'Coffee',
    espresso: 'Espresso',
    tea: 'Tea',
    cold: 'Cold Beverages',
    breakfast: 'Breakfast',
    snacks: 'Snacks & Starters',
    desserts: 'Desserts'
  }

  const map = new Map<string, { orders: number; revenue: number }>()

  Object.keys(categoryLabels).forEach(cat => {
    map.set(cat, { orders: 0, revenue: 0 })
  })

  currentOrders.forEach(o => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach(item => {
        let cat = 'coffee'
        const match = menuItems.find(m => m.id === item.menuItemId || m.name.toLowerCase() === item.name.toLowerCase())
        if (match) {
          cat = match.category
        }

        const entry = map.get(cat) || { orders: 0, revenue: 0 }
        entry.orders += item.quantity || 1
        entry.revenue += (item.price || 0) * (item.quantity || 1)
        map.set(cat, entry)
      })
    }
  })

  const totalRevenue = Array.from(map.values()).reduce((sum, v) => sum + v.revenue, 0) || 1

  return Array.from(map.entries())
    .map(([cat, val]) => ({
      category: cat,
      label: categoryLabels[cat] || cat.toUpperCase(),
      orders: val.orders,
      revenue: Number(val.revenue.toFixed(2)),
      percentage: Number(((val.revenue / totalRevenue) * 100).toFixed(1))
    }))
    .sort((a, b) => b.revenue - a.revenue)
}

/**
 * Peak Order Hours Histogram
 */
export function calculatePeakHours(orders: Order[], filter: DateFilter): PeakHourData[] {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end)

  const map = new Map<number, { orders: number; revenue: number }>()
  for (let h = 8; h <= 22; h++) {
    map.set(h, { orders: 0, revenue: 0 })
  }

  currentOrders.forEach(o => {
    const d = new Date(o.createdAt || Date.now())
    const hour = d.getHours()
    if (map.has(hour)) {
      const entry = map.get(hour)!
      entry.orders += 1
      if (o.status !== 'cancelled') {
        entry.revenue += o.total || 0
      }
    }
  })

  return Array.from(map.entries()).map(([h, val]) => {
    const ampm = h >= 12 ? 'PM' : 'AM'
    const displayHour = h % 12 === 0 ? 12 : h % 12
    return {
      hour: h,
      label: `${displayHour} ${ampm}`,
      orders: val.orders,
      revenue: Number(val.revenue.toFixed(2))
    }
  })
}

/**
 * Payment Methods Breakdown
 */
export function calculatePaymentBreakdown(orders: Order[], filter: DateFilter): PaymentBreakdown[] {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end).filter(o => o.status !== 'cancelled')

  const totalRev = currentOrders.reduce((sum, o) => sum + (o.total || 0), 0) || 1

  const methods: Array<{ key: 'upi' | 'card' | 'cash'; label: string }> = [
    { key: 'upi', label: 'UPI / Online' },
    { key: 'cash', label: 'Cash on Counter' },
    { key: 'card', label: 'Credit/Debit Card' }
  ]

  return methods.map(m => {
    const matching = currentOrders.filter(o => (o.paymentMethod || 'cash').toLowerCase() === m.key)
    const amount = matching.reduce((sum, o) => sum + (o.total || 0), 0)
    return {
      method: m.key,
      label: m.label,
      count: matching.length,
      amount: Number(amount.toFixed(2)),
      percentage: Number(((amount / totalRev) * 100).toFixed(1))
    }
  })
}

/**
 * Table Status Overview
 */
export function calculateTableStatusSummary(tables: Table[], orders: Order[]): TableStatusSummary {
  // Find open dine-in orders that occupy a table
  const activeOrders = orders.filter(o =>
    o.orderType === 'dine-in' &&
    ['pending', 'confirmed', 'preparing', 'ready'].includes(o.status)
  )

  const occupiedTableNumbers = new Set(activeOrders.map(o => o.tableNumber))

  let availableCount = 0
  let occupiedCount = 0
  let inactiveCount = 0

  const tableList = tables.map(t => {
    if (t.status === 'inactive') {
      inactiveCount++
      return {
        id: t.id,
        tableNumber: t.tableNumber,
        name: t.name || t.tableNumber,
        status: 'inactive' as const
      }
    }

    const isOccupied = occupiedTableNumbers.has(t.tableNumber)
    if (isOccupied) {
      occupiedCount++
      const matchOrder = activeOrders.find(o => o.tableNumber === t.tableNumber)
      return {
        id: t.id,
        tableNumber: t.tableNumber,
        name: t.name || t.tableNumber,
        status: 'occupied' as const,
        activeOrderNumber: matchOrder?.orderNumber
      }
    }

    availableCount++
    return {
      id: t.id,
      tableNumber: t.tableNumber,
      name: t.name || t.tableNumber,
      status: 'available' as const
    }
  })

  return {
    total: tables.length,
    available: availableCount,
    occupied: occupiedCount,
    inactive: inactiveCount,
    tableList
  }
}

/**
 * Customer Analytics & Top Spenders
 */
export function calculateCustomerAnalytics(orders: Order[], filter: DateFilter): CustomerAnalytics {
  const { start, end } = getDateRangeBounds(filter)
  const currentOrders = filterOrdersByDate(orders, start, end)

  const customerMap = new Map<string, { name: string; email: string; phone: string; orderCount: number; totalSpent: number; lastOrderDate: string }>()

  orders.forEach(o => {
    const key = o.customerPhone || o.customerEmail || o.customerName
    const existing = customerMap.get(key) || {
      name: o.customerName || 'Guest Customer',
      email: o.customerEmail || '',
      phone: o.customerPhone || '',
      orderCount: 0,
      totalSpent: 0,
      lastOrderDate: o.createdAt || new Date().toISOString()
    }

    existing.orderCount += 1
    if (o.status !== 'cancelled') {
      existing.totalSpent += o.total || 0
    }

    if (new Date(o.createdAt || Date.now()) > new Date(existing.lastOrderDate)) {
      existing.lastOrderDate = o.createdAt || new Date().toISOString()
    }

    customerMap.set(key, existing)
  })

  const allCustomers = Array.from(customerMap.values())
  const returningCount = allCustomers.filter(c => c.orderCount > 1).length
  const totalCust = allCustomers.length || 1

  const topCustomers = allCustomers
    .sort((a, b) => b.totalSpent - a.totalSpent)
    .slice(0, 5)
    .map(c => ({ ...c, totalSpent: Number(c.totalSpent.toFixed(2)) }))

  return {
    totalCustomers: allCustomers.length,
    newCustomers: allCustomers.filter(c => {
      const d = new Date(c.lastOrderDate)
      return d >= start && d <= end && c.orderCount === 1
    }).length,
    returningCustomers: returningCount,
    repeatRate: Number(((returningCount / totalCust) * 100).toFixed(1)),
    avgOrdersPerCustomer: Number((orders.length / totalCust).toFixed(1)),
    topCustomers
  }
}

/**
 * Reviews & Customer Feedback Analytics
 */
export function calculateReviewAnalytics(reviews: Review[]): ReviewAnalytics {
  const total = reviews.length || 1
  const sumRating = reviews.reduce((acc, r) => acc + (r.rating || 5), 0)
  const averageRating = Number((sumRating / total).toFixed(1))

  const distribution: Record<number, { count: number; percentage: number }> = {
    5: { count: 0, percentage: 0 },
    4: { count: 0, percentage: 0 },
    3: { count: 0, percentage: 0 },
    2: { count: 0, percentage: 0 },
    1: { count: 0, percentage: 0 }
  }

  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)))
    distribution[star].count += 1
  })

  for (let i = 1; i <= 5; i++) {
    distribution[i].percentage = Number(((distribution[i].count / total) * 100).toFixed(1))
  }

  return {
    averageRating,
    totalReviews: reviews.length,
    verifiedCount: reviews.filter(r => r.verified).length,
    ratingDistribution: distribution
  }
}

/**
 * Generate Real System Activity Feed
 */
export function calculateSystemActivityFeed(
  orders: Order[],
  reservations: Reservation[],
  reviews: Review[],
  messages: ContactMessage[]
): SystemActivity[] {
  const feed: SystemActivity[] = []

  orders.slice(0, 5).forEach(o => {
    feed.push({
      id: `act-ord-${o.id}`,
      type: 'order',
      title: `New Order ${o.orderNumber}`,
      description: `${o.customerName} placed a ${o.orderType} order for ₹${(o.total || 0).toFixed(2)}`,
      timestamp: o.createdAt || new Date().toISOString(),
      badgeColor: 'bg-blue-500',
      link: '/admin/orders'
    })
  })

  reservations.slice(0, 3).forEach(r => {
    feed.push({
      id: `act-res-${r.id}`,
      type: 'reservation',
      title: `Reservation Request`,
      description: `${r.name} booked table for ${r.guests} guests on ${r.date} at ${r.time}`,
      timestamp: r.createdAt || new Date().toISOString(),
      badgeColor: 'bg-purple-500',
      link: '/admin/reservations'
    })
  })

  reviews.slice(0, 3).forEach(rev => {
    feed.push({
      id: `act-rev-${rev.id}`,
      type: 'review',
      title: `New ${rev.rating}★ Review`,
      description: `"${rev.text.slice(0, 60)}..." by ${rev.name}`,
      timestamp: rev.date ? new Date(rev.date).toISOString() : new Date().toISOString(),
      badgeColor: 'bg-amber-500',
      link: '/admin/reviews'
    })
  })

  messages.slice(0, 3).forEach(m => {
    feed.push({
      id: `act-msg-${m.id}`,
      type: 'message',
      title: `Contact Message`,
      description: `${m.name}: "${m.subject}"`,
      timestamp: m.createdAt || new Date().toISOString(),
      badgeColor: 'bg-emerald-500',
      link: '/admin/messages'
    })
  })

  return feed
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 8)
}

/**
 * Generate Smart Business Insights dynamically from DB
 */
export function generateBusinessInsights(
  metrics: DashboardMetrics,
  topItems: TopSellingItem[],
  peakHours: PeakHourData[],
  custAnalytics: CustomerAnalytics
): BusinessInsight[] {
  const insights: BusinessInsight[] = []

  if (topItems.length > 0) {
    insights.push({
      id: 'ins-top-item',
      type: 'positive',
      title: 'Top Performing Item',
      message: `Your highest-selling item in this period is "${topItems[0].name}" with ${topItems[0].quantitySold} units sold generating ₹${topItems[0].revenue.toLocaleString('en-IN')}.`
    })
  }

  if (metrics.revenueChangePct !== null) {
    if (metrics.revenueChangePct >= 0) {
      insights.push({
        id: 'ins-revenue-growth',
        type: 'positive',
        title: 'Revenue Growth',
        message: `Sales revenue is ${metrics.revenueChangePct}% higher compared to the previous period.`
      })
    } else {
      insights.push({
        id: 'ins-revenue-drop',
        type: 'warning',
        title: 'Revenue Trend',
        message: `Sales revenue is ${Math.abs(metrics.revenueChangePct)}% lower compared to the previous period.`
      })
    }
  }

  const busiestHour = peakHours.slice().sort((a, b) => b.orders - a.orders)[0]
  if (busiestHour && busiestHour.orders > 0) {
    insights.push({
      id: 'ins-peak-hour',
      type: 'info',
      title: 'Peak Rush Hour',
      message: `Peak ordering time is around ${busiestHour.label} with ${busiestHour.orders} order requests.`
    })
  }

  if (custAnalytics.repeatRate > 0) {
    insights.push({
      id: 'ins-returning-cust',
      type: 'positive',
      title: 'Customer Retention',
      message: `Returning customers account for ${custAnalytics.repeatRate}% of your customer base.`
    })
  }

  return insights
}
