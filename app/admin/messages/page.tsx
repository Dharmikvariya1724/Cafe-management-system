'use client'

import { useEffect, useState } from 'react'
import type { ContactMessage } from '@/lib/types'
import { Trash2, Check, Mail } from 'lucide-react'

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [filterReplied, setFilterReplied] = useState<'all' | 'replied' | 'unreplied'>('all')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('contact-messages') || '[]')
    setMessages(data.sort((a: ContactMessage, b: ContactMessage) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ))
  }, [])

  const filteredMessages = messages.filter(m =>
    filterReplied === 'all' ? true :
    filterReplied === 'replied' ? m.replied :
    !m.replied
  )

  const markAsReplied = (id: string) => {
    const updated = messages.map(m =>
      m.id === id ? { ...m, replied: true } : m
    )
    setMessages(updated)
    localStorage.setItem('contact-messages', JSON.stringify(updated))
    if (selectedMessage?.id === id) {
      setSelectedMessage({ ...selectedMessage, replied: true })
    }
  }

  const deleteMessage = (id: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      const updated = messages.filter(m => m.id !== id)
      setMessages(updated)
      localStorage.setItem('contact-messages', JSON.stringify(updated))
      setSelectedMessage(null)
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold text-foreground">
          Contact Messages
        </h1>
        <p className="text-foreground/70">
          Manage and respond to customer inquiries
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {(['all', 'unreplied', 'replied'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterReplied(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filterReplied === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            {status === 'all' ? 'All' : status === 'unreplied' ? 'Unreplied' : 'Replied'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-2 bg-card rounded-lg border border-border overflow-hidden">
          {filteredMessages.length > 0 ? (
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredMessages.map(message => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-secondary' : ''
                  } ${!message.replied ? 'border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{message.name}</p>
                      <p className="text-sm text-foreground/70 truncate">{message.subject}</p>
                      <p className="text-xs text-foreground/60">
                        {new Date(message.createdAt).toLocaleDateString()} at {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.replied && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold ml-2">
                        Replied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-foreground/70">
              No messages found
            </div>
          )}
        </div>

        {/* Details Panel */}
        <div className="bg-card rounded-lg border border-border p-6">
          {selectedMessage ? (
            <div>
              <h2 className="text-xl font-heading font-bold text-foreground mb-6">
                Message Details
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">From</p>
                  <p className="font-semibold text-foreground">{selectedMessage.name}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Email</p>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-primary hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {selectedMessage.email}
                  </a>
                </div>

                {selectedMessage.phone && (
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Phone</p>
                    <p className="text-foreground">{selectedMessage.phone}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Subject</p>
                  <p className="font-semibold text-foreground">{selectedMessage.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-foreground/70 mb-1">Date</p>
                  <p className="text-foreground">
                    {new Date(selectedMessage.createdAt).toLocaleDateString()} at {new Date(selectedMessage.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-foreground/70 mb-2">Message</p>
                  <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {!selectedMessage.replied && (
                  <button
                    onClick={() => markAsReplied(selectedMessage.id)}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    <Check className="w-4 h-4" />
                    Mark as Replied
                  </button>
                )}

                <button
                  onClick={() => deleteMessage(selectedMessage.id)}
                  className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-foreground/70 py-8">
              <Mail className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
