const router = require('express').Router();

const bookingController = require('../controllers/bookingController');

// send all booking detaisl
router.route('/').get(bookingController.getAllBookings);


// send a single Booking
router.route('/:id').get(bookingController.getSingleBooking);



module.exports = router;
