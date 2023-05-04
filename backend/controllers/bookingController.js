

const Booking = require('../models/bookingModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new booking
exports.createBooking = catchAsyncError(async (req, res, next) => {
//   req.body.admin = req.user.id;
 
  const booking = await Booking.create(req.body);
  res.status(200).json({
    success: true,
    data: booking,
  });
});

// update an existing booking
exports.updateBooking = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Booking Not Found', 400));
  }
  let booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler('booking Not Found', 200));
  }

  booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    booking,
  });
});

// delete an existing Booking
exports.deleteBooking = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('booking Not Found', 400));
  }
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new ErrorHandler('booking Not Found', 200));
  }
 
  await booking.remove();
  res.status(200).json({
    success: true,
    message: 'booking deleted',
  });
});

// send all booking details
exports.getAllBookings = catchAsyncError(async (req, res) => {
  const bookings = await Booking.find();
  const data = bookings.map((item, index) => {
    const {
      _id: id,
      iduser,
      idBD,
      sex,
      heigh,
      weight,
      isAcohol,
      isNicotine,
      isHeartDisease,
      isSitUp,
      isSick,
      isAllergies,
      status,
      createdAt

    } = item;
    const newItem = {
      id,
      iduser,
      idBD,
      sex,
      heigh,
      weight,
      isAcohol,
      isNicotine,
      isHeartDisease,
      isSitUp,
      isSick,
      isAllergies,
      status,
      createdAt
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getSingleBooking = catchAsyncError(async (req, res, next) => {
    if (!req.params.id) {
      return next(new ErrorHandler('Booking Not Found', 400));
    }
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return next(new ErrorHandler('booking Not Found', 200));
    }
    res.status(200).json({
  
      data: booking,
    });
  });
