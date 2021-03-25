import { Container, ListGroup } from 'react-bootstrap'
import User from '../../components/User/User'
import { useSelector, useDispatch } from 'react-redux'
import getUsers from '../../Redux/Actions/getUsers'
import { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import Message from '../../components/Message/Message'
import HelmetTag from '../../components/HelmetTag/HelmetTag'

const UsersScreen = ({ history }) => {
  const { users, error, loading } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.loggedUser)

  useEffect(() => {
    if (!user || !user.token) {
      // dispatch shipping action for user being verified
      history.push('/login?redirect=admin/users')
    }
  }, [history, user])

  useEffect(() => {
    if (loading) {
      dispatch(getUsers())
    }
  }, [dispatch, loading])
  return (
    <>
      <HelmetTag title='Admin | Users List' />

      <Container className='mt-5'>
        {loading ? (
          <div
            className='d-flex justify-content-center'
            style={{
              paddingTop: '30vh',
            }}
          >
            <Loading />
          </div>
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <h1>Users</h1>
            <ListGroup variant='flush'>
              <User header={true} />
              {users &&
                users.map((user, i) => (
                  <User
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    email={user.email}
                    isAdmin={user.isAdmin}
                  />
                ))}
            </ListGroup>
          </>
        )}
      </Container>
    </>
  )
}

export default UsersScreen
