
const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


router.post('/user', user_controller.user_login);                  // user login route

module.exports = router;
