/**
 * Database Migration Script
 * Migration Version: 20260829_002
 * Description: Migrates Settings schema, initializes default site branding/logo, updates Order isSeen index, and ensures indexes across all collections.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Admin = require('../models/Admin');
const Settings = require('../models/Settings');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const Review = require('../models/Review');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const ContactMessage = require('../models/ContactMessage');
const Newsletter = require('../models/Newsletter');

async function runMigration() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_management';
  console.log(`🚀 [Migration 20260829_002] Connecting to MongoDB: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri);

    console.log('🔄 Creating & verifying collection indexes...');
    await Admin.createIndexes();
    await Settings.createIndexes();
    await MenuItem.createIndexes();
    await Table.createIndexes();
    await Review.createIndexes();
    await Order.createIndexes();
    await Reservation.createIndexes();
    await ContactMessage.createIndexes();
    await Newsletter.createIndexes();

    console.log('📦 Checking Settings collection...');
    let settings = await Settings.findOne();
    if (!settings) {
      console.log('✨ Creating initial default website settings & logo...');
      settings = await Settings.create({
        siteName: 'Coffee King',
        siteTagline: 'Stirr Your Heart In',
        logo: '/images/logo.png',
        favicon: '/favicon.ico',
        adminName: 'Coffee King Admin',
        adminEmail: 'admin@coffeeking.com',
        adminPhone: '+91 98765 43210',
        adminAvatar: '/images/avatar-1.jpg',
        socialLinks: {
          instagram: 'https://instagram.com/coffeekingin',
          facebook: 'https://facebook.com/coffeekingin',
          twitter: 'https://twitter.com/coffeekingin',
          youtube: 'https://youtube.com/coffeekingin',
          linkedin: 'https://linkedin.com/company/coffeekingin'
        }
      });
    }

    console.log('🛠 Updating legacy orders without isSeen field...');
    const result = await Order.updateMany(
      { isSeen: { $exists: false } },
      { $set: { isSeen: false } }
    );
    console.log(`✅ Updated ${result.modifiedCount} legacy order records.`);

    console.log('🎉 [Migration 20260829_002] Migration completed successfully!');
  } catch (err) {
    console.error('❌ [Migration Error]:', err.message || err);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigration().then(() => process.exit(0));
}

module.exports = runMigration;
