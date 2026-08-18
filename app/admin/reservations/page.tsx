'use client'

import { useEffect, useState } from 'react'
import type { Reservation } from '@/lib/types'
import { Trash2, Check, X, Eye } from 'lucide-react'

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reservations') || '[]')
    setReservations(data)
  }, [])

  const filteredReservations = reservations.filter(r =>
    filterStatus === 'all' ? true : r.status === filterStatus
  )

  const updateReservationStatus = (id: string, newStatus: typeof reservations[0]['status']) => {
    const updated = reservations.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    )
    setReservations(updated)
    localStorage.setItem('reservations', JSON.stringify(updated))
  }

  const deleteReservation = (id: string) => {
    if (confirm('Are you sure you want to delete this reservation?')) {
      const updated = reservations.filter(r => r.id !== id)
      setReservations(updated)
      localStorage.setItem('reservations', JSON.stringify(updated))
      setSelectedReservation(null)
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Reservations
        </h1>
        <p className="text-foreground/70">
          Manage and track all customer reservations
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['all', 'pending', 'confirmed', 'cancelled'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterStatus === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reservations List */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border overflow-hidden">
          {filteredReservations.length > 0 ? (
            <div className="divide-y divide-border">
              {filteredReservations.map(reservation => (
                <div
                  key={reservation.id}
                  onClick={() => setSelectedReservation(reservation)}
                  className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                    selectedReservation?.id === reservation.id ? 'bg-secondary' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{reservation.name}</p>
                      <p className="text-sm text-foreground/70">
                        {reservation.date} at {reservation.time} • {reservation.guests} guest{reservation.guests > 1 ? 's' : ''}
                      </p>
                      <p className="text-sm text-foreground/60">{reservation.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      reservation.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : reservation.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {reservation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-foreground/70">
              No reservations found
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="bg-card rounded-lg border border-border p-6">
          {selectedReservation ? (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-6">
                Reservation Details
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Guest Name</p>
                  <p className="font-semibold text-foreground">{selectedReservation.name}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Email</p>
                  <p className="text-foreground">{selectedReservation.email}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Phone</p>
                  <p className="text-foreground">{selectedReservation.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Date & Time</p>
                  <p className="text-foreground">{selectedReservation.date} at {selectedReservation.time}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Number of Guests</p>
                  <p className="text-foreground">{selectedReservation.guests}</p>
                </div>

                {selectedReservation.specialRequests && (
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Special Requests</p>
                    <p className="text-foreground">{selectedReservation.specialRequests}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Status</p>
                  <p className="font-semibold text-foreground capitalize">
                    {selectedReservation.status}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => updateReservationStatus(selectedReservation.id, 'confirmed')}
                  disabled={selectedReservation.status === 'confirmed'}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  Confirm
                </button>

                <button
                  onClick={() => updateReservationStatus(selectedReservation.id, 'cancelled')}
                  disabled={selectedReservation.status === 'cancelled'}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>

                <button
                  onClick={() => deleteReservation(selectedReservation.id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-foreground/70 py-8">
              <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Select a reservation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
