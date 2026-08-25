'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { MenuCard } from '@/components/MenuCard'
import { menuItems as defaultItems } from '@/lib/data'
import { MENU_CATEGORIES } from '@/lib/constants'
import type { MenuItem, MenuCategory } from '@/lib/types'
import { Search, X, UtensilsCrossed, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { validateTableToken } from '@/lib/table-utils'

export default function MenuPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultItems)
  const [currentPage, setCurrentPage] = useState(1)
  const { tableContext, setTableContext, totalItems, subtotalPrice, setIsCartOpen } = useCart()
  const itemsPerPage = 9

  useEffect(() => {
    // Check if query string contains table_token or table
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('table_token') || params.get('table')
      if (token) {
        const result = validateTableToken(token)
        if (result.isValid && result.table && tableContext?.publicToken !== result.table.publicToken) {
          setTableContext(result.table)
        }
      }
    }
  }, [setTableContext, tableContext?.publicToken])

  useEffect(() => {
    const stored = localStorage.getItem('coffee_menu_items')
    if (stored) {
      try {
        setMenuItems(JSON.parse(stored))
      } catch {
        setMenuItems(defaultItems)
      }
    }
  }, [])

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery, menuItems])

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedItems = filteredItems.slice(startIdx, startIdx + itemsPerPage)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedCategory('all')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-10 md:py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Table Banner if QR Scanned */}
          {tableContext && (
            <div className="bg-primary/15 border border-primary/30 p-4 rounded-2xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-heading font-extrabold text-foreground text-lg leading-tight">
                      Ordering for {tableContext.tableNumber}
                    </p>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full border border-green-300">
                      Active QR Session
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Your items will be automatically linked and served to {tableContext.tableNumber}.
                  </p>
                </div>
              </div>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-2">
            Our Menu
          </h1>
          <p className="text-sm sm:text-lg text-foreground/70">
            Carefully crafted beverages and delicacies
          </p>
        </div>
      </section>

      {/* Filters (Mobile Swipeable Category Pills) */}
      <section className="py-4 md:py-6 bg-background border-b border-border sticky top-16 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coffee, tea, breakfast, snacks..."
                className="w-full pl-9 pr-4 py-2 bg-secondary/30 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Swipeable Category Pill Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground shadow-md scale-105'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                All Items
              </button>
              {MENU_CATEGORIES.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value as MenuCategory)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shrink-0 ${
                    selectedCategory === category.value
                      ? 'bg-primary text-primary-foreground shadow-md scale-105'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={clearSearch}
                className="text-primary text-xs font-bold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="py-8 md:py-12 bg-background pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-xs sm:text-sm text-foreground/70 mb-6">
                Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {paginatedItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          currentPage === i + 1
                            ? 'bg-primary text-primary-foreground'
                            : 'border border-border text-foreground hover:bg-secondary'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70 text-sm sm:text-base">
                No items found. Try adjusting your filters.
              </p>
              <button
                onClick={clearSearch}
                className="mt-3 text-primary text-xs font-bold hover:underline"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* MOBILE FLOATING CART SUMMARY BAR */}
      {totalItems > 0 && (
        <div className="fixed bottom-16 left-4 right-4 z-40 md:hidden bg-primary text-primary-foreground p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-white/20 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-extrabold text-sm shrink-0">
              {totalItems}
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Items in Cart</p>
              <p className="text-sm font-extrabold text-accent">₹{subtotalPrice.toFixed(2)}</p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
          >
            <span>View Cart</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <Footer />
    </main>
  )
}
