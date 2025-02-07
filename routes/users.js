var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');


/** 
 * @swagger 
 * /users: 
 *   post: 
 *     summary: API to register new users.
 *     description: Creates a new user by inserting to the database. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             Users:
 *             type: object
 *             properties:
 *               Name:
 *                 description: Name of the user  
 *                 type: String
 *                 exmple: Ludwing Laguna
 *               Password:
 *                 description: Password of the user 
 *                 type: String
 *                 example: setna@123
 *               Gender:
 *                 description: Gender of the user
 *                 type: String
 *                 example: M
 *               DateOfBirth:
 *                 description: DateOfBirth of the user
 *                 type: Date
 *                 example: 04/29/1971
 *     responses:  
 *       201: 
 *         description: Created  
 */ 
router.post('/', userController.registerUser);

/** 
 * @swagger 
 * /login: 
 *   post: 
 *     summary: API to login users.
 *     description: Verify credential of user. 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             Users:
 *             type: object
 *             properties:
 *               UserId:
 *                 description: Id of the user  
 *                 type: String
 *                 exmple: Ludwing
 *               Password:
 *                 description: Password of the user 
 *                 type: String
 *                 example: setna@123
 *     responses:  
 *       200: 
 *         description: Logged  
 */ 
router.post('/login', userController.loginUser);

router.get('/:userId', userController.getUser);

router.post('/booking/:userId/:coachId', userController.createBooking);


module.exports = router;



	

