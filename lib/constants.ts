import type { BusinessHours } from './types'

export const BUSINESS_NAME = 'Coffee King'
export const BUSINESS_TAGLINE = 'Stirr Your Heart In'
export const BUSINESS_SLOGAN = "Celebrate Everyday | Surat's Most Lively Café"
export const BUSINESS_DESCRIPTION = "Surat's most lively café since 2015. Serving exceptional specialty brews, sizzlers, rice bowls, desserts, and good vibes every single day."

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: 'Monday', open: '09:00', close: '23:30' },
  { day: 'Tuesday', open: '09:00', close: '23:30' },
  { day: 'Wednesday', open: '09:00', close: '23:30' },
  { day: 'Thursday', open: '09:00', close: '23:30' },
  { day: 'Friday', open: '09:00', close: '00:00' },
  { day: 'Saturday', open: '09:00', close: '00:00' },
  { day: 'Sunday', open: '09:00', close: '00:00' },
]

export const CONTACT_INFO = {
  email: 'hello@coffeeking.in',
  phone: '+91-7405021433',
  address: 'Adajan, Vesu, Katargam & Pal — Surat, Gujarat',
  mapUrl: 'https://maps.google.com/?q=Coffee+King+Surat'
}

export const OUTLETS = [
  {
    id: 'adajan',
    name: 'CK Adajan',
    address: 'Ground Floor, Abhinandan Heights, Nr. Madhuvan Circle, L.P. Savani Road, Adajan, Surat',
    phone: '+91-7405021433',
    timing: 'Mon-Sun: 10 AM - 11 PM',
    badge: 'ADAJAN SURAT',
    image: '/images/outlet-adajan.jpg',
    thumbnails: [
      '/images/outlet-adajan.jpg',
      '/images/outlet-vesu.jpg',
      '/images/gallery-interior-1.png'
    ],
    whatsapp: 'https://wa.me/917405021433?text=Hello%20Coffee%20King%20Adajan',
    mapQuery: 'Coffee+King+Adajan+Surat'
  },
  {
    id: 'vesu',
    name: 'CK Vesu',
    address: 'UG-1, Shubh Universal, Opp. Vijaya Laxmi Hall, Nr. Western Vesu Point, Vesu Road, Surat 395007',
    phone: '+91-7405034410',
    timing: 'Mon-Sun: 10 AM - 11 PM',
    badge: 'VESU SURAT',
    image: '/images/outlet-vesu.jpg',
    thumbnails: [
      '/images/outlet-vesu.jpg',
      '/images/gallery-interior-1.png',
      '/images/outlet-adajan.jpg'
    ],
    whatsapp: 'https://wa.me/917405034410?text=Hello%20Coffee%20King%20Vesu',
    mapQuery: 'Coffee+King+Vesu+Surat'
  },
  {
    id: 'katargam',
    name: 'CK Katargam',
    address: '101-102, Sunday Hub, Nr. Ankur School, Gajera Road, Katargam, Surat 395004',
    phone: '+91-8347904410',
    timing: 'Mon-Sun: 10 AM - 11 PM',
    badge: 'KATARGAM SURAT',
    image: '/images/outlet-katargam.jpg',
    thumbnails: [
      '/images/outlet-katargam.jpg',
      '/images/outlet-adajan.jpg',
      '/images/outlet-vesu.jpg'
    ],
    whatsapp: 'https://wa.me/918347904410?text=Hello%20Coffee%20King%20Katargam',
    mapQuery: 'Coffee+King+Katargam+Surat'
  },
  {
    id: 'pal',
    name: 'CK Pal',
    address: 'Opp. Kratos Club, Gaurav Path, Pal, Surat',
    phone: '+91-9898514410',
    timing: 'Mon-Sun: 10 AM - 11 PM',
    badge: 'PAL SURAT',
    image: '/images/outlet-pal.jpg',
    thumbnails: [
      '/images/outlet-pal.jpg',
      '/images/gallery-interior-1.png',
      '/images/outlet-vesu.jpg'
    ],
    whatsapp: 'https://wa.me/919898514410?text=Hello%20Coffee%20King%20Pal',
    mapQuery: 'Coffee+King+Pal+Surat'
  }
]


export const KINGCOINS_REWARDS = [
  { coins: 100, reward: '₹50 OFF on entire purchase', minSpend: 'Min purchase ₹100' },
  { coins: 500, reward: 'FREE Delicious Rice Bowl', minSpend: 'Min purchase ₹100' },
  { coins: 1000, reward: 'FREE Specialty Sizzler', minSpend: 'Min purchase ₹300' },
]

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/coffeekingin',
  facebook: 'https://facebook.com/coffeekingin',
  twitter: 'https://twitter.com/coffeekingin',
  linkedin: 'https://linkedin.com/company/coffeekingin',
  youtube: 'https://youtube.com/coffeekingin'
}

export const ORDER_PLATFORMS = [
  { name: 'Swiggy', url: 'https://www.swiggy.com/restaurants/coffee-king-adajan-gam-surat-104886', badge: 'Fast Delivery', color: 'bg-[#FC8019]' },
  { name: 'Zomato', url: 'https://www.zomato.com/surat/coffee-king-adajan-gam', badge: 'Top Rated', color: 'bg-[#CB202D]' },
  { name: 'WhatsApp Direct', url: 'https://wa.me/917405021433?text=Hello%20Coffee%20King!%20I%20would%20like%20to%20place%20an%20order.', badge: 'Instant Chat', color: 'bg-[#25D366]' },
]



export const MENU_CATEGORIES = [
  { value: 'coffee', label: 'Coffee' },
  { value: 'espresso', label: 'Espresso' },
  { value: 'tea', label: 'Tea' },
  { value: 'cold', label: 'Cold Drinks' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'snacks', label: 'Snacks' },
  { value: 'desserts', label: 'Desserts' },
]

export const GALLERY_CATEGORIES = [
  { value: 'interior', label: 'Interior' },
  { value: 'coffee', label: 'Coffee' },
  { value: 'food', label: 'Food' },
  { value: 'events', label: 'Events' },
]

export const RESERVATION_TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
]

export const GUEST_COUNTS = [
  { value: '1', label: '1 Guest' },
  { value: '2', label: '2 Guests' },
  { value: '3', label: '3 Guests' },
  { value: '4', label: '4 Guests' },
  { value: '5', label: '5 Guests' },
  { value: '6', label: '6 Guests' },
  { value: '7', label: '7 Guests' },
  { value: '8', label: '8+ Guests' },
]
