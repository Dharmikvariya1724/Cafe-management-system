const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET || 'cafe_secret_key_2026_xyz';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if admin exists in DB
    let admin = await Admin.findOne({ username });
    
    // If no admin exists in DB at all, auto-create default admin (admin / admin123)
    const count = await Admin.countDocuments();
    if (!admin && count === 0 && username === 'admin' && password === 'admin123') {
      admin = new Admin({ username: 'admin', password: 'admin123', name: 'Coffee King Admin' });
      await admin.save();
    }

    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Validate password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/auth/verify
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ authenticated: false, error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, user: decoded });
  } catch (error) {
    res.status(401).json({ authenticated: false, error: 'Invalid or expired token' });
  }
});

// GET /api/auth/profile - Fetch admin profile
router.get('/profile', async (req, res) => {
  try {
    let admin = await Admin.findOne().sort({ createdAt: 1 });
    if (!admin) {
      admin = new Admin({
        username: 'admin',
        password: 'admin123',
        name: 'Coffee King Admin',
        email: 'admin@coffeeking.com',
        phone: '+91 98765 43210'
      });
      await admin.save();
    }
    res.json({
      id: admin._id,
      username: admin.username,
      name: admin.name,
      email: admin.email || 'admin@coffeeking.com',
      phone: admin.phone || '+91 98765 43210',
      avatar: admin.avatar || '/images/avatar-1.jpg',
      role: admin.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/auth/profile - Update admin profile
router.put('/profile', async (req, res) => {
  try {
    const { name, username, email, phone, avatar } = req.body;
    let admin = await Admin.findOne().sort({ createdAt: 1 });
    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    if (name) admin.name = name;
    if (username) admin.username = username;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;
    if (avatar !== undefined) admin.avatar = avatar;

    await admin.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: admin._id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        avatar: admin.avatar,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/auth/change-password - Change admin password
router.put('/change-password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    let admin = await Admin.findOne().sort({ createdAt: 1 });
    if (!admin) {
      return res.status(404).json({ error: 'Admin user not found' });
    }

    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect current password' });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
