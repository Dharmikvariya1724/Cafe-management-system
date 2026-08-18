import type { Metadata } from 'next'
import GalleryContent from './gallery-content'

export const metadata: Metadata = {
  title: 'Gallery | The Coffee Corner',
  description: 'Browse our gallery showcasing the cozy cafe interior, specialty coffee, delicious food, and special events.',
  keywords: 'cafe gallery, coffee shop, interior, photos',
}

export default function GalleryPage() {
  return <GalleryContent />
}
