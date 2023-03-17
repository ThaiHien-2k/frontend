const CashFlow = require('../models/cashFlowModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new cashFlow
exports.createCashFlow = catchAsyncError(async (req, res, next) => {
  req.body.admin = req.user.id;
 
  const cashFlow = await CashFlow.create(req.body);
  res.status(200).json({
    success: true,
    data: cashFlow,
  });
});

// update an existing cashFlow
exports.updateCashFlow = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('CashFlow Not Found', 400));
  }
  let cashFlow = await CashFlow.findById(req.params.id);
  if (!cashFlow) {
    return next(new ErrorHandler('cashFlow Not Found', 200));
  }

  cashFlow = await CashFlow.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    cashFlow,
  });
});

// delete an existing cashFlow
exports.deleteCashFlow = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('CashFlow Not Found', 400));
  }
  const cashFlow = await CashFlow.findById(req.params.id);
  if (!cashFlow) {
    return next(new ErrorHandler('cashFlow Not Found', 200));
  }
  
  await cashFlow.remove();
  res.status(200).json({
    success: true,
    message: 'cashFlow deleted',
  });
});

// send all CashFlow details
exports.getAllCashFlows = catchAsyncError(async (req, res) => {
  const cashFlows = await CashFlow.find();
  const data = cashFlows.map((item, index) => {
    const {
      _id: id,
      name,
      amount,
      date,
      from,
      type,
    //   createdAt,
      
    } = item;
    const newItem = {
      id,
      name,
      amount,
      from,
      date,
      type,
    //   createdAt,
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// send only a single cashFlow detaisl
exports.getSingleCashFlow = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('CashFlow Not Found', 400));
  }
  const cashFlow = await CashFlow.findById(req.params.id);
  if (!cashFlow) {
    return next(new ErrorHandler('cashFlow Not Found', 200));
  }
  res.status(200).json({
    success: true,
    data: cashFlow,
  });
});

exports.getCashFlowRemaining = catchAsyncError(async  (req, res) => {
 
  const cashFlows = await CashFlow.find();
  let total = 0;
  let data = cashFlows.map((item, index) => {
    const {
      type,
      amount,

    } = item;
    const newItem = {
      type,
      amount,
    };

    if(type=='Thu'){
    total = total + amount;}
    if(type == 'Chi'){
      total = total - amount;
    }
    return total ;
    
  });

  res.status(200).json({
    total,
  }); 
  
  
});



