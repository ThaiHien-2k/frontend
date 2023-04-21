const BloodDonate = require('../models/bloodDonateModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new bloodDonate
exports.createBloodDonate = catchAsyncError(async (req, res, next) => {
  req.body.admin = req.user.id;
 
  const bloodDonate = await BloodDonate.create(req.body);
  res.status(200).json({
    success: true,
    data: bloodDonate,
  });
});

// update an existing bloodDonate
exports.updateBloodDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodDonate Not Found', 400));
  }
  let bloodDonate = await BloodDonate.findById(req.params.id);
  if (!bloodDonate) {
    return next(new ErrorHandler('bloodDonate Not Found', 200));
  }

  bloodDonate = await BloodDonate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    bloodDonate,
  });
});

// delete an existing bloodDonate
exports.deleteBloodDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodDonate Not Found', 400));
  }
  const bloodDonate = await BloodDonate.findById(req.params.id);
  if (!bloodDonate) {
    return next(new ErrorHandler('bloodDonate Not Found', 200));
  }
 
  await bloodDonate.remove();
  res.status(200).json({
    success: true,
    message: 'bloodDonate deleted',
  });
});

// send all BloodDonate details
exports.getAllBloodDonates = catchAsyncError(async (req, res) => {
  const bloodDonates = await BloodDonate.find();
  const data = bloodDonates.map((item, index) => {
    const {
      _id: id,
      name,
      time,
      timeF,
      staffList,
      address,
      target,
      // donate,
      receive,
      A,
      B,
      O,
      AB,
      createdAt,
    //   staff,
      status

      
    } = item;
    const newItem = {
        id,
        name,
        time,
        address,
        target,
        timeF,
        staffList,
        receive,
        // donate,
        A,
        B,
        O,
        AB,
        createdAt,
        // staff,
        status
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// send only a single bloodDonate detaisl
exports.getSingleBloodDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('BloodDonate Not Found', 400));
  }
  const bloodDonate = await BloodDonate.findById(req.params.id);
  if (!bloodDonate) {
    return next(new ErrorHandler('bloodDonate Not Found', 200));
  }

  res.status(200).json({
    success: true,
    data: bloodDonate,
  });
});

exports.getSingleBloodDonateDetails = catchAsyncError(async (req, res, next) => {
  const bloodDonate = await BloodDonate.findById(req.params.id);
  const data = bloodDonate.donate;
  res.status(200).json({
    success: true,
    data,
  });
});


exports.getBloodDonateRemaining = catchAsyncError(async  (req, res) => {
 
  const bloodDonate = await BloodDonate.find();
  let total = 0;
  let data = bloodDonate.map((item, index) => {
    const {
      status,
      

    } = item;
    const newItem = {
      status,
      
    };

    if(status=='Chưa thực hiện'){
    total = total + 1;}
    
    return total ;
    
  });

  res.status(200).json({
    total,
  }); 
});



