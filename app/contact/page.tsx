'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'
import {
  CONTACT_INFO,
  BUSINESS_HOURS,
  BUSINESS_NAME,
  SOCIAL_LINKS,
  OUTLETS,
  KINGCOINS_REWARDS,
  CONTACT_FAQS,
  ORDER_PLATFORMS
} from '@/lib/constants'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Store,
  Gift,
  Sparkles,
  Copy,
  Check,
  MessageCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Coffee,
  Star,
  Compass,
  ArrowRight,
  Navigation as NavigationIcon
} from 'lucide-react'

export default function ContactPage() {
  const [selectedTab, setSelectedTab] = useState<string>('all')
  const [activeMapOutletId, setActiveMapOutletId] = useState<string>('adajan')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  // Calculate live open/closed status
  const checkIsOpen = (openHour: number, closeHour: number) => {
    const now = new Date()
    const currentHour = now.getHours() + now.getMinutes() / 60
    return currentHour >= openHour && currentHour <= closeHour
  }

  const handleCopyAddress = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  const filteredOutlets = selectedTab === 'all'
    ? OUTLETS
    : OUTLETS.filter(o => o.id === selectedTab)

  const activeMapOutlet = OUTLETS.find(o => o.id === activeMapOutletId) || OUTLETS[0]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-[#1a0f08] text-white overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5" />
              Surat&apos;s Most Lively Café Since 2015
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Our Lounge Outlets <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-accent via-amber-200 to-accent bg-clip-text text-transparent">
                & Connect With Us
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Step into Coffee King across 4 premium locations in Surat. Enjoy specialty brews, legendary sizzlers, handcrafted desserts, and good vibes every day.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-8 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-accent">4</p>
                <p className="text-xs text-white/70 font-semibold uppercase mt-0.5">Surat Outlets</p>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-accent">100K+</p>
                <p className="text-xs text-white/70 font-semibold uppercase mt-0.5">Coffee Lovers</p>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl text-center">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-accent">4.8</span>
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400 inline" />
                </div>
                <p className="text-xs text-white/70 font-semibold uppercase mt-0.5">Avg Rating</p>
              </div>
              <div className="bg-white/5 backdrop-blur border border-white/10 p-4 rounded-2xl text-center">
                <p className="text-2xl sm:text-3xl font-extrabold text-accent">100%</p>
                <p className="text-xs text-white/70 font-semibold uppercase mt-0.5">Arabica Beans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Outlets Grid */}
      <section className="py-16 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Store className="w-4 h-4" />
                Locate Coffee King
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
                Our Lounge Outlets in Surat
              </h2>
              <p className="text-sm text-foreground/70 mt-1">
                Choose your nearest outlet to view timing, features, map location, or chat directly.
              </p>
            </div>

            {/* Outlet Tabs Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                  selectedTab === 'all'
                    ? 'bg-primary text-primary-foreground border-primary shadow-md'
                    : 'bg-card text-foreground/80 border-border hover:bg-secondary'
                }`}
              >
                All Outlets ({OUTLETS.length})
              </button>
              {OUTLETS.map(outlet => (
                <button
                  key={outlet.id}
                  onClick={() => setSelectedTab(outlet.id)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap transition-all border ${
                    selectedTab === outlet.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-card text-foreground/80 border-border hover:bg-secondary'
                  }`}
                >
                  {outlet.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredOutlets.map((outlet) => {
              const isOpen = checkIsOpen(outlet.openHour, outlet.closeHour)
              return (
                <div
                  key={outlet.id}
                  className="bg-card rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Header with Badge */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-muted">
                      <Image
                        src={outlet.image}
                        alt={outlet.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="px-3 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                          {outlet.badge}
                        </span>

                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md ${
                            isOpen
                              ? 'bg-emerald-500 text-white'
                              : 'bg-amber-600 text-white'
                          }`}
                        >
                          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-white animate-pulse' : 'bg-white/80'}`} />
                          {isOpen ? 'OPEN NOW' : 'OPEN AT 10 AM'}
                        </span>
                      </div>

                      {/* Bottom Title */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="text-2xl font-heading font-extrabold drop-shadow">
                          {outlet.name}
                        </h3>
                        <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          {outlet.timing}
                        </p>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-4">
                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5">
                        {outlet.features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold px-2.5 py-0.5 bg-secondary/80 text-foreground/80 rounded-md border border-border"
                          >
                            • {feat}
                          </span>
                        ))}
                      </div>

                      {/* Address */}
                      <div className="bg-background/60 p-3.5 rounded-2xl border border-border/80 flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 text-xs text-foreground/90 leading-relaxed">
                          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{outlet.address}</span>
                        </div>
                        <button
                          onClick={() => handleCopyAddress(outlet.address, outlet.id)}
                          className="p-1.5 rounded-lg bg-secondary text-foreground hover:bg-primary/10 hover:text-primary transition-colors shrink-0"
                          title="Copy Address"
                        >
                          {copiedId === outlet.id ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Outlet Actions */}
                  <div className="p-6 pt-0 space-y-2.5">
                    <div className="grid grid-cols-2 gap-2.5">
                      {/* WhatsApp Chat */}
                      <a
                        href={outlet.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-[#20ba5a] transition-all shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp Chat
                      </a>

                      {/* Call Phone */}
                      <a
                        href={`tel:${outlet.phone.replace(/[^0-9+]/g, '')}`}
                        className="inline-flex items-center justify-center gap-2 bg-primary/10 text-primary px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-primary/20 transition-all border border-primary/20"
                      >
                        <Phone className="w-4 h-4" />
                        {outlet.phone}
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Get Directions */}
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(outlet.name + ' ' + outlet.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 bg-secondary text-foreground px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-secondary/80 transition-colors border border-border"
                      >
                        <NavigationIcon className="w-3.5 h-3.5 text-primary" />
                        Get Directions
                        <ExternalLink className="w-3 h-3 text-muted-foreground ml-auto" />
                      </a>

                      {/* Select for Map Preview */}
                      <button
                        onClick={() => {
                          setActiveMapOutletId(outlet.id)
                          const mapElem = document.getElementById('interactive-map-section')
                          if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="inline-flex items-center justify-center gap-1.5 bg-background text-primary border border-primary/30 px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-primary/5 transition-colors"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        View Interactive Map
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Map Embed Section */}
      <section id="interactive-map-section" className="py-16 bg-secondary/30 border-b border-border scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10">
              <Compass className="w-3.5 h-3.5" />
              Live Interactive Map
            </div>
            <h2 className="text-3xl font-heading font-extrabold text-foreground">
              Explore {activeMapOutlet.name} Location
            </h2>
            <p className="text-sm text-foreground/70">
              Switch between our 4 outlets to view exact location maps and get live GPS navigation.
            </p>

            {/* Map Outlet Selector Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {OUTLETS.map(outlet => (
                <button
                  key={outlet.id}
                  onClick={() => setActiveMapOutletId(outlet.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                    activeMapOutletId === outlet.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                      : 'bg-card text-foreground/80 border-border hover:bg-secondary'
                  }`}
                >
                  📍 {outlet.name}
                </button>
              ))}
            </div>
          </div>

          {/* Map Viewer Container */}
          <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2 h-[350px] sm:h-[450px] w-full bg-muted relative">
              <iframe
                title={`Map of ${activeMapOutlet.name}`}
                src={activeMapOutlet.embedMapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[105%]"
              />
            </div>

            {/* Sidebar Details */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-card">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs font-bold">
                  {activeMapOutlet.badge}
                </div>
                <h3 className="text-2xl font-heading font-extrabold text-foreground">
                  {activeMapOutlet.name}
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2.5 text-foreground/80">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span className="leading-relaxed">{activeMapOutlet.address}</span>
                  </div>

                  <div className="flex items-center gap-2.5 text-foreground/80">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <a href={`tel:${activeMapOutlet.phone}`} className="font-bold hover:underline">
                      {activeMapOutlet.phone}
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 text-foreground/80">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>{activeMapOutlet.timing}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-border">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeMapOutlet.name + ' ' + activeMapOutlet.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
                >
                  <NavigationIcon className="w-4 h-4" />
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={activeMapOutlet.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold text-xs text-center flex items-center justify-center gap-2 hover:bg-[#20ba5a] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat with Outlet Manager
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KingCoins Royalty & Rewards Spotlight */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-accent/10 to-transparent border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card/90 backdrop-blur rounded-3xl border border-accent/40 p-8 sm:p-10 shadow-lg text-center max-w-4xl mx-auto space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 bg-accent/20 text-primary rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <Gift className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-bold rounded-full uppercase tracking-wider mb-2">
                Coffee King Club
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground">
                Get Rewarded on Every Visit with KingCoins!
              </h2>
              <p className="text-sm text-foreground/80 max-w-xl mx-auto mt-2 leading-relaxed">
                Earn <span className="font-bold text-primary">1 KingCoin for every ₹10 spent</span> across all 4 outlets. Collect coins on your phone number and unlock delicious rewards!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {KINGCOINS_REWARDS.map((item, idx) => (
                <div key={idx} className="bg-background p-5 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-extrabold">
                      {item.coins} Coins
                    </span>
                    <p className="font-extrabold text-foreground text-base mt-3">{item.reward}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">{item.minSpend}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-md"
              >
                <Coffee className="w-4 h-4" />
                Explore Our Menu & Start Earning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Section: Form & HQ Contact Info */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: HQ Contact Info & Operating Hours */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 mb-3">
                  <Mail className="w-3.5 h-3.5" />
                  General Helpline
                </div>
                <h2 className="text-3xl font-heading font-extrabold text-foreground">
                  Get In Touch With HQ
                </h2>
                <p className="text-sm text-foreground/70 mt-2 leading-relaxed">
                  Have inquiries regarding corporate tie-ups, franchise opportunities, or customer feedback? Reach out to our central desk.
                </p>
              </div>

              <div className="space-y-4">
                {/* Helpline Phone */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border">
                  <div className="p-3 bg-accent/20 rounded-xl text-primary shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Central Helpline</h3>
                    <a
                      href={`tel:${CONTACT_INFO.phone}`}
                      className="text-base font-extrabold text-primary hover:underline block mt-0.5"
                    >
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-xs text-foreground/60 mt-0.5">Mon-Sun: 9:00 AM – 11:30 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-card border border-border">
                  <div className="p-3 bg-accent/20 rounded-xl text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Us</h3>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-base font-extrabold text-primary hover:underline block mt-0.5"
                    >
                      {CONTACT_INFO.email}
                    </a>
                    <p className="text-xs text-foreground/60 mt-0.5">Quick responses within 24 hours</p>
                  </div>
                </div>

                {/* Hours Schedule */}
                <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
                  <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Lounge Operating Hours</span>
                  </div>
                  <div className="space-y-2 text-xs text-foreground/80 border-t border-border pt-3">
                    {BUSINESS_HOURS.map((day) => (
                      <div key={day.day} className="flex justify-between items-center">
                        <span className="font-semibold text-foreground/90">{day.day}</span>
                        <span className="font-mono text-muted-foreground">
                          {day.closed ? 'Closed' : `${day.open} AM - ${day.close} PM`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Online Delivery Partners */}
                <div className="p-5 rounded-2xl bg-card border border-border space-y-3">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Order Online Directly
                  </h3>
                  <div className="flex items-center gap-2">
                    {ORDER_PLATFORMS.map((platform) => (
                      <a
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 ${platform.color} text-white py-2 px-3 rounded-xl text-xs font-extrabold text-center hover:opacity-90 transition-opacity`}
                      >
                        {platform.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ) Accordion */}
      <section className="py-16 bg-secondary/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-10">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              Common Questions
            </span>
            <h2 className="text-3xl font-heading font-extrabold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-foreground/70">
              Everything you need to know about visiting Coffee King lounge outlets in Surat.
            </p>
          </div>

          <div className="space-y-3">
            {CONTACT_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx
              return (
                <div
                  key={idx}
                  className="bg-card rounded-2xl border border-border overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base text-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-foreground/80 leading-relaxed border-t border-border/50 animate-in fade-in-50 duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Table Reservation & Order CTA Banner */}
      <section className="py-16 bg-[#1a0f08] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight">
            Planning a Visit or Special Celebration?
          </h2>
          <p className="text-base text-white/80 max-w-xl mx-auto leading-relaxed">
            Reserve your table in advance at any of our 4 lounge outlets or order your favorite coffee and sizzlers online!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-extrabold text-sm hover:bg-amber-400 transition-all shadow-lg active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </Link>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-extrabold text-sm transition-all active:scale-95"
            >
              <Coffee className="w-4 h-4" />
              View Full Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
