const router = require('express').Router();

const inforController = require('../controllers/inforController');

// send all infor detaisl
router.route('/').get(inforController.getAllInfors);

// send a single Infor
router.route('/:id').get(inforController.getSingleInfor);



module.exports = router;
