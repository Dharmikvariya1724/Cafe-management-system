const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET settings
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update settings
router.put('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const saved = await settings.save();
    res.json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
