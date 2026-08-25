const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// GET all menu items
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single menu item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findOne({ id: req.params.id });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new menu item
router.post('/', async (req, res) => {
  try {
    const newItem = new MenuItem({
      id: req.body.id || `item_${Date.now()}`,
      ...req.body
    });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update menu item
router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Menu item not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE menu item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MenuItem.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted successfully', item: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
