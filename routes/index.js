'use strict'

const express = require('express')
const api =  express.Router()
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const auth =  require('../middlewares/auth')

api.get('/product',  auth.isAuth, productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.createProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/private', auth.isAuth, (req, res) => {
  res.status(200).send({message: `Authorized user`})
})

module.exports = api