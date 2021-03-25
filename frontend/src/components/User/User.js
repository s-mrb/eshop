import { Link } from 'react-router-dom'

const { ListGroup, Col, Row } = require('react-bootstrap')

const User = ({ name, email, id, isAdmin, header }) => {
  return (
    <>
      <ListGroup.Item>
        {!header ? (
          <Row className='text-center'>
            <Col sm={3} md={3} lg={3} xl={3}>
              {name}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {email}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {id}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              {isAdmin ? '✓' : 'X'}
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              <Link to={`/admin/users/${id}`}>Update</Link>
            </Col>
          </Row>
        ) : (
          <Row className='text-center font-weight-bold'>
            <Col sm={3} md={3} lg={3} xl={3}>
              NAME
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              EMAIL
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              ID
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}>
              ADMIN
            </Col>

            <Col sm={2} md={2} lg={2} xl={2}></Col>
          </Row>
        )}
      </ListGroup.Item>
    </>
  )
}

export default User
