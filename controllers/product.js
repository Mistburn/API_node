'use strict'

const Product = require('../models/product')

function getProduct(req, res) {
  const productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({ message: `Error in the request to get product by id ${err}`})

    if(!product) return res.status(404).send({ message: `Product doesn't exist`})

    res.status(200).send({ product })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if(err) return res.status(500).send({ message: `Error in the request to get products ${err}`})

    if(!products) return res.status(404).send({ message: `Products don't exist`})

    res.status(200).send({products})
  })
}

function updateProduct(req, res) {
  const productId = req.params.productId
  const productUpdated = req.body
  Product.findByIdAndUpdate(productId, productUpdated, (err, product) => {
    if(err) return res.status(500).send({message: `Error trying to update product on db ${err}`})

    res.status(200).send({ product })
  })
}

function deleteProduct(req, res) {
  const productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: `Error trying to delete product on db ${err}`})
    
    product.remove((err) => {
      if(err) return res.status(500).send({message: `Error trying to delete product on db ${err}`})
    })

    res.status(200).send({message:`Product with id ${productId} has been deleted`})
  })
}

function createProduct(req, res) {
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
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct
}