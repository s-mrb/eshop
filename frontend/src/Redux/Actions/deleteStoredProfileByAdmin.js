const deleteStoredProfileByAdmin = () => async (dispatch) => {
  dispatch({ type: 'DELETE_BY_ADMIN_PROFILE_FROM_STORE' })
}

export default deleteStoredProfileByAdmin
