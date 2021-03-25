const express = require('express')
const orderRouter = express.Router()
const verifyToken = require('../utils/verifyToken')
const addOrder = require('../controller/addOrder')
const myOrders = require('../controller/myOrders')
const getOrder = require('../controller/getOrder')
const setOrderToPaid = require('../controller/setOrderToPaid')

orderRouter.route('/myorders').get(verifyToken, myOrders)
orderRouter.route('/addOrder').post(verifyToken, addOrder)
orderRouter.route('/:id').get(verifyToken, getOrder)
orderRouter.route('/:id/pay').put(verifyToken, setOrderToPaid)

module.exports = orderRouter
