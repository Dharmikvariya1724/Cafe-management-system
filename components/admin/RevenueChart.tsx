'use client'

import { useState } from 'react'
import type { RevenuePoint } from '@/lib/dashboard-analytics'
import { TrendingUp, IndianRupee } from 'lucide-react'

interface RevenueChartProps {
  data: RevenuePoint[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const [hoveredPoint, setHoveredPoint] = useState<RevenuePoint | null>(null)
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null)

  if (!data || data.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
        <IndianRupee className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-semibold text-foreground">No revenue data available</p>
        <p className="text-xs text-muted-foreground mt-1">Try selecting a broader date range</p>
      </div>
    )
  }

  const maxRevenue = Math.max(...data.map(d => d.revenue), 100)
  const height = 240
  const width = 600
  const paddingX = 40
  const paddingY = 30

  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * chartWidth
    const y = height - paddingY - (d.revenue / maxRevenue) * chartHeight
    return { x, y, data: d }
  })

  // Build SVG path
  const linePath = points.reduce((acc, point, index) => {
    return index === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`
  }, '')

  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`
    : ''

  const totalPeriodRevenue = data.reduce((sum, d) => sum + d.revenue, 0)

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-heading font-bold text-foreground">
              Revenue Overview
            </h2>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold rounded-full uppercase tracking-wider flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Live Sales
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Total for selected period: <span className="font-bold text-foreground">₹{totalPeriodRevenue.toLocaleString('en-IN')}</span>
          </p>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingY + ratio * chartHeight
            const val = Math.round(maxRevenue * (1 - ratio))
            return (
              <g key={i}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                />
                <text
                  x={paddingX - 8}
                  y={y + 4}
                  fill="currentColor"
                  className="text-[9px] fill-muted-foreground"
                  textAnchor="end"
                >
                  ₹{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                </text>
              </g>
            )
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#revenueGradient)" />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredPoint?.date === pt.data.date
            return (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  className="fill-emerald-500 stroke-card transition-all duration-150 cursor-pointer"
                  strokeWidth="2"
                  onMouseEnter={() => {
                    setHoveredPoint(pt.data)
                    setHoverPos({ x: pt.x, y: pt.y })
                  }}
                  onMouseLeave={() => {
                    setHoveredPoint(null)
                    setHoverPos(null)
                  }}
                />
              </g>
            )
          })}

          {/* X Axis Labels */}
          {points.map((pt, i) => {
            // Show subset of labels if too many points
            const step = Math.ceil(points.length / 7)
            if (i % step !== 0 && i !== points.length - 1) return null

            return (
              <text
                key={i}
                x={pt.x}
                y={height - 8}
                fill="currentColor"
                className="text-[10px] fill-muted-foreground font-medium"
                textAnchor="middle"
              >
                {pt.data.label}
              </text>
            )
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredPoint && hoverPos && (
          <div
            className="absolute bg-foreground text-background text-xs rounded-lg p-2.5 shadow-xl pointer-events-none z-20 border border-background/20 animate-in fade-in-50 duration-100"
            style={{
              left: `${(hoverPos.x / width) * 100}%`,
              top: `${(hoverPos.y / height) * 100}%`,
              transform: 'translate(-50%, -120%)'
            }}
          >
            <p className="font-bold text-[11px] opacity-80">{hoveredPoint.label}</p>
            <p className="font-extrabold text-sm text-emerald-400">
              ₹{hoveredPoint.revenue.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] opacity-70 mt-0.5">
              {hoveredPoint.orders} order{hoveredPoint.orders !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
