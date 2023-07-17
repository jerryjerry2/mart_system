const express = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express();

router.get('/product',  requireAuth, productController.getAll);
router.get('/product/create',  requireAuth, productController.create_get);
router.post('/product/create',  requireAuth, productController.create_post);


module.exports = router;