const router = require('express').Router();

const commentController = require('../controllers/commentController');

// send all comment detaisl
router.route('/').get(commentController.getAllComments);
// router.route('/name').get(commentController.getName);


// send a single Staff
router.route('/:id').get(commentController.getSingleComment);
// router.route('/supTime/:id').get(commentController.getSupTime);


module.exports = router;
