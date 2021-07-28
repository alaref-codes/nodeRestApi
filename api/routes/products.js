const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../models/product');

router.get('/' , (req,res,next) => {
    Product.find()// you can append find.SomeMethod to the find method to get a specific query like limitnig the result or something
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err})
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
    .then(doc => {
        console.log("From database",doc);
        if (doc) {
            res.status(200).json(doc)           
        } else {
            res.status(404).json({message: "No valud entry for that id"})
        }
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