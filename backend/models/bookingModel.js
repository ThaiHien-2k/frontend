const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
 


   iduser: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Infor',
    // required: [true],
  },
  idBD: { type: mongoose.Schema.Types.ObjectId,
    ref: 'BloodDonate',
    // required: [true],
  },
//   name: {
//     type: String,
   
//   },
  sex:{
    type: String,
  },

    heigh:{
      type: Number,
    
    },
    weight:{
        type: Number,
      
      },
      isAcohol:{
      type: String,
      
    },
    isNicotine :{
        type: String,
    },

    isHeartDisease  :{
        type: String,
    },
    isSitUp  :{
        type: String,
    }, 
    isSick  :{
        type: String,
    },
    isAllergies   :{
        type: String,
    },
    status:{
      type: String,
  },

  createdAt: {
    type: String,
 
  },
});

module.exports = mongoose.model('Booking', bookingSchema);
