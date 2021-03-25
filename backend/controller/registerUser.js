const User = require('../db/models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const exists = await User.findOne({ email: email })
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    const user = await User.create({ name, email, password })
    if (user) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Data')
    }
  }
})

module.exports = registerUser
