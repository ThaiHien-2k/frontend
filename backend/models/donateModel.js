const mongoose = require('mongoose');

const donateSchema = mongoose.Schema({
 


   iduser: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Infor',
    // required: [true],
  },
  idBD: { type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodDonate',
    // required: [true],
  },
  name: {
    type: String,
   
  },
    amount:{
      type: Number,
    
    },
    typeBlood:{
      type: String,
      
    },




  createdAt: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Donate', donateSchema);
