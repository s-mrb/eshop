const mongoose = require('mongoose')

const Connect_DB = async (MONGO_URI) => {
  try {
    const con = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useCreateIndex: true,
    })

    console.log(`Connected to MONGO server, ${con.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = Connect_DB
