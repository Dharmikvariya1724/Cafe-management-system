const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  photo: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  date: { type: String, required: true },
  verified: { type: Boolean, default: false },
  orderId: { type: String, default: '' },
  orderNumber: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
