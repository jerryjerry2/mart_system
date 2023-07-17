const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();


//Login
router.get('/login', authController.signin_get);
router.post('/login', authController.signin_post);

//Register
router.get('/register', authController.signup_get);
router.post('/register', authController.signup_post);

//logout
router.get('/logout', authController.logout);



module.exports = router;