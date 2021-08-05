const express   = require('express');
const mongoose  = require('mongoose');
const checkAuth = require('../auth/check-auth')

const router = express.Router();
const OrderController = require('../controllers/orders')

router.get('/', checkAuth, OrderController.ordersGet )

router.post('/', checkAuth, OrderController.orderCreate );

// QUERY

router.get('/:id', checkAuth, OrderController.orderGetById)

// DELETING

router.delete('/:id', checkAuth, OrderController.orderDelete)

module.exports = router;
