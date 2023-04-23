const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
 


   iduser: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Infor',
    // required: [true],
  },
  idPost: { type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    // required: [true],
  },
  name: {
    type: String,
   
  },
  comment: {
    type: String,
   
  },
  




  createdAt: {
    type: String,
    // default: Date.now(),
  },
});

module.exports = mongoose.model('Comment', commentSchema);
