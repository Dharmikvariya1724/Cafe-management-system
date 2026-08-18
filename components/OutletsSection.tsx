'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { OUTLETS } from '@/lib/constants'
import { MapPin, Phone, Clock, ExternalLink, MessageCircle } from 'lucide-react'

export function OutletsSection() {
  const [activeThumbnails, setActiveThumbnails] = useState<Record<string, string>>({})

  const handleThumbnailClick = (outletId: string, thumbSrc: string) => {
    setActiveThumbnails((prev) => ({ ...prev, [outletId]: thumbSrc }))
  }

  return (
    <section className="py-20 bg-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            OUR LOCATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground">
            Coffee King Lounge <span className="italic text-primary">Outlets</span> in Surat
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
            Visit any of our 4 vibrant outlets across Surat for exceptional coffee, artisan snacks, and relaxing vibe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {OUTLETS.map((outlet) => {
            const currentImg = activeThumbnails[outlet.id] || outlet.image

            return (
              <div
                key={outlet.id}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    src={currentImg}
                    alt={outlet.name}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 text-[10px] uppercase font-bold bg-primary text-primary-foreground px-2.5 py-1 rounded-full shadow">
                    {outlet.badge}
                  </span>
                </div>

                {/* Thumbnails */}
                {outlet.thumbnails && outlet.thumbnails.length > 0 && (
                  <div className="flex gap-2 p-3 bg-secondary/20 border-b border-border overflow-x-auto">
                    {outlet.thumbnails.map((thumb, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleThumbnailClick(outlet.id, thumb)}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 shrink-0 transition-transform ${
                          currentImg === thumb ? 'border-primary scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <Image src={thumb} alt={`${outlet.name} view ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-foreground">{outlet.name}</h3>
                    <p className="text-xs text-foreground/70 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </p>
                    <p className="text-xs text-foreground/70 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{outlet.timing}</span>
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-border/60">
                    <a
                      href={`tel:${outlet.phone}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call Outlet
                    </a>
                    {outlet.whatsapp && (
                      <a
                        href={outlet.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
