

const Post = require('../models/postModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new post
exports.createPost = catchAsyncError(async (req, res, next) => {
//   req.body.admin = req.user.id;
 
  const post = await Post.create(req.body);
  res.status(200).json({
    success: true,
    data: post,
  });
});

// update an existing post
exports.updatePost = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Post Not Found', 400));
  }
  let post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler('post Not Found', 200));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    post,
  });
});

// delete an existing post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Post Not Found', 400));
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler('post Not Found', 200));
  }
 
  await post.remove();
  res.status(200).json({
    success: true,
    message: 'post deleted',
  });
});

// send all post details
exports.getAllPosts = catchAsyncError(async (req, res) => {
  const posts = await Post.find();
  const data = posts.map((item, index) => {
    const {
      _id: id,
      iduser,
      title,
      like,
      content,
      name,
      image,
      status,
      createdAt

    } = item;
    const newItem = {
      id,
      iduser,
      title,
      like,
      content,
      name,
      image,
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

exports.getSinglePost = catchAsyncError(async (req, res, next) => {
    if (!req.params.id) {
      return next(new ErrorHandler('Post Not Found', 400));
    }
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler('post Not Found', 200));
    }
    res.status(200).json({
  
      data: post,
    });
  });


  exports.getPostRemain = catchAsyncError(async  (req, res) => {
 
    const post = await Post.find();
    let total = 0;
    let data = post.map((item, index) => {
      const {
        status,
       
      } = item;
      const newItem = {
        status,
       
      };
  
      if(status=='Chưa duyệt'){
      total = total + 1;}
   
      return total ;
      
    });
  
    res.status(200).json({
      total,
    }); 
  });