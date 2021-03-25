import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer/FormContainer'
import { useSelector, useDispatch } from 'react-redux'
import setPaymentMethod from '../../Redux/Actions/setPaymentMethod'
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const PaymentScreen = ({ history }) => {
  const { user } = useSelector((state) => state.loggedUser)
  const savedPaymentMethod = useSelector((state) => state.paymentMethod)

  const [method, setMethod] = useState(savedPaymentMethod)

  const dispatch = useDispatch()

  const handlePaymentMethod = (e) => {
    setMethod(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(setPaymentMethod(method))
    history.push('/placeorder')
  }

  useEffect(() => {
    if (!user || !user.token) {
      // dispatch shipping action for user being verified
      history.push('/login?redirect=shipping')
    }
  }, [history, user])
  return (
    <>
      <HelmetTag title='Payment' />

      {!user ? null : (
        <FormContainer>
          <CheckoutSteps one={false} two={false} three={false} />
          <Form onSubmit={handleSubmit} className='mt-5'>
            <h1>Payment</h1>

            <Form.Group controlId='paypal' className='mt-3'>
              <Form.Check
                type='radio'
                label='Paypal'
                value='Paypal'
                checked={method === 'Paypal'}
                onChange={handlePaymentMethod}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='easyPaysa'>
              <Form.Check
                type='radio'
                label='Easy Paysa'
                value='Easy Paysa'
                checked={method === 'Easy Paysa'}
                onChange={handlePaymentMethod}
                disabled={true}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='jazzcash'>
              <Form.Check
                type='radio'
                label='Jazz Cash'
                value='Jazz Cash'
                checked={method === 'Jazz Cash'}
                onChange={handlePaymentMethod}
                disabled={true}
              ></Form.Check>
            </Form.Group>

            <Button
              type='submit'
              variant='dark'
              className='mt-3'
              disabled={method.length > 0 ? false : true}
            >
              Continue
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  )
}

export default PaymentScreen
