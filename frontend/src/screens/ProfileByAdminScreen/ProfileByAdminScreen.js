import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import { useEffect, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import getProfileByAdmin from '../../Redux/Actions/getProfileByAdmin'
import updateUserProfileByAdmin from '../../Redux/Actions/updateUserProfileByAdmin'
import deleteStoredProfileByAdmin from '../../Redux/Actions/deleteStoredProfileByAdmin'
import HelmetTag from '../../components/HelmetTag/HelmetTag'
const ProfileByAdminScreen = ({ history, match }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(undefined)
  const [inputErrorMessage, setInputErrorMessage] = useState('')

  const id = match.params.id
  const { loading, profile, error } = useSelector(
    (state) => state.profileByAdmin
  )

  const { update_loading, update_success, update_error } = useSelector(
    (state) => state.profileUpdateByAdmin
  )

  const { user } = useSelector((state) => state.loggedUser)
  const dispatch = useDispatch()

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleIsAdmin = (e) => {
    setIsAdmin(!isAdmin)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email.length && name.length) {
      setInputErrorMessage('Email is required!')
    }

    // password empty but email not
    else if (!name.length && email.length) {
      setInputErrorMessage('Name is required!')
    } else if (!name.length && !email.length) {
      setInputErrorMessage('Name and Email are required')
    } else {
      setInputErrorMessage('')

      if (user && user.isAdmin) {
        let newData
        if (name.length && email.length && isAdmin !== undefined) {
          newData = { name, email, isAdmin }
        } else if (name.length && email.length) {
          newData = { name, email }
        } else if (name.length && isAdmin !== undefined) {
          newData = { name, isAdmin }
        } else if (email.length && isAdmin !== undefined) {
          newData = { email, isAdmin }
        } else if (name.length) {
          newData = { name }
        } else if (email.length) {
          newData = { email }
        } else if (isAdmin !== undefined) {
          newData = { isAdmin }
        }

        dispatch(updateUserProfileByAdmin(id, newData))
      }
    }
  }

  useEffect(() => {
    if (user && user.token && profile) {
      setName(profile.name)
      setEmail(profile.email)
      setIsAdmin(profile.isAdmin)
    }
  }, [profile, user])
  useEffect(() => () => dispatch(deleteStoredProfileByAdmin()), [dispatch])

  useEffect(() => {
    if (loading || (user && user.token && !profile)) {
      dispatch(getProfileByAdmin(id))
    } else if (!user || !user.token) {
      history.push(`/login?redirect=admin/users/${id}`)
    }
  }, [history, dispatch, user, profile, id, loading])

  return (
    <>
      <Row className='mt-5'>
        <Col sm={12} md={6} l={6} xl={6}>
          {loading ? (
            <div
              className='d-flex justify-content-center'
              style={{
                paddingTop: '25vh',
                paddingLeft: '32vw',
              }}
            >
              <Loading />
            </div>
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <HelmetTag title={`Admin | ${name}`} />

              {update_success && (
                <Message variant='success'>Updated Successfuly</Message>
              )}
              {update_error && (
                <Message variant='danger'>{update_error}</Message>
              )}
              {update_loading && (
                <div className='text-right'>
                  <Loading type='ThreeDots' height='25' />
                </div>
              )}
              <h1 className='mt-5'>User Profile</h1>
              <Form>
                {inputErrorMessage && (
                  <Message variant='danger'>{inputErrorMessage}</Message>
                )}
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='text'
                    as='input'
                    value={name}
                    onChange={handleName}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='text'
                    as='input'
                    value={email}
                    onChange={handleEmail}
                  ></Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Check
                    type='checkbox'
                    label='Admin'
                    value={isAdmin}
                    checked={isAdmin}
                    onChange={handleIsAdmin}
                  />
                </Form.Group>

                <div className='text-right'>
                  <Button type='submit' onClick={handleSubmit} variant='dark'>
                    Update
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileByAdminScreen
