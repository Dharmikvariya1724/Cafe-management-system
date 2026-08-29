'use client'

import type { CategoryPerformance } from '@/lib/dashboard-analytics'
import { UtensilsCrossed } from 'lucide-react'

interface CategoryBarChartProps {
  data: CategoryPerformance[]
}

export default function CategoryBarChart({ data }: CategoryBarChartProps) {
  const activeData = data.filter(d => d.revenue > 0 || d.orders > 0)
  const maxRevenue = Math.max(...activeData.map(d => d.revenue), 100)

  if (activeData.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
        <UtensilsCrossed className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-semibold text-foreground">No category performance data</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-heading font-bold text-foreground">
          Category Performance
        </h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Revenue contribution & order volume by menu category
        </p>
      </div>

      <div className="mt-5 space-y-4">
        {activeData.map((cat, index) => {
          const widthPct = Math.max((cat.revenue / maxRevenue) * 100, 4)

          return (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-foreground">{cat.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground font-normal">{cat.orders} items sold</span>
                  <span className="text-foreground font-bold">₹{cat.revenue.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden flex items-center">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${widthPct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
