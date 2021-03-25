import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import saveShippingAddress from '../../Redux/Actions/saveShippingAddress'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const ShippingScreen = ({ history }) => {
  const { user } = useSelector((state) => state.loggedUser)
  const shippingAddress = useSelector((state) => state.shippingAddress)

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.city)

  const dispatch = useDispatch()

  const handleAddress = (e) => {
    setAddress(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handlePostalCode = (e) => {
    setPostalCode(e.target.value)
  }
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let shippingAddress = { address, city, postalCode, country }
    dispatch(saveShippingAddress(shippingAddress))
    history.push('/payment')
  }

  useEffect(() => {
    if (!user || !user.token) {
      // dispatch shipping action for user being verified
      history.push('/login?redirect=shipping')
    }
  }, [history, user])
  return (
    <>
      <HelmetTag title='Shipping' />

      {!user ? null : (
        <FormContainer>
          <CheckoutSteps one={false} two={false} />
          <Form onSubmit={handleSubmit} className='mt-5'>
            <h1>Shipping</h1>

            <Form.Group controlId='address'>
              <Form.Label>Address </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Address'
                value={address}
                required
                onChange={handleAddress}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='city'>
              <Form.Label>City </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter City'
                value={city}
                required
                onChange={handleCity}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='postalCode'>
              <Form.Label>Postal Code </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={handlePostalCode}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='country'>
              <Form.Label>Country </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Country'
                value={country}
                required
                onChange={handleCountry}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark'>
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default ShippingScreen
