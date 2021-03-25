const Order = require('../db/models/Order')
const asyncHandler = require('express-async-handler')

const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.send(orders)
})

module.exports = myOrders
