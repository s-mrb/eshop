import axios from 'axios'

const updateUserProfileByAdmin = (id, data) => async (dispatch, getState) => {
  const { token } = getState().loggedUser.user

  dispatch({ type: 'PROFILE_UPDATE_BY_ADMIN_REQUEST' })
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    // ?? PUT causing error
    await axios.post(
      `http://localhost:55555/admin/users/update/${id}`,
      data,
      config
    )
    dispatch({ type: 'PROFILE_UPDATE_BY_ADMIN_SUCCESS' })
  } catch (error) {
    dispatch({
      type: 'PROFILE_UPDATE_BY_ADMIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export default updateUserProfileByAdmin
