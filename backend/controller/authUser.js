const User = require('../db/models/User')
const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken')
const authUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const { password } = req.body

  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

module.exports = authUser
