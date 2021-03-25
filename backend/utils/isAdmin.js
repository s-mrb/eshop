const jwt = require('jsonwebtoken')
const User = require('../db/models/User')
const asyncHandler = require('express-async-handler')
const dotenv = require('dotenv')
dotenv.config()
const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized, not admin')
  }
})
module.exports = isAdmin
