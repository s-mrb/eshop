import { useEffect } from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import CartItem from '../../components/CartItem/CartItem'
import addOrder from '../../Redux/Actions/addOrder'
import Message from '../../components/Message/Message'
import resetCart from '../../Redux/Actions/resetCart'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const PlaceOrder = ({ history }) => {
  const { user } = useSelector((state) => state.loggedUser)
  const { paymentMethod } = useSelector((state) => state.paymentMethod)
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // Charges
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )

  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const { address, city, postalCode, country } = useSelector(
    (state) => state.shippingAddress
  )

  const dispatch = useDispatch()

  const addedOrder = useSelector((state) => state.addOrder)
  const { order, success, error } = addedOrder

  useEffect(() => {
    if (success) {
      dispatch(resetCart())
      history.push(`/order/${order._id}`)
    }
  }, [history, order, success, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(
      addOrder({
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingAddress: { address, city, postalCode, country },
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  useEffect(() => {
    if (!user || !user.token) {
      // dispatch shipping action for user being verified
      history.push('/login?redirect=shipping')
    }
  }, [history, user])
  return (
    <>
      {!user ? null : (
        <>
          <HelmetTag title='Place Order' />

          <FormContainer>
            <CheckoutSteps one={false} two={false} three={false} four={false} />
          </FormContainer>

          <Container className='mt-5'>
            <Row>
              <Col sm={12} md={8}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>SHIPPING</h3>
                    <div className='ml-3'>
                      <p>{address}</p>
                      <p>
                        {city} {' - '}
                        {postalCode}
                      </p>
                      <p>{country}</p>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='mt-2'>
                    <h3>Payment</h3>
                    <div className='ml-3'>{paymentMethod}</div>
                  </ListGroup.Item>

                  <ListGroup.Item className='mt-2'>
                    <h3>Order Items</h3>
                    <div className='ml-1 mt-4'>
                      {cartItems && cartItems.length ? (
                        <Row>
                          <Col sm={12} md={12} lg={12} xl={12}>
                            {cartItems.map((item) => (
                              <CartItem item={item} key={item.product} />
                            ))}
                          </Col>
                        </Row>
                      ) : (
                        <div>Cart Empty</div>
                      )}
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col>
                <ListGroup className='text-center'>
                  <ListGroup.Item>
                    <h3>Summary</h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className='font-weight-bold'>
                    <Row>
                      <Col>Total</Col>
                      <Col>${cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {error ? (
                    <ListGroup.Item>
                      <Message variant='danger'>{error}</Message>
                    </ListGroup.Item>
                  ) : null}
                  <Button variant='dark' onClick={handleSubmit}>
                    Place Order
                  </Button>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default PlaceOrder
