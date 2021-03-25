const User = require('../db/models/User')
const asynHandler = require('express-async-handler')

const getUsers = asynHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.send(users)
  } else {
    res.status(404)
    throw new Error('Users not found')
  }
})

module.exports = getUsers
