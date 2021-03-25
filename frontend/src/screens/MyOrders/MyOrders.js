import { Row, Container, Col, ListGroup } from 'react-bootstrap'
import Order from '../../components/Order/Order'
import { useSelector, useDispatch } from 'react-redux'
import getMyOrders from '../../Redux/Actions/getMyOrders'
import { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const MyOrders = () => {
  const { myOrders, error, loading } = useSelector((state) => state.myOrders)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!myOrders) {
      dispatch(getMyOrders())
    }
  }, [dispatch, myOrders])
  return (
    <>
      <HelmetTag title='My Orders' />

      <Container className='mt-5'>
        <h1>My Orders</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading ? (
          <Loading />
        ) : (
          <ListGroup variant='flush'>
            <Order header={true} />
            {myOrders &&
              myOrders.map((order, i) => (
                <Order
                  key={order._id}
                  id={order._id}
                  date={order.createdAt.substring(0, 10)}
                  total={order.totalPrice}
                  paid={
                    order.isPaid
                      ? order.paymentResult.update_time.substring(0, 10)
                      : 'X'
                  }
                  delivered={
                    order.isDelivered
                      ? order.deliverResult.update_time.substring(0, 10)
                      : 'X'
                  }
                />
              ))}
          </ListGroup>
        )}
      </Container>
    </>
  )
}

export default MyOrders
