'use client'

import { useEffect, useRef, useState } from 'react'
import type { GalleryImage } from '@/lib/types'
import { galleryImages as defaultGalleryImages } from '@/lib/data'
import { Trash2, Edit2, Plus, X, Upload } from 'lucide-react'

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imagesPerPage = 6

  const [formData, setFormData] = useState({
    title: '',
    category: 'interior',
    alt: '',
    src: '',
  })

  useEffect(() => {
    const stored = localStorage.getItem('coffee_gallery_images')
    if (stored) {
      try {
        setImages(JSON.parse(stored))
      } catch {
        setImages(defaultGalleryImages)
      }
    } else {
      setImages(defaultGalleryImages)
      localStorage.setItem('coffee_gallery_images', JSON.stringify(defaultGalleryImages))
    }
  }, [])

  const saveToStorage = (updatedImages: GalleryImage[]) => {
    localStorage.setItem('coffee_gallery_images', JSON.stringify(updatedImages))
    setImages(updatedImages)
  }

  const handleAddNew = () => {
    setEditingImage(null)
    setImagePreview(null)
    setFormData({
      title: '',
      category: 'interior',
      alt: '',
      src: '',
    })
    setIsModalOpen(true)
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setImagePreview(image.src)
    setFormData({
      title: image.title || '',
      category: image.category,
      alt: image.alt,
      src: image.src,
    })
    setIsModalOpen(true)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormData({ ...formData, src: base64 })
        setImagePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      const updated = images.filter(img => img.id !== id)
      saveToStorage(updated)
      setCurrentPage(1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.alt || !formData.src) {
      alert('Please fill all required fields')
      return
    }

    if (editingImage) {
      const updated = images.map(img =>
        img.id === editingImage.id
          ? {
              ...img,
              title: formData.title,
              category: formData.category as GalleryImage['category'],
              alt: formData.alt,
              src: formData.src,
            }
          : img
      )
      saveToStorage(updated)
    } else {
      const newImage: GalleryImage = {
        id: Date.now().toString(),
        title: formData.title,
        category: formData.category as GalleryImage['category'],
        alt: formData.alt,
        src: formData.src,
      }
      saveToStorage([...images, newImage])
    }

    setIsModalOpen(false)
    setCurrentPage(1)
  }

  // Pagination
  const totalPages = Math.ceil(images.length / imagesPerPage)
  const startIdx = (currentPage - 1) * imagesPerPage
  const paginatedImages = images.slice(startIdx, startIdx + imagesPerPage)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-heading font-bold text-foreground">Gallery Management</h1>
          <p className="text-foreground/70">Manage {images.length} gallery images</p>
        </div>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Image
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Total Images</p>
          <p className="text-3xl font-bold text-primary mt-1">{images.length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Interior</p>
          <p className="text-3xl font-bold text-accent mt-1">{images.filter(i => i.category === 'interior').length}</p>
        </div>
        <div className="bg-card rounded-lg border border-border p-4">
          <p className="text-foreground/70 text-sm">Food & Drinks</p>
          <p className="text-3xl font-bold text-primary mt-1">{images.filter(i => i.category === 'food').length}</p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedImages.map(image => (
          <div key={image.id} className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Preview */}
            <div className="w-full h-40 bg-muted overflow-hidden">
              {image.src && image.src !== '/images/placeholder.png' ? (
                <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">📸</div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-heading font-bold text-foreground mb-1">{image.title}</h3>
              <p className="text-xs text-foreground/60 capitalize mb-2">{image.category}</p>
              <p className="text-sm text-foreground/80 line-clamp-2 mb-4">{image.alt}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(image)}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(image.id)}
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
                {editingImage ? 'Edit Image' : 'Add New Image'}
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
                <label className="block text-sm font-semibold text-foreground mb-3">Gallery Image</label>
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

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Cozy Seating Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="interior">Interior</option>
                    <option value="food">Food & Drinks</option>
                    <option value="events">Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Alt Text (for accessibility) *</label>
                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={e => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe what's in the image..."
                />
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
                  {editingImage ? 'Update Image' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
