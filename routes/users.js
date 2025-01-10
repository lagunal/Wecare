var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');


/** 
 * @swagger 
 * /notes: 
 *   post: 
 *     summary: API to register new users.
 *     description: Creates a new user by inserting to the database. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 description: Name of the user  
 *                 type: String
 *                 example: Ludwing Laguna
 *           
 *     responses:  
 *       201: 
 *         description: Created  
 */ 
router.post('/', userController.registerUser);


module.exports = router;



	

