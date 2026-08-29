'use client'

import { useState } from 'react'
import { Calendar, ChevronDown, Check } from 'lucide-react'
import type { DateFilter, DateRangePreset } from '@/lib/dashboard-analytics'

interface DashboardDateFilterProps {
  value: DateFilter
  onChange: (filter: DateFilter) => void
}

const presets: Array<{ id: DateRangePreset; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7days', label: 'Last 7 Days' },
  { id: '30days', label: 'Last 30 Days' },
  { id: 'thisMonth', label: 'This Month' },
  { id: 'lastMonth', label: 'Last Month' },
  { id: 'thisYear', label: 'This Year' },
  { id: 'custom', label: 'Custom Range' },
]

export default function DashboardDateFilter({ value, onChange }: DashboardDateFilterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [customStart, setCustomStart] = useState(value.startDate || '')
  const [customEnd, setCustomEnd] = useState(value.endDate || '')

  const currentLabel = presets.find(p => p.id === value.preset)?.label || 'Last 30 Days'

  const handleSelectPreset = (preset: DateRangePreset) => {
    if (preset === 'custom') {
      setShowCustomModal(true)
      setIsOpen(false)
      return
    }

    onChange({ preset })
    setIsOpen(false)
  }

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customStart || !customEnd) return

    onChange({
      preset: 'custom',
      startDate: customStart,
      endDate: customEnd
    })
    setShowCustomModal(false)
  }

  return (
    <div className="relative">
      {/* Date Filter Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2.5 px-4 py-2 bg-card hover:bg-secondary border border-border rounded-xl shadow-sm text-sm font-semibold text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Calendar className="w-4 h-4 text-primary" />
        <span>{currentLabel}</span>
        {value.preset === 'custom' && value.startDate && value.endDate && (
          <span className="text-xs font-normal text-muted-foreground">
            ({value.startDate} - {value.endDate})
          </span>
        )}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl z-50 py-2 animate-in fade-in-80 zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50">
            Select Timeframe
          </div>
          {presets.map(p => {
            const isSelected = value.preset === p.id
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                <span>{p.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            )
          })}
        </div>
      )}

      {/* Custom Range Picker Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-heading font-bold text-foreground mb-4">
              Select Custom Date Range
            </h3>
            <form onSubmit={handleApplyCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Apply Range
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
