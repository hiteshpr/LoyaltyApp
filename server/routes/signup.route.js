
const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


router.post('/user', user_controller.user_create);                  // user create route

module.exports = router;
