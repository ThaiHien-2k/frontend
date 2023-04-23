const mongoose = require('mongoose');
const validator = require('validator');

const inforSchema = mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Please enter infor name'],
  },
  countryID: {
    type: String,
    // required: [true],
    maxlength: [12, 'CMNN/CCCD không nhiều hơn 12 ký tự'],
    minLength: [9, 'CMNN/CCCD không ít hơn 10 ký tự'],
  },
  address: {
    type: String,
    // required: [true],
    
  },
  email: {
    type: String,
    // required: [true, 'Please provide an email'],
    // unique: true,
    validate: [validator.isEmail, 'Please enter a valid email'],
  },
  phone: {
    type: String,
    // required: [true],
    
  },

  // from: {
  //   type: String,
  //   required: [true],
    
  // },

  typeBlood: {
    type: String,
    // required: [true],
    
  },
  status: {
    type: String,
    required: [false],
    
  },

  donateTime: {
    type: Number,
    default: 0,
  },

  lastDonate:{
    type: Date,
    required :false
  }, 
  oldDate:{
    type: Date,
    required :false
  }, 
                                                    
  
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Infor', inforSchema);
