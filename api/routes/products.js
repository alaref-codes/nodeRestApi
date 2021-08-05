const express   = require('express');
const mongoose  = require('mongoose');
const router    = express.Router();
const checkAuth = require('../auth/check-auth')

const ProductController = require('../controllers/products')
router.get('/' , ProductController.getProduct )


// POST REQUEST

router.post('/' , checkAuth , ProductController.postProduct )

// GET REQUEST BY ID 

router.get('/:id' , ProductController.getProductById )

// UPDATE REQUEST
router.patch('/:id' , ProductController.updateProduct )

// DELETE REQUEST
router.delete('/:id' , checkAuth, ProductController.deleteProduct )

module.exports = router;