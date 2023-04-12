const router = require('express').Router();

const donateController = require('../controllers/donateController');

// send all donate detaisl
router.route('/').get(donateController.getAllDonates);




// send a single Donate
router.route('/donate/:id').get(donateController.getSingleDonateDetails);
router.route('/:id').get(donateController.getSingleDonate);
router.route('/amount/:id').get(donateController.Amount);
router.route('/A/:id').get(donateController.getA);
router.route('/B/:id').get(donateController.getB);
router.route('/AB/:id').get(donateController.getAB);
router.route('/O/:id').get(donateController.getO);




module.exports = router;
