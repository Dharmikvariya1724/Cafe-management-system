import type { Table } from './types'
import { initialTables } from './data'
import QRCode from 'qrcode'

export const TABLE_STORAGE_KEY = 'coffee_tables'
export const TABLE_CONTEXT_KEY = 'coffee_table_context'

/**
 * Generate a secure, unguessable public token for a table.
 */
export function generateTableToken(): string {
  const randomSegment = Math.random().toString(36).substring(2, 10)
  const timestamp = Date.now().toString(36)
  return `ck-tbl-${randomSegment}-${timestamp}`
}

/**
 * Get all tables from localStorage, seeding with default tables if empty.
 */
export function getStoredTables(): Table[] {
  if (typeof window === 'undefined') return initialTables

  try {
    const raw = localStorage.getItem(TABLE_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
    // Seed initial tables if none exist
    localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(initialTables))
    return initialTables
  } catch (err) {
    console.error('Error loading tables from storage:', err)
    return initialTables
  }
}

/**
 * Save tables to localStorage and dispatch custom event.
 */
export function saveTables(tables: Table[]): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(TABLE_STORAGE_KEY, JSON.stringify(tables))
    window.dispatchEvent(new Event('tablesUpdated'))
  } catch (err) {
    console.error('Error saving tables:', err)
  }
}

/**
 * Find table by public token.
 */
export function findTableByToken(token: string): Table | null {
  if (!token) return null
  const tables = getStoredTables()
  return tables.find((t) => t.publicToken === token) || null
}

/**
 * Validate table token and return status result.
 */
export interface TableValidationResult {
  isValid: boolean
  table: Table | null
  error?: 'not_found' | 'inactive' | 'invalid'
}

export function validateTableToken(token: string): TableValidationResult {
  if (!token || typeof token !== 'string') {
    return { isValid: false, table: null, error: 'invalid' }
  }

  const table = findTableByToken(token)
  if (!table) {
    return { isValid: false, table: null, error: 'not_found' }
  }

  if (table.status !== 'active') {
    return { isValid: false, table, error: 'inactive' }
  }

  return { isValid: true, table }
}

/**
 * Extract table public token from a scanned QR code text string.
 * Supports:
 * 1. Full URLs like http://domain.com/table/ck-tbl-xyz
 * 2. URLs with query parameters like http://domain.com/menu?table=ck-tbl-xyz or ?table_token=ck-tbl-xyz
 * 3. Direct raw token strings like ck-tbl-xyz
 */
export function extractTableTokenFromQr(text: string): string | null {
  if (!text || typeof text !== 'string') return null
  const trimmed = text.trim()
  if (!trimmed) return null

  // 1. Try URL parsing
  try {
    const urlString = trimmed.startsWith('http://') || trimmed.startsWith('https://')
      ? trimmed
      : `https://${trimmed}`
    const url = new URL(urlString)
    
    // Check path for /table/[token]
    const tablePathMatch = url.pathname.match(/\/table\/([^\/]+)/i)
    if (tablePathMatch && tablePathMatch[1]) {
      return decodeURIComponent(tablePathMatch[1])
    }

    // Check query params
    const tokenParam = url.searchParams.get('table_token') || url.searchParams.get('table')
    if (tokenParam) {
      return decodeURIComponent(tokenParam)
    }
  } catch {
    // Not a valid URL, proceed to direct string check
  }

  // 2. Direct string check if it contains /table/
  if (trimmed.includes('/table/')) {
    const parts = trimmed.split('/table/')
    if (parts[1]) {
      return parts[1].split('?')[0].split('#')[0].trim()
    }
  }

  // Return raw string as candidate token
  return trimmed
}


/**
 * Get public QR code destination URL for a given table token.
 */
export function getTableQrUrl(publicToken: string): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  return `${origin}/table/${publicToken}`
}

/**
 * Generate a PNG Data URL for a given string text using the qrcode library.
 */
export async function generateQrDataUrl(text: string): Promise<string> {
  try {
    const dataUrl = await QRCode.toDataURL(text, {
      width: 400,
      margin: 2,
      color: {
        dark: '#4A2E1C', // Coffee brown dark color
        light: '#FFFFFF',
      },
    })
    return dataUrl
  } catch (err) {
    console.error('Failed to generate QR code:', err)
    return ''
  }
}

/**
 * Customer Table Context helpers.
 */
export interface TableContextData {
  tableNumber: string
  publicToken: string
  name?: string
  validatedAt: string
}

export function getStoredTableContext(): TableContextData | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(TABLE_CONTEXT_KEY) || sessionStorage.getItem(TABLE_CONTEXT_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (err) {
    console.error('Error reading table context:', err)
  }
  return null
}

export function setStoredTableContext(table: Table): void {
  if (typeof window === 'undefined') return
  const data: TableContextData = {
    tableNumber: table.tableNumber,
    publicToken: table.publicToken,
    name: table.name,
    validatedAt: new Date().toISOString(),
  }
  try {
    localStorage.setItem(TABLE_CONTEXT_KEY, JSON.stringify(data))
    sessionStorage.setItem(TABLE_CONTEXT_KEY, JSON.stringify(data))
    window.dispatchEvent(new Event('tableContextUpdated'))
  } catch (err) {
    console.error('Error saving table context:', err)
  }
}

export function clearStoredTableContext(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(TABLE_CONTEXT_KEY)
    sessionStorage.removeItem(TABLE_CONTEXT_KEY)
    window.dispatchEvent(new Event('tableContextUpdated'))
  } catch (err) {
    console.error('Error clearing table context:', err)
  }
}
