const express = require('express');
const proRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/orders');
const morgan = require('morgan');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

const port = 3000;

mongoose.connect('mongodb+srv://Alaref:teCv7CoYMu0zQ96B@cluster0.x0jhx.mongodb.net/shop?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })

app.listen(port , () => {
    console.log("listening at port " + port);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})) // false to just support simple url
app.use(bodyParser.json()); // I don't know why the compiler overlines the bodyParser object

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTION") {
        res.header("Access-Control-Allow-Header" , " PUT , GET , POST , PATCH , DELETE " );
        return res.status(200).json({});
    }
    next();
})

app.use('/products' , proRouter);
app.use('/orders' , orderRouter);

app.use((req,res,next) => {
    const error = new Error('Page Not found');
    error.status = 404;
    next(error);
})

app.use((error,req,res,next) => {
   res.status(error.status || 500);
   res.json({
       error: {
            message: error.message
       }
   }) 
});