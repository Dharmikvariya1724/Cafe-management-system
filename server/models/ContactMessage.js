const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  replied: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
