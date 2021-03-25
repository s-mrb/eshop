const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PROFILE_REQUESTED':
      return { loading: true }
    case 'PROFILE_SUCCESS':
      return { loading: false, profile: action.payload }
    case 'PROFILE_FAIL':
      return { loading: false, error: action.payload }
    case 'DELETE_PROFILE_FROM_STORE':
      return { loading: true }
    default:
      return state
  }
}

export default profileReducer
