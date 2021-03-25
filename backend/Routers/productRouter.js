const express = require('express')
const productRouter = express.Router()
const verifyToken = require('../utils/verifyToken')

const getProduct = require('../controller/getProduct')
const getProductById = require('../controller/getProductById')
const addReview = require('../controller/addReview')
const getTopProducts = require('../controller/getTopProducts')

/**
 * Route serving specific product.
 * Full path : /products
 * @name get/
 * @function
 * @memberof module:Routers/productRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
productRouter.route('/').get(getProduct)
productRouter.route('/top').get(getTopProducts)

productRouter.route('/:id/reviews').post(verifyToken, addReview)

/**
 * Route serving specific product.
 * Full path : /products/:id
 * @name get/:id
 * @function
 * @memberof module:Routers/productRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */

productRouter.route('/:id').get(getProductById)

module.exports = productRouter
