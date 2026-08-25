const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single order by ID or orderNumber
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({
      $or: [{ id: req.params.id }, { orderNumber: req.params.id }]
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  try {
    const timestamp = Date.now().toString().slice(-4);
    const orderNumber = req.body.orderNumber || `ORD-${timestamp}`;
    const newOrder = new Order({
      id: req.body.id || `ord_${Date.now()}`,
      orderNumber,
      ...req.body
    });
    const saved = await newOrder.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH update order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully', order: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
