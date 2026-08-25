import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BUSINESS_NAME, CONTACT_INFO, OUTLETS } from '@/lib/constants'
import { ShieldCheck, Sparkles, CheckCircle2, Thermometer, Droplets, HeartHandshake, Award, Coffee, Phone, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `Our Hygiene & Food Safety Standards | ${BUSINESS_NAME}`,
  description: `Learn about Coffee King's strict food safety, FSSAI hygiene compliance, kitchen sanitation protocols, and daily audits across all 4 Surat outlets.`,
}

export default function HygienePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-20 bg-[#1a0f08] text-white overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            100% Certified Food Safety
          </div>

          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
            Our Hygiene & Safety Promise
          </h1>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            At Coffee King, your health and peace of mind are our highest priorities. We maintain rigorous food safety, FSSAI compliance, and daily sanitation standards across all 4 lounge outlets in Surat.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Key Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-3xl border border-border space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">FSSAI Certified</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                All Coffee King outlets strictly comply with FSSAI regulations, undergoing periodic inspections and daily internal audits.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent-foreground flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">Temperature Controlled</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Fresh dairy, coffee beans, sauces, and raw ingredients are stored under strict temperature monitoring to preserve peak freshness.
              </p>
            </div>

            <div className="bg-card p-6 rounded-3xl border border-border space-y-3 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">Sanitized Kitchens</h3>
              <p className="text-xs text-foreground/70 leading-relaxed">
                Every workstation, coffee machine, sizzler grill, and utensil undergoes multi-stage thermal and eco-sanitization daily.
              </p>
            </div>
          </div>

          {/* Detailed Hygiene Policy Articles */}
          <div className="bg-card rounded-3xl border border-border p-8 sm:p-10 space-y-8 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  1. Daily Kitchen & Coffee Bar Sanitation
                </h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-9">
                Our kitchen and espresso stations follow a strict hourly sanitization checklist. High-touch surfaces, espresso handles, grinder hoppers, blender jars, and food preparation tables are sanitized before and after every shift.
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  2. Staff Health, Gloves & Hairnets
                </h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-9">
                All baristas, chefs, and service staff undergo daily wellness screenings prior to entering the kitchen. Chefs and food handlers wear mandatory aprons, hairnets, and single-use food safety gloves during preparation. Continuous handwashing protocols are enforced every 30 minutes.
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  3. Fresh Local Sourcing & Zero Harmful Preservatives
                </h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-9">
                We take immense pride in serving fresh ingredients. Milk and dairy products are sourced daily from trusted local Surat dairies. Our 100% specialty Arabica coffee beans are freshly roasted in small batches, guaranteeing pure taste without artificial additives.
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  4. High-Temperature Utensil Dishwashing
                </h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-9">
                All ceramic mugs, glassware, sizzler plates, and cutlery undergo a 3-stage washing process concluding with high-temperature sterilization (above 85°C) to eliminate 99.9% of bacteria and viruses.
              </p>
            </div>

            <hr className="border-border" />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                <h2 className="text-2xl font-heading font-extrabold text-foreground">
                  5. Dine-In Lounge & Restroom Hygiene
                </h2>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed pl-9">
                Tables and sofa seating across all 4 outlets (Adajan, Vesu, Katargam, Pal) are thoroughly sanitized immediately after guests depart. Touchless digital QR menus are available for zero-contact browsing, and restrooms are inspected hourly.
              </p>
            </div>
          </div>

          {/* Outlet Hygiene Audit Card */}
          <div className="bg-secondary/40 rounded-3xl border border-border p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Have Feedback or Questions About Our Hygiene?
              </h3>
              <p className="text-xs text-foreground/70">
                Our food safety manager is always open to feedback to ensure 100% customer satisfaction.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-bold text-xs hover:bg-primary/90 transition-all shrink-0 shadow-md"
            >
              Contact Hygiene Manager
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
