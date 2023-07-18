const express = require('express');
const orderController = require('../controllers/orderController');

const router = express();

//Read
router.get('/order', orderController.getAll);

module.exports = router;