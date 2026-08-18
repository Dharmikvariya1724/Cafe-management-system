'use client'

import { useEffect, useRef, useState } from 'react'
import type { MenuItem } from '@/lib/types'
import { menuItems as defaultItems } from '@/lib/data'
import { Trash2, Edit2, Plus, X, Upload, AlertCircle } from 'lucide-react'

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const itemsPerPage = 6

  const [formData, setFormData] = useState({
    name: '',
    category: 'coffee',
    price: '',
    description: '',
    image: '',
    popular: false,
    available: true,
  })

  useEffect(() => {
    const stored = localStorage.getItem('coffee_menu_items')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch {
        setItems(defaultItems)
      }
    } else {
      setItems(defaultItems)
      localStorage.setItem('coffee_menu_items', JSON.stringify(defaultItems))
    }
  }, [])

  const saveToStorage = (updatedItems: MenuItem[]) => {
    localStorage.setItem('coffee_menu_items', JSON.stringify(updatedItems))
    setItems(updatedItems)
  }

  const handleAddNew = () => {
    setEditingItem(null)
    setImagePreview(null)
    setFormData({
      name: '',
      category: 'coffee',
      price: '',
      description: '',
      image: '',
      popular: false,
      available: true,
    })
    setIsModalOpen(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setImagePreview(item.image || null)
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
      image: item.image || '',
      popular: item.popular ?? false,
      available: item.available,
    })
    setIsModalOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormData({ ...formData, image: base64 })
        setImagePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updated = items.filter(item => item.id !== id)
      saveToStorage(updated)
      setCurrentPage(1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.description) {
      alert('Please fill all required fields')
      return
    }

    if (editingItem) {
      const updated = items.map(item =>
        item.id === editingItem.id
          ? {
              ...item,
              name: formData.name,
              category: formData.category as MenuItem['category'],
              price: parseFloat(formData.price),
              description: formData.description,
              image: formData.image || item.image,
              popular: formData.popular,
              available: formData.available,
            }
          : item
      )
      saveToStorage(updated)
    } else {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category as MenuItem['category'],
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image || '/images/placeholder.png',
        available: formData.available,
        popular: formData.popular,
      }
      saveToStorage([...items, newItem])
    }

    setIsModalOpen(false)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedItems = items.slice(startIdx, startIdx + itemsPerPage)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Menu Items</h1>
          <p className="text-foreground/70">Manage {items.length} items • {items.filter(i => i.available).length} available</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Total Items</p>
          <p className="text-3xl font-bold text-primary mt-1">{items.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Available</p>
          <p className="text-3xl font-bold text-accent mt-1">{items.filter(i => i.available).length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Popular</p>
          <p className="text-3xl font-bold text-primary mt-1">{items.filter(i => i.popular).length}</p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedItems.map(item => (
          <div key={item.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Preview */}
            {item.image && item.image !== '/images/placeholder.png' ? (
              <div className="w-full h-40 bg-muted overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                <span className="text-4xl">☕</span>
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-heading font-bold text-foreground">{item.name}</h3>
                  <p className="text-xs text-foreground/60 capitalize">{item.category}</p>
                </div>
                <span className="text-xl font-bold text-accent">${item.price.toFixed(2)}</span>
              </div>

              <p className="text-foreground/80 text-sm line-clamp-2 mb-3">{item.description}</p>

              <div className="flex gap-2 mb-4">
                {item.popular && (
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">Popular</span>
                )}
                {!item.available && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Unavailable</span>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded text-sm font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mb-8 px-4 py-4 bg-card rounded-lg border border-border">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            Previous
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-foreground">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-foreground/60 hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3">Product Image</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-border rounded-lg p-6 hover:border-primary transition-colors text-center"
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-foreground/50" />
                      <p className="text-sm font-medium text-foreground">Click to upload image</p>
                      <p className="text-xs text-foreground/50 mt-1">PNG, JPG up to 5MB</p>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>

                  {imagePreview && (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-border">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Cappuccino"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Price *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 4.50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
<select
                   value={formData.category}
                   onChange={e => setFormData({ ...formData, category: e.target.value })}
                   className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                 >
                   <option value="espresso">Espresso</option>
                   <option value="coffee">Coffee</option>
                   <option value="tea">Tea</option>
                   <option value="cold">Cold Drinks</option>
                   <option value="breakfast">Breakfast</option>
                   <option value="snacks">Snacks</option>
                   <option value="desserts">Desserts</option>
                 </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-20"
                  placeholder="Describe the item..."
                />
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6 pt-4 border-t border-border">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.popular}
                    onChange={e => setFormData({ ...formData, popular: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-foreground">Mark as Popular</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.available}
                    onChange={e => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-foreground">Available</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
