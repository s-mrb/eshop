import { Link } from 'react-router-dom'
import addToCart from '../../Redux/Actions/addToCart'
import { useDispatch } from 'react-redux'
import deleteFromCart from '../../Redux/Actions/deleteFromCart'
const { ListGroup, Row, Col, Image, Form, Button } = require('react-bootstrap')

const CartItem = ({ item, fixed, order }) => {
  const dispatch = useDispatch()

  const handleItemDelete = () => {
    dispatch(deleteFromCart(item.product))
  }
  return (
    <ListGroup variant='flush'>
      <ListGroup.Item>
        <Row>
          <Col sm={2} md={2} lg={2} xl={2}>
            <Link to={`/product/${item.product}`}>
              <Image
                src={item ? item.image : null}
                alt={item ? item.name : null}
                fluid
              ></Image>
            </Link>
          </Col>

          <Col sm={4} md={4} lg={4} xl={4}>
            <Link to={`/product/${item.product}`}>
              {item ? item.name : null}
            </Link>
          </Col>
          <Col sm={2} md={2} lg={2} xl={2}>
            ${item ? item.price : null}
          </Col>
          <Col sm={2} md={2} lg={2} xl={2}>
            <Form.Control
              as='select'
              disabled={fixed}
              onChange={(e) => {
                dispatch(addToCart(item.product, Number(e.target.value)))
              }}
              defaultValue={item ? item.qty : 0}
            >
              {[...Array(item.countInStock)].map((e, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                  defaultValue={item ? item.qty : 0}
                >
                  {order ? item.qty : i + 1}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col sm={1} md={1} lg={1} xl={1}>
            <Button variant='light' onClick={handleItemDelete} disabled={fixed}>
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  )
}
CartItem.setDefaultProps = {
  fixed: false,
  order: false,
}
export default CartItem
