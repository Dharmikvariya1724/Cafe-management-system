import type { MenuItem, Review, GalleryImage, Table } from './types'


export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: '1',
    name: 'Espresso',
    category: 'espresso',
    price: 120.00,
    description: 'Rich and intense single or double shot of freshly pulled espresso',
    image: '/images/espresso.png',
    available: true,
    popular: true
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'coffee',
    price: 160.00,
    description: 'Smooth blend of espresso, steamed milk, and velvety milk foam',
    image: '/images/cappuccino.png',
    available: true,
    popular: true
  },
  {
    id: '3',
    name: 'Latte',
    category: 'coffee',
    price: 180.00,
    description: 'Creamy and comforting espresso with steamed milk',
    image: '/images/latte.png',
    available: true,
    popular: true
  },
  {
    id: '4',
    name: 'Americano',
    category: 'espresso',
    price: 140.00,
    description: 'Bold espresso shots topped with hot water for a full-bodied flavor',
    image: '/images/espresso.png',
    available: true
  },
  {
    id: '5',
    name: 'Macchiato',
    category: 'espresso',
    price: 150.00,
    description: 'Espresso marked with a dollop of milk foam',
    image: '/images/cappuccino.png',
    available: true
  },
  {
    id: '6',
    name: 'Mocha',
    category: 'coffee',
    price: 210.00,
    description: 'Perfect blend of espresso, steamed milk, and rich chocolate',
    image: '/images/latte.png',
    available: true,
    popular: true
  },

  // Cold Drinks
  {
    id: '7',
    name: 'Iced Coffee',
    category: 'cold',
    price: 160.00,
    description: 'Chilled freshly brewed coffee served over ice',
    image: '/images/latte.png',
    available: true
  },
  {
    id: '8',
    name: 'Cold Brew',
    category: 'cold',
    price: 190.00,
    description: 'Smooth and naturally sweet cold brew concentrate',
    image: '/images/espresso.png',
    available: true,
    popular: true
  },
  {
    id: '9',
    name: 'Iced Latte',
    category: 'cold',
    price: 190.00,
    description: 'Creamy iced espresso with cold milk',
    image: '/images/latte.png',
    available: true
  },

  // Tea
  {
    id: '10',
    name: 'Chamomile Tea',
    category: 'tea',
    price: 130.00,
    description: 'Soothing herbal tea perfect for relaxation',
    image: '/images/cappuccino.png',
    available: true
  },
  {
    id: '11',
    name: 'Earl Grey',
    category: 'tea',
    price: 140.00,
    description: 'Classic black tea with bergamot essence',
    image: '/images/espresso.png',
    available: true
  },
  {
    id: '12',
    name: 'Green Tea',
    category: 'tea',
    price: 140.00,
    description: 'Fresh and light green tea with natural antioxidants',
    image: '/images/cappuccino.png',
    available: true
  },

  // Breakfast & Snacks
  {
    id: '13',
    name: 'Croissant',
    category: 'breakfast',
    price: 120.00,
    description: 'Buttery and flaky French pastry freshly baked daily',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '14',
    name: 'Avocado Toast',
    category: 'breakfast',
    price: 260.00,
    description: 'Fresh avocado on artisan toast with lemon and herbs',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '15',
    name: 'Yogurt Parfait',
    category: 'breakfast',
    price: 220.00,
    description: 'Creamy yogurt layered with granola and fresh berries',
    image: '/images/croissant.png',
    available: true
  },

  // Desserts & Sizzlers
  {
    id: '20',
    name: 'Chocolate Cake',
    category: 'desserts',
    price: 240.00,
    description: 'Rich and decadent dark chocolate slice',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '21',
    name: 'Cheesecake',
    category: 'desserts',
    price: 280.00,
    description: 'Creamy New York style cheesecake',
    image: '/images/croissant.png',
    available: true
  },
  {
    id: '22',
    name: 'Specialty Sizzler Bowl',
    category: 'snacks',
    price: 290.00,
    description: 'Smoking hot sizzler rice bowl with grilled veggies',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
]

export const reviews: Review[] = [
  {
    id: 'rev_1',
    name: 'Aarav Patel',
    photo: '/images/avatar-1.jpg',
    role: 'Regular Guest',
    location: 'Adajan Outlet',
    rating: 5,
    text: 'Best coffee in town! The cappuccino is incredibly smooth and the QR code table ordering made it super convenient.',
    date: '2026-08-15',
    verified: true,
    orderNumber: '#CC-1001'
  },
  {
    id: 'rev_2',
    name: 'Priya Sharma',
    photo: '/images/avatar-2.jpg',
    role: 'Food Blogger',
    location: 'Vesu Lounge',
    rating: 5,
    text: 'Loved the ambiance at the Vesu outlet! Avocado toast and mocha are a must-try. Truly a 5-star experience!',
    date: '2026-08-18',
    verified: true,
    orderNumber: '#CC-1002'
  },
  {
    id: 'rev_3',
    name: 'Rohan Mehta',
    photo: '/images/avatar-3.jpg',
    role: 'Coffee Enthusiast',
    location: 'Pal Outlet',
    rating: 4,
    text: 'Great place to hang out with friends. Fast Wi-Fi, cozy seating, and an awesome cold brew that keeps me coming back.',
    date: '2026-08-20',
    verified: true,
    orderNumber: '#CC-1003'
  },
  {
    id: 'rev_4',
    name: 'Kavya Shah',
    photo: '/images/avatar-1.jpg',
    role: 'Loyal Customer',
    location: 'Katargam Outlet',
    rating: 5,
    text: 'The specialty sizzler bowl is absolute perfection! Super fast service and warm hospitality from the staff.',
    date: '2026-08-22',
    verified: true,
    orderNumber: '#CC-1004'
  },
  {
    id: 'rev_5',
    name: 'Ananya Desai',
    photo: '/images/avatar-2.jpg',
    role: 'Remote Worker',
    location: 'Vesu Lounge',
    rating: 5,
    text: 'My go-to spot for work sessions. The espresso pulls are top tier and the staff always remembers my usual order!',
    date: '2026-08-23',
    verified: true,
    orderNumber: '#CC-1006'
  },
  {
    id: 'rev_6',
    name: 'Vikram Malhotra',
    photo: '/images/avatar-3.jpg',
    role: 'Frequent Visitor',
    location: 'Adajan Outlet',
    rating: 5,
    text: 'The KingCoins rewards system is fantastic. Earned a free sizzler bowl after just a few visits! Highly recommended.',
    date: '2026-08-25',
    verified: true,
    orderNumber: '#CC-1007'
  },
  {
    id: 'rev_7',
    name: 'Sneha Joshi',
    photo: '/images/avatar-1.jpg',
    role: 'Dessert Lover',
    location: 'Pal Outlet',
    rating: 5,
    text: 'Their NY Cheesecake paired with a warm hazelnut latte is heaven! Elegant decor and lovely background music.',
    date: '2026-08-26',
    verified: true,
    orderNumber: '#CC-1008'
  },
  {
    id: 'rev_8',
    name: 'Deepak Varma',
    photo: '',
    role: 'Guest',
    location: 'Katargam Outlet',
    rating: 4,
    text: 'Iced latte was very refreshing. Nice music and cozy seating.',
    date: '2026-08-24',
    verified: false,
    orderNumber: '#CC-1005'
  }
]

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/outlet-adajan.jpg',
    category: 'interior',
    alt: 'CK Adajan Outlet Lounge',
    title: 'CK Adajan Lounge'
  },
  {
    id: '2',
    src: '/images/cappuccino.png',
    category: 'coffee',
    alt: 'Artisan Cappuccino',
    title: 'Artisan Latte Art'
  },
  {
    id: '3',
    src: '/images/outlet-vesu.jpg',
    category: 'interior',
    alt: 'CK Vesu Outlet Lounge',
    title: 'CK Vesu Space'
  },
  {
    id: '4',
    src: '/images/croissant.png',
    category: 'food',
    alt: 'Freshly Baked Croissant',
    title: 'Bakery Delights'
  },
  {
    id: '5',
    src: '/images/espresso.png',
    category: 'coffee',
    alt: 'Espresso Pull',
    title: 'Specialty Espresso'
  },
  {
    id: '6',
    src: '/images/outlet-katargam.jpg',
    category: 'interior',
    alt: 'CK Katargam Outlet',
    title: 'CK Katargam Vibe'
  },
  {
    id: '7',
    src: '/images/latte.png',
    category: 'coffee',
    alt: 'Creamy Iced Latte',
    title: 'Iced Refreshers'
  },
  {
    id: '8',
    src: '/images/outlet-pal.jpg',
    category: 'interior',
    alt: 'CK Pal Outdoor Seating',
    title: 'CK Pal Lounge'
  },
]

const now = Date.now()
const oneDayMs = 24 * 60 * 60 * 1000

export const initialOrders: Array<import('./types').Order> = [
  {
    id: 'ord-101',
    orderNumber: '#CC-1001',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.patel@example.com',
    customerPhone: '+91 98765 43210',
    orderType: 'dine-in',
    tableNumber: 'Table 04',
    tableToken: 'ck-tbl-tok-004-j0k1l2',
    items: [
      { id: 'item-1', menuItemId: '2', name: 'Cappuccino', price: 160.00, quantity: 2, image: '/images/cappuccino.png' },
      { id: 'item-2', menuItemId: '13', name: 'Butter Croissant', price: 120.00, quantity: 1, image: '/images/croissant.png' }
    ],
    subtotal: 440.00,
    tax: 35.20,
    total: 475.20,
    status: 'completed',
    paymentMethod: 'upi',
    specialInstructions: 'Extra hot cappuccino please',
    createdAt: new Date(now - 10 * oneDayMs).toISOString(),
    updatedAt: new Date(now - 10 * oneDayMs).toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: '#CC-1002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@example.com',
    customerPhone: '+91 98123 45678',
    orderType: 'pickup',
    items: [
      { id: 'item-3', menuItemId: '8', name: 'Cold Brew', price: 190.00, quantity: 1, image: '/images/espresso.png' },
      { id: 'item-4', menuItemId: '11', name: 'Avocado Toast', price: 260.00, quantity: 1, image: '/images/croissant.png' }
    ],
    subtotal: 450.00,
    tax: 36.00,
    total: 486.00,
    status: 'completed',
    paymentMethod: 'card',
    specialInstructions: 'Pick up at 4:30 PM',
    createdAt: new Date(now - 7 * oneDayMs).toISOString(),
    updatedAt: new Date(now - 7 * oneDayMs).toISOString()
  },
  {
    id: 'ord-103',
    orderNumber: '#CC-1003',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.m@example.com',
    customerPhone: '+91 99887 76655',
    orderType: 'delivery',
    address: 'B-402, Sunrise Apartments, M.G. Road, Surat',
    items: [
      { id: 'item-5', menuItemId: '6', name: 'Mocha', price: 210.00, quantity: 2, image: '/images/latte.png' },
      { id: 'item-6', menuItemId: '17', name: 'Dark Chocolate Cake', price: 240.00, quantity: 1, image: '/images/croissant.png' }
    ],
    subtotal: 660.00,
    tax: 52.80,
    total: 712.80,
    status: 'completed',
    paymentMethod: 'cash',
    specialInstructions: 'Ring doorbell twice',
    createdAt: new Date(now - 3 * oneDayMs).toISOString(),
    updatedAt: new Date(now - 3 * oneDayMs).toISOString()
  },
  {
    id: 'ord-104',
    orderNumber: '#CC-1004',
    customerName: 'Kavya Shah',
    customerEmail: 'kavya.shah@example.com',
    customerPhone: '+91 98981 12233',
    orderType: 'dine-in',
    tableNumber: 'Table 01',
    items: [
      { id: 'item-7', menuItemId: '19', name: 'Specialty Sizzler Bowl', price: 290.00, quantity: 2, image: '/images/croissant.png' },
      { id: 'item-8', menuItemId: '9', name: 'Iced Latte', price: 190.00, quantity: 2, image: '/images/latte.png' }
    ],
    subtotal: 960.00,
    tax: 76.80,
    total: 1036.80,
    status: 'preparing',
    paymentMethod: 'upi',
    specialInstructions: 'Spicy sizzler sauce',
    createdAt: new Date(now - 1 * oneDayMs).toISOString(),
    updatedAt: new Date(now - 1 * oneDayMs).toISOString()
  },
  {
    id: 'ord-105',
    orderNumber: '#CC-1005',
    customerName: 'Deepak Varma',
    customerEmail: 'deepak.v@example.com',
    customerPhone: '+91 97123 99887',
    orderType: 'pickup',
    items: [
      { id: 'item-9', menuItemId: '3', name: 'Latte', price: 180.00, quantity: 1, image: '/images/latte.png' },
      { id: 'item-10', menuItemId: '18', name: 'NY Cheesecake', price: 280.00, quantity: 1, image: '/images/croissant.png' }
    ],
    subtotal: 460.00,
    tax: 36.80,
    total: 496.80,
    status: 'pending',
    paymentMethod: 'cash',
    specialInstructions: 'Extra napkins please',
    createdAt: new Date(now - 2 * 3600000).toISOString(),
    updatedAt: new Date(now - 2 * 3600000).toISOString()
  }
]

export const initialTables: Table[] = [
  {
    id: 'tbl-01',
    tableNumber: 'Table 01',
    name: 'Window Booth 1',
    publicToken: 'ck-tbl-tok-001-a1b2c3',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tbl-02',
    tableNumber: 'Table 02',
    name: 'Window Booth 2',
    publicToken: 'ck-tbl-tok-002-d4e5f6',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tbl-03',
    tableNumber: 'Table 03',
    name: 'Center Table 3',
    publicToken: 'ck-tbl-tok-003-g7h8i9',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tbl-04',
    tableNumber: 'Table 04',
    name: 'Garden Patio 4',
    publicToken: 'ck-tbl-tok-004-j0k1l2',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'tbl-05',
    tableNumber: 'Table 05',
    name: 'VIP Corner 5',
    publicToken: 'ck-tbl-tok-005-m3n4o5',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]
