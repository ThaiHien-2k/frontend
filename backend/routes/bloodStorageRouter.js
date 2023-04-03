const router = require('express').Router();

const bloodStorageController = require('../controllers/bloodStorageController');

// send all bloodStorage detaisl
router.route('/').get(bloodStorageController.getAllBloodStorages);
router.route('/bloodRemaining').get(bloodStorageController.getBloodRemaining);
router.route('/getBlood').get(bloodStorageController.getBlood);
// send a single BloodStorage
router.route('/:id').get(bloodStorageController.getSingleBloodStorage);



module.exports = router;
