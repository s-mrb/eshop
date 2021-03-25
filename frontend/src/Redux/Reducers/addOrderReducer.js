const addOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_ORDER_REQUEST':
      return {
        loading: true,
      }

    case 'ADD_ORDER_SUCCESS':
      return {
        loading: false,
        success: true,
        order: action.payload,
      }

    case 'ADD_ORDER_FAIL':
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default addOrderReducer
