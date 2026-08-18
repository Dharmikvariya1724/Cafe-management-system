import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'
import { BUSINESS_NAME, BUSINESS_DESCRIPTION } from '@/lib/constants'
import { Providers } from '@/components/Providers'

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Coffee King – Celebrate Everyday | Surat's Most Lively Café",
  description: BUSINESS_DESCRIPTION,
  keywords: 'coffee king, surat cafe, adajan coffee king, vesu coffee king, katargam coffee king, pal coffee king, specialty coffee',
  openGraph: {
    title: "Coffee King – Celebrate Everyday | Surat's Most Lively Café",
    description: BUSINESS_DESCRIPTION,
    url: 'https://coffeeking.in',
    siteName: BUSINESS_NAME,
    type: 'website',
  },

  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

