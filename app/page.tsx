import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { MenuCard } from '@/components/MenuCard'
import { OutletsSection } from '@/components/OutletsSection'
import { CkVibeGallery } from '@/components/CkVibeGallery'
import { HomeTestimonials } from '@/components/HomeTestimonials'
import { menuItems } from '@/lib/data'
import { BUSINESS_NAME, KINGCOINS_REWARDS } from '@/lib/constants'
import Link from 'next/link'
import { ArrowRight, Gift, MapPin, Store, Utensils, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Coffee King – Celebrate Everyday | Surat's Most Lively Café",
  description: "Surat's most lively café since 2015. Explore our menu, find lounge outlets in Adajan, Vesu, Katargam, & Pal, and earn KingCoins on every bill.",
  keywords: 'coffee king, surat cafe, adajan coffee king, vesu coffee king, katargam coffee king, pal coffee king, specialty coffee',
}

export default function Home() {
  const featuredMenu = menuItems.filter(item => item.popular).slice(0, 6)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* 1. Coffee King Lounge Outlets in Surat Section */}
      <OutletsSection />

      {/* 2. Popular Items & Our Menu Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
              MUST TRY SELECTION
            </span>
            <h2 className="text-4xl sm:text-5xl font-heading font-extrabold text-foreground">
              Popular <span className="italic text-primary">Items</span>
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 max-w-2xl mx-auto">
              Discover our most loved coffees, breakfast treats, and signature sizzler bowls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMenu.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <Utensils className="w-4 h-4" />
              View Full Menu & Order
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Our Space & Gallery (The CK Vibe) Section */}
      <CkVibeGallery />

      {/* 4. Rewards & Loyalty Banner Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-3xl border border-accent/40 p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Gift className="w-4 h-4" />
                CK REWARDS PROGRAM
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground leading-tight">
                Earn <span className="text-primary italic">KingCoins</span> on Every Purchase!
              </h2>
              <p className="text-foreground/80 text-sm sm:text-base leading-relaxed">
                Collect 1 KingCoin for every ₹10 spent. Redeem for free sizzler bowls, fresh rice bowls, and instant purchase discounts across all Coffee King outlets.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
              {KINGCOINS_REWARDS.map((r, idx) => (
                <div key={idx} className="bg-secondary p-4 rounded-2xl border border-border text-center">
                  <p className="font-extrabold text-primary text-base">{r.coins} Coins</p>
                  <p className="text-xs font-bold text-foreground mt-1">{r.reward}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. What Our Guests Say / Testimonials (Dynamic Admin Verified Only) */}
      <HomeTestimonials />

      {/* 6. Visit Us Today Call to Action Banner matching user screenshot */}
      <section className="py-16 bg-[#c9a876] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-heading font-extrabold">
            Visit Us <span className="text-amber-300 italic">Today!</span>
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed">
            Walk into any Coffee King outlet for extraordinary coffee, handcrafted food, a quick chat, or memorable moments with friends and family.
          </p>

          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-black px-8 py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Store className="w-4 h-4" />
              FIND AN OUTLET NEAR YOU
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
