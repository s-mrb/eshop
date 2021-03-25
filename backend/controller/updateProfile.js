const User = require('../db/models/User')
const asyncHandler = require('express-async-handler')

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  let newData
  if (name && email && password) {
    newData = { name, email, password }
  } else if (name && email) {
    newData = { name, email }
  } else if (name && password) {
    newData = { name, password }
  } else if (email && password) {
    newData = { email, password }
  } else if (name) {
    newData = { name }
  } else if (email) {
    newData = { email }
  } else if (password) {
    newData(password)
  }

  const userWithSameEmail = await User.findOne({ email: email })
  let exists

  if (userWithSameEmail) {
    exists = userWithSameEmail._id === req.user._id
  }
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    let oldUser = await User.findByIdAndUpdate(req.user._id, newData)
    if (oldUser) {
      res.send({
        _id: oldUser._id,
        name: oldUser.name,
        email: oldUser.email,
        isAdmin: oldUser.isAdmin,
      })
    } else {
      res.status(400)
      throw new Error('Invalid User Data')
    }
  }
})

module.exports = updateProfile
