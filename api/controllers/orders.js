const mongoose  = require('mongoose');

const Order     = require('../models/order');
const Product   = require('../models/product');

exports.ordersGet = (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product' , 'name')
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        prodcut: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost/orders/' + doc._id
                        }
                    }
                })                          
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}

exports.orderCreate = (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) { 
            return res.status(404).json({
                message: "Product not found"
            })
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save() // I don't understand where the ruturn order.save() actually go
    })
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "order stores",
            createdOrder : {
                _id: result._id,
                product: result.product,
                quantity: result.quantity
            },
            request: {
                type: 'GET',
                url: 'http://localhost:3000/' + result._id
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }); 
}

exports.orderGetById = (req,res) => {
    Order.findById(req.params.id)
    .populate('product' , 'name')
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}


exports.orderDelete = (req,res,next) => {
    Order.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(200).json({
            message: "Order deleted",
            result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}