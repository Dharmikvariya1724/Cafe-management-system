import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BUSINESS_NAME, CONTACT_INFO } from '@/lib/constants'
import { RefreshCw, RotateCcw, AlertTriangle, CheckCircle, CreditCard, Phone, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Cancellation & Refund Policy | ${BUSINESS_NAME}`,
  description: `Read Coffee King's cancellation terms for table reservations, takeaway orders, refund eligibility guidelines, and 3-5 day refund processing procedures.`,
}

export default function CancellationRefundPage() {
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
            <RotateCcw className="w-4 h-4" />
            Customer Protection Policy
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Cancellation & Refund Policy
          </h1>

          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            We strive to provide extraordinary hospitality across all 4 Coffee King lounge outlets in Surat. Here is our transparent policy regarding order cancellations and refunds.
          </p>

          <p className="text-xs text-white/60 font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Key Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">Free Table Cancellation</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Cancel table reservations up to 1 hour prior to your time slot with zero penalty.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">3 - 5 Day Refund Process</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Approved refunds are credited back to original payment method or instant KingCoins.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent-foreground flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">Instant Resolution</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Dedicated WhatsApp support and central helpline for quick resolution.
              </p>
            </div>
          </div>

          {/* Detailed Policy Document */}
          <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 space-y-8 shadow-sm">

            {/* 1. Table Reservation Cancellation */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-primary" />
                1. Table Reservation Cancellation Policy
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                We understand that plans can change. Table reservations made online at any of our outlets (Adajan, Vesu, Katargam, Pal) can be cancelled or rescheduled easily:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">Up to 1 Hour Prior:</strong> 100% Free cancellation via our online reservation management or helpline.</li>
                <li><strong className="text-foreground">Within 1 Hour / No-Show:</strong> Please call the outlet manager directly so we can release the table for waiting guests.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 2. Food Order Cancellation */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                2. Takeaway & Food Order Cancellation
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Because our culinary team prepares fresh espresso brews and hot sizzlers immediately upon receiving orders:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">Before Kitchen Preparation (Within 2–3 minutes):</strong> Full cancellation allowed with 100% refund.</li>
                <li><strong className="text-foreground">After Food Preparation Has Started:</strong> Cancellations cannot be accepted once ingredients have been cooked to prevent food waste.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 3. Refund Eligibility */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                3. Refund Eligibility Guidelines
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                You are eligible for a full or partial refund in the following instances:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li>An incorrect item was delivered or prepared differently from your order.</li>
                <li>Items were missing from your order package.</li>
                <li>Spillages or packaging damage occurred during transit (photo proof requested).</li>
                <li>A duplicate online payment was debited due to a gateway error.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 4. Processing Timelines */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" />
                4. Refund Method & Processing Timelines
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Once a refund request is approved by our outlet manager:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">Online Payment (UPI, Credit/Debit Card, Netbanking):</strong> Refund credited back to source account within 3 to 5 business days.</li>
                <li><strong className="text-foreground">Instant Store Credit (KingCoins):</strong> Equivalent reward value credited instantly to your phone number for immediate use on your next visit.</li>
              </ul>
            </div>

          </div>

          {/* Refund Inquiry Banner */}
          <div className="bg-secondary/40 rounded-3xl border border-border p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Request a Refund or Order Dispute?
              </h3>
              <p className="text-xs text-foreground/70">
                Contact our customer support team with your order ID or phone number.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-md shrink-0"
            >
              Contact Support Desk
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
