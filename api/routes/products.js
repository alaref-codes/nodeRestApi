const express   = require('express');
const mongoose  = require('mongoose');
const router    = express.Router();
const checkAuth = require('../auth/check-auth')

const productController = require('../controllers/products')
router.get('/' , productController.getProduct )


// POST REQUEST

router.post('/' , checkAuth , (req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
    .then( result => {
        res.status(200).json({
            message: 'Handeled post request to /products',
            createdProduct: product
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })

})

// GET REQUEST BY ID 

router.get('/:id' , (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .then(doc => {
        console.log("From database",doc);
        if (doc) {
            res.status(200).json(doc)           
        } else {
            res.status(404).json({message: "No valid entry for that id"})
        }
    })
    .catch(err => {
        res.status(500).json({ error : err })
    })
})

// UPDATE REQUEST
router.patch('/:id' , (req,res) => {
    const id = req.params.id;
    const updateOps = {}; 
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    }
    Product.update({_id : id},  {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
})

// DELETE REQUEST
router.delete('/:id' , checkAuth, (req,res,next) => {
    const id = req.params.id;
    Product.remove({ _id: id})
    .then(result => {
        res.status(200).json({
            result,
            message: "Deletion have been completed"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router;