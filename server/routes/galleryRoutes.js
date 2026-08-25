const express = require('express');
const router = express.Router();
const GalleryImage = require('../models/GalleryImage');

// GET gallery images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST upload/add gallery image
router.post('/', async (req, res) => {
  try {
    const newImage = new GalleryImage({
      id: req.body.id || `img_${Date.now()}`,
      src: req.body.src,
      category: req.body.category || 'coffee',
      alt: req.body.alt || 'Cafe Gallery Image',
      title: req.body.title || ''
    });
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update gallery image
router.put('/:id', async (req, res) => {
  try {
    const updated = await GalleryImage.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Gallery image not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE gallery image
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GalleryImage.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Gallery image not found' });
    res.json({ message: 'Image deleted successfully', image: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
