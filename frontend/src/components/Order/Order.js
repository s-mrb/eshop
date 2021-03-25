import { Link } from 'react-router-dom'

const { ListGroup, Col, Row } = require('react-bootstrap')

const Order = ({ id, date, total, paid, delivered, header }) => {
  return (
    <>
      <ListGroup.Item>
        {!header ? (
          <Row className='text-center'>
            <Col sm={3} md={3} lg={3} xl={3}>
              {id}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {date}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {total}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {paid}
            </Col>

            <Col sm={1} md={1} lg={1} xl={1}>
              {delivered}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              <Link to={`/order/${id}`}>Details</Link>
            </Col>
          </Row>
        ) : (
          <Row className='text-center font-weight-bold'>
            <Col sm={3} md={3} lg={3} xl={3}>
              ID
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              DATE
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              TOTAL
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              PAYMENT
            </Col>

            <Col sm={1} md={1} lg={1} xl={1}>
              DELIVERY
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}></Col>
          </Row>
        )}
      </ListGroup.Item>
    </>
  )
}

export default Order
