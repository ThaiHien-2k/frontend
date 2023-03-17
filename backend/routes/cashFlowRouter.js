const router = require('express').Router();

const cashFlowController = require('../controllers/cashFlowController');

// send all cashFlow detaisl
router.route('/').get(cashFlowController.getAllCashFlows);

router.route('/totalRemaining').get(cashFlowController.getCashFlowRemaining);


// send a single cashFlow
router.route('/:id').get(cashFlowController.getSingleCashFlow);




module.exports = router;
