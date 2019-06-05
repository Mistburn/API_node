'use strict'

const express = require ('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

const Product = require('./models/product')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/product', (req, res) => {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: `Error in the request to get products ${err}`})

    if(!products) return res.status(404).send({ message: `Products don't exist`})

    res.status(200).send({products})

  })
})

app.get('/api/product/:productId', (req, res) => {
  const productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error in the request to get product by id ${err}`})

    if(!product) return res.status(404).send({ message: `Product doesn't exist`})

    res.status(200).send({ product })
  })


})

app.post('/api/product', (req, res) => {
  console.log('POST /api/product', req.body)
  let product = new Product();
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err) {
      res.status(500).send({message: `Error trying to save product on db ${err}`})
    }

    res.status(200).send({product: productStored})
  })
})

app.put('/api/product/:productId', (req, res) => {
  const productId = req.params.productId
  const productUpdated = req.body
  Product.findByIdAndUpdate(productId, productUpdated, (err, product) => {
    if(err) return res.status(500).send({message: `Error trying to update product on db ${err}`})

    res.status(200).send({ product })
  })
  
})

app.delete('/api/product/:productId', (req, res) => {
  const productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error trying to delete product on db ${err}`})
    
    product.remove((err) => {
      if(err) return res.status(500).send({message: `Error trying to delete product on db ${err}`})
    })

    res.status(200).send({message:`Product with id ${productId} has been deleted`})

  })
})


mongoose.connect('mongodb://localhost:27017/shopCenter', {useNewUrlParser: true}, (err, res) => {
  if(err) {
    return console.error('Error trying to connect to db', err)
  }
  console.log('Connection to db ready to go')

  
  app.listen(port, () => {
    console.log(`API REST working on http://localhost:${port}`)
  })
})

