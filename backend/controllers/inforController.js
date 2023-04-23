const Infor = require('../models/inforModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new infor
exports.createInfor = catchAsyncError(async (req, res, next) => {
  // req.body.admin = req.user.id;
 
  const infor = await Infor.create(req.body);
  res.status(200).json({
    success: true,
    data: infor,
  });
});

// update an existing infor
exports.updateInfor = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Infor Not Found', 400));
  }
  let infor = await Infor.findById(req.params.id);
  if (!infor) {
    return next(new ErrorHandler('infor Not Found', 200));
  }

  infor = await Infor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    infor,
  });
});

// delete an existing infor
exports.deleteInfor = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Infor Not Found', 400));
  }
  const infor = await Infor.findById(req.params.id);
  if (!infor) {
    return next(new ErrorHandler('infor Not Found', 200));
  }
 
  await infor.remove();
  res.status(200).json({
    success: true,
    message: 'infor deleted',
  });
});

// send all infor details
exports.getAllInfors = catchAsyncError(async (req, res) => {
  const infors = await Infor.find();
  const data = infors.map((item, index) => {
    const {
      _id: id,
      name,
      email,
      countryID,
      address,
      phone,
      // from,
      typeBlood,
      donateTime,
      status,
      oldDate,
      lastDonate,
      
    } = item;
    const newItem = {
      id,
      name,
      email,
      countryID,
      address,
      phone,
      // from,
      oldDate,
      typeBlood,
      donateTime,
      status,
      lastDonate,
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// send only a single infor detaisl
exports.getSingleInfor = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Infor Not Found', 400));
  }
  const infor = await Infor.findById(req.params.id);
  if (!infor) {
    return next(new ErrorHandler('infor Not Found', 200));
  }
  res.status(200).json({
    success: true,
    data: infor,
  });
});




