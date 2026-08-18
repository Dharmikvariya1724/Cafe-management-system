import type { MenuItem, Review, GalleryImage, Table } from './types'


export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: '1',
    name: 'Espresso',
    category: 'espresso',
    price: 3.50,
    description: 'Rich and intense single or double shot of freshly pulled espresso',
    image: '/images/espresso.png',
    available: true,
    popular: true
  },
  {
    id: '2',
    name: 'Cappuccino',
    category: 'coffee',
    price: 4.50,
    description: 'Smooth blend of espresso, steamed milk, and velvety milk foam',
    image: '/images/cappuccino.png',
    available: true,
    popular: true
  },
  {
    id: '3',
    name: 'Latte',
    category: 'coffee',
    price: 4.75,
    description: 'Creamy and comforting espresso with steamed milk',
    image: '/images/latte.png',
    available: true,
    popular: true
  },
  {
    id: '4',
    name: 'Americano',
    category: 'espresso',
    price: 3.75,
    description: 'Bold espresso shots topped with hot water for a full-bodied flavor',
    image: '/images/espresso.png',
    available: true
  },
  {
    id: '5',
    name: 'Macchiato',
    category: 'espresso',
    price: 4.25,
    description: 'Espresso marked with a dollop of milk foam',
    image: '/images/cappuccino.png',
    available: true
  },
  {
    id: '6',
    name: 'Mocha',
    category: 'coffee',
    price: 5.00,
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
    price: 4.25,
    description: 'Chilled freshly brewed coffee served over ice',
    image: '/images/latte.png',
    available: true
  },
  {
    id: '8',
    name: 'Cold Brew',
    category: 'cold',
    price: 4.75,
    description: 'Smooth and naturally sweet cold brew concentrate',
    image: '/images/espresso.png',
    available: true,
    popular: true
  },
  {
    id: '9',
    name: 'Iced Latte',
    category: 'cold',
    price: 4.75,
    description: 'Creamy iced espresso with cold milk',
    image: '/images/latte.png',
    available: true
  },

  // Tea
  {
    id: '10',
    name: 'Chamomile Tea',
    category: 'tea',
    price: 3.50,
    description: 'Soothing herbal tea perfect for relaxation',
    image: '/images/cappuccino.png',
    available: true
  },
  {
    id: '11',
    name: 'Earl Grey',
    category: 'tea',
    price: 3.75,
    description: 'Classic black tea with bergamot essence',
    image: '/images/espresso.png',
    available: true
  },
  {
    id: '12',
    name: 'Green Tea',
    category: 'tea',
    price: 3.75,
    description: 'Fresh and light green tea with natural antioxidants',
    image: '/images/cappuccino.png',
    available: true
  },

  // Breakfast & Snacks
  {
    id: '13',
    name: 'Croissant',
    category: 'breakfast',
    price: 3.99,
    description: 'Buttery and flaky French pastry freshly baked daily',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '14',
    name: 'Avocado Toast',
    category: 'breakfast',
    price: 8.99,
    description: 'Fresh avocado on artisan toast with lemon and herbs',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '15',
    name: 'Yogurt Parfait',
    category: 'breakfast',
    price: 7.99,
    description: 'Creamy yogurt layered with granola and fresh berries',
    image: '/images/croissant.png',
    available: true
  },

  // Desserts & Sizzlers
  {
    id: '20',
    name: 'Chocolate Cake',
    category: 'desserts',
    price: 5.99,
    description: 'Rich and decadent dark chocolate slice',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
  {
    id: '21',
    name: 'Cheesecake',
    category: 'desserts',
    price: 6.99,
    description: 'Creamy New York style cheesecake',
    image: '/images/croissant.png',
    available: true
  },
  {
    id: '22',
    name: 'Specialty Sizzler Bowl',
    category: 'snacks',
    price: 9.99,
    description: 'Smoking hot sizzler rice bowl with grilled veggies',
    image: '/images/croissant.png',
    available: true,
    popular: true
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    photo: '/images/avatar-1.jpg',
    rating: 5,
    text: 'Coffee King is my daily go-to place in Surat! The baristas are incredibly skilled and always remember my order.',
    date: '2024-05-15',
    verified: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    photo: '/images/avatar-2.jpg',
    rating: 5,
    text: 'Outstanding atmosphere and excellent coffee quality across Vesu and Adajan outlets. Highly recommended!',
    date: '2024-05-10',
    verified: true
  },
  {
    id: '3',
    name: 'Emma Williams',
    photo: '/images/avatar-3.jpg',
    rating: 5,
    text: 'Love the cozy vibes and attention to detail in every cup. Best cafe in Surat hands down!',
    date: '2024-05-05',
    verified: true
  },
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


export const initialOrders: Array<import('./types').Order> = [
  {
    id: 'ord-101',
    orderNumber: '#CC-1001',
    customerName: 'Aarav Patel',
    customerEmail: 'aarav.patel@example.com',
    customerPhone: '+91 98765 43210',
    orderType: 'dine-in',
    tableNumber: 'Table 4',
    items: [
      { id: 'item-1', menuItemId: '2', name: 'Cappuccino', price: 4.50, quantity: 2, image: '/images/cappuccino.png' },
      { id: 'item-2', menuItemId: '13', name: 'Croissant', price: 3.99, quantity: 1, image: '/images/croissant.png' }
    ],
    subtotal: 12.99,
    tax: 1.04,
    total: 14.03,
    status: 'pending',
    paymentMethod: 'upi',
    specialInstructions: 'Extra hot cappuccino please',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 60000).toISOString()
  },
  {
    id: 'ord-102',
    orderNumber: '#CC-1002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya.s@example.com',
    customerPhone: '+91 98123 45678',
    orderType: 'pickup',
    items: [
      { id: 'item-3', menuItemId: '8', name: 'Cold Brew', price: 4.75, quantity: 1, image: '/images/cold-brew.jpg' },
      { id: 'item-4', menuItemId: '14', name: 'Avocado Toast', price: 8.99, quantity: 1, image: '/images/avocado-toast.jpg' }
    ],
    subtotal: 13.74,
    tax: 1.10,
    total: 14.84,
    status: 'confirmed',
    paymentMethod: 'card',
    specialInstructions: 'Will pick up at 4:30 PM',
    createdAt: new Date(Date.now() - 45 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60000).toISOString()
  },
  {
    id: 'ord-103',
    orderNumber: '#CC-1003',
    customerName: 'Rohan Mehta',
    customerEmail: 'rohan.m@example.com',
    customerPhone: '+91 99887 76655',
    orderType: 'delivery',
    address: 'B-402, Sunrise Apartments, M.G. Road',
    items: [
      { id: 'item-5', menuItemId: '6', name: 'Mocha', price: 5.00, quantity: 2, image: '/images/mocha.jpg' },
      { id: 'item-6', menuItemId: '20', name: 'Chocolate Cake', price: 5.99, quantity: 1, image: '/images/chocolate-cake.jpg' }
    ],
    subtotal: 15.99,
    tax: 1.28,
    total: 17.27,
    status: 'preparing',
    paymentMethod: 'cash',
    specialInstructions: 'Ring doorbell twice',
    createdAt: new Date(Date.now() - 90 * 60000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60000).toISOString()
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
