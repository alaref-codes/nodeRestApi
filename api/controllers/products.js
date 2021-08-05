const Product = require('../models/product');

exports.getProduct = (req,res,next) => {
    Product.find()// you can append find.SomeMethod to the find method to get a specific query like limitnig the result or something
    .select('name price _id') // to select a specific columns 
    .then(docs => {
        const response = {
            count: docs.length,
            product: docs.map(function(doc) {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            }) 
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
}