const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cafe_management', {
      serverSelectionTimeoutMS: 2500, // Fail fast after 2.5s if MongoDB service is offline
    });
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    console.warn('[MongoDB Warning] Proceeding with server boot. Frontend will use built-in local data fallback.');
    mongoose.set('bufferCommands', false); // Stop buffering queries when database is unreachable
  }
};

module.exports = connectDB;
