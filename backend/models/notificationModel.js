const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    iduser: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Infor',
        // required: [true],
      },
//   title: {
//     type: String,
//     required: [true, 'Please enter notification  name'],
//   },

//   name: {
//     type: String,
//     required: [true],
//   },
 
  content: {
    type: String,
    required: [true],
    
  },
//   like: {
//     type: Number,
   
    
//   },
//   status: {
//     type: String,
//     required: [true],
    
//   },
  
  createdAt: {
    type: String,
    // default: Date.now(),
  },
});

module.exports = mongoose.model('Notification', notificationSchema);
