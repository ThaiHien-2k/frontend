const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter staff name'],
  },
  countryID: {
    type: String,
    required: [true],
    maxlength: [12, 'CMNN/CCCD không nhiều hơn 12 ký tự'],
    minLength: [9, 'CMNN/CCCD không ít hơn 9 ký tự'],
  },
  address: {
    type: String,
    required: [true],
    
  },
  from: {
    type: String,
    required: [true],
    
  },
  phone: {
    type: String,
    required: [true],
    
  },
  type: {
    type: String,
    required: [true],
    
  },
  suppostTime: {
    type: Number,
    default: 0,
  },
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Staff', staffSchema);
