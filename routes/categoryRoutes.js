const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express();

//Read
router.get('/category', categoryController.getAll);

//Create
router.get('/category/create', categoryController.create_get);
router.post('/category/create', categoryController.create_post);

//Delete
router.get('/delete/:id/:img', categoryController.deleteRow);

//Edit
router.get('/category/edit/:id', categoryController.edit_get);
router.post('/category/edit/', categoryController.edit_post);

module.exports = router;