const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// GET all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create reservation
router.post('/', async (req, res) => {
  try {
    const newReservation = new Reservation({
      id: req.body.id || `res_${Date.now()}`,
      ...req.body
    });
    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PATCH status (confirm/cancel)
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const existing = await Reservation.findOne({ id: req.params.id });
    if (!existing) return res.status(404).json({ message: 'Reservation not found' });

    const isNewlyConfirmed = status === 'confirmed' && existing.status !== 'confirmed';

    existing.status = status;
    const updated = await existing.save();

    if (isNewlyConfirmed) {
      const { sendReservationConfirmationEmail } = require('../utils/emailService');
      // Fire and forget or log result asynchronously
      sendReservationConfirmationEmail(updated).catch(err => {
        console.error('Async email error:', err);
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Reservation.findOneAndDelete({ id: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Reservation not found' });
    res.json({ message: 'Reservation deleted successfully', reservation: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
