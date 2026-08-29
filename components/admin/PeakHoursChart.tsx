'use client'

import { useState } from 'react'
import type { PeakHourData } from '@/lib/dashboard-analytics'
import { Clock } from 'lucide-react'

interface PeakHoursChartProps {
  data: PeakHourData[]
}

export default function PeakHoursChart({ data }: PeakHoursChartProps) {
  const [hoveredHour, setHoveredHour] = useState<PeakHourData | null>(null)

  const maxOrders = Math.max(...data.map(d => d.orders), 3)

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-heading font-bold text-foreground">
            Peak Order Hours
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Order frequency by hour of the day (Cafe Rush Analysis)
        </p>
      </div>

      <div className="pt-6 pb-2">
        <div className="h-36 flex items-end justify-between gap-1 px-1">
          {data.map((item, i) => {
            const heightPct = Math.max((item.orders / maxOrders) * 100, 5)
            const isHovered = hoveredHour?.hour === item.hour
            const isPeak = item.orders === maxOrders && maxOrders > 0

            return (
              <div
                key={i}
                className="flex-1 flex flex-col items-center group relative cursor-pointer"
                onMouseEnter={() => setHoveredHour(item)}
                onMouseLeave={() => setHoveredHour(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-12 bg-foreground text-background text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap z-20 pointer-events-none animate-in fade-in-50 duration-100">
                    <p>{item.label}</p>
                    <p className="text-amber-400 font-extrabold">{item.orders} Orders</p>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`w-full max-w-[20px] rounded-t-md transition-all duration-200 ${
                    item.orders > 0
                      ? isPeak
                        ? 'bg-amber-500 shadow-md shadow-amber-500/30'
                        : isHovered
                        ? 'bg-amber-400'
                        : 'bg-amber-500/80'
                      : isHovered
                      ? 'bg-amber-500/40'
                      : 'bg-secondary'
                  }`}
                  style={{ height: `${item.orders > 0 ? heightPct : 6}%` }}
                />

                {/* Hour Label */}
                <span className="text-[9px] text-muted-foreground font-semibold mt-1.5 truncate">
                  {item.label.split(' ')[0]}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
