const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

const connectDB = require('./config/db');

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root Welcome API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to The Coffee Corner - Cafe Management Backend API ☕',
    status: 'online',
    health: '/api/health',
    endpoints: {
      menu: '/api/menu',
      orders: '/api/orders',
      tables: '/api/tables',
      reservations: '/api/reservations',
      messages: '/api/messages',
      reviews: '/api/reviews',
      gallery: '/api/gallery',
      newsletter: '/api/newsletter'
    }
  });
});

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Cafe Management System API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/messages', require('./routes/contactRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/newsletter', require('./routes/newsletterRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[API Error]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

// Start Server
app.listen(PORT, () => {
  console.log(`[Express Backend] Server running on http://localhost:${PORT}`);
  console.log(`[Express Backend] Ready to accept frontend requests from ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
});
