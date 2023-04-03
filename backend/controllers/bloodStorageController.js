

const BloodStorage = require('../models/bloodStorageModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new bloodStorage
exports.createBloodStorage = catchAsyncError(async (req, res, next) => {
  req.body.admin = req.user.id;
 
  const bloodStorage = await BloodStorage.create(req.body);
  res.status(200).json({
    success: true,
    data: bloodStorage,
  });
});

// update an existing bloodStorage
exports.updateBloodStorage = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodStorage Not Found', 400));
  }
  let bloodStorage = await BloodStorage.findById(req.params.id);
  if (!bloodStorage) {
    return next(new ErrorHandler('bloodStorage Not Found', 200));
  }

  bloodStorage = await BloodStorage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    bloodStorage,
  });
});

// delete an existing bloodStorage
exports.deleteBloodStorage = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodStorage Not Found', 400));
  }
  const bloodStorage = await BloodStorage.findById(req.params.id);
  if (!bloodStorage) {
    return next(new ErrorHandler('bloodStorage Not Found', 200));
  }
 
  await bloodStorage.remove();
  res.status(200).json({
    success: true,
    message: 'bloodStorage deleted',
  });
});

// send all bloodStorage details
exports.getAllBloodStorages = catchAsyncError(async (req, res) => {
  const bloodStorages = await BloodStorage.find();
  const data = bloodStorages.map((item, index) => {
    const {
      _id: id,
      name,
      amount,
      from,
      detail,
      date,
      type,
      A,
      B,
      O,
      AB,
      createdAt
      
    } = item;
    const newItem = {
      id,
      name,
      amount,
      date,
      from,
      detail,
      type,
      A,
      B,
      O,
      AB,
      createdAt
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// send only a single bloodStorage detaisl
exports.getSingleBloodStorage = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodStorage Not Found', 400));
  }
  const bloodStorage = await BloodStorage.findById(req.params.id);
  if (!bloodStorage) {
    return next(new ErrorHandler('bloodStorage Not Found', 200));
  }
  res.status(200).json({
    success: true,
    data: bloodStorage,
  });
});

exports.getBloodRemaining = catchAsyncError(async  (req, res) => {
 
  const bloodStorage = await BloodStorage.find();
  let total = 0;
  let data = bloodStorage.map((item, index) => {
    const {
      type,
      amount,

    } = item;
    const newItem = {
      type,
      amount,
    };

    if(type=='Nhận'){
    total = total + amount;}
    if(type == 'Cho'){
      total = total - amount;
    }
    return total ;
    
  });

  res.status(200).json({
    total,
  }); 
});

exports.getBlood = catchAsyncError(async  (req, res) => {
 
  
  let ABLood = 0;
  let BBLood = 0;
  let OBLood = 0;
  let ABBLood = 0;
   
  const bloodStorage = await BloodStorage.find();
  let data = bloodStorage.map((item, index) => {
    const {
      type,
      A,
      B,
      AB,
      O
      

    } = item;
    const newItem = {
      type,
      A,
      B,
      AB,
      O
      
    };
    if(type=='Nhận'){
      ABLood=ABLood+A;
      BBLood=BBLood+B;
      OBLood=OBLood+O;
      ABBLood=ABBLood+AB;}
      if(type == 'Cho'){
        ABLood=ABLood-A;
        BBLood=BBLood-B;
        OBLood=OBLood-O;
        ABBLood=ABBLood-AB;
      }
   
    
    return ABLood , BBLood,OBLood ,ABBLood;
    
  });

  res.status(200).json({
    ABLood , BBLood,OBLood ,ABBLood
  }); 
});
