'use client'

import { useState, useMemo, useEffect } from 'react'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { MenuCard } from '@/components/MenuCard'
import { menuItems as defaultItems } from '@/lib/data'
import { MENU_CATEGORIES } from '@/lib/constants'
import type { MenuItem, MenuCategory } from '@/lib/types'
import { Search, X, UtensilsCrossed } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { validateTableToken } from '@/lib/table-utils'

export default function MenuPageContent() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultItems)
  const [currentPage, setCurrentPage] = useState(1)
  const { tableContext, setTableContext } = useCart()
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
      <section className="py-12 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
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

          <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
            Our Menu
          </h1>
          <p className="text-lg text-foreground/70">
            Carefully crafted beverages and delicacies
          </p>
        </div>
      </section>


      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                All
              </button>
              {MENU_CATEGORIES.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value as MenuCategory)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.value
                      ? 'bg-primary text-primary-foreground'
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
                className="text-primary text-sm font-medium hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Menu Items */}
      <section className="py-12 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length > 0 ? (
            <>
              <p className="text-foreground/70 mb-6">
                Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filteredItems.length)} of {filteredItems.length} items
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {paginatedItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
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
                    className="px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-foreground/70 text-lg">
                No items found. Try adjusting your filters.
              </p>
              <button
                onClick={clearSearch}
                className="mt-4 text-primary font-medium hover:underline"
              >
                Clear filters and try again
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
