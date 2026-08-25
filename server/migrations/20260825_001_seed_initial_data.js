/**
 * Database Migration Script
 * Migration Version: 20260825_001
 * Description: Initializes database collections, updates Admin schema, creates indexes, and runs DB seed.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Admin = require('../models/Admin');
const MenuItem = require('../models/MenuItem');
const Table = require('../models/Table');
const Review = require('../models/Review');
const GalleryImage = require('../models/GalleryImage');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const ContactMessage = require('../models/ContactMessage');
const Newsletter = require('../models/Newsletter');

async function runMigration() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_management';
  console.log(`🚀 [Migration 20260825_001] Connecting to MongoDB: ${mongoUri}`);

  try {
    await mongoose.connect(mongoUri);

    console.log('🔄 Ensuring indexes on collections...');
    await Admin.createIndexes();
    await MenuItem.createIndexes();
    await Table.createIndexes();
    await Review.createIndexes();
    await Order.createIndexes();

    console.log('✨ [Migration 20260825_001] Migration structure successfully created!');
  } catch (err) {
    console.error('❌ Migration error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  runMigration().then(() => process.exit(0));
}

module.exports = runMigration;
