const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth')

const UserController = require('../controllers/users')

router.get('/' , UserController.getUser )

router.post('/signup' , UserController.createUser )

router.post('/signin' , UserController.signUser )

router.delete('/:id' , checkAuth , UserController.deleteUser )

module.exports = router;
