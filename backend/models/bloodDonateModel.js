const mongoose = require('mongoose');

const bloodDonateSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter bloodDonate name'],
  },
  time: {
    type: Date,
    required: [true],
   
  },
  address: {
    type: String,
    required: [true],
    
  },
  target: {
    type: Number,
    required: [true],
    
  },
  receive: {
    type: Number,
    default: 0,
  },
  staffList:[ {
   
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Staff',
    required: [true],
 },],
  status:{
    type: String,
    require: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('BloodDonate', bloodDonateSchema);
