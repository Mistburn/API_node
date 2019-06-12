module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://localhost:27017/shopCenter',
  SECRET_TOKEN: 'SECRET_TOKEN'
}