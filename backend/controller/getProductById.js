const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  res.send({ product })
})

module.exports = getProductById
