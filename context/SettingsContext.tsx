'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/lib/api-client'

export interface SiteSettings {
  siteName: string
  siteTagline: string
  logo: string
  favicon: string
  adminName: string
  adminEmail: string
  adminPhone: string
  adminAvatar: string
  socialLinks: {
    instagram: string
    facebook: string
    twitter: string
    youtube: string
    linkedin: string
  }
}

const defaultSettings: SiteSettings = {
  siteName: 'Coffee King',
  siteTagline: 'Stirr Your Heart In',
  logo: '/images/logo.png',
  favicon: '/favicon.ico',
  adminName: 'Coffee King Admin',
  adminEmail: 'admin@coffeeking.com',
  adminPhone: '+91 98765 43210',
  adminAvatar: '/images/avatar-1.jpg',
  socialLinks: {
    instagram: 'https://instagram.com/coffeekingin',
    facebook: 'https://facebook.com/coffeekingin',
    twitter: 'https://twitter.com/coffeekingin',
    youtube: 'https://youtube.com/coffeekingin',
    linkedin: 'https://linkedin.com/company/coffeekingin'
  }
}

interface SettingsContextType {
  settings: SiteSettings
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>
  refreshSettings: () => Promise<void>
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: async () => {},
  refreshSettings: async () => {}
})

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)

  const loadSettings = async () => {
    try {
      const data = await api.getSettings()
      if (data && data.siteName) {
        setSettings(prev => ({ ...prev, ...data }))
        localStorage.setItem('coffee_site_settings', JSON.stringify(data))
      } else {
        const stored = localStorage.getItem('coffee_site_settings')
        if (stored) {
          setSettings(JSON.parse(stored))
        }
      }
    } catch {
      const stored = localStorage.getItem('coffee_site_settings')
      if (stored) {
        setSettings(JSON.parse(stored))
      }
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  // Dynamically update favicon link
  useEffect(() => {
    if (typeof window !== 'undefined' && settings.favicon) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']")
      if (!link) {
        link = document.createElement('link')
        link.type = 'image/x-icon'
        link.rel = 'shortcut icon'
        document.getElementsByTagName('head')[0].appendChild(link)
      }
      link.href = settings.favicon
    }
  }, [settings.favicon])

  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('coffee_site_settings', JSON.stringify(updated))
    try {
      await api.updateSettings(updated)
    } catch (err) {
      console.warn('API settings save fallback to localStorage:', err)
    }
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, refreshSettings: loadSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}
