const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express();

router.get('/category', categoryController.getAll);

router.get('/category/create', categoryController.create_get);
router.post('/category/create', categoryController.create_post);

module.exports = router;