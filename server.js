const express = require('express');
const app = express();
const proRouter = require('./api/routes/products');
const orderRouter = require('./api/routes/order');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const port = 3000;

app.listen(port , () => {
    console.log("listening at port " + port);
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false})) // false to just support simple url
app.use(bodyParser.json());


app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin' , '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === "OPTION") {
        res.header("Access-Control-Allow-Header" , "PUT,GET,POST,PATCH,DELETE" );
        return res.status(200).json({});
    }
    next();
})


app.use('/products' , proRouter);
app.use('/order' , orderRouter);

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
