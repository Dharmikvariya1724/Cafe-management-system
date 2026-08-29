export type MenuCategory = 'coffee' | 'espresso' | 'tea' | 'cold' | 'breakfast' | 'snacks' | 'desserts'
export type GalleryCategory = 'interior' | 'coffee' | 'food' | 'events'
export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface MenuItem {
  id: string
  name: string
  category: MenuCategory
  price: number
  description: string
  image: string
  available: boolean
  popular?: boolean
}

export interface Reservation {
  id: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  specialRequests?: string
  status: ReservationStatus
  createdAt: string
}

export interface Review {
  id: string
  name: string
  photo?: string
  rating: number
  text: string
  date: string
  verified: boolean
  orderId?: string
  orderNumber?: string
  role?: string
  location?: string
}

export interface AdminProfile {
  id?: string
  username: string
  name: string
  email: string
  phone: string
  avatar: string
  role?: string
}

export interface GalleryImage {
  id: string
  src: string
  category: GalleryCategory
  alt: string
  title?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  createdAt: string
  replied: boolean
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribedAt: string
}

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
export type OrderType = 'dine-in' | 'pickup' | 'delivery'
export type PaymentMethod = 'cash' | 'card' | 'upi'

export interface OrderItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  notes?: string
  image?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone: string
  orderType: OrderType
  tableNumber?: string
  tableToken?: string
  address?: string
  items: OrderItem[]
  subtotal: number
  tax: number
  total: number
  status: OrderStatus
  paymentMethod: PaymentMethod
  specialInstructions?: string
  createdAt: string
  updatedAt: string
}

export type TableStatus = 'active' | 'inactive'

export interface Table {
  id: string
  tableNumber: string
  name?: string
  publicToken: string
  status: TableStatus
  createdAt: string
  updatedAt: string
}


