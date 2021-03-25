const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const getTopProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(4)
  res.send(products)
})

module.exports = getTopProduct
