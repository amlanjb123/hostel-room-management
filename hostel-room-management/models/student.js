const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  studentID: {type: String, unique:true},
  email: { type: String, unique: true },
  password: String,
  batch: String,
  semester: String
});

module.exports = mongoose.model('Student', studentSchema);
