const router = require('express').Router();

const adminController = require('../controllers/adminController');

const bloodStorageController = require('../controllers/bloodStorageController');
const staffController = require('../controllers/staffController');
const commentController = require('../controllers/commentController');
const postController = require('../controllers/postController');
const bookingController = require('../controllers/bookingController');
const notificationController = require('../controllers/notificationController');
const inforController = require('../controllers/inforController');
const cashFlowController = require('../controllers/cashFlowController');
const bloodDonateController = require('../controllers/bloodDonateController')

const donateController = require('../controllers/donateController')

const auth = require('../middleware/Auth');

router.route('/auth').post(adminController.sendCurrentUser);

// register new admin
router
  .route('/register')
  .post(
    // auth.checkUserAuthentication,
    // auth.checkAdminPrivileges('admin'),
    adminController.registerAdmin
  );

// login admin
router.route('/login').post(adminController.loginAdmin);

// logout admin
router.route('/logout').get(adminController.logoutAdmin);

// get all admin details
router
  .route('/users')
  .get(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    adminController.getAllAdminDetails
  );
  

// get single admin details
router
  .route('/users/:id')
  .get(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    adminController.getSingleAdminDetails
  )
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    adminController.updateAdminPrivilege
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    adminController.deleteAdmin
  );
// create a new Staff
router
  .route('/staff/new')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    staffController.createStaff
  );


// send, update, delete a single Staff
router
  .route('/staff/:id')
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    staffController.updateStaff
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    staffController.deleteStaff
  );


// create a new comment
router
  .route('/comment/new')
  .post(
    // auth.checkUserAuthentication,
    // auth.checkAdminPrivileges('admin'),
    commentController.createComment
  );


// send, update, delete a single Comment
router
  .route('/comment/:id')
  .put(
    // auth.checkUserAuthentication,
    // auth.checkAdminPrivileges( 'admin'),
    commentController.updateComment
  )
  .delete(
    // auth.checkUserAuthentication,
    // auth.checkAdminPrivileges( 'admin'),
    commentController.deleteComment
  );

// cashflow
router
  .route('/cashFlow/new')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    cashFlowController.createCashFlow
  );


// send, update, delete a single CashFlow
router
  .route('/cashFlow/:id')
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    cashFlowController.updateCashFlow
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    cashFlowController.deleteCashFlow
  );



// create a new donate
router
  .route('/donate/new')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin','staff'),
    donateController.createDonate
  );


// send, update, delete a single Donate
router
  .route('/donate/:id')
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    donateController.updateDonate
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    donateController.deleteDonate
  );
  

  // create a new bloodDonate
router
.route('/bloodDonate/new')
.post(
  auth.checkUserAuthentication,
  auth.checkAdminPrivileges( 'admin'),
  bloodDonateController.createBloodDonate
);


// send, update, delete a single BloodDonate
router
.route('/bloodDonate/:id')
.put(
  auth.checkUserAuthentication,
  auth.checkAdminPrivileges( 'admin'),
  bloodDonateController.updateBloodDonate
)
.delete(
  auth.checkUserAuthentication,
  auth.checkAdminPrivileges( 'admin'),
  bloodDonateController.deleteBloodDonate
);


  // create a new infor
router
.route('/infor/new')
.post(
  // auth.checkUserAuthentication,
  // auth.checkAdminPrivileges('admin'),
  inforController.createInfor
);


// send, update, delete a single Infor
router
.route('/infor/:id')
.put(
  // auth.checkUserAuthentication,
  // auth.checkAdminPrivileges( 'admin'),
  inforController.updateInfor
)
.delete(
  auth.checkUserAuthentication,
  auth.checkAdminPrivileges( 'admin','staff'),
  inforController.deleteInfor
);

// create a new bloodStorage
router
  .route('/bloodStorage/new')
  .post(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges('admin'),
    bloodStorageController.createBloodStorage
  );


// send, update, delete a single BloodStorage
router
  .route('/bloodStorage/:id')
  .put(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    bloodStorageController.updateBloodStorage
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    bloodStorageController.deleteBloodStorage
  );


  // create a new post
router
.route('/post/new')
.post(
 
  postController.createPost
);


// send, update, delete a single Post
router
.route('/post/:id')
.put(
  
  postController.updatePost
)
.delete(
  auth.checkUserAuthentication,
  auth.checkAdminPrivileges( 'admin'),
  postController.deletePost
);




  // create a new notification
  router
  .route('/notification/new')
  .post(
   
    notificationController.createNotification
  );
  
  
  // send, update, delete a single Notification
  router
  .route('/notification/:id')
  .put(
    
    notificationController.updateNotification
  )
  .delete(
    auth.checkUserAuthentication,
    auth.checkAdminPrivileges( 'admin'),
    notificationController.deleteNotification
  );

  // create a new booking
  router
  .route('/booking/new')
  .post(
   
    bookingController.createBooking
  );
  
  
  // send, update, delete a single Booking
  router
  .route('/booking/:id')
  .put(
    
    bookingController.updateBooking
  )
  .delete(

    bookingController.deleteBooking
  );


module.exports = router;
