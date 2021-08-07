const express   = require('express');
const mongoose  = require('mongoose');
const router    = express.Router();
const checkAuth = require('../auth/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, './uploads')
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString() + file.originalname );
    }
})

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true); // you can replace the null value by sending a success message or something
    } else {
        cb(null, false); // you can replace the null value by throwing an error for example OR you leave it empty and it will not store the file if the condition fails
    }
}

const upload = multer({storage: storage , limits: {
    fileSize: 1024 * 1024 * 5
}});

const ProductController = require('../controllers/products')
router.get('/' , ProductController.getProduct )


// POST REQUEST

router.post('/' , checkAuth , upload.single('productImage') , ProductController.postProduct )

// GET REQUEST BY ID 

router.get('/:id' , ProductController.getProductById )

// UPDATE REQUEST
router.patch('/:id' , ProductController.updateProduct )

// DELETE REQUEST
router.delete('/:id' , checkAuth, ProductController.deleteProduct )

module.exports = router;