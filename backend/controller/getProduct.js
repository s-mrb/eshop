const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const getProduct = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
  let products
  if (keyword) {
    products = await Product.find({ name: { $regex: keyword, $options: 'i' } })
  } else {
    products = await Product.find({})
  }
  res.send({ products })
})

module.exports = getProduct
