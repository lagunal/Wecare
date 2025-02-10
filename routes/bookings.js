var express = require('express');
var router = express.Router();

const bookingController = require('../controllers/bookingController');

router.put('/:bookingId', bookingController.updateBooking);

module.exports = router;

