const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

// GET subscribers
router.get('/', async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST subscribe
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email is already subscribed' });
    }

    const subscriber = new Newsletter({
      id: req.body.id || `sub_${Date.now()}`,
      email,
      subscribedAt: new Date().toISOString()
    });
    const saved = await subscriber.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
