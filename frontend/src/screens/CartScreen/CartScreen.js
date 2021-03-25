import React from 'react'
import { Col, ListGroup, Row, Button } from 'react-bootstrap'
import CartItem from '../../components/CartItem/CartItem'
import { useSelector } from 'react-redux'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const CartScreen = ({ history }) => {
  const { cartItems } = useSelector((state) => state.cart)
  const CheckOutHandler = () => {
    history.push('/login?redirect=shipping')
  }
  return (
    <>
      <HelmetTag title='My Cart' />

      <h1>SHOPPING CART</h1>

      {cartItems && cartItems.length ? (
        <Row>
          <Col sm={12} md={8} lg={8} xl={8}>
            {cartItems.map((item) => (
              <CartItem item={item} key={item.product} />
            ))}
          </Col>
          <Col className='ml-2' style={{ paddingRight: '0' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  <Col>
                    Subtotal{' '}
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                  </Col>
                </h3>
                ${' '}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn-block'
                  variant='dark'
                  onClick={CheckOutHandler}
                >
                  Proceed to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      ) : (
        <div>Cart Empty</div>
      )}
    </>
  )
}

export default CartScreen
