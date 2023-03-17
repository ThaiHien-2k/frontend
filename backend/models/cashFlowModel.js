const mongoose = require('mongoose');

const cashFlowSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true],
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
 
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('CashFlow', cashFlowSchema);
