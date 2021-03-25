import { combineReducers } from 'redux'
import productListReducer from './productListReducer'
import productDetailReducer from './productDetailReducer'
import cartReducer from './CartReducer'
import userLoginReducer from './userLoginReducer'
import registerUserReducer from './registerUser'
import profileReducer from './profileReducer'
import profileUpdateReducer from './profileUpdateReducer'
import ShippingReducer from './ShippingReducer'
import paymentMethod from './paymentMethodReducer'
import addOrderReducer from './addOrderReducer'
import orderByIdReducer from './orderByIdReducer'
import payOrderReducer from './paymentMethodReducer'
import myOrdersReducer from './myOrdersReducer'
import usersReducer from './usersReducer'
import profileUpdateByAdminReducer from './profileUpdateByAdminReducer'
import profileByAdminReducer from './profileByAdminReducer'
import updateProductReducer from './updateProductReducer'
import addProductReducer from './addProductReducer'
import deleteProductReducer from './deleteProductReducer'
import addReviewReducer from './addReviewReducer'
import topProductsReducer from './topProductsReducer'
const reducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  loggedUser: userLoginReducer,
  registration: registerUserReducer,
  profile: profileReducer,
  profile_update: profileUpdateReducer,
  shippingAddress: ShippingReducer,
  paymentMethod: paymentMethod,
  addOrder: addOrderReducer,
  orderById: orderByIdReducer,
  payOrder: payOrderReducer,
  myOrders: myOrdersReducer,
  users: usersReducer,
  profileByAdmin: profileByAdminReducer,
  profileUpdateByAdmin: profileUpdateByAdminReducer,
  updateProduct: updateProductReducer,
  addProduct: addProductReducer,
  deleteProduct: deleteProductReducer,
  addReview: addReviewReducer,
  topProducts: topProductsReducer,
})

export default reducer
