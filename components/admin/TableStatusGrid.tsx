'use client'

import type { TableStatusSummary } from '@/lib/dashboard-analytics'
import { QrCode, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface TableStatusGridProps {
  summary: TableStatusSummary
}

export default function TableStatusGrid({ summary }: TableStatusGridProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-heading font-bold text-foreground">
              Table / Floor Status
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time table occupancy & QR status
          </p>
        </div>

        <Link
          href="/admin/tables"
          className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
        >
          Manage Tables
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Summary Pills */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
          <span className="block text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {summary.available}
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
            Available 🟢
          </span>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-center">
          <span className="block text-xl font-bold text-rose-600 dark:text-rose-400">
            {summary.occupied}
          </span>
          <span className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider">
            Occupied 🔴
          </span>
        </div>

        <div className="bg-slate-500/10 border border-slate-500/20 rounded-xl p-3 text-center">
          <span className="block text-xl font-bold text-slate-600 dark:text-slate-400">
            {summary.inactive}
          </span>
          <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Inactive ⚪
          </span>
        </div>
      </div>

      {/* Table Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {summary.tableList.map(t => {
          let badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300'
          let statusText = 'Available'
          if (t.status === 'occupied') {
            badgeBg = 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
            statusText = `Occupied (${t.activeOrderNumber || 'Order'})`
          } else if (t.status === 'inactive') {
            badgeBg = 'bg-slate-100 text-slate-700 border-slate-300'
            statusText = 'Inactive'
          }

          return (
            <div
              key={t.id}
              className="p-3 bg-secondary/40 border border-border rounded-xl flex flex-col justify-between hover:border-primary/40 transition-colors"
            >
              <div>
                <span className="font-bold text-xs text-foreground block truncate">
                  {t.tableNumber}
                </span>
                <span className="text-[10px] text-muted-foreground block truncate">
                  {t.name}
                </span>
              </div>

              <span className={`inline-block mt-2 px-2 py-0.5 border text-[9px] font-bold rounded-md uppercase tracking-wider truncate ${badgeBg}`}>
                {statusText}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
