const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'Coffee King' },
  siteTagline: { type: String, default: 'Stirr Your Heart In' },
  logo: { type: String, default: '/images/logo.png' },
  favicon: { type: String, default: '/favicon.ico' },
  adminName: { type: String, default: 'Coffee King Admin' },
  adminEmail: { type: String, default: 'admin@coffeeking.com' },
  adminPhone: { type: String, default: '+91 98765 43210' },
  adminAvatar: { type: String, default: '/images/avatar-1.jpg' },
  socialLinks: {
    instagram: { type: String, default: 'https://instagram.com/coffeekingin' },
    facebook: { type: String, default: 'https://facebook.com/coffeekingin' },
    twitter: { type: String, default: 'https://twitter.com/coffeekingin' },
    youtube: { type: String, default: 'https://youtube.com/coffeekingin' },
    linkedin: { type: String, default: 'https://linkedin.com/company/coffeekingin' }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Settings', settingsSchema);
