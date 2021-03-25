const User = require('../db/models/User')
const asynHandler = require('express-async-handler')

const getProfile = asynHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.user._id })

  if (user) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

module.exports = getProfile
