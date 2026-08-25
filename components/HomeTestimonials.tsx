'use client'

import { useEffect, useState } from 'react'
import { TestimonialCard } from './TestimonialCard'
import { reviews as staticReviews } from '@/lib/data'
import { Star } from 'lucide-react'
import type { Review } from '@/lib/types'
import { api } from '@/lib/api-client'

export function HomeTestimonials() {
  const [displayReviews, setDisplayReviews] = useState<Review[]>(() =>
    staticReviews.filter((r) => r.verified)
  )

  useEffect(() => {
    const loadVerifiedReviews = async () => {
      try {
        const fetched = await api.getPublicReviews()
        if (fetched && Array.isArray(fetched) && fetched.length > 0) {
          const verifiedOnly = fetched.filter((r: Review) => r.verified)
          setDisplayReviews(verifiedOnly)
          return
        }
      } catch (err) {
        console.warn('API fetch warning for homepage reviews:', err)
      }

      // Local storage fallback
      try {
        const stored = localStorage.getItem('coffee_reviews')
        if (stored) {
          const parsed: Review[] = JSON.parse(stored)
          const verifiedOnly = parsed.filter((r) => r.verified)
          setDisplayReviews(verifiedOnly.length > 0 ? verifiedOnly : staticReviews.filter((r) => r.verified))
        }
      } catch (e) {
        console.error('Failed to load local reviews:', e)
      }
    }

    loadVerifiedReviews()

    const handleUpdate = () => loadVerifiedReviews()
    window.addEventListener('reviewsUpdated', handleUpdate)
    return () => window.removeEventListener('reviewsUpdated', handleUpdate)
  }, [])

  if (displayReviews.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-2">
          <div className="flex justify-center text-amber-500 gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-4xl font-heading font-extrabold text-foreground">
            What Our Guests Say
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base">
            Verified ratings & customer reviews from our valued guests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayReviews.slice(0, 6).map((review) => (
            <TestimonialCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
