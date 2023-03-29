const router = require('express').Router();

const bloodDonateController = require('../controllers/bloodDonateController');

// send all bloodDonate detaisl
router.route('/').get(bloodDonateController.getAllBloodDonates);
router.route('/bloodDonateRemaining').get(bloodDonateController.getBloodDonateRemaining);


// send a single bloodDonate
router.route('/donate/:id').get(bloodDonateController.getSingleBloodDonateDetails);
router.route('/:id').get(bloodDonateController.getSingleBloodDonate);





module.exports = router;
