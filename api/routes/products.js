const express = require('express');
// const mongoose = require('')

const router = express.Router();


router.get('/' , (req,res,next) => {
    res.status(200).json({
        message: 'Handeled get request to /products'
    })
})

router.post('/' , (req,res,next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: 'Handeled post request to /products',
        createdProduct: product
    })
})

router.get('/:id' , (req,res,next) => {
    const id = req.params.id;
    if (id === 'special') {
        res.status(200).json({
            message: 'The special ID',
            id
        })
    } else {
        res.status(200).json({
            message: 'you Passed an id',
            id
        })
    }
})

router.patch('/:id' , (req,res,next) => {
    res.status(200).json({
        message: 'Updated',
    })
})

router.delete('/:id', (req,res,next) => {
    res.status(200).json({
        message: "Deleted complete",
    })
})

module.exports = router;