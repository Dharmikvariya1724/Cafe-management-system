import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import { CONTACT_INFO, BUSINESS_HOURS, BUSINESS_NAME, SOCIAL_LINKS, OUTLETS, KINGCOINS_REWARDS } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, ExternalLink, Share2, Store, Gift } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Our Outlets & Contact Us | ${BUSINESS_NAME}`,
  description: "Find Coffee King lounge outlets in Adajan, Vesu, Katargam & Pal in Surat. Call us, get directions, or send a message. Surat's most lively cafe since 2015.",
  keywords: 'coffee king outlets, surat cafe, adajan coffee king, vesu coffee king, katargam coffee king, pal coffee king',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Our Outlets & Contact Us
          </h1>
          <p className="text-lg text-foreground/70">
            Visit any of our 4 lounge destinations across Surat or drop us a message.
          </p>
        </div>
      </section>

      {/* Outlets Grid */}
      <section className="py-12 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-8">
            <Store className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Coffee King Lounge Outlets in Surat
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OUTLETS.map((outlet) => (
              <div
                key={outlet.id}
                className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading font-bold text-xl text-primary flex items-center gap-2">
                      <Store className="w-5 h-5 text-accent" />
                      {outlet.name}
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-800 rounded-full">
                      Open Today
                    </span>
                  </div>

                  <p className="text-sm text-foreground/80 mb-4 flex items-start gap-2 leading-relaxed">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {outlet.address}
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                  <a
                    href={`tel:${outlet.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-primary hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    {outlet.phone}
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(outlet.name + ' ' + outlet.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-secondary text-foreground px-3 py-1.5 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    Get Directions
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* KingCoins Section */}
      <section className="py-12 bg-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl border border-accent/30 p-8 shadow-sm text-center max-w-3xl mx-auto space-y-4">
            <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mx-auto text-accent">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-foreground">
              Get Rewarded on Every Bill!
            </h2>
            <p className="text-sm text-foreground/80 font-medium">
              ₹10 Spent = 1 KingCoin. Collect coins and redeem amazing rewards in-store across all Coffee King outlets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {KINGCOINS_REWARDS.map((item, idx) => (
                <div key={idx} className="bg-secondary/50 p-4 rounded-xl border border-border">
                  <p className="font-extrabold text-primary text-lg">{item.coins} Coins</p>
                  <p className="text-xs font-bold text-foreground mt-1">{item.reward}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.minSpend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* General Info */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-8">
                General Inquiries & Feedback
              </h2>

              {/* Phone */}
              <div className="flex gap-4 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Main Helpline</h3>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="mt-1 text-primary font-bold hover:underline"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Email</h3>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="mt-1 text-primary hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-accent/10">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Operating Hours</h3>
                  <div className="space-y-2 text-sm text-foreground/70">
                    {BUSINESS_HOURS.map(day => (
                      <div key={day.day} className="flex justify-between min-w-48">
                        <span className="font-medium">{day.day}</span>
                        <span>{day.closed ? 'Closed' : `${day.open} - ${day.close}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

