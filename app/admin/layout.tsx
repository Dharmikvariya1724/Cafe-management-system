'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu, X, LogOut, LayoutDashboard, CalendarDays, Utensils,
  Images, MessageSquare, Star, ShoppingBag, QrCode, FileText, User, Bell
} from 'lucide-react'
import { BUSINESS_NAME } from '@/lib/constants'
import Image from 'next/image'
import { api } from '@/lib/api-client'
import { useSettings } from '@/context/SettingsContext'

const adminLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/invoices', label: 'Invoices & Reports', icon: FileText },
  { href: '/admin/tables', label: 'Tables & QR', icon: QrCode },
  { href: '/admin/reservations', label: 'Reservations', icon: CalendarDays },
  { href: '/admin/menu', label: 'Menu Items', icon: Utensils },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/profile', label: 'Admin Profile', icon: User },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { settings } = useSettings()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Unseen orders polling & alert states
  const [unseenCount, setUnseenCount] = useState<number>(0)
  const [newOrderToast, setNewOrderToast] = useState<{ id: string; table: string; amount: number } | null>(null)
  const prevCountRef = useRef<number>(0)

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = localStorage.getItem('admin-logged-in')
      if (loggedIn) {
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  // Poll unseen orders count every 5 seconds
  useEffect(() => {
    if (!isLoggedIn) return

    const fetchUnseen = async () => {
      try {
        const res = await api.getUnseenOrdersCount()
        if (res && typeof res.unseenCount === 'number') {
          if (res.unseenCount > prevCountRef.current && prevCountRef.current !== 0) {
            // New order received! Show alert toast
            setNewOrderToast({
              id: `ORD-${Date.now().toString().slice(-4)}`,
              table: 'Dine-in / Online',
              amount: 450
            })
            setTimeout(() => setNewOrderToast(null), 8000)
          }
          prevCountRef.current = res.unseenCount
          setUnseenCount(res.unseenCount)
        }
      } catch (err) {
        // Silent catch
      }
    }

    fetchUnseen()
    const interval = setInterval(fetchUnseen, 5000)
    return () => clearInterval(interval)
  }, [isLoggedIn])

  // Mark unseen orders as seen when Admin visits /admin/orders
  useEffect(() => {
    if (isLoggedIn && pathname === '/admin/orders') {
      api.markOrdersSeen().then(() => {
        setUnseenCount(0)
        prevCountRef.current = 0
      }).catch(() => {})
    }
  }, [pathname, isLoggedIn])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await api.loginAdmin(username, password)
      setIsLoggedIn(true)
      setUsername('')
      setPassword('')
    } catch (err: any) {
      if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('admin-logged-in', 'true')
        setIsLoggedIn(true)
        setUsername('')
        setPassword('')
      } else {
        setError(err.message || 'Invalid username or password')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = () => {
    api.logoutAdmin()
    setIsLoggedIn(false)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <p className="text-foreground/70">Loading Admin Portal...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-border">
          <div className="relative w-20 h-20 mx-auto mb-2">
            <Image
              src={settings.logo || "/images/logo.png"}
              alt="Coffee King Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-heading font-extrabold text-foreground mb-1 text-center">
            {settings.siteName || BUSINESS_NAME} Admin
          </h1>
          <p className="text-foreground/70 text-center mb-6 text-sm">
            Access the management portal
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                autoComplete="current-password"
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}

            <div className="bg-accent/10 border border-accent rounded-lg p-3 text-sm text-foreground/80">
              <p className="font-semibold text-foreground mb-1">Demo Credentials:</p>
              <p>Username: <code className="bg-background px-2 py-1 rounded">admin</code></p>
              <p>Password: <code className="bg-background px-2 py-1 rounded">admin123</code></p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login to Admin Portal'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex relative">
      {/* Floating Toast Notification for New Incoming Orders */}
      {newOrderToast && (
        <div className="fixed top-5 right-5 z-50 bg-amber-900 text-amber-50 p-4 rounded-2xl shadow-2xl border-2 border-amber-500 max-w-sm w-full animate-in slide-in-from-top duration-300 flex items-start gap-3">
          <div className="p-2 bg-amber-500 text-black rounded-xl shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="font-extrabold text-sm text-amber-300">🔔 NEW ORDER RECEIVED!</p>
              <button onClick={() => setNewOrderToast(null)} className="text-amber-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs mt-1">A new order has been placed on the system.</p>
            <div className="mt-2 pt-2 border-t border-amber-700/50 flex justify-end">
              <Link
                href="/admin/orders"
                onClick={() => setNewOrderToast(null)}
                className="px-3 py-1 bg-amber-500 text-black font-extrabold text-xs rounded-lg hover:bg-amber-400"
              >
                View Orders
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-primary text-primary-foreground border-r border-primary/20">
        <div className="p-6 border-b border-primary/20">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-9 h-9 bg-white rounded-lg p-1 shrink-0">
              <Image
                src={settings.logo || settings.favicon || "/images/logo.png"}
                alt="Coffee King Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg block leading-none">{settings.siteName || BUSINESS_NAME}</span>
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider">Admin Portal</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {adminLinks.map(link => {
            const Icon = link.icon
            const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
            const isOrdersTab = link.href === '/admin/orders'

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-white/20 font-bold text-white shadow-sm border-l-4 border-accent pl-3'
                    : 'hover:bg-white/10 font-medium text-white/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : ''}`} />
                  <span className="text-sm">{link.label}</span>
                </div>

                {/* Badge count for Orders */}
                {isOrdersTab && unseenCount > 0 && (
                  <span className="px-2 py-0.5 bg-rose-500 text-white font-extrabold text-xs rounded-full animate-pulse shadow-md">
                    {unseenCount}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-primary/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-primary text-primary-foreground z-40 border-b border-primary/20 shadow-md">
        <div className="flex items-center justify-between p-3.5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 bg-white rounded-lg p-0.5 shrink-0">
              <Image
                src={settings.logo || settings.favicon || "/images/logo.png"}
                alt="Coffee King Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base block leading-none">{settings.siteName || BUSINESS_NAME}</span>
              <span className="text-[9px] text-accent font-bold uppercase tracking-wider block mt-0.5">Admin Portal</span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {unseenCount > 0 && (
              <span className="px-2.5 py-0.5 bg-rose-500 text-white font-extrabold text-xs rounded-full animate-pulse">
                🔴 {unseenCount}
              </span>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="px-3 py-3 space-y-1 border-t border-white/10 bg-primary/95 backdrop-blur-md max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
            {adminLinks.map(link => {
              const Icon = link.icon
              const isActive = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href)
              const isOrdersTab = link.href === '/admin/orders'

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors text-xs font-semibold ${
                    isActive ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10 text-white/90'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{link.label}</span>
                  </div>
                  {isOrdersTab && unseenCount > 0 && (
                    <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full">
                      {unseenCount}
                    </span>
                  )}
                </Link>
              )
            })}
            <div className="pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors font-bold text-xs"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:pt-0 pt-20">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
