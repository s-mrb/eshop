const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REGISTRATION_REQUESTED':
      return { loading: true }
    case 'REGISTRATION_SUCCESS':
      return { loading: false, success: true }
    case 'REGISTRATION_FAILED':
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export default registerUserReducer
