const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_management');
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    console.warn('[MongoDB Warning] Proceeding with server boot. Make sure MongoDB is running or update MONGODB_URI in server/.env');
  }
};

module.exports = connectDB;
