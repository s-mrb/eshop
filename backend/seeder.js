const mongoose = require('mongoose')
const dotenv = require('dotenv')

const users = require('./data/users')
const { products } = require('./data/products')
const User = require('./db/models/User')
const Product = require('./db/models/Product')
const Order = require('./db/models/Order')
const Connect_DB = require('./db/Connect_DB')
dotenv.config()

Connect_DB(process.env.MONGO_URI)

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)
    console.log('Data imported')
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log(`Data destroyed`)
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
