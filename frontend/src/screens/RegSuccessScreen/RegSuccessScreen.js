import Message from '../../components/Message/Message'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const RegSuccessScreen = () => {
  return (
    <Row>
      <HelmetTag title='Registration Success' />

      <Col sm={12} md={8} l={8} xl={8}>
        <Message variant='success'>
          You are succesfully registered. <Link to='/login'>Login</Link> to
          further explore this awesome site!
        </Message>
      </Col>
    </Row>
  )
}

export default RegSuccessScreen
