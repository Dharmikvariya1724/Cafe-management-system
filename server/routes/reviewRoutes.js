const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// GET reviews (all or verified filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.verified === 'true') {
      filter.verified = true;
    }
    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST submit review
router.post('/', async (req, res) => {
  try {
    const newReview = new Review({
      id: req.body.id || `rev_${Date.now()}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      ...req.body
    });
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH toggle verified status
router.patch('/:id/verify', async (req, res) => {
  try {
    const { verified } = req.body;
    const updated = await Review.findOneAndUpdate(
      { id: req.params.id },
      { verified },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Review not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Review.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Review not found' });
    res.json({ message: 'Review deleted successfully', review: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
