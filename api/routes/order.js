const express = require('express');

const router = express.Router();


router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Order was fetched',
    })
})

router.post('/', (req,res,next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(200).json({
        message: 'order was created',
        order: order
    })
})

router.get('/:id', (req,res,next) => {
    const id = req.params.id
    res.status(200).json({
        message: 'Order Detail',
        id
    })
})

router.delete('/:id', (req,res,next) => {
    const id = req.params.id
    res.status(200).json({
        message: 'Order was fetched',
    })
})

module.exports = router;
