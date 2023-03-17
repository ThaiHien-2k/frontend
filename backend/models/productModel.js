const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
  },
  countryID: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  address: {
    type: String,
    required: [true, 'Please enter product price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
  },
  suppostTime: {
    type: Number,
    default: 0,
  },
  
  // sizes: [{ type: String, required: true }],
  // company: {
  //   type: String,
  //   required: [true, 'Please enter product company'],
  // },
  // category: {
  //   type: String,
  //   required: [true, 'Please enter product category'],
  // },
  // stock: {
  //   type: Number,
  //   required: [true, 'Please enter product stock'],
  //   maxLength: [4, 'stock cannot exceed 4 characters'],
  //   min: 0,
  //   default: 1,
  // },
  // numberOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
 
  // shipping: {
  //   type: Boolean,
  //   default: true,
  // },
  // featured: {
  //   type: Boolean,
  //   default: false,
  // },
  // admin: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Admin',
  //   required: true,
  // },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', productSchema);
