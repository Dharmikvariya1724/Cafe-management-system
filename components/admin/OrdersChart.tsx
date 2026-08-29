'use client'

import { useState } from 'react'
import type { RevenuePoint } from '@/lib/dashboard-analytics'
import { ShoppingBag } from 'lucide-react'

interface OrdersChartProps {
  data: RevenuePoint[]
}

export default function OrdersChart({ data }: OrdersChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<RevenuePoint | null>(null)

  if (!data || data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-semibold text-foreground">No orders data available</p>
      </div>
    )
  }

  const maxOrders = Math.max(...data.map(d => d.orders), 5)
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0)

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground">
            Orders Overview
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total orders placed: <span className="font-bold text-foreground">{totalOrders}</span>
          </p>
        </div>
      </div>

      {/* Bar Chart Container */}
      <div className="pt-4 pb-2">
        <div className="h-44 flex items-end justify-between gap-1.5 px-2">
          {data.map((d, index) => {
            const heightPct = Math.max((d.orders / maxOrders) * 100, 6)
            const isHovered = hoveredPoint?.date === d.date

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group relative cursor-pointer"
                onMouseEnter={() => setHoveredPoint(d)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 bg-foreground text-background text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none animate-in fade-in-50 duration-100">
                    <p>{d.label}</p>
                    <p className="text-blue-400 font-extrabold">{d.orders} Orders</p>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full max-w-[28px] rounded-t-lg transition-all duration-200 ${
                    isHovered
                      ? 'bg-blue-600 dark:bg-blue-400 scale-105 shadow-md'
                      : 'bg-blue-500/80 hover:bg-blue-500'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />

                {/* Label */}
                <span className="text-[10px] text-muted-foreground font-medium mt-2 truncate w-full text-center">
                  {d.label.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
