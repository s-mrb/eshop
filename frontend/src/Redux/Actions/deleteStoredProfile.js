const deleteStoredProfile = () => async (dispatch) => {
  dispatch({ type: 'DELETE_PROFILE_FROM_STORE' })
}

export default deleteStoredProfile
