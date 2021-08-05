const express   = require('express');
const mongoose  = require('mongoose');
const router    = express.Router();
const checkAuth = require('../auth/check-auth')

const productController = require('../controllers/products')
router.get('/' , productController.getProduct )


// POST REQUEST

router.post('/' , checkAuth , productController.postProduct )

// GET REQUEST BY ID 

router.get('/:id' , productController.getProductById )

// UPDATE REQUEST
router.patch('/:id' , productController.updateProduct )

// DELETE REQUEST
router.delete('/:id' , checkAuth, productController.deleteProduct )

module.exports = router;