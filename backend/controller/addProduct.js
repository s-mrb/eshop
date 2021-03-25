const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    ...req.body,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

module.exports = addProduct
