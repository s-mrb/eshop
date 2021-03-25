import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import loginUser from '../../Redux/Actions/loginUser'
import Message from '../../components/Message/Message'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import FormContainer from '../../components/FormContainer/FormContainer'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const LoginScreen = ({ history, location }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, user } = useSelector((state) => state.loggedUser)
  const [inputErrorMessage, setInputErrorMessage] = useState('')
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const handleSubmit = (e) => {
    e.preventDefault()

    // email empty but password not
    if (!email.length && password.length) {
      setInputErrorMessage('You must write your email.')
    }

    // password empty but email not
    else if (!password.length && email.length) {
      setInputErrorMessage('You must write your password.')
    } else if (!password.length && !email.length) {
      setInputErrorMessage('You must write your email and password.')
    } else {
      setInputErrorMessage('')
      dispatch(loginUser(email, password))
    }
  }

  const handleEmailInput = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    if (user && user.token) {
      history.push(redirect)
    }
  }, [user, history, redirect])
  return (
    <>
      <HelmetTag title='Login' />

      <FormContainer>
        {redirect === 'shipping' ? (
          <div className='mb-5'>
            <CheckoutSteps one={false} />
          </div>
        ) : null}

        <Form className='mt-5'>
          <h1>Login</h1>
          <Form.Group>
            {loading && (
              <div className='text-right'>
                <Loading type='ThreeDots' height='20' />
              </div>
            )}
            {inputErrorMessage.length > 0 && (
              <Message variant='warning'>{inputErrorMessage}</Message>
            )}
            {error && <Message variant='danger'>{error}</Message>}
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={handleEmailInput}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={handlePasswordInput}
            />
          </Form.Group>

          <Row>
            <Col sm={12} md={8} lg={8} xl={8}>
              <div>
                New here?
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                >
                  {' '}
                  Register
                </Link>
              </div>
            </Col>

            <Col sm={12} md={4} lg={4} xl={4}>
              <div className='d-flex justify-content-end'>
                <Button variant='dark' onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  )
}

export default LoginScreen
