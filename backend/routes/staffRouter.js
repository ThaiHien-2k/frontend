const router = require('express').Router();

const staffController = require('../controllers/staffController');

// send all staff detaisl
router.route('/').get(staffController.getAllStaffs);

// send a single Staff
router.route('/:id').get(staffController.getSingleStaff);



module.exports = router;
