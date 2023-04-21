const Donate = require('../models/donateModel');
const ErrorHandler = require('../utils/ErrorHandler');
const catchAsyncError = require('../middleware/CatchAsyncErrors');
const cloudinary = require('../config/cloudinary');

// create a new donate
exports.createDonate = catchAsyncError(async (req, res, next) => {
  req.body.admin = req.user.id;
 
  const donate = await Donate.create(req.body);
  res.status(200).json({
    success: true,
    data: donate,
  });
});

// update an existing donate
exports.updateDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Donate Not Found', 400));
  }
  let donate = await Donate.findById(req.params.id);
  if (!donate) {
    return next(new ErrorHandler('donate Not Found', 200));
  }

  donate = await Donate.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    donate,
  });
});

// delete an existing donate
exports.deleteDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Donate Not Found', 400));
  }
  const donate = await Donate.findById(req.params.id);
  if (!donate) {
    return next(new ErrorHandler('donate Not Found', 200));
  }
 
  await donate.remove();
  res.status(200).json({
    success: true,
    message: 'donate deleted',
  });
});

// send all donate details
exports.getAllDonates = catchAsyncError(async (req, res) => {
  const donates = await Donate.find();
  const data = donates.map((item, index) => {
    const {
      _id: id,
      iduser,
      idBD,
      name,
      amount,
      typeBlood,
      createdAt
     
    //   staff,
   

      
    } = item;
    const newItem = {
        id,
        iduser,
      idBD,
      name,
      amount,
      typeBlood,
      createdAt
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
  });
});

// send only a single donate detaisl
exports.getSingleDonate = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Donate Not Found', 400));
  }
  var query = { idBD:  req.params.id};
  
  const donate = await Donate.find(query);
  const data = donate.map((item, index) => {
    const {
      _id: id,
      iduser,
      idBD,
      name,
      amount,
      typeBlood,
      createdAt
    //   staff,
   

      
    } = item;
    const newItem = {
        id,
        iduser,
      idBD,
      name,
      amount,
      typeBlood,
      createdAt
    };
    return newItem;
  });
  res.status(200).json({
    success: true,
    data,
    
  });
});

exports.getSingleDonateDetails = catchAsyncError(async (req, res, next) => {
  const donate = await Donate.findById(req.params.id);
  const data = donate.donate;
  res.status(200).json({
    success: true,
    data,
  });
});




exports.Amount = catchAsyncError(async (req, res, next) => {

  var idU =  req.params.id;
  let total =0;
  const donate =await Donate.find();
  const data = donate.map((item, index) => {
    const {
      _id: id,
      iduser,
      amount,

     
    //   staff,
   

      
    } = item;
    const newItem = {
        id,
     iduser,
      amount,
     
    };
   

    if(iduser == idU){
      total= total + amount;
      return total;
    }
 
  
  });
  res.status(200).json({

    total,
    
  });
      
});


exports.getA = catchAsyncError(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler('Donate Not Found', 400));
  }
  var query = { idBD:  req.params.id};
  let total =0;
  const donate = await Donate.find(query);
  const data = donate.map((item, index) => {
    const {
      _id: id,
      iduser,
      idBD,
      name,
      amount,
      typeBlood,
     
    //   staff,
   

      
    } = item;
    const newItem = {
        id,
        iduser,
      idBD,
      name,
      amount,
      typeBlood,
    };
   
    if(typeBlood == "A"){
      total= total + amount;
      return total;
    }
  
  });
  res.status(200).json({

    total,
    
  });
    
  });


  exports.getB = catchAsyncError(async (req, res, next) => {
    if (!req.params.id) {
      return next(new ErrorHandler('Donate Not Found', 400));
    }
    var query = { idBD:  req.params.id};
    let total =0;
    const donate = await Donate.find(query);
    const data = donate.map((item, index) => {
      const {
        _id: id,
        iduser,
        idBD,
        name,
        amount,
        typeBlood,
       
      //   staff,
     
  
        
      } = item;
      const newItem = {
          id,
          iduser,
        idBD,
        name,
        amount,
        typeBlood,
      };
     
      if(typeBlood == "B"){
        total= total + amount;
        return total;
      }
    
    });
    res.status(200).json({
    
      total,
      
    });
      
    });

    exports.getAB = catchAsyncError(async (req, res, next) => {
      if (!req.params.id) {
        return next(new ErrorHandler('Donate Not Found', 400));
      }
      var query = { idBD:  req.params.id};
      let total =0;
      const donate = await Donate.find(query);
      const data = donate.map((item, index) => {
        const {
          _id: id,
          iduser,
          idBD,
          name,
          amount,
          typeBlood,
         
        //   staff,
       
    
          
        } = item;
        const newItem = {
            id,
            iduser,
          idBD,
          name,
          amount,
          typeBlood,
        };
       
        if(typeBlood == "AB"){
          total= total + amount;
          return total;
        }
      
      });
      res.status(200).json({
      
        total,
        
      });
        
      });


      exports.getO = catchAsyncError(async (req, res, next) => {
        if (!req.params.id) {
          return next(new ErrorHandler('Donate Not Found', 400));
        }
        var query = { idBD:  req.params.id};
        let total =0;
        const donate = await Donate.find(query);
        const data = donate.map((item, index) => {
          const {
            _id: id,
            iduser,
            idBD,
            name,
            amount,
            typeBlood,
           
          //   staff,
         
      
            
          } = item;
          const newItem = {
              id,
              iduser,
            idBD,
            name,
            amount,
            typeBlood,
          };
         
          if(typeBlood == "O"){
            total= total + amount;
            return total;
          }
        
        });
        res.status(200).json({
        
          total,
          
        });
          
        });

