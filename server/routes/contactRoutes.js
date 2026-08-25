const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// GET all contact messages
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST submit contact message
router.post('/', async (req, res) => {
  try {
    const newMessage = new ContactMessage({
      id: req.body.id || `msg_${Date.now()}`,
      ...req.body
    });
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH toggle replied status
router.patch('/:id/reply', async (req, res) => {
  try {
    const { replied } = req.body;
    const updated = await ContactMessage.findOneAndUpdate(
      { id: req.params.id },
      { replied },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE contact message
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await ContactMessage.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully', messageItem: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
