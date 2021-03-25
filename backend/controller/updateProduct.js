const Product = require('../db/models/Product')
const asyncHandler = require('express-async-handler')

const updateProduct = asyncHandler(async (req, res) => {
  const _id = req.params.id
  if (!_id) {
    res.status(404)
    throw new Error('User id must be sent!')
  }

  let newData = { ...req.body }

  const oldProduct = await Product.findByIdAndUpdate(_id, newData)
  if (oldProduct) {
    res.send(oldProduct)
  } else {
    res.status(400)
    throw new Error('Invalid Product Data')
  }
})

module.exports = updateProduct
