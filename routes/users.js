var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');


/* POST Register users . */
router.post('/', userController.registerUser);


module.exports = router;



	

