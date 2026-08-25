'use client'

import React, { useState, useEffect } from 'react'

import { useCart } from '@/context/CartContext'
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Store, Bike, UtensilsCrossed } from 'lucide-react'
import type { Order, OrderType, PaymentMethod } from '@/lib/types'
import { initialOrders } from '@/lib/data'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/lib/api-client'

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotalPrice, isCartOpen, setIsCartOpen, tableContext } = useCart()
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart')

  // Checkout Form State
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [orderType, setOrderType] = useState<OrderType>('dine-in')
  const [tableNumber, setTableNumber] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi')
  const [specialInstructions, setSpecialInstructions] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null)

  // Sync table context if present
  useEffect(() => {
    if (tableContext) {
      setOrderType('dine-in')
      setTableNumber(tableContext.tableNumber)
    }
  }, [tableContext])

  const tax = Number((subtotalPrice * 0.08).toFixed(2))
  const deliveryFee = orderType === 'delivery' ? 2.50 : 0
  const totalPrice = Number((subtotalPrice + tax + deliveryFee).toFixed(2))

  const handleClose = () => {
    setIsCartOpen(false)
    // Reset step after slide out animation
    setTimeout(() => {
      if (step === 'success') {
        setStep('cart')
      }
    }, 300)
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (cart.length === 0) return

    setIsSubmitting(true)

    // Generate Order Number
    const orderNum = `#CC-${Math.floor(1000 + Math.random() * 9000)}`
    const now = new Date().toISOString()

    const finalOrderType = tableContext ? 'dine-in' : orderType
    const finalTableNumber = tableContext ? tableContext.tableNumber : (finalOrderType === 'dine-in' ? tableNumber || 'Table 1' : undefined)

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      customerName,
      customerPhone,
      customerEmail,
      orderType: finalOrderType,
      tableNumber: finalTableNumber,
      tableToken: tableContext ? tableContext.publicToken : undefined,
      address: finalOrderType === 'delivery' ? address : undefined,
      items: [...cart],
      subtotal: subtotalPrice,
      tax,
      total: totalPrice,
      status: 'pending',
      paymentMethod,
      specialInstructions: specialInstructions.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    }

    // Save to MongoDB via API
    await api.createOrder(newOrder)

    // Save to localStorage
    try {
      const existingOrdersRaw = localStorage.getItem('coffee_orders')
      let existingOrders: Order[] = []
      if (existingOrdersRaw) {
        existingOrders = JSON.parse(existingOrdersRaw)
      } else {
        existingOrders = initialOrders
      }
      const updatedOrders = [newOrder, ...existingOrders]
      localStorage.setItem('coffee_orders', JSON.stringify(updatedOrders))
      
      // Dispatch custom event for real-time update in admin tab/pages
      window.dispatchEvent(new Event('ordersUpdated'))
    } catch (err) {
      console.error('Failed to save order:', err)
    }

    setIsSubmitting(false)
    setCompletedOrder(newOrder)
    setStep('success')
    clearCart()
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex w-full md:w-auto md:pl-10">
        <div className="w-full md:w-screen md:max-w-md bg-card border-l border-border text-foreground shadow-2xl flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h2 className="font-heading font-bold text-lg text-foreground">
                {step === 'cart' && 'Your Shopping Cart'}
                {step === 'checkout' && 'Checkout & Place Order'}
                {step === 'success' && 'Order Placed Successfully!'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* STEP 1: CART ITEMS LIST */}
            {step === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                      <ShoppingBag className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-2">Your cart is empty</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Explore our delicious coffee and snack menu to add items to your order.
                    </p>
                    <button
                      onClick={handleClose}
                      className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-secondary/40 border border-border p-3 rounded-xl flex gap-3 items-center"
                      >
                        <div className="relative w-16 h-16 bg-secondary rounded-lg overflow-hidden shrink-0">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-2xl">
                              ☕
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-sm truncate">
                            {item.name}
                          </h4>
                          <p className="text-primary font-bold text-sm">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground truncate">
                              Note: {item.notes}
                            </p>
                          )}

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-semibold px-1 min-w-[1.25rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded bg-secondary hover:bg-secondary/80 flex items-center justify-center text-foreground transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* STEP 2: CHECKOUT FORM */}
            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
                {/* QR Table Context Banner if active */}
                {tableContext && (
                  <div className="bg-primary/10 border border-primary/30 p-3 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                        <UtensilsCrossed className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block leading-none">
                          QR Verified Table
                        </span>
                        <span className="text-sm font-extrabold text-foreground">
                          {tableContext.tableNumber} {tableContext.name ? `(${tableContext.name})` : ''}
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold rounded-full border border-green-300">
                      Locked to Table
                    </span>
                  </div>
                )}

                {/* Order Type Selection */}
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                    Order Type {tableContext ? '(Dine-In locked via Table QR Code)' : ''}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      disabled={!!tableContext}
                      onClick={() => setOrderType('dine-in')}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                        orderType === 'dine-in'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border hover:bg-secondary text-foreground'
                      } ${tableContext ? 'cursor-not-allowed opacity-90' : ''}`}
                    >
                      <UtensilsCrossed className="w-4 h-4" />
                      <span className="text-xs">Dine In</span>
                    </button>

                    <button
                      type="button"
                      disabled={!!tableContext}
                      onClick={() => setOrderType('pickup')}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                        orderType === 'pickup'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border hover:bg-secondary text-foreground'
                      } ${tableContext ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <Store className="w-4 h-4" />
                      <span className="text-xs">Takeaway</span>
                    </button>

                    <button
                      type="button"
                      disabled={!!tableContext}
                      onClick={() => setOrderType('delivery')}
                      className={`p-2.5 rounded-lg border text-center flex flex-col items-center gap-1 transition-all ${
                        orderType === 'delivery'
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-border hover:bg-secondary text-foreground'
                      } ${tableContext ? 'opacity-40 cursor-not-allowed' : ''}`}
                    >
                      <Bike className="w-4 h-4" />
                      <span className="text-xs">Delivery</span>
                    </button>
                  </div>
                </div>

                {/* Customer Details */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Aarav Patel"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="aarav@example.com"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Conditional inputs based on order type */}
                  {orderType === 'dine-in' && (
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Table Number {tableContext ? '(Auto-identified from QR)' : '(Optional)'}
                      </label>
                      <input
                        type="text"
                        readOnly={!!tableContext}
                        value={tableContext ? tableContext.tableNumber : tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="e.g. Table 5"
                        className={`w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                          tableContext ? 'bg-secondary/60 text-foreground font-bold cursor-not-allowed' : ''
                        }`}
                      />
                    </div>
                  )}


                  {orderType === 'delivery' && (
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Flat no, Street name, Landmark"
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      />
                    </div>
                  )}

                  {/* Payment Method */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="upi">UPI / GPay / PhonePe</option>
                      <option value="cash">Cash on Delivery / Pay at Counter</option>
                      <option value="card">Credit / Debit Card</option>
                    </select>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Special Order Notes
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Less sugar, extra hot"
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                </div>
              </form>
            )}

            {/* STEP 3: ORDER SUCCESS */}
            {step === 'success' && completedOrder && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Order Submitted!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your order ID is <span className="font-bold text-primary">{completedOrder.orderNumber}</span>
                  </p>
                </div>

                <div className="bg-secondary/40 border border-border rounded-xl p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer:</span>
                    <span className="font-semibold text-foreground">{completedOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Type:</span>
                    <span className="font-semibold text-foreground capitalize">{completedOrder.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-bold text-primary">₹{completedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-semibold uppercase text-[10px]">
                      {completedOrder.status} (Waiting Admin Confirmation)
                    </span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Our baristas will review and accept your order shortly. You can track your order status live anytime!
                </p>

                <div className="pt-4 space-y-2">
                  <Link
                    href="/orders"
                    onClick={handleClose}
                    className="block w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                  >
                    Track Your Orders
                  </Link>

                  <button
                    onClick={handleClose}
                    className="block w-full bg-secondary text-foreground py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors text-sm"
                  >
                    Close & Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {cart.length > 0 && step !== 'success' && (
            <div className="p-4 border-t border-border bg-secondary/20 space-y-3">
              {/* Order summary breakdown */}
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{subtotalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                {orderType === 'delivery' && step === 'checkout' && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-foreground text-base pt-1 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-1/3 bg-secondary text-foreground py-2.5 rounded-xl font-semibold hover:bg-secondary/80 transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isSubmitting}
                    className="w-2/3 bg-primary text-primary-foreground py-2.5 rounded-xl font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? 'Placing Order...' : 'Confirm & Place Order'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
