import React from 'react'
import { Container, Row, Col, Navbar } from 'react-bootstrap'
const Footer = () => {
  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container className='justify-content-center'>
        <Row>
          <Col className='text-center mt-3 mb-3'>Copyright &copy; Mehdi</Col>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Footer
