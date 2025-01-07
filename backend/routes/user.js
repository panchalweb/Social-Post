var express = require('express')
var router = express.Router();
var UC = require('../controller/userController')

/* SignUp */
router.get('/getUser' , UC.getUser)
router.post('/createUser', UC.registerUser);

// Login
router.post('/loginUser' , UC.loginUser)

module.exports = router;
