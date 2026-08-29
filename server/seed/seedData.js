const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const Admin = require('../models/Admin');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const Review = require('../models/Review');
const GalleryImage = require('../models/GalleryImage');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const ContactMessage = require('../models/ContactMessage');
const Newsletter = require('../models/Newsletter');
const Settings = require('../models/Settings');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const settingsData = {
  siteName: 'Coffee King',
  siteTagline: 'Stirr Your Heart In',
  logo: '/images/logo.png',
  favicon: '/favicon.ico',
  adminName: 'Coffee King Admin',
  adminEmail: 'admin@coffeeking.com',
  adminPhone: '+91 98765 43210',
  adminAvatar: '/images/avatar-1.jpg',
  socialLinks: {
    instagram: 'https://instagram.com/coffeekingin',
    facebook: 'https://facebook.com/coffeekingin',
    twitter: 'https://twitter.com/coffeekingin',
    youtube: 'https://youtube.com/coffeekingin',
    linkedin: 'https://linkedin.com/company/coffeekingin'
  }
};

const menuItems = [
  { id: '1', name: 'Espresso', category: 'espresso', price: 120.00, description: 'Rich and intense single or double shot of freshly pulled espresso', image: '/images/espresso.png', available: true, popular: true },
  { id: '2', name: 'Cappuccino', category: 'coffee', price: 160.00, description: 'Smooth blend of espresso, steamed milk, and velvety milk foam', image: '/images/cappuccino.png', available: true, popular: true },
  { id: '3', name: 'Latte', category: 'coffee', price: 180.00, description: 'Creamy and comforting espresso with steamed milk', image: '/images/latte.png', available: true, popular: true },
  { id: '4', name: 'Americano', category: 'espresso', price: 140.00, description: 'Bold espresso shots topped with hot water for a full-bodied flavor', image: '/images/espresso.png', available: true },
  { id: '5', name: 'Macchiato', category: 'espresso', price: 150.00, description: 'Espresso marked with a dollop of milk foam', image: '/images/cappuccino.png', available: true },
  { id: '6', name: 'Mocha', category: 'coffee', price: 210.00, description: 'Perfect blend of espresso, steamed milk, and rich chocolate', image: '/images/latte.png', available: true, popular: true },
  { id: '7', name: 'Iced Coffee', category: 'cold', price: 160.00, description: 'Chilled freshly brewed coffee served over ice', image: '/images/latte.png', available: true },
  { id: '8', name: 'Cold Brew', category: 'cold', price: 190.00, description: 'Smooth and naturally sweet cold brew concentrate', image: '/images/espresso.png', available: true, popular: true },
  { id: '9', name: 'Iced Latte', category: 'cold', price: 190.00, description: 'Creamy iced espresso with cold milk', image: '/images/latte.png', available: true },
  { id: '10', name: 'Chamomile Tea', category: 'tea', price: 130.00, description: 'Soothing herbal tea perfect for relaxation', image: '/images/cappuccino.png', available: true },
  { id: '11', name: 'Avocado Toast', category: 'breakfast', price: 260.00, description: 'Fresh avocado mash on sourdough toast with poached egg', image: '/images/croissant.png', available: true, popular: true },
  { id: '12', name: 'Chocolate Croissant', category: 'breakfast', price: 150.00, description: 'Flaky buttery croissant with dark chocolate filling', image: '/images/croissant.png', available: true, popular: true },
  { id: '13', name: 'Butter Croissant', category: 'breakfast', price: 120.00, description: 'Buttery and flaky French pastry freshly baked daily', image: '/images/croissant.png', available: true, popular: true },
  { id: '14', name: 'Earl Grey Tea', category: 'tea', price: 140.00, description: 'Classic black tea infused with bergamot essence', image: '/images/espresso.png', available: true },
  { id: '15', name: 'Green Tea', category: 'tea', price: 140.00, description: 'Fresh and light green tea packed with natural antioxidants', image: '/images/cappuccino.png', available: true },
  { id: '16', name: 'Yogurt Parfait', category: 'breakfast', price: 220.00, description: 'Creamy Greek yogurt layered with granola and fresh berries', image: '/images/croissant.png', available: true },
  { id: '17', name: 'Dark Chocolate Cake', category: 'desserts', price: 240.00, description: 'Rich and decadent dark chocolate slice', image: '/images/croissant.png', available: true, popular: true },
  { id: '18', name: 'NY Cheesecake', category: 'desserts', price: 280.00, description: 'Creamy New York style cheesecake with strawberry drizzle', image: '/images/croissant.png', available: true },
  { id: '19', name: 'Specialty Sizzler Bowl', category: 'snacks', price: 290.00, description: 'Smoking hot sizzler rice bowl with grilled exotic veggies', image: '/images/croissant.png', available: true, popular: true }
];

const tables = [
  { id: 'tbl-01', tableNumber: 'Table 01', name: 'Window Booth 1', publicToken: 'ck-tbl-tok-001-a1b2c3', status: 'active' },
  { id: 'tbl-02', tableNumber: 'Table 02', name: 'Window Booth 2', publicToken: 'ck-tbl-tok-002-d4e5f6', status: 'active' },
  { id: 'tbl-03', tableNumber: 'Table 03', name: 'Center Table 3', publicToken: 'ck-tbl-tok-003-g7h8i9', status: 'active' },
  { id: 'tbl-04', tableNumber: 'Table 04', name: 'Garden Patio 4', publicToken: 'ck-tbl-tok-004-j0k1l2', status: 'active' },
  { id: 'tbl-05', tableNumber: 'Table 05', name: 'VIP Corner 5', publicToken: 'ck-tbl-tok-005-m3n4o5', status: 'active' }
];

const reviews = [
  {
    id: 'rev_1',
    name: 'Aarav Patel',
    photo: '/images/avatar-1.jpg',
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
    rating: 5,
    text: 'Loved the ambiance at the Vesu outlet! Avocado toast and mocha are a must-try.',
    date: '2026-08-18',
    verified: true,
    orderNumber: '#CC-1002'
  },
  {
    id: 'rev_3',
    name: 'Rohan Mehta',
    photo: '/images/avatar-3.jpg',
    rating: 4,
    text: 'Great place to hang out with friends. Fast Wi-Fi and awesome cold brew.',
    date: '2026-08-20',
    verified: true,
    orderNumber: '#CC-1003'
  },
  {
    id: 'rev_4',
    name: 'Kavya Shah',
    photo: '/images/avatar-1.jpg',
    rating: 5,
    text: 'The specialty sizzler bowl is absolute perfection! Super fast service and warm hospitality.',
    date: '2026-08-22',
    verified: true,
    orderNumber: '#CC-1004'
  },
  {
    id: 'rev_5',
    name: 'Deepak Varma',
    photo: '',
    rating: 4,
    text: 'Iced latte was very refreshing. Nice music and cozy seating.',
    date: '2026-08-24',
    verified: false,
    orderNumber: '#CC-1005'
  }
];

const galleryImages = [
  { id: '1', src: '/images/outlet-adajan.jpg', category: 'interior', alt: 'CK Adajan Lounge', title: 'Adajan Outlet' },
  { id: '2', src: '/images/cappuccino.png', category: 'coffee', alt: 'Artisan Latte Art', title: 'Specialty Latte Art' },
  { id: '3', src: '/images/outlet-vesu.jpg', category: 'interior', alt: 'CK Vesu Space', title: 'Vesu Outlet' },
  { id: '4', src: '/images/croissant.png', category: 'food', alt: 'Bakery Delights', title: 'Fresh Croissants' },
  { id: '5', src: '/images/espresso.png', category: 'coffee', alt: 'Specialty Espresso', title: 'Espresso Pull' }
];

const now = Date.now();
const oneDayMs = 24 * 60 * 60 * 1000;

const orders = [
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
    isSeen: true,
    createdAt: new Date(now - 10 * oneDayMs).toISOString()
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
    isSeen: true,
    createdAt: new Date(now - 7 * oneDayMs).toISOString()
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
    isSeen: true,
    createdAt: new Date(now - 3 * oneDayMs).toISOString()
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
    isSeen: false,
    createdAt: new Date(now - 1 * oneDayMs).toISOString()
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
    isSeen: false,
    createdAt: new Date(now - 2 * 3600000).toISOString()
  }
];

const reservations = [
  {
    id: 'res-101',
    name: 'Vikram Joshi',
    email: 'vikram.j@example.com',
    phone: '+91 98980 12345',
    date: new Date(now + 1 * oneDayMs).toISOString().split('T')[0],
    time: '07:30 PM',
    guests: 4,
    specialRequests: 'Corner table near window for anniversary dinner',
    status: 'confirmed'
  },
  {
    id: 'res-102',
    name: 'Ananya Desai',
    email: 'ananya.d@example.com',
    phone: '+91 97234 56789',
    date: new Date(now + 2 * oneDayMs).toISOString().split('T')[0],
    time: '06:00 PM',
    guests: 2,
    specialRequests: 'Quiet area suitable for work discussion',
    status: 'pending'
  }
];

const contactMessages = [
  {
    id: 'msg-101',
    name: 'Kavita Dave',
    email: 'kavita.dave@example.com',
    phone: '+91 98250 99887',
    subject: 'Catering Inquiry for Birthday Party',
    message: 'Hello, do you provide coffee and snack catering services for a private party of 30 guests next month in Adajan?',
    replied: false
  },
  {
    id: 'msg-102',
    name: 'Hardik Shah',
    email: 'hardik.s@example.com',
    phone: '+91 94260 11223',
    subject: 'Franchise Opportunity',
    message: 'Interested in opening a Coffee King outlet in Vesu, Surat. Please share franchise details.',
    replied: true
  }
];

const newsletters = [
  { id: 'sub-101', email: 'coffeelover1@example.com', subscribedAt: new Date().toISOString() },
  { id: 'sub-102', email: 'surat.foodie@example.com', subscribedAt: new Date().toISOString() }
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_management';
    console.log(`[Seed Script] Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);

    console.log('[Seed Script] Clearing existing collections...');
    await Admin.deleteMany({});
    await Settings.deleteMany({});
    await MenuItem.deleteMany({});
    await Table.deleteMany({});
    await Review.deleteMany({});
    await GalleryImage.deleteMany({});
    await Order.deleteMany({});
    await Reservation.deleteMany({});
    await ContactMessage.deleteMany({});
    await Newsletter.deleteMany({});

    console.log('[Seed Script] Seeding Admin User (admin / admin123)...');
    const adminUser = new Admin({
      username: 'admin',
      password: 'admin123',
      name: 'Coffee King Admin',
      email: 'admin@coffeeking.com',
      phone: '+91 98765 43210',
      avatar: '/images/avatar-1.jpg',
      role: 'admin'
    });
    await adminUser.save();

    console.log('[Seed Script] Seeding Central Site Settings...');
    await Settings.create(settingsData);

    console.log('[Seed Script] Seeding Menu Items...');
    await MenuItem.insertMany(menuItems);

    console.log('[Seed Script] Seeding Tables...');
    await Table.insertMany(tables);

    console.log('[Seed Script] Seeding Reviews (with verified & pending states)...');
    await Review.insertMany(reviews);

    console.log('[Seed Script] Seeding Gallery Images...');
    await GalleryImage.insertMany(galleryImages);

    console.log('[Seed Script] Seeding Date-stamped Orders...');
    await Order.insertMany(orders);

    console.log('[Seed Script] Seeding Reservations...');
    await Reservation.insertMany(reservations);

    console.log('[Seed Script] Seeding Contact Messages...');
    await ContactMessage.insertMany(contactMessages);

    console.log('[Seed Script] Seeding Newsletter Subscribers...');
    await Newsletter.insertMany(newsletters);

    console.log('✅ [Seed Script SUCCESS] MongoDB database cafe_management successfully migrated & seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Script Error]:', error.message);
    process.exit(1);
  }
};

seedDatabase();
