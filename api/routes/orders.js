const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/orders');

const router = express.Router();

// DELETING

router.get('/', (req,res,next) => {
    Order.find()
    .then(docs => {
        console.log(docs);
        res.status(200).json({
            orders: docs
        })
    })
    .catch( err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })
})

// POSTING
router.post('/', (req,res,next) => {
    const order = new Order({
        _id : mongoose.Types.ObjectId(),  // set as a function to auto generate an id
        productId: req.body.productId,
        quantity: req.body.quantity
    })
    
    order.save()
    .then(result => {
        res.status(200).json({
            message: 'Handled post request to /orders models',
            createdOrder: order
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})

// QUERY

router.get('/:id', (req,res,next) => {
    const id = req.params.id
    res.status(200).json({
        message: 'Order Detail',
        id
    })
})

// DELETING

router.delete('/:id', (req,res,next) => {
    const id = req.params.id
    Order.findByIdAndDelete(id)
    .then(result => {
        res.status(200).json({
            message: "Order have been deleted",
            result
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
