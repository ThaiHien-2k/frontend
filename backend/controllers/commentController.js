

const Comment = require('../models/commentModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new comment
exports.createComment = catchAsyncError(async (req, res, next) => {
//   req.body.admin = req.user.id;
 
  const comment = await Comment.create(req.body);
  res.status(200).json({
    success: true,
    data: comment,
  });
});

// update an existing comment
exports.updateComment = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Comment Not Found', 400));
  }
  let comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorHandler('comment Not Found', 200));
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    comment,
  });
});

// delete an existing comment
exports.deleteComment = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('comment Not Found', 400));
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorHandler('comment Not Found', 200));
  }
 
  await comment.remove();
  res.status(200).json({
    success: true,
    message: 'comment deleted',
  });
});

// send all comment details
exports.getAllComments = catchAsyncError(async (req, res) => {
  const comments = await Comment.find();
  const data = comments.map((item, index) => {
    const {
      _id: id,
      name,
      comment,
      iduser,
      idPost,
      createdAt,
    
      
    } = item;
    const newItem = {
      id,
      name,
      comment,
      iduser,
      idPost,
      createdAt,
    
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// exports.getName= catchAsyncError(async (req, res) => {
//   const comments = await Comment.find();
//   const data = comments.map((item, index) => {
//     const {
//       // _id: id,
//       name,
      
//     } = item;
//     const newItem = {
//       // id,
//       name,

//     };
//     return newItem;
//   });
//   res.status(200).json({
//     success: true,
//     data,
//   });
// });

// exports.getSupTime = catchAsyncError(async (req, res, next) => {
 
//   const comment = await Comment.findById(req.params.id);

//   res.status(200).json({
//     success: true,
//     data: comment.suppostTime,
//   });
// });


// send only a single comment detaisl
exports.getSingleComment = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Comment Not Found', 400));
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new ErrorHandler('comment Not Found', 200));
  }
  res.status(200).json({

    data: comment,
  });
});


