const Order = require('../db/models/Order')

const asyncHandler = require('express-async-handler')
const setOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    ;(order.isPaid = true),
      (order.paidAt = Date.now()),
      (order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      })

    const paidOrder = await order.save()

    res.send(paidOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

module.exports = setOrderToPaid
