# ☕ The Coffee Corner - Cafe Management System

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A modern, high-performance, full-stack Cafe Management & Customer Web Application built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Features an elegant, premium customer-facing web application alongside a feature-rich **Admin Management Dashboard** with real-time state synchronization, drag-and-drop image uploads, menu CRUD management, gallery control, table reservation handling, and customer review moderation.

---

## 🌟 Key Features

### 🛍️ Customer-Facing Application
- **🏡 Hero & Landing Page**: Stunning visual design featuring coffee animations, popular items, testimonials carousel, and quick CTA links.
- **☕ Interactive Menu (`/menu`)**:
  - Live real-time search across item names and descriptions.
  - Multi-category filtering (*Espresso, Coffee, Tea, Pastry, Breakfast, Cold Drinks, Snacks, Desserts*).
  - Responsive pagination (9 items per page).
  - Synchronized live updates from the Admin panel.
- **🖼️ Photo Gallery (`/gallery`)**:
  - Category-based image filtering (*Interior, Food & Drinks, Events*).
  - High-resolution Lightbox modal viewer with smooth hover & zoom animations.
- **📅 Online Reservations (`/reservations`)**:
  - Interactive table booking form with date, time slot, guest counter, and special requests.
  - Form validation with instant user feedback.
- **ℹ️ About Us (`/about`)**: Story, core values, operational hours, and baristas showcase.
- **📞 Contact & Location (`/contact`)**:
  - Functional contact form with validation.
  - Cafe business details, interactive address map, and operating hours.
- **📩 Newsletter Signup**: Instant client-side validation and subscription feedback.

---

### 🛡️ Admin Management Dashboard (`/admin`)
- **🔐 Secure Authentication**: Simple password-protected session management (`username: admin`, `password: admin123`).
- **📊 Overview Analytics**: Live metrics for total menu items, active reservations, gallery photos, and customer messages.
- **🍔 Menu Management (`/admin/menu`)**:
  - Complete CRUD (Create, Read, Update, Delete) operations.
  - **Drag-and-Drop Image Upload** with Base64 preview & instant sync to customer view.
  - Category tagging, pricing (2-decimal precision), availability toggle, and "Popular" flags.
  - Paginated admin table view (6 items per page).
- **🖼️ Gallery Management (`/admin/gallery`)**:
  - Upload high-quality cafe photos.
  - Edit titles, alt text (accessibility), and category tags.
  - Instant live synchronization with the customer gallery.
- **📅 Reservation Tracking (`/admin/reservations`)**: View, confirm, sort, or cancel customer table bookings.
- **⭐ Review Moderation (`/admin/reviews`)**: Moderate, approve, or feature customer feedback on the homepage.
- **💬 Message Center (`/admin/messages`)**: Read, organize, and manage contact form submissions.

---

## 🔑 Admin Credentials

| Feature | Endpoint | Username | Password |
|---|---|---|---|
| **Admin Portal** | `/admin` | `admin` | `admin123` |

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components & Icons**: [Lucide React](https://lucide.dev/)
- **State & Storage**: React Context + LocalStorage persistent state sync
- **Fonts**: Playfair Display (Serif Headings), Inter (Body Text)

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
├── app/
│   ├── layout.tsx                 # Root layout & global metadata
│   ├── page.tsx                   # Main homepage
│   ├── globals.css                # Tailwind CSS v4 design tokens & base styles
│   ├── menu/
│   │   ├── page.tsx               # Menu page wrapper
│   │   └── menu-content.tsx       # Live synchronized menu with search & filters
│   ├── gallery/
│   │   ├── page.tsx               # Gallery page wrapper
│   │   └── gallery-content.tsx    # Live synchronized gallery with Lightbox
│   ├── reservations/              # Table reservation page
│   ├── about/                     # About page
│   ├── contact/                   # Contact page
│   └── admin/
│       ├── layout.tsx             # Admin layout & auth guard
│       ├── page.tsx               # Admin analytics dashboard
│       ├── menu/                  # Menu items CRUD & image upload
│       ├── gallery/               # Gallery photos CRUD & upload
│       ├── reservations/          # Table reservations control
│       ├── reviews/               # Customer review moderation
│       └── messages/              # Customer inquiries inbox
├── components/
│   ├── Navigation.tsx             # Responsive header navbar
│   ├── Footer.tsx                 # Site footer with dynamic links
│   ├── Hero.tsx                   # Hero section with primary CTA
│   ├── MenuCard.tsx               # Dynamic menu item card with image preview
│   ├── GalleryGrid.tsx            # Dynamic gallery grid layout
│   ├── ReservationForm.tsx        # Booking form with validation
│   ├── ContactForm.tsx            # Contact form component
│   └── NewsletterForm.tsx         # Newsletter signup component
├── lib/
│   ├── types.ts                   # Core TypeScript interfaces
│   ├── data.ts                    # Default fallback mock dataset
│   ├── constants.ts               # Cafe operating hours & contact info
│   └── utils.ts                   # Helper functions
├── public/                        # Static images & assets
├── package.json                   # Project dependencies & scripts
├── tsconfig.json                  # TypeScript config
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js 18+ installed on your machine.
- [Node.js Download](https://nodejs.org/)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dharmikvariya1724/Cafe-management-system.git
   cd Cafe-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Access the application**:
   Open your browser and visit:
   - **Customer Portal**: `http://localhost:3000`
   - **Admin Management Portal**: `http://localhost:3000/admin`

---

## 💾 Storage & Data Synchronization Architecture

The current implementation utilizes **browser LocalStorage** to provide an instant, backend-free demo experience with zero setup required:

- **Menu Data**: Stored under key `coffee_menu_items`
- **Gallery Data**: Stored under key `coffee_gallery_images`
- **Session Auth**: Managed via `admin-logged-in` flag
- **Image Format**: Converted on-the-fly into optimized Base64 strings for direct preview and persistence.

*(For enterprise/production deployment, the architecture is ready to swap LocalStorage calls with API routes connecting to PostgreSQL / Supabase / MongoDB and S3 image storage).*

---

## 🚢 Production Deployment

### Deploying to Vercel

1. Push code to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete cafe management system implementation"
   git push origin main
   ```
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. Next.js App Router will be detected automatically. Click **Deploy**.

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Developed By

**Dharmik Variya**
- GitHub: [@Dharmikvariya1724](https://github.com/Dharmikvariya1724)
