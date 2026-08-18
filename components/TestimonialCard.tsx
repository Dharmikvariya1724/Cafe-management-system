import type { Review } from '@/lib/types'
import { Star, Check } from 'lucide-react'

interface TestimonialCardProps {
  review: Review
}

export function TestimonialCard({ review }: TestimonialCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating ? 'fill-accent text-accent' : 'text-muted'
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-foreground/90 mb-4 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {review.photo && (
          <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              {review.name.charAt(0)}
            </div>
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">
            {review.name}
          </p>
          {review.verified && (
            <div className="flex items-center gap-1 text-xs text-primary">
              <Check className="w-3 h-3" />
              Verified
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
