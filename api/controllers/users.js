const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.getUser = (req,res) => {
    User.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(404).json({
            error: err
        })
    })
}

exports.createUser = (req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length > 0) {
            return res.status(409).json({
                message: "Email already have been used",
                user: user
            });
        } else {
            bcrypt.hash(req.body.password, 10 , (err,hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    }); 
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'User have been successfully created'
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
        
                }
            })
        }
    })
}

exports.signUser = (req,res,next) => {
    User.find( {email: req.body.email} )
    .then(user => {
        if(user.length < 1){      // If user doesn't exists                        
            return res.status(401).json({
                message: "Auth failed"
            })
        }  // The following code will be excuted if the user exists
        bcrypt.compare(req.body.password , user[0].password , (err,result) => { // compare the inserted password with the stored password
            if(err) {
                return res.status(401).json({  // This will execute if there is an error in comparing
                    message: "Auth failed",
                    error: err
                });
            }
            if(result) {
                secretKey = "somethingSecrete" // This should be extracted from an environment key or something
                const token = jwt.sign({
                    email: user[0].email,
                    id: user[0]._id,
                },
                "somethingSecrete",
                {expiresIn: "1h" })
                return res.status(200).json({ // This is returned if the password in correct
                    message: "Auth successful",
                    token: token
                });
            }
            res.status(401).json({   // This is returned if the password in incorrect
                message: "Auth failed , the password isn't correct",
                error: err
            });
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.deleteUser = (req,res) => {
    const id = req.params.id
    User.find({_id : id})
    .then(user => {
        if (user.length == 0) {
            return res.status(404).json({
                message: "User doesn't exist"
            })
        } else {
            User.remove({_id : id})
            .then(result => {
                res.status(200).json({
                    message: "Delete successfully",
                    result
                })
            })
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}