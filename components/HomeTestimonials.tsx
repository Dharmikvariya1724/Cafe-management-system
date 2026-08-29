'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { TestimonialCard } from './TestimonialCard'
import { reviews as staticReviews } from '@/lib/data'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Review } from '@/lib/types'
import { api } from '@/lib/api-client'

export function HomeTestimonials() {
  const [displayReviews, setDisplayReviews] = useState<Review[]>(() =>
    staticReviews.filter((r) => r.verified)
  )

  // 1. Fetch Verified Reviews from API / Local Storage / Fallback
  useEffect(() => {
    const loadVerifiedReviews = async () => {
      try {
        const fetched = await api.getPublicReviews()
        if (fetched && Array.isArray(fetched) && fetched.length > 0) {
          const verifiedOnly = fetched.filter((r: Review) => r.verified)
          if (verifiedOnly.length > 0) {
            setDisplayReviews(verifiedOnly)
            return
          }
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
          if (verifiedOnly.length > 0) {
            setDisplayReviews(verifiedOnly)
            return
          }
        }
      } catch (e) {
        console.error('Failed to load local reviews:', e)
      }

      // Default static fallback
      const fallback = staticReviews.filter((r) => r.verified)
      if (fallback.length > 0) {
        setDisplayReviews(fallback)
      }
    }

    loadVerifiedReviews()

    const handleUpdate = () => loadVerifiedReviews()
    window.addEventListener('reviewsUpdated', handleUpdate)
    return () => window.removeEventListener('reviewsUpdated', handleUpdate)
  }, [])

  // Ensure effective reviews count is at least 6 for smooth multi-card looping
  const effectiveReviews = displayReviews.length > 0 && displayReviews.length < 4
    ? [...displayReviews, ...displayReviews, ...displayReviews]
    : displayReviews

  const baseCount = effectiveReviews.length

  // 2. Responsive Breakpoint Detection
  const [visibleCards, setVisibleCards] = useState<number>(3)

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleCards(1)
      } else if (width < 1024) {
        setVisibleCards(2)
      } else {
        setVisibleCards(3)
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  // 3. Infinite Looping Index State
  // extended array = [...clonedBefore, ...effectiveReviews, ...clonedAfter]
  const [currentIndex, setCurrentIndex] = useState<number>(visibleCards)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  // Sync initial index when visibleCards changes
  useEffect(() => {
    setCurrentIndex(visibleCards)
    setIsTransitioning(false)
  }, [visibleCards, baseCount])

  // Buffer clones
  const clonedBefore = effectiveReviews.slice(-visibleCards)
  const clonedAfter = effectiveReviews.slice(0, visibleCards)
  const extendedReviews = [...clonedBefore, ...effectiveReviews, ...clonedAfter]

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const prevSlide = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true)
    setCurrentIndex(index + visibleCards)
  }, [visibleCards])

  // Handle transition end for seamless infinite loop reset
  const handleTransitionEnd = () => {
    if (currentIndex >= baseCount + visibleCards) {
      setIsTransitioning(false)
      setCurrentIndex(visibleCards)
    } else if (currentIndex < visibleCards) {
      setIsTransitioning(false)
      setCurrentIndex(baseCount + visibleCards - 1)
    }
  }

  // 4. Autoplay (4.5 seconds interval)
  useEffect(() => {
    if (isHovered || baseCount === 0) return

    const timer = setInterval(() => {
      nextSlide()
    }, 4500)

    return () => clearInterval(timer)
  }, [isHovered, nextSlide, baseCount])

  // 5. Touch / Swipe Navigation Handlers
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const distance = touchStartX.current - touchEndX.current
    const minSwipeDistance = 40

    if (distance > minSwipeDistance) {
      nextSlide()
    } else if (distance < -minSwipeDistance) {
      prevSlide()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  if (baseCount === 0) {
    return null
  }

  // Calculate current active real index for pagination dots
  const realActiveIndex = ((currentIndex - visibleCards) % baseCount + baseCount) % baseCount

  return (
    <section
      className="py-20 bg-background border-b border-border overflow-hidden select-none"
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer Testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-2">
          <div className="flex justify-center text-amber-500 gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-foreground">
            What Our Guests Say
          </h2>
          <p className="text-foreground/70 text-sm sm:text-base max-w-xl mx-auto">
            Verified ratings & customer reviews from our valued guests across all Coffee King outlets
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative px-2 sm:px-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 hover:bg-primary hover:text-primary-foreground border border-border shadow-lg flex items-center justify-center text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 hover:bg-primary hover:text-primary-foreground border border-border shadow-lg flex items-center justify-center text-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 hover:scale-110 active:scale-95 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Track Container */}
          <div
            className="overflow-hidden touch-pan-y rounded-3xl py-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                transition: isTransitioning ? 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedReviews.map((review, idx) => (
                <div
                  key={`${review.id}-${idx}`}
                  className="px-3 shrink-0"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <TestimonialCard review={review} />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div
            className="flex justify-center items-center gap-2 mt-8"
            role="group"
            aria-label="Testimonial slides navigation"
          >
            {effectiveReviews.map((_, i) => {
              const isActive = realActiveIndex === i
              return (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer ${
                    isActive
                      ? 'w-8 h-2.5 bg-primary shadow-sm'
                      : 'w-2.5 h-2.5 bg-foreground/20 hover:bg-foreground/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

