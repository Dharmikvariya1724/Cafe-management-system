'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { GalleryGrid } from '@/components/GalleryGrid'
import { galleryImages as defaultGalleryImages } from '@/lib/data'
import { GALLERY_CATEGORIES } from '@/lib/constants'
import type { GalleryImage, GalleryCategory } from '@/lib/types'
import { X } from 'lucide-react'

export default function GalleryContent() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'all'>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(defaultGalleryImages)

  useEffect(() => {
    const stored = localStorage.getItem('coffee_gallery_images')
    if (stored) {
      try {
        setGalleryImages(JSON.parse(stored))
      } catch {
        setGalleryImages(defaultGalleryImages)
      }
    } else {
      setGalleryImages(defaultGalleryImages)
    }
  }, [])

  const filteredImages = useMemo(() => {
    return galleryImages.filter(image =>
      selectedCategory === 'all' || image.category === selectedCategory
    )
  }, [selectedCategory, galleryImages])

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Gallery
          </h1>
          <p className="text-lg text-foreground/70">
            Explore our cafe and the joy we create
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              All
            </button>
            {GALLERY_CATEGORIES.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value as GalleryCategory)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-foreground/70 mb-6">
            {filteredImages.length} images
          </p>
          <GalleryGrid images={filteredImages} />
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="bg-white rounded-lg overflow-hidden max-h-screen">
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center text-8xl">
                📸
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-foreground/70 capitalize">
                  {selectedImage.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
