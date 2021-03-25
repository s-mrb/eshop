const orderByIdReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case 'ORDER_BY_ID_RQUEST':
      return { loading: true }

    case 'ORDER_BY_ID_SUCCESS':
      return { loading: false, orderById: action.payload }

    case 'ORDER_BY_ID_FAIL':
      return { loading: false, error: action.payload }
    case 'ORDER_BY_ID_RESET':
      return { loading: true }
    default:
      return state
  }
}

export default orderByIdReducer
