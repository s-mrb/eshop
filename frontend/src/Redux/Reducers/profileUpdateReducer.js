const profileUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_UPDATE_REQUEST':
      return { update_loading: true, update_success: false }
    case 'PROFILE_UPDATE_SUCCESS':
      return { update_loading: false, update_success: true }
    case 'PROFILE_UPDATE_FAIL':
      return { update_loading: false, update_error: action.payload }
    default:
      return state
  }
}

export default profileUpdateReducer
