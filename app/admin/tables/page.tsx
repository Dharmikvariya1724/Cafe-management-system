'use client'

import { useState, useEffect } from 'react'
import type { Table, TableStatus } from '@/lib/types'
import {
  getStoredTables,
  saveTables,
  generateTableToken,
  getTableQrUrl,
  generateQrDataUrl,
} from '@/lib/table-utils'
import {
  QrCode,
  Plus,
  Trash2,
  Edit2,
  Download,
  RefreshCw,
  Eye,
  CheckCircle,
  XCircle,
  Search,
  ExternalLink,
  X,
  AlertCircle,
} from 'lucide-react'

import { api } from '@/lib/api-client'

export default function AdminTablesPage() {
  const [tables, setTables] = useState<Table[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | TableStatus>('all')

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [qrModalTable, setQrModalTable] = useState<Table | null>(null)

  // QR Modal Image State
  const [qrDataUrl, setQrDataUrl] = useState<string>('')
  const [isGeneratingQr, setIsGeneratingQr] = useState(false)

  // Form Inputs
  const [tableNumberInput, setTableNumberInput] = useState('')
  const [tableNameInput, setTableNameInput] = useState('')
  const [tableStatusInput, setTableStatusInput] = useState<TableStatus>('active')
  const [editingTableId, setEditingTableId] = useState<string | null>(null)
  const [formError, setFormError] = useState('')

  const loadTables = async () => {
    const data = await api.getTables()
    if (data && Array.isArray(data) && data.length > 0) {
      setTables(data)
      saveTables(data)
    } else {
      setTables(getStoredTables())
    }
  }

  useEffect(() => {
    loadTables()

    const handleUpdate = () => loadTables()
    window.addEventListener('tablesUpdated', handleUpdate)
    return () => window.removeEventListener('tablesUpdated', handleUpdate)
  }, [])

  // Auto-generate QR Data URL whenever QR Modal table changes
  useEffect(() => {
    if (qrModalTable) {
      setIsGeneratingQr(true)
      const url = getTableQrUrl(qrModalTable.publicToken)
      generateQrDataUrl(url)
        .then((dataUri) => {
          setQrDataUrl(dataUri)
          setIsGeneratingQr(false)
        })
        .catch(() => setIsGeneratingQr(false))
    } else {
      setQrDataUrl('')
    }
  }, [qrModalTable])

  const openCreateModal = () => {
    // Suggest next table number
    const nextNum = tables.length + 1
    const padded = nextNum < 10 ? `0${nextNum}` : `${nextNum}`
    setTableNumberInput(`Table ${padded}`)
    setTableNameInput('')
    setTableStatusInput('active')
    setFormError('')
    setIsCreateOpen(true)
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const numClean = tableNumberInput.trim()
    if (!numClean) {
      setFormError('Table number is required.')
      return
    }

    const exists = tables.some(
      (t) => t.tableNumber.toLowerCase() === numClean.toLowerCase()
    )
    if (exists) {
      setFormError(`A table with number "${numClean}" already exists.`)
      return
    }

    const now = new Date().toISOString()
    const newTable: Table = {
      id: `tbl-${Date.now()}`,
      tableNumber: numClean,
      name: tableNameInput.trim() || undefined,
      publicToken: generateTableToken(),
      status: tableStatusInput,
      createdAt: now,
      updatedAt: now,
    }

    await api.createTable(newTable)
    const updated = [newTable, ...tables]
    saveTables(updated)
    setIsCreateOpen(false)
    setQrModalTable(newTable)
  }

  const openEditModal = (table: Table) => {
    setEditingTableId(table.id)
    setTableNumberInput(table.tableNumber)
    setTableNameInput(table.name || '')
    setTableStatusInput(table.status)
    setFormError('')
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (!editingTableId) return
    const numClean = tableNumberInput.trim()
    if (!numClean) {
      setFormError('Table number is required.')
      return
    }

    const exists = tables.some(
      (t) => t.id !== editingTableId && t.tableNumber.toLowerCase() === numClean.toLowerCase()
    )
    if (exists) {
      setFormError(`A table with number "${numClean}" already exists.`)
      return
    }

    const now = new Date().toISOString()
    const payload = {
      tableNumber: numClean,
      name: tableNameInput.trim() || undefined,
      status: tableStatusInput,
      updatedAt: now,
    }

    await api.updateTable(editingTableId, payload)
    const updated = tables.map((t) =>
      t.id === editingTableId ? { ...t, ...payload } : t
    )

    saveTables(updated)
    setIsEditOpen(false)
    setEditingTableId(null)
  }

  const toggleTableStatus = async (id: string) => {
    const target = tables.find((t) => t.id === id)
    if (!target) return
    const nextStatus: TableStatus = target.status === 'active' ? 'inactive' : 'active'
    const now = new Date().toISOString()

    await api.updateTable(id, { status: nextStatus, updatedAt: now })
    const updated = tables.map((t) =>
      t.id === id ? { ...t, status: nextStatus, updatedAt: now } : t
    )
    saveTables(updated)
  }

  const deleteTable = async (id: string, number: string) => {
    if (confirm(`Are you sure you want to delete ${number}?`)) {
      await api.deleteTable(id)
      const updated = tables.filter((t) => t.id !== id)
      saveTables(updated)
      if (qrModalTable?.id === id) {
        setQrModalTable(null)
      }
    }
  }

  const regenerateQrToken = (id: string) => {
    if (
      confirm(
        'Regenerating the QR token will invalidate the existing printed QR code. Do you want to continue?'
      )
    ) {
      const newToken = generateTableToken()
      const now = new Date().toISOString()
      const updated = tables.map((t) =>
        t.id === id ? { ...t, publicToken: newToken, updatedAt: now } : t
      )
      saveTables(updated)

      // Update current modal table view if open
      const current = updated.find((t) => t.id === id)
      if (current) {
        setQrModalTable(current)
      }
    }
  }

  const downloadQrCode = () => {
    if (!qrDataUrl || !qrModalTable) return
    const link = document.createElement('a')
    const fileName = `QR-CoffeeKing-${qrModalTable.tableNumber.replace(/\s+/g, '-')}.png`
    link.href = qrDataUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredTables = tables.filter((t) => {
    const matchesStatus = filterStatus === 'all' ? true : t.status === filterStatus
    const query = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !query ||
      t.tableNumber.toLowerCase().includes(query) ||
      (t.name && t.name.toLowerCase().includes(query))

    return matchesStatus && matchesSearch
  })

  return (
    <div className="p-6 md:p-8 space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-foreground flex items-center gap-3">
            <QrCode className="w-8 h-8 text-primary" />
            Table Management & QR Codes
          </h1>
          <p className="text-foreground/70 text-sm mt-1">
            Create café dining tables, manage statuses, and generate unique QR ordering codes.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-transform active:scale-95 shadow-md self-start sm:self-auto text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Table
        </button>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'active', 'inactive'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {st} ({st === 'all' ? tables.length : tables.filter((t) => t.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search table number or location..."
            className="w-full pl-9 pr-3 py-1.5 bg-card border border-border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Tables List Grid */}
      {filteredTables.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTables.map((table) => (
            <div
              key={table.id}
              className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Table Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-extrabold text-xl text-primary">
                      {table.tableNumber}
                    </span>
                    <button
                      onClick={() => toggleTableStatus(table.id)}
                      title="Click to toggle status"
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors flex items-center gap-1 ${
                        table.status === 'active'
                          ? 'bg-green-100 text-green-800 border border-green-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {table.status === 'active' ? (
                        <>
                          <CheckCircle className="w-3 h-3" /> Active
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3" /> Inactive
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-[10px] text-muted-foreground font-mono bg-secondary px-2 py-1 rounded">
                    Token: {table.publicToken.substring(0, 10)}...
                  </span>
                </div>

                {table.name && (
                  <p className="text-xs text-muted-foreground mb-4">📍 {table.name}</p>
                )}

                <div className="bg-secondary/40 p-3 rounded-xl text-xs space-y-1.5 mb-4 border border-border/50">
                  <div className="flex justify-between text-muted-foreground">
                    <span>QR Target URL:</span>
                    <a
                      href={getTableQrUrl(table.publicToken)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-mono truncate max-w-[170px] flex items-center gap-1"
                    >
                      /table/{table.publicToken.substring(0, 8)}...
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Created:</span>
                    <span>{new Date(table.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-3 border-t border-border flex items-center gap-2">
                <button
                  onClick={() => setQrModalTable(table)}
                  className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  View QR Code
                </button>

                <button
                  onClick={() => openEditModal(table)}
                  className="p-2 bg-secondary text-foreground hover:bg-secondary/80 rounded-lg transition-colors"
                  title="Edit Table"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => deleteTable(table.id, table.tableNumber)}
                  className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                  title="Delete Table"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
          <QrCode className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-bold text-foreground text-base">No tables found</p>
          <p className="text-xs mt-1">Create a table to automatically generate a QR code for your café.</p>
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Create New Table
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 hover:bg-secondary rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Table Number / Name *
                </label>
                <input
                  type="text"
                  required
                  value={tableNumberInput}
                  onChange={(e) => setTableNumberInput(e.target.value)}
                  placeholder="e.g. Table 01 or VIP 1"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Location Note (Optional)
                </label>
                <input
                  type="text"
                  value={tableNameInput}
                  onChange={(e) => setTableNameInput(e.target.value)}
                  placeholder="e.g. Window side, Balcony, Ground Floor"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Status
                </label>
                <select
                  value={tableStatusInput}
                  onChange={(e) => setTableStatusInput(e.target.value as TableStatus)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active (Allows QR Orders)</option>
                  <option value="inactive">Inactive (Disabled / Blocked)</option>
                </select>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <p className="text-[11px] text-muted-foreground bg-secondary/30 p-2.5 rounded-lg">
                ⚡ A unique, secure QR Code token will be automatically generated upon creation.
              </p>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="w-1/3 bg-secondary text-foreground py-2.5 rounded-xl font-semibold text-xs hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 shadow-md"
                >
                  Save & Generate QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-heading font-bold text-lg text-foreground flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-primary" />
                Edit Table
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1 hover:bg-secondary rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Table Number / Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={tableNumberInput}
                  onChange={(e) => setTableNumberInput(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Location Note (Optional)
                </label>
                <input
                  type="text"
                  value={tableNameInput}
                  onChange={(e) => setTableNameInput(e.target.value)}
                  placeholder="e.g. Patio, VIP booth"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Status
                </label>
                <select
                  value={tableStatusInput}
                  onChange={(e) => setTableStatusInput(e.target.value as TableStatus)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="active">Active (Allows QR Orders)</option>
                  <option value="inactive">Inactive (Disabled / Blocked)</option>
                </select>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="w-1/3 bg-secondary text-foreground py-2.5 rounded-xl font-semibold text-xs hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold text-xs hover:bg-primary/90 shadow-md"
                >
                  Update Table Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW & DOWNLOAD QR CODE MODAL */}
      {qrModalTable && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 text-center">
            <div className="flex items-center justify-between border-b border-border pb-3 text-left">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-primary">
                  {qrModalTable.tableNumber}
                </h3>
                {qrModalTable.name && (
                  <p className="text-xs text-muted-foreground">{qrModalTable.name}</p>
                )}
              </div>
              <button
                onClick={() => setQrModalTable(null)}
                className="p-1 hover:bg-secondary rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-6 rounded-2xl border-2 border-primary/20 shadow-inner flex flex-col items-center justify-center min-h-[260px]">
              {isGeneratingQr ? (
                <div className="space-y-2">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto" />
                  <p className="text-xs text-muted-foreground">Generating QR Code...</p>
                </div>
              ) : qrDataUrl ? (
                <>
                  <img
                    src={qrDataUrl}
                    alt={`QR Code for ${qrModalTable.tableNumber}`}
                    className="w-56 h-56 object-contain rounded-lg"
                  />
                  <p className="text-xs font-bold text-amber-900 mt-2">
                    Scan this QR Code to place an order.
                  </p>
                </>
              ) : (
                <p className="text-xs text-rose-500 font-semibold">Failed to render QR Code</p>
              )}
            </div>

            {/* Target URL Info */}
            <div className="bg-secondary/40 p-3 rounded-xl text-left text-xs space-y-1">
              <span className="text-muted-foreground block text-[10px] font-bold uppercase">
                Target Customer URL
              </span>
              <a
                href={getTableQrUrl(qrModalTable.publicToken)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-mono text-[11px] hover:underline break-all block"
              >
                {getTableQrUrl(qrModalTable.publicToken)}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={downloadQrCode}
                disabled={!qrDataUrl}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                Download High-Res QR Code (PNG)
              </button>

              <button
                onClick={() => regenerateQrToken(qrModalTable.id)}
                className="w-full bg-secondary hover:bg-secondary/80 text-foreground py-2 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Regenerate QR Token (Invalidates Old Code)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
