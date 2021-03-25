const profileByAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_BY_ADMIN_REQUESTED':
      return { loading: true }
    case 'PROFILE_BY_ADMIN_SUCCESS':
      return { loading: false, profile: action.payload }
    case 'PROFILE_BY_ADMIN_FAIL':
      return { loading: false, error: action.payload }
    case 'DELETE_BY_ADMIN_PROFILE_FROM_STORE':
      return { loading: true }
    default:
      return state
  }
}

export default profileByAdminReducer
