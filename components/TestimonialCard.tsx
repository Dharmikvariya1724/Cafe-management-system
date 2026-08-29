import type { Review } from '@/lib/types'
import { Star, CheckCheck, Quote } from 'lucide-react'

interface TestimonialCardProps {
  review: Review
}

export function TestimonialCard({ review }: TestimonialCardProps) {
  const subtitle = [review.role, review.location].filter(Boolean).join(' • ') || 'Verified Guest'

  return (
    <div className="bg-card rounded-2xl p-6 sm:p-7 border border-border/80 shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between h-full group select-none relative overflow-hidden">
      {/* Subtle Background Accent Quote Icon */}
      <Quote className="absolute top-4 right-4 w-12 h-12 text-primary/5 group-hover:text-primary/10 transition-colors pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${
                i < review.rating
                  ? 'fill-amber-400 text-amber-500'
                  : 'fill-muted/20 text-muted-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-foreground/90 text-sm sm:text-base leading-relaxed italic mb-6 line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-border/50">
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-amber-500 p-0.5 shrink-0 shadow-sm">
          <div className="w-full h-full bg-card rounded-full flex items-center justify-center text-primary font-bold text-base uppercase overflow-hidden">
            {review.photo && review.photo.startsWith('/') ? (
              <img
                src={review.photo}
                alt={review.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to text initial if image fails
                  (e.target as HTMLElement).style.display = 'none'
                }}
              />
            ) : null}
            <span>{review.name.charAt(0)}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="font-extrabold text-sm sm:text-base text-foreground truncate">
              {review.name}
            </h3>
            {review.verified && (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
                <CheckCheck className="w-3 h-3" />
                Verified
              </span>
            )}
          </div>
          <p className="text-xs text-foreground/60 truncate mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

