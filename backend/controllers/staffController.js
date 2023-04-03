

const Staff = require('../models/staffModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new staff
exports.createStaff = catchAsyncError(async (req, res, next) => {
  req.body.admin = req.user.id;
 
  const staff = await Staff.create(req.body);
  res.status(200).json({
    success: true,
    data: staff,
  });
});

// update an existing staff
exports.updateStaff = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Staff Not Found', 400));
  }
  let staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler('staff Not Found', 200));
  }

  staff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    staff,
  });
});

// delete an existing staff
exports.deleteStaff = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Staff Not Found', 400));
  }
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler('staff Not Found', 200));
  }
 
  await staff.remove();
  res.status(200).json({
    success: true,
    message: 'Staff deleted',
  });
});

// send all Staff details
exports.getAllStaffs = catchAsyncError(async (req, res) => {
  const staffs = await Staff.find();
  const data = staffs.map((item, index) => {
    const {
      _id: id,
      name,
      countryID,
      address,
      phone,
      suppostTime,
      type,
      from
      
    } = item;
    const newItem = {
      id,
      name,
      countryID,
      address,
      phone,
      suppostTime,
      type,
      from
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getName= catchAsyncError(async (req, res) => {
  const staffs = await Staff.find();
  const data = staffs.map((item, index) => {
    const {
      // _id: id,
      name,
      
    } = item;
    const newItem = {
      // id,
      name,

    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getSupTime = catchAsyncError(async (req, res, next) => {
 
  const staff = await Staff.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: staff.suppostTime,
  });
});


// send only a single staff detaisl
exports.getSingleStaff = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Staff Not Found', 400));
  }
  const staff = await Staff.findById(req.params.id);
  if (!staff) {
    return next(new ErrorHandler('staff Not Found', 200));
  }
  res.status(200).json({

    data: staff,
  });
});


