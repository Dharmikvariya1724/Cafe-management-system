const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Newsletter', newsletterSchema);
