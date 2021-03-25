const express = require('express')
const userRouter = express.Router()
const authUser = require('../controller/authUser')
const getProfile = require('../controller/getProfile')
const verifyToken = require('../utils/verifyToken')
const registerUser = require('../controller/registerUser')
const updateProfile = require('../controller/updateProfile')

/**
 * Route serving specific product.
 * Full path : user/login
 * @name get/
 * @function
 * @memberof module:Routers/userRouter
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
userRouter.route('/login').post(authUser)

userRouter.route('/profile').get(verifyToken, getProfile)

userRouter.route('/updateProfile').post(verifyToken, updateProfile)
userRouter.route('/register').post(registerUser)
module.exports = userRouter
