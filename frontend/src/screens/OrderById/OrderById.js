import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartItem from '../../components/CartItem/CartItem'
import getOrderById from '../../Redux/Actions/getOrderById'
import Message from '../../components/Message/Message'
import payOrder from '../../Redux/Actions/payOrder'
import { PayPalButton } from 'react-paypal-button-v2'
import { Col, Container, ListGroup, Row } from 'react-bootstrap'
import Loading from '../../components/Loading/Loading'
import resetOrderById from '../../Redux/Actions/resetOrderById'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const PlaceOrder = ({ history, match }) => {
  const { loading, orderById, error } = useSelector((state) => state.orderById)

  const { user: loggedUser } = useSelector((state) => state.loggedUser)
  const payOrderState = useSelector((state) => state.payOrder)

  // eslint-disable-next-line
  const { loading: loadingPay, success: successPay } = payOrderState

  // eslint-disable-next-line
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  // Charges
  //   itemsPrice = addDecimals(itemsPrice)

  //   shippingPrice = addDecimals(shippingPrice)
  //   taxPrice = addDecimals(taxPrice)

  const dispatch = useDispatch()
  const cleanUp = () => {}

  useEffect(() => () => dispatch(resetOrderById()), [dispatch])

  useEffect(() => {
    if (loggedUser && loading) {
      dispatch(getOrderById(match.params.id))
    }
  }, [dispatch, match, loading, loggedUser])

  //   called by paypal server
  const handleSuccess = (paymentResult) => {
    dispatch(payOrder(match.params.id, paymentResult))
  }

  return (
    <>
      <HelmetTag title='Order Info' />

      {error && <Message variant='danger'>{error}</Message>}
      {loading && (
        <div
          className='d-flex justify-content-center'
          style={{
            paddingTop: '30vh',
          }}
        >
          <Loading />
        </div>
      )}
      {!orderById ? null : (
        <>
          <Container className='mt-5'>
            <Row>
              <Col sm={12} md={8}>
                <h1>Order {orderById._id}</h1>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>SHIPPING</h3>
                    <div className='ml-3'>
                      <p>Name: {orderById.user.name}</p>
                      <p>Email: {orderById.user.email}</p>

                      <p>
                        Address: {orderById.shippingAddress.address}
                        {', '}
                        {orderById.shippingAddress.city}
                        {' - '}
                        {orderById.shippingAddress.postalCode}
                        {', '}
                        {orderById.shippingAddress.country}
                      </p>

                      <Message
                        variant={orderById.isPaid ? 'success' : 'warning'}
                      >
                        {' '}
                        {orderById.isDelivered
                          ? 'Item has been delivered'
                          : 'Delivery is Pending'}
                      </Message>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='mt-2'>
                    <h3>Payment</h3>
                    <div className='ml-3'>
                      <Message
                        variant={orderById.isPaid ? 'success' : 'warning'}
                      >
                        Payment is{' '}
                        {orderById.isPaid ? 'received' : 'not received'}
                      </Message>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='mt-2'>
                    <h3>Order Items</h3>
                    <div className='ml-1 mt-4'>
                      <Row>
                        <Col sm={12} md={12} lg={12} xl={12}>
                          {orderById.orderItems.map((item) => (
                            <CartItem
                              item={item}
                              fixed={true}
                              key={item.product}
                              order={true}
                            />
                          ))}
                        </Col>
                      </Row>
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
                      <Col>${orderById.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${orderById.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${orderById.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item className='font-weight-bold'>
                    <Row>
                      <Col>Total</Col>
                      <Col>${orderById.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  {error ? (
                    <ListGroup.Item>
                      <Message variant='danger'>{error}</Message>
                    </ListGroup.Item>
                  ) : null}
                  <ListGroup.Item>
                    {!orderById.isPaid ? (
                      <PayPalButton
                        amount={orderById.totalPrice}
                        onSuccess={handleSuccess}
                      />
                    ) : null}
                  </ListGroup.Item>
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
