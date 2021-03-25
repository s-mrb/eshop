const payOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'PAY_ORDER_REQUEST':
      return { loading: true }

    case 'PAY_ORDER_SUCCESS':
      return { loading: false, success: true }
    case 'PAY_ORDER_FAIL':
      return { loading: false, error: action.payload }
    case 'PAY_ORDER_RESET':
      return {}
    default:
      return state
  }
}

export default payOrderReducer
