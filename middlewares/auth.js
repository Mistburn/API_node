'use strict'

const services = require('../services')

function isAuth (req, res, next)  {
  if (!req.headers.authorization) return res.status(403).send({ message: `Unauthorized user`})

  const token = req.headers.authorization.split(' ')[1]
  services.decodeToken(token).then((response) => {
    req.user = response
    next()
  }).catch((error) => {
    res.status(error.status)
  })
}

module.exports = {
  isAuth
}