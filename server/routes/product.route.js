
const express = require('express');
const router = express.Router();

const product_controller = require('../controllers/product.controller');


router.post('/add', product_controller.add);                  // product create route
router.get('/getAll', product_controller.get);

module.exports = router;