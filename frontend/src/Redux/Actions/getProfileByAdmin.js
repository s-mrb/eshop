import axios from 'axios'

const getProfileByAdmin = (id) => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'PROFILE_BY_ADMIN_REQUESTED' })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await axios.get(
      `http://localhost:55555/admin/users/${id}`,
      config
    )
    const user = response.data
    dispatch({ type: 'PROFILE_BY_ADMIN_SUCCESS', payload: user })
  } catch (error) {
    dispatch({
      type: 'PROFILE_BY_ADMIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default getProfileByAdmin
