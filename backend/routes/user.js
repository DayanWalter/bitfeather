const express = require('express');
const router = express.Router();
const user_controller = require('../controller/userController');
// create protected routes
const passport = require('passport');
const protectedRoute = passport.authenticate('jwt', { session: false });

// get all users
router.get('/', protectedRoute, user_controller.readAllUsers);
// get single user
router.get('/:userid', user_controller.readUserById);
// create new user
router.post('/', user_controller.createUser);
// change user
router.put('/:userid', user_controller.updateUser);
// delete user
router.delete('/:userid', user_controller.deleteUser);
// login user
router.post('/login', user_controller.loginUser);
module.exports = router;
