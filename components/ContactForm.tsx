'use client'

import { useState } from 'react'
import type { ContactMessage } from '@/lib/types'
import { Mail, Phone, MessageSquare, Check, User, Send, Store, Sparkles, AlertCircle } from 'lucide-react'
import { api } from '@/lib/api-client'

const INQUIRY_TYPES = [
  { id: 'general', label: 'General Inquiry' },
  { id: 'reservation', label: 'Party / Table Booking' },
  { id: 'franchise', label: 'Franchise Partner' },
  { id: 'feedback', label: 'Feedback & Support' }
]

const OUTLET_OPTIONS = [
  { id: 'all', label: 'All Outlets / HQ' },
  { id: 'adajan', label: 'CK Adajan' },
  { id: 'vesu', label: 'CK Vesu' },
  { id: 'katargam', label: 'CK Katargam' },
  { id: 'pal', label: 'CK Pal' }
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [inquiryType, setInquiryType] = useState('general')
  const [selectedOutlet, setSelectedOutlet] = useState('all')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Please provide details in your message'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    const generatedId = `CK-${Math.floor(100000 + Math.random() * 900000)}`
    setTicketId(generatedId)

    // Create contact message
    const messageItem: ContactMessage = {
      id: generatedId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: `[${inquiryType.toUpperCase()}] ${formData.subject}`,
      message: `[Outlet: ${selectedOutlet}] ${formData.message}`,
      createdAt: new Date().toISOString(),
      replied: false
    }

    // Save to MongoDB via API
    await api.createMessage(messageItem)

    // Store in localStorage fallback
    try {
      const messages = JSON.parse(localStorage.getItem('contact-messages') || '[]')
      messages.push(messageItem)
      localStorage.setItem('contact-messages', JSON.stringify(messages))
    } catch (err) {
      console.error('Failed to save message', err)
    }

    setSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="bg-card/80 backdrop-blur-md rounded-3xl border border-primary/15 p-6 sm:p-8 shadow-xl shadow-primary/5 relative overflow-hidden">
      {/* Decorative light glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Direct Hospitality Support
        </div>
        <h3 className="text-2xl font-heading font-extrabold text-foreground">
          Send Us a Message
        </h3>
        <p className="text-sm text-foreground/70 mt-1">
          Have a question about our menu, outlets, party bookings, or franchising? We usually respond within 2 hours.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <div>
            <h4 className="text-xl font-heading font-bold text-foreground">
              Thank You! Message Received
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Ticket ID: <span className="font-mono font-bold text-primary">{ticketId}</span>
            </p>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed max-w-md mx-auto">
            Your inquiry has been routed to our Coffee King hospitality team. We will get in touch with you via email or phone shortly!
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors shadow-md"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inquiry Type Pills */}
          <div>
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              Select Inquiry Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {INQUIRY_TYPES.map(type => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setInquiryType(type.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border text-center ${
                    inquiryType === type.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-[1.02]'
                      : 'bg-secondary/40 text-foreground/80 border-border hover:bg-secondary'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Preferred Outlet Dropdown */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Target Outlet (Optional)
              </label>
              <div className="relative">
                <Store className="w-4 h-4 text-primary absolute left-3.5 top-3.5 pointer-events-none" />
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  {OUTLET_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.name ? 'border-red-500 bg-red-500/5' : 'border-border'
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 inline" /> {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 bg-background border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                    errors.email ? 'border-red-500 bg-red-500/5' : 'border-border'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 inline" /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Phone / WhatsApp Number (Optional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Brief summary of your inquiry..."
                className={`w-full px-4 py-2.5 bg-background border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.subject ? 'border-red-500 bg-red-500/5' : 'border-border'
                }`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 inline" /> {errors.subject}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                Your Message <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Share details, preferences, date & time if booking, or specific questions..."
                  className={`w-full p-4 bg-background border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all ${
                    errors.message ? 'border-red-500 bg-red-500/5' : 'border-border'
                  }`}
                />
              </div>
              {errors.message && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 inline" /> {errors.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold text-base hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.99] cursor-pointer"
          >
            <Send className="w-4 h-4" />
            Submit Inquiry
          </button>
        </form>
      )}
    </div>
  )
}
