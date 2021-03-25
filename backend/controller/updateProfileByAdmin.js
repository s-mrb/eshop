const User = require('../db/models/User')
const asyncHandler = require('express-async-handler')

const updateProfileByAdmin = asyncHandler(async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(404)
    throw new Error('User id must be sent!')
  }
  const { name, email, isAdmin } = req.body

  let newData
  if (name && email && isAdmin !== undefined) {
    newData = { name, email, isAdmin }
  } else if (name && email) {
    newData = { name, email }
  } else if (name && isAdmin !== undefined) {
    newData = { name, isAdmin }
  } else if (email && isAdmin !== undefined) {
    newData = { email, isAdmin }
  } else if (name) {
    newData = { name }
  } else if (email) {
    newData = { email }
  } else if (isAdmin !== undefined) {
    newData = { isAdmin }
  }

  const userWithSameEmail = await User.findOne({ email: email })
  let exists
  if (userWithSameEmail) {
    exists = userWithSameEmail._id == id ? false : true
  }
  if (exists) {
    res.status(400)
    throw new Error('User already exists')
  } else {
    let oldUser = await User.findByIdAndUpdate(id, newData)
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

module.exports = updateProfileByAdmin
