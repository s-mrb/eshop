import axios from 'axios'

const reisterUser = (name, email, password) => async (dispatch, getState) => {
  dispatch({ type: 'REGISTRATION_REQUESTED' })
  try {
    const response = await axios.post('http://localhost:55555/users/register', {
      name,
      email,
      password,
    })
    if (response.data) {
      dispatch({ type: 'REGISTRATION_SUCCESS' })
    }
  } catch (error) {
    dispatch({
      type: 'REGISTRATION_FAILED',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default reisterUser
