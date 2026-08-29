'use client'

import type { SystemActivity } from '@/lib/dashboard-analytics'
import { Activity, ShoppingBag, CalendarDays, Star, MessageSquare, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface RecentActivityFeedProps {
  activities: SystemActivity[]
}

export default function RecentActivityFeed({ activities }: RecentActivityFeedProps) {
  if (!activities || activities.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[320px]">
        <Activity className="w-12 h-12 text-muted-foreground/40 mb-3" />
        <p className="text-sm font-semibold text-foreground">No recent system activity</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-heading font-bold text-foreground">
            Recent System Activity
          </h2>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          Live stream of orders, reservations, reviews & inquiries
        </p>

        <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {activities.map(act => {
            let Icon = ShoppingBag
            if (act.type === 'reservation') Icon = CalendarDays
            if (act.type === 'review') Icon = Star
            if (act.type === 'message') Icon = MessageSquare

            const timeFormatted = new Date(act.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })

            return (
              <div key={act.id} className="relative flex items-start gap-3 pl-1">
                <div className={`w-6 h-6 rounded-full ${act.badgeColor} text-white flex items-center justify-center shrink-0 z-10 shadow-xs`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 bg-secondary/30 p-2.5 rounded-xl border border-border/60 hover:bg-secondary/60 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-xs text-foreground truncate">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-muted-foreground shrink-0 font-medium">
                      {timeFormatted}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                    {act.description}
                  </p>
                  <Link
                    href={act.link}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline mt-1.5"
                  >
                    View Details <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
