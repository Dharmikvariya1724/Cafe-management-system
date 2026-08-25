'use client'

import { useEffect, useState } from 'react'
import type { Order } from '@/lib/types'
import { initialOrders } from '@/lib/data'
import { api } from '@/lib/api-client'
import { FileText, Printer, Download, Calendar, Search, Filter, ShoppingBag, CreditCard, DollarSign, RefreshCw, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react'

export default function AdminInvoicesPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Date Filter states (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split('T')[0]
  // Default to 30 days ago
  const defaultStartStr = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [startDate, setStartDate] = useState<string>(defaultStartStr)
  const [endDate, setEndDate] = useState<string>(todayStr)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<Order | null>(null)

  const loadOrders = async () => {
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
      console.error('Failed to load orders for invoices:', err)
      const stored = localStorage.getItem('coffee_orders')
      if (stored) {
        setOrders(JSON.parse(stored))
      } else {
        setOrders(initialOrders)
      }
    }
    setTimeout(() => setIsRefreshing(false), 400)
  }

  useEffect(() => {
    loadOrders()
    const handleUpdate = () => loadOrders()
    window.addEventListener('ordersUpdated', handleUpdate)
    return () => window.removeEventListener('ordersUpdated', handleUpdate)
  }, [])

  // Filter orders by date range and search query
  const filteredOrders = orders.filter((order) => {
    const orderDateStr = order.createdAt ? order.createdAt.split('T')[0] : ''

    // Date range check
    let matchesDate = true
    if (startDate && orderDateStr < startDate) matchesDate = false
    if (endDate && orderDateStr > endDate) matchesDate = false

    // Search query check
    const query = searchQuery.toLowerCase().trim()
    let matchesSearch = true
    if (query) {
      matchesSearch =
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerPhone.toLowerCase().includes(query)
    }

    return matchesDate && matchesSearch
  })

  // Summary statistics for filtered orders
  const totalFilteredCount = filteredOrders.length
  const totalRevenue = filteredOrders.reduce((sum, o) => sum + (o.total || 0), 0)
  const totalTax = filteredOrders.reduce((sum, o) => sum + (o.tax || 0), 0)
  const upiTotal = filteredOrders.filter(o => o.paymentMethod === 'upi').reduce((sum, o) => sum + (o.total || 0), 0)
  const cashTotal = filteredOrders.filter(o => o.paymentMethod === 'cash').reduce((sum, o) => sum + (o.total || 0), 0)
  const cardTotal = filteredOrders.filter(o => o.paymentMethod === 'card').reduce((sum, o) => sum + (o.total || 0), 0)

  // Quick preset handler
  const handlePreset = (preset: 'today' | 'week' | 'month' | 'all') => {
    const now = new Date()
    setEndDate(now.toISOString().split('T')[0])

    if (preset === 'today') {
      setStartDate(now.toISOString().split('T')[0])
    } else if (preset === 'week') {
      const past = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      setStartDate(past.toISOString().split('T')[0])
    } else if (preset === 'month') {
      const past = new Date(now.getFullYear(), now.getMonth(), 1)
      setStartDate(past.toISOString().split('T')[0])
    } else if (preset === 'all') {
      setStartDate('2020-01-01')
    }
  }

  // Print single order invoice
  const printSingleInvoice = (order: Order) => {
    const windowUrl = ''
    const windowName = `Invoice_${order.orderNumber}`
    const printWindow = window.open(windowUrl, windowName, 'width=800,height=900')

    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice - ${order.orderNumber}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; color: #1a1a1a; }
            .invoice-box { max-width: 700px; margin: auto; border: 1px solid #eee; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05); border-radius: 8px; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #6b3e2e; padding-bottom: 20px; margin-bottom: 20px; }
            .brand { font-size: 24px; font-weight: bold; color: #6b3e2e; }
            .title { font-size: 20px; font-weight: bold; text-align: right; color: #333; }
            .info-grid { display: flex; justify-content: space-between; margin-bottom: 25px; }
            .info-col { font-size: 13px; line-height: 1.6; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
            table th { background: #f8f5f0; color: #6b3e2e; text-align: left; padding: 10px; font-size: 13px; border-bottom: 1px solid #ddd; }
            table td { padding: 10px; font-size: 13px; border-bottom: 1px solid #eee; }
            .totals { margin-left: auto; width: 250px; font-size: 13px; line-height: 1.8; }
            .totals div { display: flex; justify-content: space-between; }
            .grand-total { font-size: 16px; font-weight: bold; color: #6b3e2e; border-top: 2px solid #6b3e2e; pt: 5px; margin-top: 5px; }
            .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #777; border-top: 1px solid #eee; padding-top: 15px; }
            @media print { body { padding: 0; } .invoice-box { border: none; box-shadow: none; } }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="header">
              <div>
                <div class="brand">☕ COFFEE KING</div>
                <div style="font-size: 12px; color: #666; margin-top: 4px;">Surat's Favorite Café & Lounge</div>
                <div style="font-size: 11px; color: #777;">Adajan • Vesu • Katargam • Pal</div>
              </div>
              <div>
                <div class="title">TAX INVOICE</div>
                <div style="font-size: 13px; color: #555; margin-top: 4px;"><strong>Invoice #:</strong> ${order.orderNumber}</div>
                <div style="font-size: 12px; color: #666;">Date: ${new Date(order.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-col">
                <strong>CUSTOMER DETAILS:</strong><br/>
                Name: ${order.customerName}<br/>
                Phone: ${order.customerPhone}<br/>
                ${order.customerEmail ? `Email: ${order.customerEmail}<br/>` : ''}
                ${order.address ? `Address: ${order.address}<br/>` : ''}
              </div>
              <div class="info-col" style="text-align: right;">
                <strong>ORDER METADATA:</strong><br/>
                Type: <span style="text-transform: uppercase;">${order.orderType}</span><br/>
                ${order.tableNumber ? `Table: ${order.tableNumber}<br/>` : ''}
                Payment: <span style="text-transform: uppercase;">${order.paymentMethod}</span><br/>
                Status: <span style="text-transform: uppercase; color: green;">${order.status}</span>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item Description</th>
                  <th style="text-align: center;">Qty</th>
                  <th style="text-align: right;">Unit Price (₹)</th>
                  <th style="text-align: right;">Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map((item, idx) => `
                  <tr>
                    <td>${idx + 1}</td>
                    <td><strong>${item.name}</strong></td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: right;">${item.price.toFixed(2)}</td>
                    <td style="text-align: right;">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <div class="totals">
              <div><span>Subtotal:</span> <span>₹${(order.subtotal || 0).toFixed(2)}</span></div>
              <div><span>GST (8%):</span> <span>₹${(order.tax || 0).toFixed(2)}</span></div>
              <div class="grand-total"><span>Grand Total:</span> <span>₹${(order.total || 0).toFixed(2)}</span></div>
            </div>

            <div class="footer">
              <p>Thank you for dining with Coffee King Surat! ☕</p>
              <p style="font-size: 10px; color: #aaa;">This is a computer-generated invoice.</p>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()
  }

  // Print Date Filtered Invoice Summary Report
  const printFilteredSummaryReport = () => {
    const printWindow = window.open('', 'Invoice_Report_Summary', 'width=900,height=950')
    if (!printWindow) return

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Coffee King - Sales & Invoice Report (${startDate} to ${endDate})</title>
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; padding: 25px; color: #222; }
            .report-header { border-bottom: 2px solid #6b3e2e; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .brand { font-size: 26px; font-weight: bold; color: #6b3e2e; }
            .subtitle { font-size: 13px; color: #666; }
            .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 25px; }
            .stat-card { background: #fdfaf6; border: 1px solid #e8dec8; padding: 15px; rounded: 8px; border-radius: 8px; }
            .stat-card .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #888; }
            .stat-card .value { font-size: 20px; font-weight: bold; color: #6b3e2e; margin-top: 4px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            table th { background: #6b3e2e; color: #fff; text-align: left; padding: 8px 10px; font-size: 12px; }
            table td { padding: 8px 10px; font-size: 12px; border-bottom: 1px solid #eee; }
            table tr:nth-child(even) { background: #fcfcfc; }
            .grand-footer { margin-top: 30px; text-align: right; border-top: 2px solid #6b3e2e; padding-top: 15px; font-size: 14px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="report-header">
            <div>
              <div class="brand">☕ COFFEE KING SURAT</div>
              <div class="subtitle">Official Date-Filtered Invoice & Sales Statement</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 14px; font-weight: bold; color: #6b3e2e;">DATE RANGE REPORT</div>
              <div style="font-size: 12px; color: #555;">From: <strong>${startDate}</strong> To: <strong>${endDate}</strong></div>
              <div style="font-size: 11px; color: #888;">Generated on: ${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div class="stats-grid">
            <div class="stat-card">
              <div class="label">Total Invoices</div>
              <div class="value">${totalFilteredCount}</div>
            </div>
            <div class="stat-card">
              <div class="label">Total Revenue</div>
              <div class="value">₹${totalRevenue.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="label">Total Tax Collected</div>
              <div class="value">₹${totalTax.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="label">UPI / Cash / Card</div>
              <div class="value" style="font-size: 12px; line-height: 1.4;">
                UPI: ₹${upiTotal.toFixed(0)}<br/>
                Cash: ₹${cashTotal.toFixed(0)}<br/>
                Card: ₹${cardTotal.toFixed(0)}
              </div>
            </div>
          </div>

          <h3 style="font-size: 14px; color: #333; margin-bottom: 5px;">Filtered Invoices Breakdown (${totalFilteredCount} Records)</h3>

          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date & Time</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Payment</th>
                <th style="text-align: right;">Subtotal</th>
                <th style="text-align: right;">Tax</th>
                <th style="text-align: right;">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              ${filteredOrders.map(o => `
                <tr>
                  <td><strong>${o.orderNumber}</strong></td>
                  <td>${new Date(o.createdAt).toLocaleString()}</td>
                  <td>${o.customerName} (${o.customerPhone})</td>
                  <td style="text-transform: uppercase;">${o.orderType}</td>
                  <td style="text-transform: uppercase;">${o.paymentMethod}</td>
                  <td style="text-align: right;">₹${(o.subtotal || 0).toFixed(2)}</td>
                  <td style="text-align: right;">₹${(o.tax || 0).toFixed(2)}</td>
                  <td style="text-align: right;"><strong>₹${(o.total || 0).toFixed(2)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="grand-footer">
            Total Revenue for Selected Period: <span style="color: #6b3e2e; font-size: 18px;">₹${totalRevenue.toFixed(2)}</span>
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `

    printWindow.document.open()
    printWindow.document.write(htmlContent)
    printWindow.document.close()
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Invoices & Sales Reports
          </h1>
          <p className="text-foreground/70 text-sm mt-1">
            Filter orders date-wise to view, generate, and print individual or summary invoices.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={printFilteredSummaryReport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-xs shadow-md hover:bg-primary/90 transition-transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print Date Filtered Summary Report
          </button>

          <button
            onClick={loadOrders}
            className="p-2 bg-card border border-border rounded-lg text-foreground hover:bg-secondary transition-colors"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Date Filter & Preset Controls */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Date range inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-secondary/40 border border-border px-3 py-2 rounded-xl">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-bold text-foreground">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-foreground focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 bg-secondary/40 border border-border px-3 py-2 rounded-xl">
              <Calendar className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs font-bold text-foreground">To:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-foreground focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-muted-foreground uppercase mr-1">Presets:</span>
            <button
              onClick={() => handlePreset('today')}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-xs font-bold transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => handlePreset('week')}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-xs font-bold transition-colors"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => handlePreset('month')}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-xs font-bold transition-colors"
            >
              This Month
            </button>
            <button
              onClick={() => handlePreset('all')}
              className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg text-xs font-bold transition-colors"
            >
              All Time
            </button>
          </div>
        </div>

        {/* Search inside date filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search invoice by Order #, Customer Name, or Phone..."
            className="w-full pl-9 pr-3 py-2 bg-secondary/30 border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Filtered Invoices</p>
            <p className="text-2xl font-extrabold text-foreground">{totalFilteredCount}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Total Revenue</p>
            <p className="text-2xl font-extrabold text-emerald-700">₹{totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 text-amber-700 rounded-xl shrink-0">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">GST / Tax Total</p>
            <p className="text-2xl font-extrabold text-amber-700">₹{totalTax.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 text-blue-700 rounded-xl shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-muted-foreground uppercase">Payment Split</p>
            <p className="text-xs font-bold text-foreground mt-0.5">
              UPI: ₹{upiTotal.toFixed(0)} | Cash: ₹{cashTotal.toFixed(0)}
            </p>
          </div>
        </div>
      </div>

      {/* Invoices List Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border bg-secondary/30 flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-foreground">
            Invoices List ({startDate} to {endDate})
          </h2>
          <span className="text-xs font-bold text-primary">
            Showing {totalFilteredCount} Invoices
          </span>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/50 text-muted-foreground font-bold uppercase border-b border-border">
                <tr>
                  <th className="p-4">Invoice #</th>
                  <th className="p-4">Date & Time</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Order Type</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4 text-right">Tax (₹)</th>
                  <th className="p-4 text-right">Total (₹)</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 font-bold text-primary">{order.orderNumber}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-foreground">{order.customerName}</p>
                      <p className="text-muted-foreground text-[11px]">{order.customerPhone}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-secondary text-foreground font-bold uppercase">
                        {order.orderType}
                      </span>
                    </td>
                    <td className="p-4 font-bold uppercase text-foreground">
                      {order.paymentMethod}
                    </td>
                    <td className="p-4 text-right text-muted-foreground">
                      ₹{(order.tax || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-right font-extrabold text-foreground text-sm">
                      ₹{(order.total || 0).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => printSingleInvoice(order)}
                        className="inline-flex items-center gap-1 bg-secondary hover:bg-secondary/80 text-foreground px-3 py-1.5 rounded-lg font-bold text-xs transition-all border border-border shadow-sm"
                      >
                        <Printer className="w-3.5 h-3.5 text-primary" />
                        Print Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-40" />
            <p className="font-semibold text-sm">No invoices found for selected date range ({startDate} to {endDate})</p>
          </div>
        )}
      </div>
    </div>
  )
}
