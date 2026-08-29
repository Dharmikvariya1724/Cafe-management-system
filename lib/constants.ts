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
    timing: 'Mon-Sun: 10:00 AM - 11:30 PM',
    openHour: 10,
    closeHour: 23.5,
    badge: 'ADAJAN SURAT',
    image: '/images/outlet-adajan.jpg',
    features: ['Luxury Lounge', 'Valet Parking', 'High-Speed WiFi', 'Live Music Nights'],
    thumbnails: [
      '/images/outlet-adajan.jpg',
      '/images/outlet-vesu.jpg',
      '/images/gallery-interior-1.png'
    ],
    whatsapp: 'https://wa.me/917405021433?text=Hello%20Coffee%20King%20Adajan!%20I%20have%20an%20inquiry.',
    mapQuery: 'Coffee+King+Adajan+Surat',
    embedMapUrl: 'https://maps.google.com/maps?q=Coffee%20King%20Adajan%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'vesu',
    name: 'CK Vesu',
    address: 'UG-1, Shubh Universal, Opp. Vijaya Laxmi Hall, Nr. Western Vesu Point, Vesu Road, Surat 395007',
    phone: '+91-7405034410',
    timing: 'Mon-Sun: 10:00 AM - 11:30 PM',
    openHour: 10,
    closeHour: 23.5,
    badge: 'VESU SURAT',
    image: '/images/outlet-vesu.jpg',
    features: ['Rooftop Outdoor', 'Specialty Brew Bar', 'Private Dining Area', 'Pet Friendly'],
    thumbnails: [
      '/images/outlet-vesu.jpg',
      '/images/gallery-interior-1.png',
      '/images/outlet-adajan.jpg'
    ],
    whatsapp: 'https://wa.me/917405034410?text=Hello%20Coffee%20King%20Vesu!%20I%20have%20an%20inquiry.',
    mapQuery: 'Coffee+King+Vesu+Surat',
    embedMapUrl: 'https://maps.google.com/maps?q=Coffee%20King%20Vesu%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'katargam',
    name: 'CK Katargam',
    address: '101-102, Sunday Hub, Nr. Ankur School, Gajera Road, Katargam, Surat 395004',
    phone: '+91-8347904410',
    timing: 'Mon-Sun: 10:00 AM - 11:30 PM',
    openHour: 10,
    closeHour: 23.5,
    badge: 'KATARGAM SURAT',
    image: '/images/outlet-katargam.jpg',
    features: ['Cozy Workstation', 'Artisanal Bakery', 'Free Parking', 'Birthday Party Hall'],
    thumbnails: [
      '/images/outlet-katargam.jpg',
      '/images/outlet-adajan.jpg',
      '/images/outlet-vesu.jpg'
    ],
    whatsapp: 'https://wa.me/918347904410?text=Hello%20Coffee%20King%20Katargam!%20I%20have%20an%20inquiry.',
    mapQuery: 'Coffee+King+Katargam+Surat',
    embedMapUrl: 'https://maps.google.com/maps?q=Coffee%20King%20Katargam%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed'
  },
  {
    id: 'pal',
    name: 'CK Pal',
    address: 'Opp. Kratos Club, Gaurav Path, Pal, Surat',
    phone: '+91-9898514410',
    timing: 'Mon-Sun: 10:00 AM - 11:30 PM',
    openHour: 10,
    closeHour: 23.5,
    badge: 'PAL SURAT',
    image: '/images/outlet-pal.jpg',
    features: ['Spacious Lounge', 'Drive-by Takeaway', 'Sizzler Station', 'Wheelchair Accessible'],
    thumbnails: [
      '/images/outlet-pal.jpg',
      '/images/gallery-interior-1.png',
      '/images/outlet-vesu.jpg'
    ],
    whatsapp: 'https://wa.me/919898514410?text=Hello%20Coffee%20King%20Pal!%20I%20have%20an%20inquiry.',
    mapQuery: 'Coffee+King+Pal+Surat',
    embedMapUrl: 'https://maps.google.com/maps?q=Coffee%20King%20Pal%20Surat&t=&z=15&ie=UTF8&iwloc=&output=embed'
  }
]

export const CONTACT_FAQS = [
  {
    question: 'Do I need a reservation to visit Coffee King outlets?',
    answer: 'Walk-ins are always welcome at all 4 outlets! However, for weekends, peak evening hours, or large groups (6+ guests), we strongly recommend making a table reservation online or giving us a call in advance.'
  },
  {
    question: 'Can I host private birthday parties or corporate events at Coffee King?',
    answer: 'Yes! We host private birthday celebrations, group meetups, and corporate get-togethers. Select "Event / Party Booking" in our contact form or chat with our outlet manager directly on WhatsApp.'
  },
  {
    question: 'How do KingCoins rewards work?',
    answer: 'For every ₹10 spent at any Coffee King outlet, you earn 1 KingCoin! Coins can be redeemed for discounts, free rice bowls, sizzlers, or signature drinks. Ask our lounge team at checkout to register your phone number.'
  },
  {
    question: 'Is valet parking available at your lounge locations?',
    answer: 'Valet parking is available at our CK Adajan & CK Vesu outlets. Dedicated parking spaces are available at CK Katargam and CK Pal.'
  },
  {
    question: 'Are there options for remote work or studying with laptops?',
    answer: 'Absoluty! All our lounge outlets feature power sockets, comfortable seating, and high-speed complimentary Wi-Fi for remote working.'
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
  '08:00 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM',
  '09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM', '11:00 PM'
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
