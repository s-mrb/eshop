import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import logoutUser from '../../Redux/Actions/logoutUser'
import SearchBar from '../SearchBar/SearchBar'
import { Route } from 'react-router-dom'

const Header = () => {
  const { user } = useSelector((state) => state.loggedUser)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <Navbar bg='dark' expand='lg' variant='dark'>
      <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>E-SHOP</Navbar.Brand>
        </LinkContainer>
        <Route render={({ history }) => <SearchBar history={history} />} />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i>Cart
              </Nav.Link>
            </LinkContainer>

            {user && user._id ? (
              <NavDropdown title={user.name}>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/myreviews'>
                  <NavDropdown.Item>My Reviews</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/' onClick={logoutHandler}>
                  <NavDropdown.Item>Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user-lock'></i>Sign In
                </Nav.Link>
              </LinkContainer>
            )}

            {user && user.isAdmin && (
              <NavDropdown title='Admin'>
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to='/admin/broadcast'>
                  <NavDropdown.Item>Broadcast</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
