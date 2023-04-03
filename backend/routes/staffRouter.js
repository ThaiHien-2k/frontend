const router = require('express').Router();

const staffController = require('../controllers/staffController');

// send all staff detaisl
router.route('/').get(staffController.getAllStaffs);
router.route('/name').get(staffController.getName);


// send a single Staff
router.route('/:id').get(staffController.getSingleStaff);
router.route('/supTime/:id').get(staffController.getSupTime);


module.exports = router;
