const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product Removed.' })
  } else {
    res.status(404)
    throw new Error('Product not found!')
  }
})

module.exports = deleteProduct
