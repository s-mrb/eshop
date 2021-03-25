import axios from 'axios'

const getUsers = () => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'USERS_PROFILES_REQUEST' })
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:55555/admin/users`,
      config
    )
    const user = response.data
    dispatch({ type: 'USERS_PROFILES_SUCCESS', payload: user })
  } catch (error) {
    dispatch({
      type: 'USERS_PROFILES_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getUsers
