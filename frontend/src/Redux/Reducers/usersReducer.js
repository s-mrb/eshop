const usersReducer = (state = { users: [], loading: true }, action) => {
  switch (action.type) {
    case 'USERS_PROFILES_REQUEST':
      return { loading: true }

    case 'USERS_PROFILES_SUCCESS':
      return { loading: false, users: action.payload }

    case 'USERS_PROFILES_FAIL':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export default usersReducer
