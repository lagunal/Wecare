var express = require('express');
var router = express.Router();

const bookingController = require('../controllers/bookingController');

router.put('/:bookingId', bookingController.updateBooking);

router.delete('/:bookingId', bookingController.deleteBooking);


module.exports = router;

