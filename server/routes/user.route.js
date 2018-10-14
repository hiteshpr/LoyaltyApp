
const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');


router.get('/getAllDetails', user_controller.get_all_details);                  // get all user's details route

module.exports = router;
