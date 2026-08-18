import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ReservationForm } from '@/components/ReservationForm'
import { Calendar, Clock, Users, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Make a Reservation | The Coffee Corner',
  description: 'Book your table at The Coffee Corner. Secure your spot for a great coffee experience with friends or family.',
  keywords: 'reservations, book table, cafe booking, restaurant reservations',
}

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Make a Reservation
          </h1>
          <p className="text-lg text-foreground/70">
            Secure your table at The Coffee Corner
          </p>
        </div>
      </section>

      {/* Reservations Section */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Book in Advance</h3>
              <p className="text-sm text-foreground/70">
                Reserve your spot up to 2 months ahead
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Flexible Hours</h3>
              <p className="text-sm text-foreground/70">
                Choose any time between 9 AM and 8 PM
              </p>
            </div>

            <div className="bg-secondary rounded-lg p-6 text-center">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Groups Welcome</h3>
              <p className="text-sm text-foreground/70">
                We accommodate groups of any size
              </p>
            </div>
          </div>

          {/* Form */}
          <ReservationForm />

          {/* Additional Info */}
          <div className="mt-12 bg-secondary/50 rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Reservation Policy
            </h2>
            <div className="space-y-3 text-foreground/80">
              <p>
                <strong>Cancellations:</strong> Please cancel at least 24 hours in advance if your plans change.
              </p>
              <p>
                <strong>No-Show Policy:</strong> We reserve the right to release tables if guests don&apos;t arrive within 15 minutes of their reservation time.
              </p>
              <p>
                <strong>Duration:</strong> Tables are reserved for 2 hours. Extended seating may be available upon request.
              </p>
              <p>
                <strong>Contact:</strong> We&apos;ll confirm your reservation via email. You&apos;ll also receive a reminder 24 hours before your visit.
              </p>
              <p className="flex items-center gap-2 pt-2">
                <Phone className="w-4 h-4 text-primary" />
                Have questions? Call us at +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
