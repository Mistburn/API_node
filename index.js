'use strict'

const express = require ('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

const ProductCtrl = require('./controllers/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product', ProductCtrl.getProducts)

app.get('/api/product/:productId', ProductCtrl.getProduct)

app.post('/api/product', ProductCtrl.createProduct)

app.put('/api/product/:productId', ProductCtrl.updateProduct)

app.delete('/api/product/:productId', ProductCtrl.deleteProduct)

mongoose.connect('mongodb://localhost:27017/shopCenter', {useNewUrlParser: true}, (err, res) => {
  if(err) {
    return console.error('Error trying to connect to db', err)
  }
  console.log('Connection to db ready to go')

  
  app.listen(port, () => {
    console.log(`API REST working on http://localhost:${port}`)
  })
})

