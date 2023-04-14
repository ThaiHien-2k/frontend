const router = require('express').Router();

const postController = require('../controllers/postController');

// send all post detaisl
router.route('/').get(postController.getAllPosts);


// send a single post
router.route('/:id').get(postController.getSinglePost);



module.exports = router;
