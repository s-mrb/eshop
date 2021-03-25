import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
const CheckoutSteps = ({ one, two, three, four }) => {
  return (
    <>
      <Nav>
        <Nav.Item>
          <LinkContainer to='/login' disabled={one}>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/shipping' disabled={two}>
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/payment' disabled={three}>
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to='/placeorder' disabled={four}>
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </>
  )
}

CheckoutSteps.defaultProps = { one: true, two: true, three: true, four: true }

export default CheckoutSteps
