const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['coffee', 'espresso', 'tea', 'cold', 'breakfast', 'snacks', 'desserts'],
    required: true 
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  available: { type: Boolean, default: true },
  popular: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
