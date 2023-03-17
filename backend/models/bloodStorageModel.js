const mongoose = require('mongoose');

const bloodStorageSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter bloodStorage name'],
  },
  amount: {
    type: Number,
    required: [true],
   
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
    type: Date,
    required: [true],
    
  },
  detail:{
    type:String,
    required:true,
  },
  
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('BloodStorage', bloodStorageSchema);
