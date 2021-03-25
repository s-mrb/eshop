import { Button, Col, Form, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Message from '../../components/Message/Message'
import registerUser from '../../Redux/Actions/registerUser'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [inputError, setInputError] = useState('')
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.registration)

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.length || !email.length || !password.length) {
      let fields = !name.length ? 'Name ' : ''
      fields = fields.concat(!email ? 'Email ' : '')
      fields = fields.concat(!password.length ? 'Password' : '')
      setInputError(`Following field(s) are missing: ${fields}`)
    } else {
      setInputError('')
      dispatch(registerUser(name, email, password))
    }
  }

  useEffect(() => {
    if (success) {
      history.push('/rsuccess')
    }
  }, [success, history])

  return (
    <>
      <HelmetTag title='Register to E-Shop' />

      <Row className='mt-5'>
        <Col sm={12} md={6} lg={6} xl={6}>
          {loading && <Loading />}
          {error && <Message variant='danger'>{error}</Message>}
          {inputError && <Message variant='danger'>{inputError}</Message>}
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                onChange={handleName}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter Email'
                onChange={handleEmail}
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                onChange={handlePassword}
              ></Form.Control>
            </Form.Group>

            <div className='text-right' onClick={handleSubmit}>
              <Button variant='dark'>Register</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default RegisterScreen
