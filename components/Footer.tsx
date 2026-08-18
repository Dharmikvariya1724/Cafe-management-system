import Link from 'next/link'
import Image from 'next/image'
import { BUSINESS_NAME, BUSINESS_TAGLINE, CONTACT_INFO, BUSINESS_HOURS, SOCIAL_LINKS, OUTLETS } from '@/lib/constants'
import { Mail, Phone, MapPin, ExternalLink, Gift } from 'lucide-react'

export function Footer() {
  const today = new Date().getDay()
  const todayHours = BUSINESS_HOURS[today === 0 ? 6 : today - 1]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-white rounded-lg p-1 shrink-0 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Coffee King Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl leading-tight">{BUSINESS_NAME}</h3>
                <p className="text-[10px] uppercase font-bold tracking-widest text-accent">{BUSINESS_TAGLINE}</p>
              </div>
            </div>
            <p className="text-xs text-primary-foreground/80 leading-relaxed">
              Surat&apos;s most lively café since 2015. Serving exceptional brews, sizzlers, rice bowls, and good vibes every single day.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/10 px-2.5 py-1 rounded-full border border-white/20">
                <Gift className="w-3 h-3 text-accent" />
                Earn KingCoins on every bill!
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:underline">Our Menu</Link>
              </li>
              <li>
                <Link href="/orders" className="hover:underline">Track Orders</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About Coffee King</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Our Outlets & Contact</Link>
              </li>
            </ul>
          </div>

          {/* Surat Outlets */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent">Our Surat Outlets</h4>
            <ul className="space-y-2 text-xs">
              {OUTLETS.map(outlet => (
                <li key={outlet.id} className="leading-tight">
                  <p className="font-bold text-white">{outlet.name}</p>
                  <a href={`tel:${outlet.phone}`} className="text-primary-foreground/80 hover:text-white transition-colors">
                    {outlet.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-accent">Hours & Reach Us</h4>
            <div className="space-y-2 text-xs mb-4 text-primary-foreground/90">
              <p className="font-semibold">Today ({todayHours.day}):</p>
              <p className="text-accent font-bold">
                {todayHours.closed ? 'Closed' : `${todayHours.open} - ${todayHours.close}`}
              </p>
              <p className="pt-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </div>
            <div className="pt-3">
              <p className="text-xs font-semibold mb-2.5 text-accent uppercase tracking-wider">Follow Us</p>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialIconsData.map(item => (
                  item.url ? (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-xl hover:bg-accent hover:text-accent-foreground text-primary-foreground border border-white/15 shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
                      aria-label={`Follow Coffee King on ${item.name}`}
                      title={item.name}
                    >
                      {item.icon}
                    </a>
                  ) : null
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-xs text-primary-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>&copy; {new Date().getFullYear()} Mahi Enterprise — Coffee King | Super Sandwich Co. All rights reserved.</p>
          <p>Surat, Gujarat, India</p>
        </div>
      </div>
    </footer>
  )
}

const socialIconsData = [
  {
    name: 'Instagram',
    url: SOCIAL_LINKS.instagram,
    icon: (
      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: 'Facebook',
    url: SOCIAL_LINKS.facebook,
    icon: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    )
  },
  {
    name: 'Twitter / X',
    url: SOCIAL_LINKS.twitter,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  },
  {
    name: 'LinkedIn',
    url: SOCIAL_LINKS.linkedin,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    )
  },
  {
    name: 'YouTube',
    url: SOCIAL_LINKS.youtube,
    icon: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
]

