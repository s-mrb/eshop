const myOrdersReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_MYORDERS_REQUEST':
      return { loading: true }
    case 'GET_MYORDERS_SUCCESS':
      return { loading: false, myOrders: action.payload }
    case 'GET_MYORDERS_FAIL':
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export default myOrdersReducer
