const express = require('express');
const router = express.Router();
const Table = require('../models/Table');

// GET all tables
router.get('/', async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET table by publicToken
router.get('/token/:token', async (req, res) => {
  try {
    const table = await Table.findOne({ publicToken: req.params.token });
    if (!table) return res.status(404).json({ message: 'Table token invalid or not found' });
    res.json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create table
router.post('/', async (req, res) => {
  try {
    const newTable = new Table({
      id: req.body.id || `tbl_${Date.now()}`,
      tableNumber: req.body.tableNumber,
      name: req.body.name || `Table ${req.body.tableNumber}`,
      publicToken: req.body.publicToken || `tb_${Math.random().toString(36).substring(2, 10)}`,
      status: req.body.status || 'active'
    });
    const saved = await newTable.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update table
router.put('/:id', async (req, res) => {
  try {
    const updated = await Table.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Table not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE table
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Table.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Table not found' });
    res.json({ message: 'Table deleted successfully', table: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
