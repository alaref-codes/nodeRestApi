const jwt = require('jsonwebtoken')

module.exports = (req,res,next) => {

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token , "somethingSecrete");
        req.userData = decoded; // Adding a new field to my request, NOTE : make sure that you don't overried an exisisted attribute
        next()
    } catch (error) {
        res.status(401).json({
            message: "Auth failed",
        })
    }

}