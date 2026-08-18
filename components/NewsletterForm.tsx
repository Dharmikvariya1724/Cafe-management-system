'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email) {
      setError('Please enter your email')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }

    // Store in localStorage for mock implementation
    const subscribers = JSON.parse(localStorage.getItem('newsletter-subscribers') || '[]')
    if (!subscribers.includes(email)) {
      subscribers.push(email)
      localStorage.setItem('newsletter-subscribers', JSON.stringify(subscribers))
    }

    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2 whitespace-nowrap"
      >
        {submitted ? (
          <>
            <Check className="w-5 h-5" />
            Subscribed
          </>
        ) : (
          'Subscribe'
        )}
      </button>

      {error && (
        <div className="absolute bottom-full left-0 mb-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </form>
  )
}
