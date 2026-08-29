'use client'

import type { BusinessInsight } from '@/lib/dashboard-analytics'
import { Sparkles, TrendingUp, AlertTriangle, Info } from 'lucide-react'

interface SalesInsightsCardProps {
  insights: BusinessInsight[]
}

export default function SalesInsightsCard({ insights }: SalesInsightsCardProps) {
  if (!insights || insights.length === 0) return null

  return (
    <div className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-primary/15 text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-bold text-foreground">
            Sales & Business Insights
          </h2>
          <p className="text-xs text-muted-foreground">
            Calculated key highlights from your live store data
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {insights.map(ins => {
          let icon = <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          let borderClass = 'border-blue-500/20 bg-blue-500/5'

          if (ins.type === 'positive') {
            icon = <TrendingUp className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            borderClass = 'border-emerald-500/20 bg-emerald-500/5'
          } else if (ins.type === 'warning') {
            icon = <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            borderClass = 'border-amber-500/20 bg-amber-500/5'
          }

          return (
            <div
              key={ins.id}
              className={`p-3.5 rounded-xl border ${borderClass} flex items-start gap-3 transition-transform duration-200 hover:-translate-y-0.5`}
            >
              {icon}
              <div>
                <h4 className="text-xs font-bold text-foreground mb-0.5">
                  {ins.title}
                </h4>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {ins.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
