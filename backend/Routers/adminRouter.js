const express = require('express')
const adminRouter = express.Router()

const isAdmin = require('../utils/isAdmin')
const getUsers = require('../controller/getUsers')
const verifyToken = require('../utils/verifyToken')
const updateProfileByAdmin = require('../controller/updateProfileByAdmin')
const getProfileByAdmin = require('../controller/getProfileByAdmin')
const updateProduct = require('../controller/updateProduct')
const addProduct = require('../controller/addProduct')
const deleteProduct = require('../controller/deleteProduct')

adminRouter.route('/users').get(verifyToken, isAdmin, getUsers)
adminRouter.route('/users/:id').get(verifyToken, isAdmin, getProfileByAdmin)
adminRouter
  .route('/users/update/:id')
  .post(verifyToken, isAdmin, updateProfileByAdmin)

adminRouter.route('/products/add').post(verifyToken, isAdmin, addProduct)
adminRouter
  .route('/products/delete/:id')
  .post(verifyToken, isAdmin, deleteProduct)
adminRouter
  .route('/products/update/:id')
  .post(verifyToken, isAdmin, updateProduct)

module.exports = adminRouter
