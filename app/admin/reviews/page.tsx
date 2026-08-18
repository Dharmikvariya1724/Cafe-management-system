'use client'

import { useEffect, useState } from 'react'
import { reviews } from '@/lib/data'
import { Star, Trash2, Eye, EyeOff } from 'lucide-react'

export default function AdminReviews() {
  const [allReviews, setAllReviews] = useState(reviews)
  const [filter, setFilter] = useState<'all' | 'approved' | 'hidden'>('all')

  const filteredReviews = allReviews.filter(r =>
    filter === 'all' ? true : filter === 'approved' ? r.verified : !r.verified
  )

  const deleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setAllReviews(allReviews.filter(r => r.id !== id))
    }
  }

  const toggleReviewStatus = (id: string) => {
    setAllReviews(allReviews.map(r =>
      r.id === id ? { ...r, verified: !r.verified } : r
    ))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Reviews
        </h1>
        <p className="text-foreground/70">
          Manage and moderate customer reviews
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['all', 'approved', 'hidden'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {status === 'all' ? 'All' : status === 'approved' ? 'Approved' : 'Hidden'}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div key={review.id} className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-accent text-accent'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleReviewStatus(review.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      review.verified
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    title={review.verified ? 'Hide review' : 'Approve review'}
                  >
                    {review.verified ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-foreground/80 mb-3">
                &ldquo;{review.text}&rdquo;
              </p>

              <p className="text-sm text-foreground/60">
                {new Date(review.date).toLocaleDateString()}
              </p>

              {!review.verified && (
                <div className="mt-3 inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  Pending Approval
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-card rounded-lg border border-border p-12 text-center text-foreground/70">
            No reviews found
          </div>
        )}
      </div>
    </div>
  )
}
