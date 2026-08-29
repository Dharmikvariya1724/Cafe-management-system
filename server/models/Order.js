const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  menuItemId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  notes: { type: String, default: '' },
  image: { type: String, default: '' }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  orderNumber: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  orderType: { 
    type: String, 
    enum: ['dine-in', 'pickup', 'delivery'],
    required: true 
  },
  tableNumber: { type: String, default: '' },
  tableToken: { type: String, default: '' },
  address: { type: String, default: '' },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['cash', 'card', 'upi'],
    default: 'cash' 
  },
  specialInstructions: { type: String, default: '' },
  isSeen: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
