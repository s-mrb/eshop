var jwt = require('jsonwebtoken')
var dotnev = require('dotenv')
dotnev.config()
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '10d' })
}

module.exports = generateToken
