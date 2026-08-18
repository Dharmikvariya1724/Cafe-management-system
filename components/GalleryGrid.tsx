'use client'

import type { GalleryImage } from '@/lib/types'
import Image from 'next/image'

interface GalleryGridProps {
  images: GalleryImage[]
  onSelectImage?: (image: GalleryImage) => void
}

export function GalleryGrid({ images, onSelectImage }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <div
          key={image.id}
          onClick={() => onSelectImage?.(image)}
          className="relative group overflow-hidden rounded-2xl cursor-pointer h-64 bg-card border border-border shadow-sm hover:shadow-md transition-all"
        >
          {image.src ? (
            <Image
              src={image.src}
              alt={image.alt || image.title || 'Coffee King Gallery Image'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-4xl">
              ☕
            </div>
          )}

          {/* Dark Overlay with Title */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity flex items-end p-4">
            <div className="text-white transform group-hover:-translate-y-1 transition-transform">
              <p className="font-heading font-bold text-sm leading-snug">{image.title}</p>
              <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                {image.category}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
