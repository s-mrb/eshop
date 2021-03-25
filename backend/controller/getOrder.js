const Order = require('../db/models/Order')
const asyncHandler = require('express-async-handler')

const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )
  if (order) {
    res.send(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

module.exports = getOrder
