var express = require('express');
var router = express.Router();

const coachController = require('../controllers/coachesController');

router.post('/', coachController.registerCoach);


module.exports = router;

