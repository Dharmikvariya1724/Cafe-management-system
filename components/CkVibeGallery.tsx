'use client'

import Image from 'next/image'
import Link from 'next/link'
import { galleryImages } from '@/lib/data'
import { Camera, ArrowRight } from 'lucide-react'

export function CkVibeGallery() {
  const vibeItems = [
    { title: 'SPECIALTY COFFEE BEANS', category: 'COFFEE', src: '/images/espresso.png' },
    { title: 'EXPERT BARISTA AT WORK', category: 'BEHIND THE SCENES', src: '/images/cappuccino.png' },
    { title: 'COZY LOUNGE SEATING', category: 'OUR SPACE', src: '/images/outlet-adajan.jpg' },
    { title: 'OUTDOOR PATIO VIBES', category: 'OUTLETS', src: '/images/outlet-vesu.jpg' },
    { title: 'ARTISANAL BAKERY', category: 'FOOD', src: '/images/croissant.png' },
    { title: 'ICED REFRESHERS', category: 'COLD BREWS', src: '/images/latte.png' },
    { title: 'SIGNATURE CAPPUCCINO', category: 'LATTE ART', src: '/images/cappuccino.png' },
    { title: 'EVENING LOUNGE AMBIANCE', category: 'ATMOSPHERE', src: '/images/outlet-katargam.jpg' },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/40 via-card/50 to-secondary/30 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            OUR SPACE & ATMOSPHERE
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground">
            The CK <span className="italic text-primary">Vibe</span>
          </h2>
          <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
            A glimpse into the everyday moments that make Coffee King special.
          </p>
        </div>

        {/* 8-Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {vibeItems.map((item, idx) => (
            <div
              key={idx}
              className="relative h-60 rounded-2xl overflow-hidden group border border-border shadow-sm bg-card cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Title & Category Badge */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block mb-0.5">
                  {item.category}
                </span>
                <p className="font-heading font-bold text-xs sm:text-sm leading-tight text-white group-hover:text-amber-200 transition-colors">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Camera className="w-4 h-4" />
            Explore Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
