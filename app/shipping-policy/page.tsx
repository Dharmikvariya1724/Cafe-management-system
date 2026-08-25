import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BUSINESS_NAME, CONTACT_INFO, OUTLETS } from '@/lib/constants'
import { Truck, Package, Clock, ShieldAlert, MapPin, Phone, ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Delivery & Shipping Policy | ${BUSINESS_NAME}`,
  description: `Understand Coffee King's takeaway pickup options across 4 Surat outlets, food delivery timelines (30-45 mins), packaging standards, and Swiggy/Zomato fulfillment details.`,
}

export default function ShippingPolicyPage() {
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
            <Truck className="w-4 h-4" />
            Fulfillment & Delivery Policy
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Delivery & Takeaway Policy
          </h1>

          <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            We deliver hot coffees, sizzlers, rice bowls, and artisanal bakery treats fresh to your doorstep across Surat city, or offer instant takeaway pickup at all 4 lounge outlets.
          </p>

          <p className="text-xs text-white/60 font-mono">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Key Delivery Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">30 - 45 Min Delivery</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Freshly prepared and dispatched within minutes to preserve temperature and flavor.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-accent-foreground flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">Thermal Packaging</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Spill-proof coffee lids, insulated pizza boxes, and tamper-evident eco-bags.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-2.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-heading font-bold text-foreground">4 Surat Outlets</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Adajan, Vesu, Katargam & Pal outlets offer instant takeaway pickup.
              </p>
            </div>
          </div>

          {/* Policy Articles */}
          <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 space-y-8 shadow-sm">

            {/* 1. Fulfillment Methods */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                1. Fulfillment Channels (Dine-in, Takeaway & Online)
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Coffee King offers multiple convenient ways to enjoy your food and beverages:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">In-Store Dine-In:</strong> Available daily from 10:00 AM to 11:30 PM across all 4 lounge outlets.</li>
                <li><strong className="text-foreground">Instant Takeaway Pickup:</strong> Place your order online or via WhatsApp, then collect directly at your preferred lounge outlet.</li>
                <li><strong className="text-foreground">Third-Party Delivery:</strong> We partner with Swiggy and Zomato for fast doorstep delivery across Surat city limits.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 2. Preparation & Timelines */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                2. Preparation & Delivery Timelines
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                All food and coffee orders are prepared fresh upon receipt. Standard preparation times:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li><strong className="text-foreground">Beverages & Pastries:</strong> Prepared within 8–12 minutes.</li>
                <li><strong className="text-foreground">Sizzlers, Rice Bowls & Hot Snacks:</strong> Prepared within 15–20 minutes.</li>
                <li><strong className="text-foreground">Doorstep Delivery:</strong> Delivered within 30–45 minutes depending on traffic and distance from the nearest outlet.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 3. Packaging Standards */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                3. Temperature Control & Packaging Standards
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                To maintain outlet-quality taste and hygiene during transit, we utilize food-grade packaging materials:
              </p>
              <ul className="list-disc pl-6 text-sm text-foreground/80 space-y-1.5 leading-relaxed">
                <li>Dual-seal hot beverage cups with spill-proof travel lids for espresso & lattes.</li>
                <li>Insulated thermal pizza & sandwich boxes to retain heat and crispness.</li>
                <li>Tamper-evident safety seals on every delivery bag.</li>
              </ul>
            </div>

            <hr className="border-border" />

            {/* 4. Charges & Tracking */}
            <div className="space-y-3">
              <h2 className="text-xl font-heading font-extrabold text-foreground flex items-center gap-2">
                <Truck className="w-5 h-5 text-primary" />
                4. Delivery Fees & Order Tracking
              </h2>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Takeaway pickup at all Coffee King outlets is <strong className="text-foreground">100% Free of charge</strong>. Third-party delivery fees on Swiggy or Zomato are calculated transparently based on delivery distance. You can track your active orders in real time via our <Link href="/orders" className="text-primary font-bold hover:underline">Track Orders Page</Link>.
              </p>
            </div>

          </div>

          {/* Support Banner */}
          <div className="bg-secondary/40 rounded-3xl border border-border p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Need Help With a Live Delivery Order?
              </h3>
              <p className="text-xs text-foreground/70">
                Call our central helpline at <span className="font-bold text-primary">{CONTACT_INFO.phone}</span> or chat on WhatsApp.
              </p>
            </div>

            <Link
              href="/orders"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shadow-md shrink-0"
            >
              Track Active Orders
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
