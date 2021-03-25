const express = require('express')
const dotenv = require('dotenv')
const Connect_DB = require('./db/Connect_DB')
const productRouter = require('./Routers/productRouter')
const userRouter = require('./Routers/userRouter')
const uploadRouter = require('./Routers/uploadRouter')
const orderRouter = require('./Routers/orderRouter')
const Set_CORS = require('./config/Set_CORS')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const path = require('path')
const adminRouter = require('./Routers/adminRouter')
const {
  RouteNotFound,
  ServerError,
} = require('./errorHandlers/routeErrorHandlers')
dotenv.config()
PORT = process.env.PORT
MONGO_URI = process.env.MONGO_URI

Connect_DB(MONGO_URI)

app = express()
app.use(jsonParser)
app.use(Set_CORS)
app.get('/', function (req, res) {
  res.send('API for e-shop app made using MERN')
})

app.use('/products', productRouter)
app.use('/users', userRouter)
app.use('/orders', orderRouter)
app.use('/admin', adminRouter)
app.use('/uploads', uploadRouter)

// const __dirname = path.resolve()
app.use('/public/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(ServerError)
app.use(RouteNotFound)

app.listen(PORT, console.log(`listening on port ${PORT}`))
