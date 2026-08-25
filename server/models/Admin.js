const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Coffee King Admin' },
  email: { type: String, default: 'admin@coffeeking.com' },
  phone: { type: String, default: '+91 98765 43210' },
  avatar: { type: String, default: '/images/avatar-1.jpg' },
  role: { type: String, default: 'admin' }
}, {
  timestamps: true
});

// Password Hash middleware before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare Password method
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
