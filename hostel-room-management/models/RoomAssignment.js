const mongoose = require('mongoose');

const roomAssignmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  status: { type: String, enum: ['requested', 'assigned', 'rejected'] }
});

module.exports = mongoose.model('RoomAssignment', roomAssignmentSchema);
