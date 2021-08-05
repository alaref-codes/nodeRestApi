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


exports.postProduct = (req,res,next) => {
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

}

exports.getProductById = (req,res,next) => {
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
}


exports.updateProduct = (req,res) => {
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
}

exports.deleteProduct = (req,res,next) => {
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
}