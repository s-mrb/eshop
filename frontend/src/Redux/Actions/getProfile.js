import axios from 'axios'

const getProfile = () => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'PROFILE_REQUESTED' })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:55555/users/profile`,
      config
    )
    const user = response.data
    dispatch({ type: 'PROFILE_SUCCESS', payload: user })
  } catch (error) {
    dispatch({
      type: 'PROFILE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getProfile
