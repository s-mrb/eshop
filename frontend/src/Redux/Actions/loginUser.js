import axios from 'axios'
const loginUser = (email, password) => async (dispatch, getState) => {
  dispatch({ type: 'LOGIN_REQUEST' })
  try {
    const response = await axios.post(`http://localhost:55555/users/login`, {
      email,
      password,
    })

    const user = response.data
    dispatch({ type: 'LOGIN_SUCCESS', payload: user })
    localStorage.setItem('user', JSON.stringify(getState().loggedUser.user))
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default loginUser
