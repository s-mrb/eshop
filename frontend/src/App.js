import { Container } from 'react-bootstrap'
import './App.css'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen'
import CartScreen from './screens/CartScreen/CartScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import RegSuccessScreen from './screens/RegSuccessScreen/RegSuccessScreen'
import ProfileScreen from './screens/ProfileScreen/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen/PaymentScreen'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import OrderById from './screens/OrderById/OrderById'
import MyOrders from './screens/MyOrders/MyOrders'
import UsersScreen from './screens/UsersScreen/UsersScreen'
import ProfileByAdminScreen from './screens/ProfileByAdminScreen/ProfileByAdminScreen'
import ProductsScreenAdmin from './screens/ProductsScreenAdmin/ProductsScreenAdmin'
import ProductEditScreen from './screens/ProductEditScreen/ProductEditScreen'
import AddProductScreen from './screens/AddProductScreen/AddProductScreen'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container className='py-3'>
          <Switch>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/rsuccess' component={RegSuccessScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrder} />
            <Route path='/order/:id' component={OrderById} />
            <Route path='/myorders' component={MyOrders} />
            <Route path='/admin/users' component={UsersScreen} exact />
            <Route path='/admin/users/:id' component={ProfileByAdminScreen} />
            <Route
              path='/admin/products/add'
              component={AddProductScreen}
              exact
            />
            <Route
              path='/admin/products/:id'
              component={ProductEditScreen}
              exact
            />
            <Route
              path='/admin/products'
              component={ProductsScreenAdmin}
              exact
            />
            <Route path='/search/:keyword' component={HomeScreen} exact />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
