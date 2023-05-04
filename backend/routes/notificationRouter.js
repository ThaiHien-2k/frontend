const router = require('express').Router();

const notificationController = require('../controllers/notificationController');

// send all notification detaisl
router.route('/').get(notificationController.getAllNotifications);


// send a single Notification
router.route('/:id').get(notificationController.getSingleNotification);



module.exports = router;
