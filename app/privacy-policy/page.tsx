import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BUSINESS_NAME, CONTACT_INFO } from '@/lib/constants'
import { Shield, Lock, Eye, FileText, Database, UserCheck, Mail, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Privacy Policy | ${BUSINESS_NAME}`,
  description: `Read Coffee King's Privacy Policy to understand how Mahi Enterprise collects, protects, and uses customer data for orders, table reservations, and KingCoins rewards.`,
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 19, 2026"

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-[#1a0f08] text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest">
            <Lock className="w-4 h-4" />
            Data Protection & Privacy
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>

          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Your privacy is paramount to us at Coffee King (Mahi Enterprise). This policy outlines how we collect, handle, and safeguard your personal information.
          </p>

          <p className="text-xs text-white/60 font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Privacy Policy Document */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 space-y-8 shadow-sm">
            
            {/* 1. Overview */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                1. Overview & Scope
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                This Privacy Policy applies to all services provided by **Coffee King** (operated under Mahi Enterprise), including our web application ([coffeeking.in](https://coffeeking.in/)), table reservation portal, KingCoins loyalty rewards program, and physical lounge outlets in Surat (Adajan, Vesu, Katargam, and Pal).
              </p>
            </div>

            <hr className="border-border" />

            {/* 2. Information We Collect */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                2. Information We Collect
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We collect personal information when you interact with our website or outlets. This includes:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">Contact Details:</strong> Full Name, Email Address, and Phone/WhatsApp Number when booking a table, submitting inquiries, or registering for KingCoins.</li>
                <li><strong className="text-foreground">Reservation & Order Data:</strong> Selected outlet location, guest count, preferred time slots, special food instructions, and past order history.</li>
                <li><strong className="text-foreground">Loyalty Information:</strong> KingCoins balance, earned points, and redeemed reward vouchers linked to your registered phone number.</li>
                <li><strong className="text-foreground">Technical Data:</strong> Browser type, IP address, device information, and local storage data for cart persistence.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 3. How We Use Your Information */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                3. How We Use Your Information
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We strictly use your personal information for legitimate business purposes:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li>To confirm and manage your table reservations across our 4 Surat lounge locations.</li>
                <li>To credit KingCoins rewards to your account and facilitate in-store redemptions.</li>
                <li>To process customer support requests, party bookings, and franchise inquiries.</li>
                <li>To send reservation reminders or promotional offers via SMS/WhatsApp (you can opt-out at any time).</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 4. Data Protection & Security */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                4. Data Protection & Encryption
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We implement industry-standard encryption protocols (HTTPS / SSL) to protect your personal information during transmission. We <strong className="text-foreground">never sell, rent, or trade your personal data</strong> to third-party marketing companies.
              </p>
            </div>

            <hr className="border-border" />

            {/* 5. Cookies & Local Storage */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                5. Cookies & Local Browser Storage
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Our application uses local browser storage to save active cart items, table reservation drafts, and recent inquiry messages locally on your device. This ensures a seamless, fast browsing experience without losing your draft items.
              </p>
            </div>

            <hr className="border-border" />

            {/* 6. Data Rights & Contact */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                6. Customer Rights & Data Removal
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                You have the right to request access to, correction of, or deletion of your personal data stored in our system. To request data deletion or update your KingCoins phone number, please contact us at <a href={`mailto:${CONTACT_INFO.email}`} className="text-primary font-bold hover:underline">{CONTACT_INFO.email}</a>.
              </p>
            </div>

          </div>

          {/* Privacy Inquiry Box */}
          <div className="bg-secondary/40 rounded-3xl border border-border p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Questions About Privacy & Data Security?
              </h3>
              <p className="text-xs text-foreground/70">
                Reach out to our compliance officer at <span className="font-bold text-primary">{CONTACT_INFO.email}</span>
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-md shrink-0"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
