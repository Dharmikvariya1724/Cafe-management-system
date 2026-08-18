import Link from 'next/link'
import Image from 'next/image'
import { BUSINESS_NAME, BUSINESS_TAGLINE, BUSINESS_SLOGAN } from '@/lib/constants'
import { ArrowRight, MapPin, Gift, Crown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary via-accent/30 to-primary/20"
        style={{ backgroundImage: 'url(/images/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        {/* Crown Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/90 text-accent-foreground px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-6 shadow-lg border border-accent">
          <Crown className="w-4 h-4 fill-current" />
          {BUSINESS_SLOGAN}
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-3 tracking-tight">
          {BUSINESS_NAME}
        </h1>
        <p className="text-xl sm:text-2xl font-serif italic text-accent mb-6 font-semibold">
          &ldquo;{BUSINESS_TAGLINE}&rdquo;
        </p>

        <p className="text-base sm:text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Adajan, Vesu, Katargam & Pal — your favourite neighbourhood café serving exceptional specialty coffee, sizzlers, comfort food, and good vibes every single day since 2015.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/menu"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-xl font-bold hover:bg-accent/90 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Explore Menu & Order Online
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/30 transition-all backdrop-blur border border-white/30 hover:scale-105 active:scale-95"
          >
            <MapPin className="w-5 h-5 text-accent" />
            Find 4 Outlets in Surat
          </Link>
        </div>
      </div>
    </section>
  )
}
