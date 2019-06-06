'use strict'

const mongoose = require('mongoose')
const app =  require('./app')
const config = require('./config')

mongoose.connect(config.db, {useNewUrlParser: true}, (err, res) => {
  if(err) {
    return console.error('Error trying to connect to db', err)
  }
  console.log('Connection to db ready to go')

  app.listen(config.port, () => {
    console.log(`API REST working on http://localhost:${config.port}`)
  })
})

