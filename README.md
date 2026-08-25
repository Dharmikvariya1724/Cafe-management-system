# ☕ The Coffee Corner - Cafe Management System

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A modern, high-performance, full-stack **Cafe Management System & Customer Web Application** built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and a dedicated **Node.js + Express + MongoDB** backend API server.

Features an elegant, premium customer-facing web application alongside a full-featured **Admin Management Dashboard** with analytics, menu CRUD, gallery controls, online order tracking, table bookings, invoice generation, customer reviews moderation, and profile settings.

---

## 🌟 Key Features

### 🛍️ Customer-Facing Web Application
- **🏡 Hero & Landing Page**: Stunning visual design featuring coffee animations, popular items, testimonials carousel, and quick CTA links.
- **☕ Interactive Menu (`/menu`)**:
  - Live real-time search across item names and descriptions.
  - Multi-category filtering (*Espresso, Coffee, Tea, Pastry, Breakfast, Cold Drinks, Snacks, Desserts*).
  - Responsive pagination and category badges.
  - Direct "Add to Cart" functionality with live item quantity controls.
- **🛒 Dynamic Shopping Cart & Drawer (`CartDrawer`)**:
  - Slide-over cart drawer with realtime quantity updates, subtotal, tax calculation, and order submission.
- **📦 Order Tracking (`/orders`)**:
  - Track live order status (Pending, Preparing, Ready, Completed, Cancelled).
- **🖼️ Photo Gallery (`/gallery`)**:
  - Category-based image filtering (*Interior, Food & Drinks, Events*).
  - High-resolution Lightbox modal viewer with smooth hover & zoom animations.
- **📅 Online Reservations (`/reservations`)**:
  - Interactive table booking form with date, time slot, guest counter, and special requests.
- **ℹ️ About Us (`/about`)**: Story, core values, operational hours, and baristas showcase.
- **📞 Contact & Location (`/contact`)**: Functional contact form, operating hours, and business details.
- **📜 Policy & Trust Pages**:
  - Privacy Policy (`/privacy-policy`)
  - Terms & Shipping Policy (`/shipping-policy`)
  - Cancellation & Refund Policy (`/cancellation-refund`)
  - Hygiene & Food Safety Standards (`/hygiene`)
- **📱 Mobile App Dock Bar**: Quick floating navigation bar optimized for mobile browsers.

---

### 🛡️ Admin Management Dashboard (`/admin`)
- **🔐 Authentication**: Secure admin session management (`username: admin`, `password: admin123`).
- **📊 Overview Analytics**: Live metrics for revenue, total orders, active reservations, menu items, and customer inquiries.
- **🍔 Menu Management (`/admin/menu`)**:
  - Complete CRUD operations for cafe food & drink items.
  - **Drag-and-Drop Image Upload** with Base64 preview.
  - Category tagging, pricing, availability toggles, and "Popular" flags.
- **📦 Orders Management (`/admin/orders`)**:
  - View incoming customer orders, update order status, filter by status, and inspect order items.
- **📋 Invoice Generation (`/admin/invoices`)**:
  - Generate printable HTML/PDF style invoices for orders and view detailed transaction breakdowns.
- **🪑 Table Management (`/admin/tables`)**:
  - Track physical cafe tables, table capacity, location (Indoor/Outdoor), and occupancy status.
- **🖼️ Gallery Management (`/admin/gallery`)**:
  - Upload high-quality cafe photos, update tags, and control display preferences.
- **📅 Reservation Control (`/admin/reservations`)**: View, confirm, assign tables, or cancel customer bookings.
- **⭐ Review Moderation (`/admin/reviews`)**: Moderate, approve, or feature customer feedback on the landing page.
- **💬 Message Inbox (`/admin/messages`)**: Inbox for managing contact form submissions.
- **👤 Profile Settings (`/admin/profile`)**: Manage admin credentials, cafe operating details, and security settings.

---

## 🔑 Admin Credentials

| Feature | Endpoint | Username | Password |
|---|---|---|---|
| **Admin Portal** | `/admin` | `admin` | `admin123` |

---

## 🛠️ Tech Stack & Architecture

- **Frontend Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API Server**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **API Client**: `lib/api-client.ts` with Hybrid fallback (Express REST API + LocalStorage sync)

---

## 🎨 Color Palette & Typography

| Element | Color Hex | Visual Style |
|---|---|---|
| **Primary** | `#8B4513` | Espresso Brown (Warm & Rich) |
| **Secondary** | `#F5E6D3` | Warm Cream (Soft & Elegant) |
| **Accent** | `#D4A373` | Warm Gold (Luxury Touch) |
| **Foreground** | `#2C1810` | Dark Roasty Brown (High Contrast Text) |
| **Background** | `#FFFFFF` / `#FAF6F0` | Clean & Crisp Light Canvas |

---

## 📁 Project Structure

```
├── app/                           # Next.js 16 App Router
│   ├── layout.tsx                 # Root layout & global metadata
│   ├── page.tsx                   # Main homepage
│   ├── globals.css                # Tailwind CSS v4 design tokens & base styles
│   ├── menu/                      # Menu page with search & category filters
│   ├── gallery/                   # Gallery page with Lightbox viewer
│   ├── reservations/              # Table reservation page
│   ├── orders/                    # Customer order tracking page
│   ├── about/                     # About page
│   ├── contact/                   # Contact page
│   ├── privacy-policy/            # Privacy Policy
│   ├── shipping-policy/           # Shipping & Delivery Policy
│   ├── cancellation-refund/       # Cancellation & Refund Policy
│   ├── hygiene/                   # Food Hygiene & Safety Standards
│   └── admin/                     # Admin Management Dashboard
│       ├── layout.tsx             # Admin layout & auth guard
│       ├── page.tsx               # Analytics dashboard
│       ├── menu/                  # Menu items CRUD
│       ├── orders/                # Customer orders management
│       ├── invoices/              # Printable invoice generator
│       ├── tables/                # Table reservation & seating management
│       ├── gallery/               # Gallery photos CRUD
│       ├── reservations/          # Table bookings control
│       ├── reviews/               # Review moderation
│       ├── messages/              # Contact inquiries inbox
│       └── profile/               # Admin profile settings
├── components/                    # Reusable React components
│   ├── Navigation.tsx             # Responsive header navbar
│   ├── CartDrawer.tsx             # Slide-over shopping cart drawer
│   ├── Footer.tsx                 # Site footer with dynamic links
│   ├── MobileAppDock.tsx          # Floating mobile action dock
│   ├── HomeTestimonials.tsx       # Customer reviews showcase
│   ├── MenuCard.tsx               # Dynamic menu item card
│   └── ReservationForm.tsx        # Booking form with validation
├── server/                        # Node.js + Express Backend Server
│   ├── config/                    # MongoDB connection configuration (`db.js`)
│   ├── models/                    # Mongoose Data Models (Admin, Order, Menu, etc.)
│   ├── routes/                    # Express REST API routes
│   ├── seed/                      # Database seeding script (`seedData.js`)
│   ├── index.js                   # Express server entry point (Port 5000)
│   └── package.json               # Server dependencies & scripts
├── lib/
│   ├── api-client.ts              # Unified API client (REST API + LocalStorage fallback)
│   ├── types.ts                   # Core TypeScript interfaces
│   ├── data.ts                    # Fallback mock dataset
│   └── constants.ts               # Cafe operating hours & contact info
├── package.json                   # Root Next.js project configuration
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed on your machine:
- [Node.js 18+](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local MongoDB service or MongoDB Atlas connection string)

---

### 📥 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dharmikvariya1724/Cafe-management-system.git
   cd Cafe-management-system
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

### ⚡ Running the Application

#### Option 1: Full-Stack Mode (Frontend + Express Backend + MongoDB)

1. **Start the Backend Server** (Runs on `http://localhost:5000`):
   ```bash
   npm run server
   ```

2. **Start the Frontend App** (Runs on `http://localhost:3000`):
   ```bash
   npm run dev
   ```

3. **Seed Initial Database Data** *(Optional)*:
   ```bash
   cd server
   node seed/seedData.js
   ```

#### Option 2: Standalone Frontend Mode

If MongoDB is not running, the application's built-in **Hybrid API Client (`lib/api-client.ts`)** will automatically fallback to **LocalStorage**, allowing full offline and frontend-only operation with zero database configuration required!

---

## 🔗 Express REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Admin authentication |
| `GET` / `POST` | `/api/menu` | Fetch all menu items / Add new menu item |
| `PUT` / `DELETE` | `/api/menu/:id` | Update menu item / Delete menu item |
| `GET` / `POST` | `/api/orders` | Fetch customer orders / Create new order |
| `PUT` | `/api/orders/:id` | Update order status |
| `GET` / `POST` | `/api/reservations` | Fetch / Submit table bookings |
| `GET` / `POST` | `/api/tables` | Fetch / Manage cafe table layout |
| `GET` / `POST` | `/api/gallery` | Fetch / Upload gallery images |
| `GET` / `POST` | `/api/reviews` | Fetch / Submit customer reviews |
| `POST` | `/api/contact` | Submit contact form message |
| `POST` | `/api/newsletter` | Subscribe to newsletter |

---

## 🚢 Production Deployment

### Deploying to Vercel

1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "docs: update README with full-stack server and admin details"
   git push origin dharmik-first
   ```
2. Import the repository in your [Vercel Dashboard](https://vercel.com).
3. Set environment variable `NEXT_PUBLIC_API_URL` to your hosted Express server domain (e.g., Render, Railway, or Heroku).
4. Click **Deploy**.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developed By

**Dharmik Variya**
- GitHub: [@Dharmikvariya1724](https://github.com/Dharmikvariya1724)
