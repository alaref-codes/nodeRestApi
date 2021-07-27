const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');

router.get('/' , (req,res,next) => {
    res.status(200).json({
        message: 'Handeled get request to /products'
    })
})

// POST REQUEST

router.post('/' , (req,res,next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save().then( result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
    res.status(200).json({
        message: 'Handeled post request to /products',
        createdProduct: product
    })
})

// GET REQUEST BY ID 

router.get('/:id' , (req,res,next) => {
    const id = req.params.id;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)           
    })
    .catch(err => {
        res.status(500).json({ error : err })
    })
})

// UPDATE REQUEST
router.patch('/:id' , (req,res,next) => {
    res.status(200).json({
        message: 'Updated',
    })
})

// DELETE REQUEST

router.delete('/:id', (req,res,next) => {
    res.status(200).json({
        message: "Deleted complete",
    })
})

module.exports = router;