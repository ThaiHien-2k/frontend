const mongoose = require('mongoose');

const bloodStorageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter bloodStorage name'],
  },
  amount: {
    type: Number,
    // required: [true],
   
  },
  from: {
    type: String,
    required: [true],
    
  },
  type: {
    type: String,
    required: [true],
    
  },
  date: {
    type: String,
    required: [true],
    
  },
  detail:{
    type:String,
    required:true,
  },

  A: {
    type: Number,
    default: 0,
  },
  B: {
    type: Number,
    default: 0,
  }, 
  AB: {
    type: Number,
    default: 0,
  },
  O: {
    type: Number,
    default: 0,
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('BloodStorage', bloodStorageSchema);
