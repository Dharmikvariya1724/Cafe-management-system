const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tableNumber: { type: String, required: true },
  name: { type: String, default: '' },
  publicToken: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['active', 'inactive'],
    default: 'active' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);
