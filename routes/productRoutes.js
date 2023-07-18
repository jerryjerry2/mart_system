const express = require('express');
const productController = require('../controllers/productController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express();

router.get('/product',  requireAuth, productController.getAll);

//create
router.get('/product/create',  requireAuth, productController.create_get);
router.post('/product/create',  requireAuth, productController.create_post);

//Edit
router.get('/product/edit/:id', productController.edit_get);
router.post('/product/edit/', productController.edit_post);


module.exports = router;