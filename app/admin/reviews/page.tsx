'use client'

import { useEffect, useState } from 'react'
import { reviews as initialReviews } from '@/lib/data'
import { Star, Trash2, CheckSquare, Square, ShoppingBag, RefreshCw } from 'lucide-react'
import { api } from '@/lib/api-client'
import type { Review } from '@/lib/types'

export default function AdminReviews() {
  const [allReviews, setAllReviews] = useState<Review[]>([])
  const [filter, setFilter] = useState<'all' | 'approved' | 'hidden'>('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  const loadReviews = async () => {
    setIsRefreshing(true)
    try {
      const data = await api.getReviews()
      if (data && Array.isArray(data) && data.length > 0) {
        setAllReviews(data)
        localStorage.setItem('coffee_reviews', JSON.stringify(data))
      } else {
        const stored = localStorage.getItem('coffee_reviews')
        if (stored) {
          setAllReviews(JSON.parse(stored))
        } else {
          setAllReviews(initialReviews)
          localStorage.setItem('coffee_reviews', JSON.stringify(initialReviews))
        }
      }
    } catch (err) {
      console.error('Failed to load reviews:', err)
      const stored = localStorage.getItem('coffee_reviews')
      if (stored) {
        setAllReviews(JSON.parse(stored))
      } else {
        setAllReviews(initialReviews)
      }
    }
    setTimeout(() => setIsRefreshing(false), 400)
  }

  useEffect(() => {
    loadReviews()

    const handleUpdate = () => loadReviews()
    window.addEventListener('reviewsUpdated', handleUpdate)
    return () => window.removeEventListener('reviewsUpdated', handleUpdate)
  }, [])

  const saveReviewsToStorage = (updated: Review[]) => {
    setAllReviews(updated)
    try {
      localStorage.setItem('coffee_reviews', JSON.stringify(updated))
      window.dispatchEvent(new Event('reviewsUpdated'))
    } catch (e) {
      console.error('Failed saving reviews:', e)
    }
  }

  const filteredReviews = allReviews.filter(r =>
    filter === 'all' ? true : filter === 'approved' ? r.verified : !r.verified
  )

  const deleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      await api.deleteReview(id)
      const updated = allReviews.filter(r => r.id !== id)
      saveReviewsToStorage(updated)
    }
  }

  const toggleReviewCheckbox = async (id: string, currentVerified: boolean) => {
    const nextState = !currentVerified
    await api.toggleReviewVerification(id, nextState)

    const updated = allReviews.map(r =>
      r.id === id ? { ...r, verified: nextState } : r
    )
    saveReviewsToStorage(updated)
  }

  const approvedCount = allReviews.filter(r => r.verified).length
  const pendingCount = allReviews.filter(r => !r.verified).length

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Customer Reviews & Ratings
          </h1>
          <p className="text-foreground/70 text-sm mt-1">
            Check the checkbox on any review to publish it on the public User Side.
          </p>
        </div>

        <button
          onClick={loadReviews}
          className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors shadow-sm self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh Reviews
        </button>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">Total Reviews</p>
            <p className="text-2xl font-bold text-foreground">{allReviews.length}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-green-700 uppercase">Shown on User Side</p>
            <p className="text-2xl font-bold text-green-700">{approvedCount}</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-700 uppercase">Pending Approval</p>
            <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'approved', 'hidden'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              filter === status
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {status === 'all' ? `All Reviews (${allReviews.length})` : status === 'approved' ? `Published (${approvedCount})` : `Hidden / Pending (${pendingCount})`}
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div
              key={review.id}
              className={`bg-card rounded-2xl border p-6 transition-all shadow-sm ${
                review.verified ? 'border-green-300/80 bg-green-50/10' : 'border-amber-300/80 bg-amber-50/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-border">
                {/* Left: Customer Info & Rating */}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-heading font-bold text-lg text-foreground">
                      {review.name}
                    </h3>
                    {review.orderNumber && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20">
                        <ShoppingBag className="w-3 h-3" />
                        Order {review.orderNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold ml-1 text-foreground/80">
                      {review.rating}.0 / 5.0
                    </span>
                  </div>
                </div>

                {/* Right: Checkbox Control + Delete */}
                <div className="flex items-center gap-3">
                  {/* ADMIN CHECKBOX */}
                  <label
                    onClick={() => toggleReviewCheckbox(review.id, review.verified)}
                    className={`cursor-pointer inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      review.verified
                        ? 'bg-green-600 text-white border-green-600 shadow-sm hover:bg-green-700'
                        : 'bg-card text-foreground border-border hover:bg-secondary'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={review.verified}
                      onChange={() => {}} // handled by label onClick
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary cursor-pointer"
                    />
                    <span>
                      {review.verified ? 'Show on User Side (Checked)' : 'Show on User Side (Unchecked)'}
                    </span>
                  </label>

                  <button
                    onClick={() => deleteReview(review.id)}
                    className="p-2.5 bg-rose-100 text-rose-700 rounded-xl hover:bg-rose-200 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-foreground/90 text-sm sm:text-base leading-relaxed mb-3">
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <span>
                  Submitted on {new Date(review.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                </span>
                <span className={`font-bold ${review.verified ? 'text-green-600' : 'text-amber-600'}`}>
                  {review.verified ? '✓ Visible to Website Customers' : '⏳ Hidden from User Side'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card rounded-2xl border border-border p-12 text-center text-muted-foreground">
            No reviews found matching status
          </div>
        )}
      </div>
    </div>
  )
}
