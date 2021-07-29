const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: { 
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {type: Number}  
});

module.exports = mongoose.model( 'Order', OrderSchema )