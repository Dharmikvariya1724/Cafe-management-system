const mongoose = require('mongoose');

const galleryImageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  src: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['interior', 'coffee', 'food', 'events'],
    required: true 
  },
  alt: { type: String, required: true },
  title: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryImage', galleryImageSchema);
