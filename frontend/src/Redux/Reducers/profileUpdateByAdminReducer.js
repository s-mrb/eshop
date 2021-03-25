const profileUpdateByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_UPDATE_BY_ADMIN_REQUEST':
      return { update_loading: true, update_success: false }
    case 'PROFILE_UPDATE_BY_ADMIN_SUCCESS':
      return { update_loading: false, update_success: true }
    case 'PROFILE_UPDATE_BY_ADMIN_FAIL':
      return { update_loading: false, update_error: action.payload }
    default:
      return state
  }
}

export default profileUpdateByAdminReducer
