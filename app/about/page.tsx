import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { BUSINESS_NAME, BUSINESS_HOURS, BUSINESS_SLOGAN, OUTLETS, KINGCOINS_REWARDS, ORDER_PLATFORMS } from '@/lib/constants'
import { Coffee, Heart, Store, Award, ShieldCheck, Flame, Gift, Star, MapPin, Phone, ExternalLink, Utensils, CheckCircle2, Sparkles, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About Us | ${BUSINESS_NAME} – Celebrate Everyday`,
  description: 'Learn about Coffee King, Surat\'s most lively café since 2015. Operated by CK F&B Pvt Ltd (Mahi Enterprise), supported by Startup India, with central kitchen operations & 4 vibrant outlets across Surat.',
  keywords: 'about coffee king, coffee king surat, mahi enterprise, ck f&b pvt ltd, startup india cafe, specialty coffee surat, sizzlers surat, adajan vesu katargam pal',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Banner Section with Background Image */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-border py-20">
        <Image
          src="/images/about-hero.jpg"
          alt="Coffee King Vibrant Lounge Interior"
          fill
          priority
          className="object-cover object-center opacity-35 dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-4 h-4" />
            <span>Surat&apos;s Most Lively Café Since 2015</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-foreground">
            Stirr Your Heart In <br />
            <span className="bg-gradient-to-r from-amber-600 via-primary to-amber-500 bg-clip-text text-transparent italic">
              {BUSINESS_NAME}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-foreground/80 font-medium leading-relaxed">
            &ldquo;{BUSINESS_SLOGAN}&rdquo; — Crafting everyday coffee culture, sizzling comfort food, and unforgettable memories across 4 vibrant lounges in Surat.
          </p>

          {/* Quick Stats Grid */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-md border border-border p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:border-primary/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">2015</div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">Founded in Surat</div>
            </div>
            <div className="bg-card/80 backdrop-blur-md border border-border p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:border-primary/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">4</div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">Surat Lounges</div>
            </div>
            <div className="bg-card/80 backdrop-blur-md border border-border p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:border-primary/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary font-heading">100+</div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">Specialty Menu Items</div>
            </div>
            <div className="bg-card/80 backdrop-blur-md border border-border p-4 sm:p-6 rounded-2xl text-center shadow-lg hover:border-primary/50 transition-all">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary font-heading flex items-center justify-center gap-1">
                4.2 <Star className="w-5 h-5 fill-amber-400 text-amber-400 inline-block" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground mt-1">Google Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise & Central Kitchen Story */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Image Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/about-craft.jpg"
                  alt="Coffee King Barista Crafting Specialty Coffee"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary text-primary-foreground font-bold">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-lg">Central Kitchen Standard</h4>
                    <p className="text-xs text-gray-300">Supported by Startup India (Govt. of India)</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  Every batch of coffee, sauce, and specialty base is standardized at our state-of-the-art central kitchen to guarantee 100% taste consistency.
                </p>
              </div>
            </div>

            {/* Right Column - Brand Details */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs tracking-wider uppercase">
                <Award className="w-4 h-4" /> Know Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground leading-tight">
                Behind Coffee King: <br />
                <span className="text-primary">CK F&amp;B Pvt Ltd (Mahi Enterprise)</span>
              </h2>
              <p className="text-foreground/80 leading-relaxed text-base sm:text-lg">
                Born in Surat in 2015, Coffee King set out with a simple mission: to create a warm, energetic third place where friends, families, and everyday coffee enthusiasts could meet, laugh, and celebrate life over exceptional food and brews.
              </p>
              <p className="text-foreground/80 leading-relaxed text-base">
                Behind the scenes, <strong>CK F&amp;B Pvt Ltd (Mahi Enterprise)</strong> is an innovative food &amp; beverage enterprise recognized as a pioneering startup with <strong>Government of India (Startup India)</strong> support. We operate a high-tech central kitchen that prepares key components for our outlets and partner cafes across the region.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Standardized Quality</h4>
                    <p className="text-xs text-muted-foreground">Centralized preparation ensuring identical flavor in all outlets.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Fair &amp; Accessible Pricing</h4>
                    <p className="text-xs text-muted-foreground">Premium cafe ambience without hefty price tags.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Sister Enterprise</h4>
                    <p className="text-xs text-muted-foreground">Super Sandwich Co. &amp; Mahi Enterprise ecosystem.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-foreground">Lively Ambience</h4>
                    <p className="text-xs text-muted-foreground">Vibrant lounges with energetic music, cozy nooks &amp; wifi.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food & Beverage Specialty Section */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-xs tracking-wider uppercase">
                <Utensils className="w-4 h-4" /> Culinary Craft
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
                Sizzlers, Specialty Brews &amp; Comfort Food
              </h2>
              <p className="text-foreground/80 leading-relaxed">
                From our sizzling signature platters to ice-cold thick shakes and pour-over specialty coffees, Coffee King offers an extensive 100+ item menu crafted to tantalize your tastebuds at any hour of the day.
              </p>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 font-bold shrink-0">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">Handcrafted Espresso &amp; Cold Brews</h3>
                    <p className="text-sm text-muted-foreground">Expertly roasted beans brewed to perfection — lattes, cappuccinos, frappes &amp; signature cold brews.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-600 font-bold shrink-0">
                    <Flame className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">Specialty Sizzlers &amp; Rice Bowls</h3>
                    <p className="text-sm text-muted-foreground">Hot sizzling platters bursting with bold spices, grilled paneer, exotic veggies, and comforting rice bowls.</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold shrink-0">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-foreground">Gourmet Sandwiches &amp; Desserts</h3>
                    <p className="text-sm text-muted-foreground">Crispy paninis, overloaded garlic bread, sizzling brownies, and decadent dessert jars.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border order-1 lg:order-2 group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/about-food.jpg"
                  alt="Delicious Coffee King Sizzler and Iced Coffee"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-card/90 backdrop-blur-md border border-border text-foreground">
                <p className="text-sm font-semibold text-center">
                  🔥 Order hot sizzling platters &amp; specialty brews directly to your doorstep or enjoy in-lounge!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Surat Outlets Showcase */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
              <Store className="w-4 h-4" /> Our Locations
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
              Visit Our 4 Lounges in Surat
            </h2>
            <p className="text-muted-foreground text-base">
              Conveniently located in Adajan, Vesu, Katargam, and Pal. Drop by for great coffee, delicious food, and friendly vibes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OUTLETS.map(outlet => (
              <div key={outlet.id} className="bg-card border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={outlet.image}
                    alt={outlet.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-md">
                    {outlet.badge}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading font-extrabold text-xl text-foreground group-hover:text-primary transition-colors">
                      {outlet.name}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
                      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{outlet.address}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border">
                    <a
                      href={`tel:${outlet.phone}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                    >
                      <Phone className="w-4 h-4" /> {outlet.phone}
                    </a>
                    <div className="flex gap-2 pt-2">
                      <a
                        href={outlet.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(outlet.mapQuery)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold transition-colors flex items-center justify-center"
                        title="Open Map"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KingCoins Rewards & Daily Memberships */}
      <section className="py-20 bg-gradient-to-br from-amber-950/40 via-background to-primary/10 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 font-semibold text-xs tracking-wider uppercase">
              <Gift className="w-4 h-4" /> Loyalty &amp; Perks
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
              KingCoins Rewards &amp; Memberships
            </h2>
            <p className="text-foreground/80 text-base">
              Get rewarded on every single bill! Earn <span className="font-bold text-primary">1 KingCoin for every ₹10 spent</span> across all our outlets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {KINGCOINS_REWARDS.map((tier, idx) => (
              <div key={idx} className="bg-card/90 backdrop-blur-md border border-amber-500/30 rounded-2xl p-6 shadow-xl text-center space-y-4 relative overflow-hidden group hover:border-amber-500 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-bold">
                  👑
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-500 tracking-wider uppercase">Tier {idx + 1}</span>
                  <h3 className="text-2xl font-heading font-extrabold text-foreground">{tier.coins} Coins</h3>
                </div>
                <p className="text-lg font-bold text-primary">{tier.reward}</p>
                <p className="text-xs text-muted-foreground">{tier.minSpend}</p>
              </div>
            ))}
          </div>

          {/* Memberships Callout Card */}
          <div className="bg-gradient-to-r from-amber-600 via-primary to-amber-700 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold tracking-widest uppercase bg-black/30 px-3 py-1 rounded-full">
                Exclusive Daily Coffee Plans
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold">
                CK Memberships — Save Like Anything!
              </h3>
              <p className="text-amber-100 max-w-xl text-sm sm:text-base">
                Enjoy daily specialty coffees, free food items, and massive discounts across all Coffee King outlets starting at just ₹5,499.
              </p>
            </div>
            <a
              href="https://app.reelo.io/l/gqyoz"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white text-gray-900 font-bold hover:bg-amber-100 transition-colors shadow-lg shrink-0 flex items-center gap-2 text-sm sm:text-base"
            >
              Explore Memberships <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Online Delivery Platforms & Order Options */}
      <section className="py-16 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs tracking-wider uppercase">
              <ShoppingBag className="w-4 h-4" /> Order Online
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-foreground">
              Order Coffee King Right To Your Doorstep
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Craving specialty brews, sizzlers, or sandwiches at home? Order on your favorite delivery apps:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {ORDER_PLATFORMS.map((platform, idx) => (
              <a
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white font-bold shadow-md hover:scale-105 transition-all ${platform.color}`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>{platform.name}</span>
                <span className="text-[10px] bg-black/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {platform.badge}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Hours Section */}
      <section className="py-16 bg-secondary/20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-heading font-extrabold text-foreground">
              Outlets Operating Hours
            </h2>
            <p className="text-sm text-muted-foreground">
              We&apos;re open 7 days a week to serve your daily caffeine and food cravings!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BUSINESS_HOURS.map(day => (
              <div key={day.day} className="flex justify-between items-center p-4 bg-card border border-border rounded-xl shadow-sm">
                <span className="font-semibold text-foreground">{day.day}</span>
                <span className="text-primary font-extrabold text-sm">
                  {day.closed ? 'Closed' : `${day.open} - ${day.close}`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
