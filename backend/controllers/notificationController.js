

const Notification = require('../models/notificationModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new notification
exports.createNotification = catchAsyncError(async (req, res, next) => {
//   req.body.admin = req.user.id;
 
  const notification = await Notification.create(req.body);
  res.status(200).json({
    success: true,
    data: notification,
  });
});

// update an existing notification
exports.updateNotification = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('notification Not Found', 400));
  }
  let notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new ErrorHandler('Notification Not Found', 200));
  }

  notification = await Notification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    notification,
  });
});

// delete an existing notification
exports.deleteNotification = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Notification Not Found', 400));
  }
  const notification = await Notification.findById(req.params.id);
  if (!notification) {
    return next(new ErrorHandler('Notification Not Found', 200));
  }
 
  await notification.remove();
  res.status(200).json({
    success: true,
    message: 'notification deleted',
  });
});

// send all notification details
exports.getAllNotifications = catchAsyncError(async (req, res) => {
  const notifications = await Notification.find();
  const data = notifications.map((item, index) => {
    const {
      _id: id,
      iduser,
    
      content,
   
      createdAt

    } = item;
    const newItem = {
      id,
      iduser,
      
      content,
     
      createdAt
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

exports.getSingleNotification = catchAsyncError(async (req, res, next) => {
    if (!req.params.id) {
      return next(new ErrorHandler('Notification Not Found', 400));
    }
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return next(new ErrorHandler('notification Not Found', 200));
    }
    res.status(200).json({
  
      data: notification,
    });
  });
