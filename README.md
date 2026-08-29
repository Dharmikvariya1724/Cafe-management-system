# ☕ Coffee King - Complete Cafe Management System & Customer Web Platform

[![Next.js](https://img.shields.io/badge/Next.js-16_App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-SMTP_Mail-007ACC?style=for-the-badge)](https://nodemailer.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A state-of-the-art, full-stack **Cafe Management System & Customer Web Application** built for **Coffee King Surat** (Adajan, Vesu, Katargam & Pal outlets).

Features a premium customer-facing web platform (with QR-code table ordering, interactive menu, 12-hour AM/PM table reservations, and KingCoins rewards) combined with an enterprise-grade **Admin Management Dashboard** complete with real-time order alerts, badge counts, HTML5 Canvas QR PNG generator, PDF/Excel invoice reporting, and central website branding logo upload.

---

## 🌟 Comprehensive Feature Highlights

### 📱 1. Customer-Facing Web Application

- **🏡 Dynamic Homepage (`/`)**:
  - Hero banner with CTA buttons.
  - Surat Lounge Outlets Showcase (*Adajan, Vesu, Katargam, Pal*) with live operational status badges.
  - **KingCoins Rewards Program**: Loyalty banner outlining reward tiers (100, 500, 1000 coins).
  - Admin-verified customer testimonials carousel.
  - CTA section linking directly to outlet visits.

- **📱 QR-Protected Menu & Table Ordering (`/menu`)**:
  - **QR Security Protection**: Direct unscanned visits display a branded QR scan prompt screen (`📱 Access Your Table Menu - Please scan the QR code placed on your table`).
  - **QR Session Table Banner**: Scanning a table QR code unlocks table ordering with an active badge (`Ordering for Table 05`).
  - Search filter across items and descriptions.
  - Swipeable category pill bar (*All Items, Coffee, Espresso, Tea, Cold Drinks, Breakfast, Snacks, Desserts*).
  - Paginated menu grid with direct cart action buttons.
  - Mobile floating bottom cart dock bar.

- **🛒 Dynamic Shopping Cart Drawer (`CartDrawer`)**:
  - Slide-over cart drawer with real-time quantity adjustments, subtotal, tax calculation, table context auto-tagging, and order checkout.

- **📅 12-Hour AM/PM Table Reservations (`/reservations`)**:
  - Booking form with guest selector, date picker, special requests, and 12-hour AM/PM time slot selector (`08:00 AM`, `09:30 AM`, `12:00 PM`, `07:30 PM`, `09:30 PM`).
  - Frontend & backend time format validation.
  - **Automated Nodemailer Confirmation Email**: Dispatches a styled HTML email to the customer's email address as soon as Admin confirms the booking.

- **📦 Live Order Tracker (`/orders`)**:
  - Track live status of placed orders (*Pending, Confirmed, Preparing, Ready, Completed, Cancelled*).

- **🖼️ Lightbox Photo Gallery (`/gallery`)**:
  - Filterable gallery (*Interior, Coffee, Food, Events*) with smooth Lightbox modal viewer.

- **📍 Outlets & Contact (`/contact`)**:
  - Detailed outlet cards for Adajan, Vesu, Katargam, and Pal.
  - Direct WhatsApp ordering chat links (`wa.me`) and embedded interactive Google Maps.

- **📜 Hygiene & Legal Policies**:
  - Hygiene Standards (`/hygiene`), Privacy Policy (`/privacy-policy`), Shipping & Delivery Policy (`/shipping-policy`), and Cancellation & Refund Policy (`/cancellation-refund`).

---

### 🛡️ 2. Admin Management Dashboard (`/admin`)

- **🔐 Admin Security & Auth**:
  - Admin authentication portal with database validation and demo fallback (`username: admin`, `password: admin123`).

- **📊 Dashboard & Analytics (`/admin`)**:
  - Overview cards for Total Revenue, Total Orders, Active Tables, and Reservations.
  - Dynamic charts for daily sales trends and category breakdown.

- **🔔 New Order Alert & Badge Count (`/admin/orders`)**:
  - **5-Second Polling System**: Periodically checks for incoming unseen orders.
  - **Red Badge Counter**: Displays live unseen orders badge on navigation (`Orders 🔴 3`).
  - **Floating Toast Notification**: Popup alert when a new order arrives.
  - Automatically marks orders as seen upon opening the Orders tab.

- **📋 Invoices & Reports (`/admin/invoices`)**:
  - Date-range filter presets (*Today, Last 7 Days, This Month, All Time*) and search filter.
  - **PDF Export (`jspdf` & `jspdf-autotable`)**: Single-click formatted PDF invoice summary report download.
  - **Excel Export (`xlsx` SheetJS)**: Clean `.xlsx` dataset export with all filtered transactions.
  - Individual printable tax bill generator.

- **🪑 Tables & HTML5 Canvas QR Code Exporter (`/admin/tables`)**:
  - Create and manage café tables, toggle active/inactive status, and regenerate tokens.
  - **HTML5 Canvas PNG QR Download**: Generates a high-res PNG image containing double border, logo header, QR code image, dynamic text (`TABLE NO. 05`), and scan instructions (`table-05-qr.png`).

- **🖼️ Central Website Branding & Logo File Upload (`/admin/profile`)**:
  - **Logo Image File Upload System**: Convert logo file via `FileReader` to Data URL string and upload to MongoDB via `PUT /api/settings`.
  - **Site-wide Logo Sync**: Logo updates dynamically across User Navbar, Admin Sidebar, Login Screen, and Footer.
  - Update admin personal info, change password, manage site name, tagline, and footer social links (*Instagram, Facebook, Twitter, YouTube, LinkedIn*).

- **🍔 Menu Items CRUD (`/admin/menu`)**:
  - Add, edit, toggle availability, set prices, and delete menu items with base64 image upload.

- **⭐ Review Moderation (`/admin/reviews`)**:
  - Verify and moderate customer feedback before displaying on the public homepage.

- **💬 Message Inbox (`/admin/messages`)**:
  - View and toggle reply statuses for customer inquiries.

---

## 🔑 Admin Credentials

| Portal | Route | Username | Password |
|---|---|---|---|
| **Admin Management Portal** | `/admin` | `admin` | `admin123` |

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: [Next.js 16](https://nextjs.org/) App Router, [React 19](https://react.dev/), [TypeScript 5](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Lucide Icons](https://lucide.dev/).
- **Backend API**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose ODM](https://mongoosejs.com/).
- **Database**: [MongoDB](https://www.mongodb.com/) (`cafe_management` database).
- **Email Service**: [Nodemailer](https://nodemailer.com/) SMTP integration.
- **Reporting & QR Exports**: [jsPDF](https://github.com/parallax/jsPDF) & `jspdf-autotable`, [SheetJS XLSX](https://sheetjs.com/), HTML5 Canvas.
- **State Management**: `SettingsContext`, `CartContext`, Next.js hooks.

---

## 🎨 Color Palette

| Tone | Hex Code | Purpose |
|---|---|---|
| **Primary** | `#6B3E2E` | Warm Espresso Brown (Headers, Buttons, Active States) |
| **Secondary** | `#FAF6F0` | Warm Soft Cream (Card Backgrounds & Canvas) |
| **Accent** | `#C9A876` | Gold Accent (Badges, Highlight Borders, Icons) |
| **Foreground** | `#1A1A1A` | Deep Charcoal (High Contrast Readable Typography) |

---

## 📁 Project Directory Structure

```
├── app/                           # Next.js 16 App Router Pages
│   ├── layout.tsx                 # Root layout & Providers wrapper
│   ├── page.tsx                   # Homepage (Hero, Outlets, Rewards, Testimonials, CTA)
│   ├── globals.css                # Tailwind CSS v4 design tokens
│   ├── menu/                      # Menu page (QR-gated, Category filters, Search)
│   ├── reservations/              # 12-Hour AM/PM Table reservation page
│   ├── orders/                    # Live order status tracking
│   ├── gallery/                   # Lightbox photo gallery
│   ├── about/                     # About Coffee King
│   ├── contact/                   # Outlets & Contact page with maps
│   ├── hygiene/                   # Hygiene standards
│   ├── privacy-policy/            # Privacy Policy
│   ├── shipping-policy/           # Shipping Policy
│   ├── cancellation-refund/       # Cancellation & Refund Policy
│   └── admin/                     # Admin Portal Dashboard
│       ├── layout.tsx             # Admin layout (Order polling, alert toast, badge count)
│       ├── page.tsx               # Analytics dashboard
│       ├── menu/                  # Menu items CRUD
│       ├── orders/                # Customer orders management
│       ├── invoices/              # Invoice generator (PDF & Excel export)
│       ├── tables/                # Table management & Canvas QR PNG exporter
│       ├── profile/               # Logo Upload & Website Settings
│       ├── gallery/               # Gallery photos CRUD
│       ├── reservations/          # Bookings control
│       ├── reviews/               # Review moderation
│       └── messages/              # Contact inbox
├── components/                    # UI Components
│   ├── Navigation.tsx             # Responsive Navbar with dynamic logo & active tab
│   ├── Footer.tsx                 # Site Footer with dynamic logo & social links
│   ├── CartDrawer.tsx             # Shopping cart slide-over
│   ├── ReservationForm.tsx        # 12-Hour AM/PM booking form
│   ├── HomeTestimonials.tsx       # Verified reviews carousel
│   ├── MenuCard.tsx               # Interactive menu item card
│   └── Providers.tsx              # SettingsProvider & CartProvider
├── context/
│   ├── SettingsContext.tsx        # Central site settings, favicon & logo context
│   └── CartContext.tsx            # Shopping cart & table QR session context
├── server/                        # Express.js + MongoDB Backend
│   ├── config/                    # Database connection (`db.js`)
│   ├── models/                    # Mongoose Models (Admin, Order, Settings, Table, etc.)
│   ├── routes/                    # API Route Handlers
│   ├── seed/                      # Database Seeder (`seedData.js`)
│   ├── migrations/                # Schema Migration Scripts (`20260829_002_...js`)
│   ├── utils/                     # Email service (`emailService.js`)
│   ├── index.js                   # Express server entry point (Port 5000)
│   └── package.json               # Server package config
├── lib/
│   ├── api-client.ts              # API bridge with localStorage fallback
│   ├── table-utils.ts             # QR token validator & canvas drawer
│   ├── constants.ts               # Operating hours, outlets info, time slots
│   └── types.ts                   # Core TypeScript interfaces
├── package.json                   # Root package config
└── README.md                      # Complete project documentation
```

---

## ⚡ Setup & Execution Guide

### Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: Installed locally (`mongodb://127.0.0.1:27017/cafe_management`) or MongoDB Atlas string.

---

### 1. Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dharmikvariya1724/Cafe-management-system.git
   cd Cafe-management-system
   git checkout dharmik-first
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Install Backend Server Dependencies**:
   ```bash
   cd server
   npm install
   cd ..
   ```

---

### 2. Environment Variables Configuration

Create a `.env` file inside the `server/` directory (`server/.env`):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cafe_management
CLIENT_URL=http://localhost:3000

# Nodemailer SMTP Configuration for Reservation Emails
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=your-email@gmail.com
MAIL_PASS=your-app-password
MAIL_FROM_ADDRESS=reservations@coffeeking.in
MAIL_FROM_NAME=Coffee King Surat
```

---

### 3. Database Migration & Seeding Commands

Run these commands from the project root directory:

- **Run Database Migrations** (Creates indexes & default settings):
  ```bash
  npm run migrate:db
  ```

- **Run Full Database Seeder** (Populates all 10 MongoDB collections with rich sample data):
  ```bash
  npm run seed:db
  ```

---

### 4. Running the Application

1. **Start Express Backend Server** (Port 5000):
   ```bash
   npm run server
   ```

2. **Start Next.js Frontend Development Server** (Port 3000):
   ```bash
   npm run dev
   ```

3. Open `http://localhost:3000` in your web browser.

---

## 📡 REST API Endpoint Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin authentication |
| `GET` / `PUT` | `/api/settings` | Get / Update site branding & logo settings |
| `GET` | `/api/orders/unseen-count` | Get count of unseen incoming orders |
| `PATCH` | `/api/orders/mark-seen` | Mark unseen orders as seen |
| `GET` / `POST` | `/api/orders` | Get orders list / Create new order |
| `PATCH` | `/api/orders/:id/status` | Update order status |
| `GET` / `POST` | `/api/reservations` | Get reservations / Submit reservation |
| `PATCH` | `/api/reservations/:id/status` | Update reservation status & trigger email |
| `GET` / `POST` | `/api/tables` | Get tables / Add new table |
| `GET` | `/api/tables/token/:token` | Validate table QR code token |
| `GET` / `POST` | `/api/menu` | Get menu items / Create menu item |
| `GET` / `POST` | `/api/reviews` | Get reviews / Submit customer review |
| `GET` / `POST` | `/api/gallery` | Get gallery images / Add gallery image |
| `POST` | `/api/messages` | Submit contact inquiry |
| `POST` | `/api/newsletter` | Subscribe to newsletter |

---

## 🐙 Git Repository & Branch

- **GitHub Repository**: [Dharmikvariya1724/Cafe-management-system](https://github.com/Dharmikvariya1724/Cafe-management-system)
- **Branch**: `dharmik-first`

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Developed & Maintained By

**Dharmik Variya**
- GitHub: [@Dharmikvariya1724](https://github.com/Dharmikvariya1724)
