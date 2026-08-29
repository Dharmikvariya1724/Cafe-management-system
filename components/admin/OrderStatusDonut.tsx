'use client'

import { useState } from 'react'
import type { OrderStatusCount } from '@/lib/dashboard-analytics'
import { PieChart } from 'lucide-react'

interface OrderStatusDonutProps {
  data: OrderStatusCount[]
}

export default function OrderStatusDonut({ data }: OrderStatusDonutProps) {
  const [hoveredStatus, setHoveredStatus] = useState<OrderStatusCount | null>(null)

  const activeData = data.filter(d => d.count > 0)
  const totalOrders = activeData.reduce((acc, d) => acc + d.count, 0)

  if (activeData.length === 0 || totalOrders === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
        <PieChart className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-semibold text-foreground">No order status data</p>
        <p className="text-xs text-muted-foreground mt-1">Orders placed in this period will appear here</p>
      </div>
    )
  }

  // Calculate SVG arc paths
  const radius = 70
  const strokeWidth = 24
  const circumference = 2 * Math.PI * radius
  let accumulatedAngle = 0

  const segments = activeData.map((d) => {
    const strokeDasharray = `${(d.percentage / 100) * circumference} ${circumference}`
    const strokeDashoffset = -accumulatedAngle
    accumulatedAngle += (d.percentage / 100) * circumference

    return {
      ...d,
      strokeDasharray,
      strokeDashoffset
    }
  })

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      {/* Header */}
      <div>
        <h2 className="text-lg font-heading font-bold text-foreground">
          Order Status Distribution
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time breakdown of current order fulfillment
        </p>
      </div>

      {/* Donut Chart & Legend */}
      <div className="my-4 flex flex-col sm:flex-row items-center justify-around gap-6">
        {/* SVG Donut */}
        <div className="relative w-44 h-44 shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
            {segments.map((seg, i) => {
              const isHovered = hoveredStatus?.status === seg.status
              return (
                <circle
                  key={i}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseEnter={() => setHoveredStatus(seg)}
                  onMouseLeave={() => setHoveredStatus(null)}
                />
              )
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-2xl font-extrabold font-heading text-foreground">
              {hoveredStatus ? hoveredStatus.count : totalOrders}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {hoveredStatus ? hoveredStatus.label : 'Total Orders'}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="space-y-2.5 w-full sm:w-auto">
          {activeData.map((d, i) => {
            const isHovered = hoveredStatus?.status === d.status
            return (
              <div
                key={i}
                className={`flex items-center justify-between gap-4 p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  isHovered ? 'bg-secondary font-bold' : 'hover:bg-secondary/50'
                }`}
                onMouseEnter={() => setHoveredStatus(d)}
                onMouseLeave={() => setHoveredStatus(null)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-foreground font-medium">{d.label}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <span>{d.count}</span>
                  <span className="text-muted-foreground text-[10px]">({d.percentage}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
