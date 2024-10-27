const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, unique: true },
  capacity: Number,
  isAvailable: Boolean
});

module.exports = mongoose.model('Room', roomSchema);
