const logoutUser = () => async (dispatch) => {
  dispatch({ type: 'LOGOUT' })
  localStorage.removeItem('user')
  dispatch({ type: 'DELETE_PROFILE_FROM_STORE' })
}

export default logoutUser
